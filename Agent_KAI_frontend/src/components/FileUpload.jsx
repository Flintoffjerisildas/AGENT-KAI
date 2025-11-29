import React, { useState } from "react";
import axios from "axios";
import { UploadCloud } from "lucide-react";

export default function FileUpload() {
  const [files, setFiles] = useState([]);
  const [uploadStatus, setUploadStatus] = useState("");

  const handleFileChange = (e) => {
    setFiles([...e.target.files]);
  };

  const handleUpload = async () => {
    if (files.length === 0) return alert("Please select at least one file");

    setUploadStatus("Uploading...");

    const formData = new FormData();
    files.forEach((file) => formData.append("files", file)); // backend must support this

    try {
      await axios.post("http://localhost:8000/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setUploadStatus("✅ Files uploaded successfully!");
      setFiles([]);
    } catch (err) {
      console.error(err);
      setUploadStatus("❌ Upload failed. Please try again.");
    }
  };

  return (
    <div className="bg-white shadow-xl rounded-2xl p-8 max-w-md mx-auto mt-10 border border-gray-200 panel-glass">
      <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
        <UploadCloud className="text-blue-500" size={22} />
        Upload Document(s)
      </h2>

      <input
        type="file"
        accept=".pdf,.doc,.docx"
        onChange={handleFileChange}
        className="w-full border border-gray-300 rounded-lg mt-4 p-2 cursor-pointer"
        multiple
      />

      {/* Show selected files */}
      {files.length > 0 && (
        <div className="mt-3 bg-gray-50 p-3 rounded-lg border text-sm text-gray-700 max-h-32 overflow-y-auto">
          <p className="font-medium mb-1">Selected Files:</p>
          <ul className="list-disc pl-5 space-y-1">
            {files.map((file, i) => (
              <li key={i}>{file.name}</li>
            ))}
          </ul>
        </div>
      )}

      <button
        onClick={handleUpload}
        className="mt-5 w-full px-6 py-2 bg-gradient-to-r from-cyan-400 to-blue-500 text-white font-medium rounded-lg shadow hover:opacity-90 transition-all"
      >
        Upload
      </button>

      {uploadStatus && (
        <p className="text-center mt-3 text-sm text-gray-600">{uploadStatus}</p>
      )}
    </div>
  );
}
