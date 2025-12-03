import React, { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";
import axios from "axios";
import ResumeDashboard from "./ResumeDashboard.jsx";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import InputBar from "./InputBar";

export default function ChatWindow() {
    // Load initial state from localStorage if available
    const [messages, setMessages] = useState(() => {
        const saved = localStorage.getItem("chat_messages");
        return saved ? JSON.parse(saved) : [];
    });
    const [value, setValue] = useState("");
    const [loading, setLoading] = useState(false);
    const [resumeData, setResumeData] = useState(() => {
        const saved = localStorage.getItem("resume_data");
        return saved ? JSON.parse(saved) : null;
    });
    const [isSpeaking, setIsSpeaking] = useState(false);
    const scrollRef = useRef();
    const synthesisRef = useRef(window.speechSynthesis);

    // Scroll to bottom on new messages
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTo({
                top: scrollRef.current.scrollHeight,
                behavior: "smooth"
            });
        }
    }, [messages, loading]);

    // Persist messages and resume data
    useEffect(() => {
        localStorage.setItem("chat_messages", JSON.stringify(messages));
    }, [messages]);

    useEffect(() => {
        if (resumeData) {
            localStorage.setItem("resume_data", JSON.stringify(resumeData));
        } else {
            localStorage.removeItem("resume_data");
        }
    }, [resumeData]);

    // Handle speech synthesis cancellation on unmount
    useEffect(() => {
        return () => {
            if (synthesisRef.current) {
                synthesisRef.current.cancel();
            }
        };
    }, []);

    const speakText = (text) => {
        if (!synthesisRef.current) return;

        if (isSpeaking) {
            synthesisRef.current.cancel();
            setIsSpeaking(false);
            return;
        }

        const utterance = new SpeechSynthesisUtterance(text);
        utterance.onend = () => setIsSpeaking(false);
        utterance.onerror = () => setIsSpeaking(false);

        setIsSpeaking(true);
        synthesisRef.current.speak(utterance);
    };

    const sendMessage = async (directText = null) => {
        const textToSend = typeof directText === 'string' ? directText : value;
        if (!textToSend.trim()) return;

        const userMsg = {
            id: Date.now(),
            sender: "user",
            text: textToSend.trim(),
            timestamp: new Date().toISOString()
        };

        setMessages((prev) => [...prev, userMsg]);
        setValue("");
        setLoading(true);

        try {
            const res = await axios.post(
                "http://localhost:8000/chat",
                { message: userMsg.text },
                { timeout: 120000 }
            );

            const agentText = res?.data?.reply ?? "No reply";
            let botMsg;

            // Safe JSON detection
            const trimmed = agentText.trim();
            const isJSON =
                trimmed.startsWith("{") ||
                trimmed.startsWith("[") ||
                trimmed.includes('"education"');

            if (isJSON) {
                try {
                    const parsed = JSON.parse(agentText);
                    setResumeData(parsed);

                    botMsg = {
                        id: Date.now() + 1,
                        sender: "agent",
                        type: "structured",
                        text: "📄 Structured resume data received.",
                        timestamp: new Date().toISOString()
                    };
                } catch {
                    botMsg = {
                        id: Date.now() + 1,
                        sender: "agent",
                        type: "text",
                        text: agentText,
                        timestamp: new Date().toISOString()
                    };
                }
            } else {
                botMsg = {
                    id: Date.now() + 1,
                    sender: "agent",
                    type: "text",
                    text: agentText,
                    timestamp: new Date().toISOString()
                };
            }

            setMessages((prev) => [...prev, botMsg]);
        } catch (err) {
            console.error(err);
            setMessages((prev) => [
                ...prev,
                {
                    id: Date.now(),
                    sender: "agent",
                    text: "❌ Error contacting server.",
                    timestamp: new Date().toISOString()
                }
            ]);
        } finally {
            setLoading(false);
        }
    };

    const clearChat = () => {
        if (window.confirm("Are you sure you want to clear the chat history?")) {
            setMessages([]);
            setResumeData(null);
            localStorage.removeItem("chat_messages");
            localStorage.removeItem("resume_data");
        }
    };

    const ChatMessage = ({ text }) => (
        <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeHighlight]}
            components={{
                p: ({ node, ...props }) => <p className="leading-relaxed mb-2 last:mb-0" {...props} />,
                li: ({ node, ...props }) => <li className="ml-5 list-disc my-1" {...props} />,
                code: ({ node, inline, ...props }) =>
                    inline ? (
                        <code className="bg-gray-200 px-1 rounded text-sm font-mono" {...props} />
                    ) : (
                        <code className="block bg-gray-900 text-white p-3 rounded-lg text-sm my-2 overflow-x-auto font-mono" {...props} />
                    ),
            }}
        >
            {text}
        </ReactMarkdown>
    );

    const formatTime = (isoString) => {
        if (!isoString) return "";
        return new Date(isoString).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };

    return (
        <section className="flex-1 flex flex-col gap-4 relative min-h-0">
            {/* 🌟 TOP HEADER */}
            <div className="panel-glass border border-gray-200 rounded-2xl p-4 shadow-sm max-w-3xl mx-auto flex items-center justify-between w-[95%]">
                <div>
                    <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                        <span className="bg-gradient-to-r from-cyan-500 to-blue-600 text-transparent bg-clip-text">
                            Agent KAI
                        </span>
                    </h2>
                    <p className="text-xs text-gray-500 font-medium">
                        AI Assistant & Resume Analyzer
                    </p>
                </div>

                <div className="flex items-center gap-2">
                    <button
                        onClick={clearChat}
                        className="px-4 py-1.5 bg-white dark:bg-gray-800 dark:text-gray-200 border border-gray-200 rounded-full text-xs font-medium text-gray-600 hover:bg-red-50 hover:text-red-600 hover:border-red-200 transition-colors shadow-sm"
                    >
                        Clear History
                    </button>
                </div>
            </div>

            {/* 💬 MESSAGES AREA */}
            <div
                ref={scrollRef}
                className="flex-1 overflow-y-auto p-4 md:p-6 bg-white/50 dark:bg-gray-900/50 shadow-inner mx-auto w-full max-w-5xl"
            >
                {messages.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full text-center animate-fadeIn opacity-0" style={{ animationFillMode: 'forwards', animationDuration: '0.5s' }}>
                        <div className="w-20 h-20 bg-gradient-to-br from-cyan-100 to-blue-100 rounded-3xl flex items-center justify-center mb-6 shadow-lg rotate-3 transform hover:rotate-0 transition-transform duration-500">
                            <span className="text-4xl">🤖</span>
                        </div>
                        <h3 className="text-3xl font-bold text-gray-800 mb-2 dark:text-gray-200">
                            Hello! I'm <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-600">Agent KAI</span>
                        </h3>
                        <p className="text-gray-500 max-w-md mx-auto leading-relaxed mb-8">
                            Your Talent Intelligence Agent. I can help with Onboarding, Employee Support, and Performance Tracking.
                        </p>

                        {/* 🌟 STARTER CARDS */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-3xl px-4">
                            {[
                                {
                                    icon: "📝",
                                    title: "Onboarding",
                                    text: "Draft an offer letter for a Senior Developer."
                                },
                                {
                                    icon: "💬",
                                    title: "Employee Support",
                                    text: "How do I apply for paternity leave?"
                                },
                                {
                                    icon: "📈",
                                    title: "Performance",
                                    text: "Suggest goals for a Q3 marketing review."
                                }
                            ].map((card, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => sendMessage(card.text)}
                                    aria-label={`Send message: ${card.text}`}
                                    className="relative flex flex-col items-center p-4 bg-white dark:bg-gray-800/50 border border-gray-100 dark:border-gray-700 rounded-2xl shadow-sm transition-all duration-300 group text-left hover:shadow-md overflow-hidden"
                                >
                                    {/* Gradient Border Effect on Hover */}
                                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-600 opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
                                    <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-cyan-400 to-blue-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />

                                    <div className="w-10 h-10 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300 z-10">
                                        <span className="text-xl">{card.icon}</span>
                                    </div>
                                    <h4 className="font-semibold text-gray-800 dark:text-gray-100 text-sm mb-1 z-10">{card.title}</h4>
                                    <p className="text-xs text-gray-500 dark:text-gray-400 text-center line-clamp-2 z-10">{card.text}</p>
                                </button>
                            ))}
                        </div>
                    </div>
                ) : (
                    <div className="space-y-6 max-w-3xl mx-auto pb-4">
                        {messages.map((m) => {
                            const isUser = m.sender === "user";

                            return (
                                <div
                                    key={m.id}
                                    className={`flex gap-3 items-end animate-slideUp ${isUser ? "justify-end" : "justify-start"
                                        }`}
                                >
                                    {!isUser && (
                                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-400 to-blue-600 text-white flex items-center justify-center font-bold text-xs shadow-md mb-1 shrink-0">
                                            K
                                        </div>
                                    )}

                                    <div
                                        className={`relative p-4 rounded-2xl shadow-sm max-w-[85%] text-sm leading-relaxed group transition-all duration-200 hover:shadow-md ${isUser
                                            ? "bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-br-none"
                                            : "bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-800 text-gray-800 dark:text-gray-200 rounded-bl-none"
                                            }`}
                                    >
                                        <div className={isUser ? "text-white/95" : "text-gray-800 dark:text-gray-200"}>
                                            <ChatMessage text={m.text} />
                                        </div>

                                        <div className={`flex items-center gap-3 mt-2 text-[10px] ${isUser ? "text-blue-100 justify-end" : "text-gray-400"}`}>
                                            <span>{formatTime(m.timestamp)}</span>
                                            {!isUser && (
                                                <>
                                                    <button
                                                        onClick={() => navigator.clipboard.writeText(m.text)}
                                                        className="hover:text-blue-500 transition-colors opacity-0 group-hover:opacity-100"
                                                    >
                                                        Copy
                                                    </button>
                                                    <button
                                                        onClick={() => speakText(m.text)}
                                                        className="hover:text-blue-500 transition-colors opacity-0 group-hover:opacity-100"
                                                        title="Read aloud"
                                                    >
                                                        {isSpeaking ? <VolumeX size={12} /> : <Volume2 size={12} />}
                                                    </button>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}

                        {loading && (
                            <div className="flex items-center gap-2 max-w-3xl mx-auto animate-fadeIn">
                                <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center shrink-0">
                                    <span className="text-xs">🤖</span>
                                </div>
                                <div className="p-4 rounded-2xl rounded-bl-none bg-white border border-gray-100 shadow-sm flex items-center gap-1.5">
                                    <span className="w-2 h-2 rounded-full animate-bounce bg-blue-400" style={{ animationDelay: '0ms' }} />
                                    <span className="w-2 h-2 rounded-full animate-bounce bg-blue-400" style={{ animationDelay: '150ms' }} />
                                    <span className="w-2 h-2 rounded-full animate-bounce bg-blue-400" style={{ animationDelay: '300ms' }} />
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>

            {/* 📊 RESUME DASHBOARD */}
            {resumeData && (
                <div className="max-w-3xl mx-auto w-full animate-fadeIn px-4">
                    <ResumeDashboard resumeData={resumeData} />
                </div>
            )}

            {/* 📝 INPUT BAR */}
            <InputBar
                onSendMessage={sendMessage}
                value={value}
                setValue={setValue}
                loading={loading}
            />
        </section>
    );
}