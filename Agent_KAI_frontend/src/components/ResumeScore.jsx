import React, { useState } from "react";
import axios from "axios";
import { Upload, X, Trophy, FileText, Loader2, Award, ClipboardList, CheckCircle2, Sparkles } from "lucide-react";

export default function ResumeScore() {
    const [jobDescription, setJobDescription] = useState("");
    const [files, setFiles] = useState([]);
    const [results, setResults] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [isDragging, setIsDragging] = useState(false);

    const handleFileChange = (e) => {
        if (e.target.files) {
            setFiles((prev) => [...prev, ...Array.from(e.target.files)]);
        }
    };

    const removeFile = (index) => {
        setFiles(files.filter((_, i) => i !== index));
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = (e) => {
        e.preventDefault();
        setIsDragging(false);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragging(false);
        if (e.dataTransfer.files) {
            setFiles((prev) => [...prev, ...Array.from(e.dataTransfer.files)]);
        }
    };

    const handleScore = async () => {
        if (!jobDescription || files.length === 0) return;

        setLoading(true);
        setError("");
        setResults(null);

        const formData = new FormData();
        formData.append("job_description", jobDescription);
        files.forEach((file) => {
            formData.append("files", file);
        });

        try {
            const response = await axios.post("http://localhost:8000/score", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            if (response.data.error) {
                setError(response.data.error);
            } else {
                setResults(response.data.results);
            }
        } catch (err) {
            console.error(err);
            setError("An error occurred while scoring resumes. Please check the backend connection.");
        } finally {
            setLoading(false);
        }
    };

    const isButtonDisabled = !jobDescription.trim() || files.length === 0 || loading;

    return (
        <div className="flex h-full bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 overflow-hidden relative">

            {/* Background Decoration */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[100px] pointer-events-none" />

            <div className="flex-1 flex flex-col h-full overflow-hidden relative z-10">
                <header className="h-20 flex items-center justify-between px-8 backdrop-blur-sm bg-white/70 dark:bg-gray-900/70 border-b border-gray-200/50 dark:border-gray-800/50 sticky top-0 z-20">
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-blue-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-purple-500/30">
                            <Sparkles size={20} />
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400">
                                Smart Scorer
                            </h1>
                            <p className="text-xs font-medium text-gray-500 dark:text-gray-400 tracking-wide">
                                AI-POWERED RESUME SCREENING
                            </p>
                        </div>
                    </div>
                </header>

                <main className="flex-1 overflow-auto p-8 custom-scrollbar">
                    <div className="max-w-6xl mx-auto space-y-8 pb-12">

                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

                            {/* Left Column: Job Description (7 cols) */}
                            <div className="lg:col-span-7 flex flex-col gap-4">
                                <div className="bg-white dark:bg-gray-800/50 backdrop-blur-md rounded-2xl p-1 border border-gray-200 dark:border-gray-700/50 shadow-xl shadow-gray-200/50 dark:shadow-none h-full flex flex-col">
                                    <div className="p-4 border-b border-gray-100 dark:border-gray-700/50 flex items-center gap-3">
                                        <div className="p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg text-blue-600 dark:text-blue-400">
                                            <ClipboardList size={18} />
                                        </div>
                                        <h2 className="font-semibold text-gray-900 dark:text-white">Job Requirements</h2>
                                    </div>
                                    <textarea
                                        className="w-full flex-1 min-h-[400px] p-6 bg-transparent border-none text-gray-700 dark:text-gray-300 placeholder-gray-400 dark:placeholder-gray-600 focus:ring-0 text-base leading-relaxed resize-none"
                                        placeholder="Paste the full job description here to generate scoring criteria..."
                                        value={jobDescription}
                                        onChange={(e) => setJobDescription(e.target.value)}
                                    />
                                </div>
                            </div>

                            {/* Right Column: Upload & Actions (5 cols) */}
                            <div className="lg:col-span-5 flex flex-col gap-6">

                                {/* Upload Area */}
                                <div
                                    className={`relative group transition-all duration-300 ${isDragging ? "scale-[1.02]" : ""}`}
                                    onDragOver={handleDragOver}
                                    onDragLeave={handleDragLeave}
                                    onDrop={handleDrop}
                                >
                                    <div className={`absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl opacity-75 blur transition duration-1000 group-hover:duration-200 ${isDragging ? "opacity-100" : "opacity-0 group-hover:opacity-100"}`}></div>
                                    <label className="relative flex flex-col items-center justify-center w-full h-[240px] bg-white dark:bg-gray-800 rounded-2xl border-2 border-dashed border-gray-300 dark:border-gray-600 cursor-pointer hover:border-transparent dark:hover:border-transparent transition-all z-10 overflow-hidden">
                                        <div className="flex flex-col items-center justify-center pt-5 pb-6 px-4 text-center z-10">
                                            <div className={`w-16 h-16 mb-4 rounded-2xl flex items-center justify-center transition-all duration-300 ${isDragging ? "bg-purple-100 dark:bg-purple-900/30 text-purple-600 scale-110" : "bg-gray-50 dark:bg-gray-700 text-gray-400 group-hover:bg-purple-50 dark:group-hover:bg-purple-900/20 group-hover:text-purple-500"}`}>
                                                <Upload className="w-8 h-8" strokeWidth={1.5} />
                                            </div>
                                            <p className="mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                                <span className="text-purple-600 dark:text-purple-400">Click to upload</span> or drag and drop
                                            </p>
                                            <p className="text-xs text-gray-500 dark:text-gray-400">
                                                Support for PDF, DOCX (Multiple files allowed)
                                            </p>
                                        </div>
                                        {/* Background pattern */}
                                        <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05] bg-[radial-gradient(#8b5cf6_1px,transparent_1px)] [background-size:16px_16px]"></div>
                                        <input type="file" className="hidden" multiple onChange={handleFileChange} accept=".pdf,.docx,.doc" />
                                    </label>
                                </div>

                                {/* File List */}
                                <div className="bg-white dark:bg-gray-800/50 backdrop-blur-md rounded-2xl border border-gray-200 dark:border-gray-700/50 shadow-sm flex flex-col flex-1 min-h-[200px]">
                                    <div className="p-4 border-b border-gray-100 dark:border-gray-700/50 flex items-center justify-between">
                                        <span className="text-xs font-bold text-gray-500 uppercase tracking-wider flex items-center gap-2">
                                            <FileText size={14} />
                                            Resumes ({files.length})
                                        </span>
                                        {files.length > 0 && (
                                            <button onClick={() => setFiles([])} className="text-xs text-red-500 hover:text-red-600 transition-colors">
                                                Clear All
                                            </button>
                                        )}
                                    </div>
                                    <div className="flex-1 overflow-y-auto p-2 space-y-2 max-h-[200px] custom-scrollbar">
                                        {files.length === 0 ? (
                                            <div className="h-full flex flex-col items-center justify-center text-gray-400 dark:text-gray-500">
                                                <p className="text-sm">No files uploaded yet</p>
                                            </div>
                                        ) : (
                                            files.map((file, index) => (
                                                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/30 hover:bg-white dark:hover:bg-gray-700 rounded-xl border border-transparent hover:border-gray-200 dark:hover:border-gray-600 transition-all group">
                                                    <div className="flex items-center gap-3 overflow-hidden">
                                                        <div className="w-8 h-8 rounded-lg bg-orange-50 dark:bg-orange-900/20 text-orange-500 flex items-center justify-center flex-shrink-0">
                                                            <FileText size={16} />
                                                        </div>
                                                        <div className="flex flex-col overflow-hidden">
                                                            <span className="text-sm font-medium text-gray-700 dark:text-gray-200 truncate">{file.name}</span>
                                                            <span className="text-[10px] text-gray-400">{(file.size / 1024).toFixed(1)} KB</span>
                                                        </div>
                                                    </div>
                                                    <button onClick={() => removeFile(index)} className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors opacity-0 group-hover:opacity-100">
                                                        <X size={14} />
                                                    </button>
                                                </div>
                                            ))
                                        )}
                                    </div>
                                </div>

                                {/* Action Button */}
                                <button
                                    onClick={handleScore}
                                    disabled={isButtonDisabled}
                                    className={`relative w-full py-4 px-6 rounded-2xl font-bold text-lg shadow-xl transition-all overflow-hidden group ${isButtonDisabled
                                            ? "bg-gray-200 dark:bg-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed"
                                            : "bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 text-white hover:shadow-purple-500/25 active:scale-[0.98]"
                                        }`}
                                >
                                    <div className={`absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ${isButtonDisabled ? "hidden" : ""}`} />

                                    <div className="relative flex items-center justify-center gap-3">
                                        {loading ? (
                                            <>
                                                <Loader2 className="animate-spin" size={24} />
                                                <span className="animate-pulse">Analyzing Candidates...</span>
                                            </>
                                        ) : (
                                            <>
                                                <Sparkles className="w-6 h-6 animate-pulse" />
                                                Run Analysis
                                            </>
                                        )}
                                    </div>
                                </button>
                            </div>
                        </div>

                        {/* Error Message */}
                        {error && (
                            <div className="animate-fadeIn p-4 rounded-xl bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 text-sm flex items-center gap-3">
                                <div className="p-2 bg-red-100 dark:bg-red-900/30 rounded-full">
                                    <X size={16} />
                                </div>
                                {error}
                            </div>
                        )}

                        {/* Results Section */}
                        {results && (
                            <div className="animate-slideUp space-y-6 pt-8 border-t border-gray-200 dark:border-gray-800">
                                <div className="flex items-center justify-between">
                                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
                                        <Trophy className="text-yellow-500" size={28} />
                                        Analysis Results
                                    </h2>
                                    <div className="text-sm text-gray-500 dark:text-gray-400">
                                        Processed {results.length} resumes
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                                    {results
                                        .sort((a, b) => b.score - a.score)
                                        .map((result, idx) => (
                                            <div key={idx} className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
                                                {/* Header with Score */}
                                                <div className="p-6 pb-4 relative overflow-hidden">
                                                    <div className={`absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity ${result.score >= 80 ? "text-green-500" :
                                                            result.score >= 60 ? "text-yellow-500" : "text-red-500"
                                                        }`}>
                                                        <Award size={100} />
                                                    </div>

                                                    <div className="flex justify-between items-start z-10 relative">
                                                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl font-bold shadow-sm ${idx === 0 ? "bg-gradient-to-br from-yellow-300 to-yellow-500 text-white" :
                                                                idx === 1 ? "bg-gradient-to-br from-gray-300 to-gray-500 text-white" :
                                                                    idx === 2 ? "bg-gradient-to-br from-orange-300 to-orange-500 text-white" :
                                                                        "bg-gray-100 dark:bg-gray-700 text-gray-500"
                                                            }`}>
                                                            #{idx + 1}
                                                        </div>
                                                        <div className="flex flex-col items-end">
                                                            <span className={`text-4xl font-extrabold ${result.score >= 80 ? "text-green-500" :
                                                                    result.score >= 60 ? "text-yellow-500" : "text-red-500"
                                                                }`}>
                                                                {result.score}
                                                            </span>
                                                            <span className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Match Score</span>
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Candidate Name */}
                                                <div className="px-6 pb-2 relative z-10">
                                                    <h3 className="text-lg font-bold text-gray-900 dark:text-white truncate">
                                                        {result.resumeName}
                                                    </h3>
                                                </div>

                                                {/* Progress Bar */}
                                                <div className="px-6 py-2">
                                                    <div className="h-1.5 w-full bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                                                        <div
                                                            className={`h-full rounded-full transition-all duration-1000 ease-out ${result.score >= 80 ? "bg-green-500" :
                                                                    result.score >= 60 ? "bg-yellow-500" : "bg-red-500"
                                                                }`}
                                                            style={{ width: `${result.score}%` }}
                                                        />
                                                    </div>
                                                </div>

                                                {/* Summary */}
                                                <div className="p-6 pt-4 bg-gray-50/50 dark:bg-gray-700/20 border-t border-gray-100 dark:border-gray-700/50 min-h-[140px]">
                                                    <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed line-clamp-4">
                                                        {result.summary}
                                                    </p>
                                                </div>

                                                {/* Footer Status */}
                                                <div className="px-6 py-3 border-t border-gray-100 dark:border-gray-700/50 flex items-center gap-2 text-xs font-medium text-gray-400">
                                                    {result.score >= 80 ? (
                                                        <span className="flex items-center gap-1.5 text-green-600 dark:text-green-400">
                                                            <CheckCircle2 size={14} /> Highly Recommended
                                                        </span>
                                                    ) : result.score >= 60 ? (
                                                        <span className="flex items-center gap-1.5 text-yellow-600 dark:text-yellow-400">
                                                            <CheckCircle2 size={14} /> Potential Match
                                                        </span>
                                                    ) : (
                                                        <span className="flex items-center gap-1.5 text-red-500">
                                                            <X size={14} /> Low Match
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                        ))}
                                </div>
                            </div>
                        )}
                    </div>
                </main>
            </div>
        </div>
    );
}
