import React, { useState, useCallback } from "react";
import axios from "axios";
import { UploadCloud, FileText, X, CheckCircle, AlertCircle } from "lucide-react";

export default function FileUpload() {
  const [files, setFiles] = useState([]);
  const [uploadStatus, setUploadStatus] = useState("");
  const [progress, setProgress] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const handleFileChange = (e) => {
    if (e.target.files) {
      setFiles((prev) => [...prev, ...Array.from(e.target.files)]);
    }
  };

  const removeFile = (index) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const onDragOver = useCallback((e) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const onDragLeave = useCallback((e) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const onDrop = useCallback((e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files) {
      setFiles((prev) => [...prev, ...Array.from(e.dataTransfer.files)]);
    }
  }, []);

  const handleUpload = async () => {
    if (files.length === 0) return alert("Please select at least one file");

    setUploadStatus("uploading");
    setProgress(0);

    const formData = new FormData();
    files.forEach((file) => formData.append("files", file));

    try {
      await axios.post("http://localhost:8000/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          setProgress(percentCompleted);
        },
      });

      setUploadStatus("success");
      setFiles([]);
      setTimeout(() => {
        setUploadStatus("");
        setProgress(0);
      }, 3000);
    } catch (err) {
      console.error(err);
      setUploadStatus("error");
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 px-4">
      <div
        className={`bg-white shadow-xl rounded-3xl p-8 border-2 transition-all duration-300 ${isDragging ? "border-blue-500 bg-blue-50 scale-102" : "border-gray-100 hover:border-blue-200"
          }`}
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
      >
        <div className="text-center mb-8">
          <div className={`w-16 h-16 mx-auto bg-blue-50 rounded-2xl flex items-center justify-center mb-4 transition-transform duration-300 ${isDragging ? "scale-110" : ""}`}>
            <UploadCloud className="text-blue-600" size={32} />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Upload Document(s)
          </h2>
          <p className="text-gray-500">
            Drag & drop files here, or click to select files
          </p>
        </div>

        <div className="relative group">
          <input
            type="file"
            accept=".pdf,.doc,.docx"
            onChange={handleFileChange}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
            multiple
          />
          <div className="w-full border-2 border-dashed border-gray-300 rounded-xl p-8 text-center group-hover:border-blue-400 group-hover:bg-blue-50/50 transition-all">
            <span className="text-blue-600 font-medium">Browse Files</span>
            <span className="text-gray-400 mx-2">|</span>
            <span className="text-gray-500 text-sm">Supported formats: PDF, DOC, DOCX</span>
          </div>
        </div>

        {/* Show selected files */}
        {files.length > 0 && (
          <div className="mt-6 space-y-3 animate-fadeIn">
            <p className="font-medium text-gray-700 text-sm">Selected Files ({files.length})</p>
            <div className="bg-gray-50 rounded-xl border border-gray-200 overflow-hidden max-h-48 overflow-y-auto">
              {files.map((file, i) => (
                <div key={i} className="flex items-center justify-between p-3 border-b last:border-0 border-gray-100 hover:bg-white transition-colors">
                  <div className="flex items-center gap-3 overflow-hidden">
                    <FileText size={18} className="text-blue-500 shrink-0" />
                    <span className="text-sm text-gray-700 truncate">{file.name}</span>
                    <span className="text-xs text-gray-400 shrink-0">({(file.size / 1024).toFixed(1)} KB)</span>
                  </div>
                  <button
                    onClick={() => removeFile(i)}
                    className="p-1 hover:bg-red-50 rounded-full text-gray-400 hover:text-red-500 transition-colors"
                  >
                    <X size={16} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Progress Bar */}
        {uploadStatus === "uploading" && (
          <div className="mt-6">
            <div className="flex justify-between text-xs font-medium text-gray-500 mb-1">
              <span>Uploading...</span>
              <span>{progress}%</span>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
              <div
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        )}

        {/* Status Messages */}
        {uploadStatus === "success" && (
          <div className="mt-6 p-4 bg-green-50 text-green-700 rounded-xl flex items-center gap-3 animate-fadeIn">
            <CheckCircle size={20} />
            <span className="font-medium">Files uploaded successfully!</span>
          </div>
        )}

        {uploadStatus === "error" && (
          <div className="mt-6 p-4 bg-red-50 text-red-700 rounded-xl flex items-center gap-3 animate-fadeIn">
            <AlertCircle size={20} />
            <span className="font-medium">Upload failed. Please try again.</span>
          </div>
        )}

        <button
          onClick={handleUpload}
          disabled={files.length === 0 || uploadStatus === "uploading"}
          className={`mt-8 w-full px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold rounded-xl shadow-lg hover:shadow-xl hover:opacity-95 transition-all transform active:scale-95 ${(files.length === 0 || uploadStatus === "uploading") ? "opacity-50 cursor-not-allowed" : ""
            }`}
        >
          {uploadStatus === "uploading" ? "Uploading..." : "Upload Files"}
        </button>
      </div>
    </div>
  );
}
