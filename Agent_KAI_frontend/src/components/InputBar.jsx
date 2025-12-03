import React, { useState, useEffect } from "react";
import { Send, Upload, Mic, MicOff } from "lucide-react";
import { Link } from "react-router-dom";

export default function InputBar({ onSendMessage, value, setValue, loading }) {
    const [isListening, setIsListening] = useState(false);
    const [recognition, setRecognition] = useState(null);

    useEffect(() => {
        if ("webkitSpeechRecognition" in window || "SpeechRecognition" in window) {
            const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
            const rec = new SpeechRecognition();
            rec.continuous = false;
            rec.interimResults = false;
            rec.lang = "en-US";

            rec.onresult = (event) => {
                const transcript = event.results[0][0].transcript;
                setValue((prev) => prev + " " + transcript);
                setIsListening(false);
            };

            rec.onerror = (event) => {
                console.error("Speech recognition error", event.error);
                setIsListening(false);
            };

            rec.onend = () => {
                setIsListening(false);
            };

            setRecognition(rec);
        }
    }, [setValue]);

    const toggleListening = () => {
        if (!recognition) {
            alert("Speech recognition is not supported in this browser.");
            return;
        }

        if (isListening) {
            recognition.stop();
        } else {
            recognition.start();
            setIsListening(true);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            onSendMessage();
        }
    };

    return (
        <div className="mx-auto w-[95%] max-w-3xl panel-glass border border-gray-200 rounded-3xl p-3 flex items-center gap-3 bg-white shadow-xl transition-all duration-300 hover:shadow-2xl">
            <Link
                to="/FileUpload"
                className="p-2 rounded-xl border border-blue-600 bg-white hover:bg-blue-50 dark:hover:bg-blue-800 dark:border-blue-800 dark:bg-gray-800 transition-colors"
                title="Upload File"
            >
                <Upload className="text-blue-600" size={20} />
            </Link>

            <button
                onClick={toggleListening}
                className={`p-2 rounded-xl border transition-colors ${isListening
                        ? "bg-red-50 border-red-500 text-red-500 animate-pulse"
                        : "border-gray-300 text-gray-500 hover:bg-gray-100"
                    }`}
                title={isListening ? "Stop Listening" : "Start Voice Input"}
            >
                {isListening ? <MicOff size={20} /> : <Mic size={20} />}
            </button>

            <div className="flex-1 bg-transparent dark:text-gray-200 rounded-xl px-4 py-2 shadow-sm border border-blue-600 focus-within:ring-2 focus-within:ring-blue-200 transition-all">
                <input
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder={isListening ? "Listening..." : "Ask or search anything..."}
                    className="w-full outline-none text-sm bg-transparent"
                    disabled={loading}
                />
            </div>

            <button
                onClick={onSendMessage}
                disabled={loading || !value.trim()}
                className={`bg-gradient-to-r from-cyan-400 to-blue-500 text-white rounded-xl px-5 py-2 shadow transition-all transform hover:scale-105 active:scale-95 ${loading || !value.trim() ? "opacity-50 cursor-not-allowed" : "hover:opacity-90"
                    }`}
            >
                <Send size={18} />
            </button>
        </div>
    );
}
