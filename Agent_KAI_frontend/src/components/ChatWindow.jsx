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
                        <h3 className="text-3xl font-bold text-gray-800 mb-2">
                            Hello! I'm <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-600">Agent KAI</span>
                        </h3>
                        <p className="text-gray-500 max-w-md mx-auto leading-relaxed mb-8">
                            I can help you analyze resumes, answer questions, or assist with HR tasks.
                            Try uploading a document or just say hi!
                        </p>

                        {/* 🌟 STARTER CARDS */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-3xl px-4">
                            {[
                                {
                                    icon: "📄",
                                    title: "Analyze Resume",
                                    text: "Can you analyze my resume and suggest improvements?"
                                },
                                {
                                    icon: "💼",
                                    title: "Interview Prep",
                                    text: "Help me prepare for a software engineer interview."
                                },
                                {
                                    icon: "✨",
                                    title: "Capabilities",
                                    text: "What can you do to help me with my job search?"
                                }
                            ].map((card, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => {
                                        setValue(card.text);
                                        // We need to wait a tick for state to update if we were using value in sendMessage directly from state,
                                        // but sendMessage uses 'value' state. 
                                        // Better approach: pass text directly to sendMessage or update state and call.
                                        // Since sendMessage reads 'value' from state, let's just call a modified sendMessage or update state then call?
                                        // Actually, standard sendMessage reads 'value'. 
                                        // Let's modify sendMessage to accept an optional argument or just handle it here.
                                        // For simplicity/robustness, let's just call a helper or modify sendMessage.
                                        // Let's try updating value and then calling sendMessage? No, state update is async.
                                        // Let's modify sendMessage to take an optional text arg.
                                        sendMessage(card.text);
                                    }}
                                    className="flex flex-col items-center p-4 bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-md hover:border-blue-200 dark:bg-gray-800/50 dark:border-gray-700 dark:text-gray-200 transition-all duration-200 group text-left"
                                >
                                    <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform dark:bg-blue-600 dark:text-gray-200">
                                        <span className="text-xl">{card.icon}</span>
                                    </div>
                                    <h4 className="font-semibold text-gray-800 text-sm mb-1 dark:text-gray-200">{card.title}</h4>
                                    <p className="text-xs text-gray-500 text-center line-clamp-2 dark:text-gray-200">{card.text}</p>
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









// import React, { useEffect, useRef, useState } from "react";
// import { Send, Upload } from "lucide-react";
// import axios from "axios";
// import ResumeDashboard from "./ResumeDashboard.jsx";
// import ReactMarkdown from 'react-markdown';
// import remarkGfm from 'remark-gfm';
// import rehypeHighlight from 'rehype-highlight';
// import { Link } from "react-router-dom";

// /*
//  ChatWindow: central area — big rounded container, message cards, regenerate button,
//  welcome center when no messages, input bar at bottom (Upload + Input + Send)
// */

// export default function ChatWindow() {
//     const [messages, setMessages] = useState([]);
//     const [value, setValue] = useState("");
//     const [loading, setLoading] = useState(false);
//     const scrollRef = useRef();
//     const [resumeData, setResumeData] = useState(null);


//     useEffect(() => {
//         // keep scroll at bottom
//         if (scrollRef.current) {
//             scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
//         }
//     }, [messages, loading]);

//     // const sendMessage = async () => {
//     //   if (!value.trim()) return;
//     //   const userMsg = { id: Date.now(), sender: "user", text: value };
//     //   setMessages((m) => [...m, userMsg]);
//     //   setValue("");
//     //   setLoading(true);

//     //   try {
//     //     // change endpoint to your backend
//     //     const res = await axios.post("http://localhost:8000/chat", { message: userMsg.text }, { timeout: 120000 });
//     //     const agentText = res?.data?.reply || "No reply";
//     //     const botMsg = { id: Date.now() + 1, sender: "agent", text: agentText };
//     //     setMessages((m) => [...m, botMsg]);
//     //   } catch (err) {
//     //     console.error(err);
//     //     const errMsg = { id: Date.now() + 2, sender: "agent", text: "Error contacting server." };
//     //     setMessages((m) => [...m, errMsg]);
//     //   } finally {
//     //     setLoading(false);
//     //   }
//     // };

//     // const clearChat = () => setMessages([]);


//     const sendMessage = async () => {
//         if (!value.trim()) return;
//         const userMsg = { id: Date.now(), sender: "user", text: value };
//         setMessages((m) => [...m, userMsg]);
//         setValue("");
//         setLoading(true);

//         try {
//             const res = await axios.post(
//                 "http://localhost:8000/chat",
//                 { message: userMsg.text },
//                 { timeout: 120000 }
//             );
//             console.log("Response from server:", res.data);
//             const agentText = res?.data?.reply || "No reply";

//             // 🧠 Try to detect structured data
//             let botMsg;
//             try {
//                 const parsed = JSON.parse(agentText);

//                 // If Bedrock returns valid JSON, store it for ResumeDashboard
//                 setResumeData(parsed);

//                 botMsg = {
//                     id: Date.now() + 1,
//                     sender: "agent",
//                     text: "📄 Structured resume data received.",
//                     type: "structured",
//                 };
//             } catch (e) {
//                 // Fallback: if not JSON, just show normal text
//                 botMsg = {
//                     id: Date.now() + 1,
//                     sender: "agent",
//                     text: agentText,
//                     type: "text",
//                 };
//             }

//             setMessages((m) => [...m, botMsg]);
//         } catch (err) {
//             console.error(err);
//             const errMsg = {
//                 id: Date.now() + 2,
//                 sender: "agent",
//                 text: "❌ Error contacting server.",
//             };
//             setMessages((m) => [...m, errMsg]);
//         } finally {
//             setLoading(false);
//         }
//     };

//     // 🧹 Clear chat and reset dashboard
//     const clearChat = () => {
//         setMessages([]);
//         setResumeData(null);
//     };

//     function ChatMessage({ text }) {
//         console.log("Rendering message text:", text);
//         return (
//             <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeHighlight]}>
//                 {text}
//             </ReactMarkdown>
//         );
//     }

//     return (
//         // <section className="flex-1 flex flex-col gap-4 relative overflow-scroll">
//         //     {/* top card / header inside chat panel */}
//         //     {/* ======================Check below if it is required======================= */}

//         //     {/* message area */}
//         //     <div ref={scrollRef} className="flex-1 overflow-y-scroll p-6 bg-white panel-glass border border-gray-100 shadow">
//         //         {messages.length === 0 ? (
//         //             <div className="flex flex-col items-center justify-center h-96">
//         //                 <h3 className="text-4xl font-semibold text-gray-800 mb-2"><i className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Agent KAI</i></h3>
//         //                 <img
//         //                     src="//i0.wp.com/kasadara.ai/wp-content/uploads/2025/10/kasadara_logo_black_512x96.png?fit=512%2C96&ssl=1"
//         //                     alt="Kasadara Logo"
//         //                     className="w-52 h-auto"
//         //                 />
//         //                 <p className="text-gray-500">Upload resumes or ask questions to get started.</p>
//         //             </div>
//         //         ) : (
//         //             <div className="space-y-5 max-w-3xl mx-auto">
//         //                 {messages.map((m) => (
//         //                     <div key={m.id} className={`flex ${m.sender === "user" ? "justify-end" : "justify-start"}`}>
//         //                         <div className={`${m.sender === "user" ? "bg-gradient-to-r from-[#b6e6ff] to-[#88d4ff] text-gray-900" : "bg-[#f1fbf9] text-gray-800"} p-4 rounded-2xl shadow-sm max-w-[80%]`}>
//         //                             <div className="text-sm whitespace-pre-wrap"><ChatMessage text={m.text} /></div>
//         //                             <div className="mt-2 text-xs text-gray-400 flex gap-2">
//         //                                 <button className="hover:underline">Copy</button>
//         //                                 <button className="hover:underline">Add to Editor</button>
//         //                             </div>
//         //                         </div>
//         //                     </div>
//         //                 ))}
//         //                 {loading && (
//         //                     <div className="flex items-center gap-2 text-gray-500">
//         //                         <div className="animate-pulse">Agent is typing...</div>
//         //                     </div>
//         //                 )}
//         //             </div>
//         //         )}

//         //     </div>

//         //     {/* ✅ Add Resume Dashboard below messages */}
//         //     {resumeData && <ResumeDashboard resumeData={resumeData} />}

//         //     {/* input area */}
//         //     <div className="mx-auto z-50
//         //      w-[95%] max-w-3xl panel-glass border border-gray-200
//         //      rounded-3xl p-3 flex items-center gap-3 bg-white shadow-lg">
//         //         <button className="px-3 py-2 rounded-xl bg-white hover:bg-gray-100 flex items-center gap-2 text-sm border-4 border-blue-600">
//         //             <Link to="/FileUpload"><Upload /></Link>
//         //         </button>

//         //         <div className="flex-1 bg-white rounded-xl px-4 py-2 shadow-sm border border-blue-600">
//         //             <input
//         //                 value={value}
//         //                 onChange={(e) => setValue(e.target.value)}
//         //                 onKeyDown={(e) => e.key === "Enter" && sendMessage()}
//         //                 placeholder="Ask or search anything..."
//         //                 className="w-full outline-none text-sm"
//         //             />
//         //         </div>

//         //         <button onClick={sendMessage} className="bg-gradient-to-r from-cyan-400 to-blue-500 text-white rounded-xl px-4 py-2 flex items-center gap-2">
//         //             <Send />

//         //         </button>
//         //     </div>
//         // </section>

//         <section className="flex-1 flex flex-col gap-4 relative min-h-0">
//             {/* Message area */}
//             <div
//                 ref={scrollRef}
//                 className="flex-1 overflow-y-auto p-6 bg-white panel-glass border border-gray-100 shadow rounded-xl"
//                 aria-live="polite"
//             >
//                 {messages.length === 0 ? (
//                 <div className="flex flex-col items-center justify-center h-96 text-center">
//                     <h3 className="text-4xl font-semibold text-gray-800 mb-2">
//                     <i className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
//                         Agent KAI
//                     </i>
//                     </h3>

//                     <img
//                     // force https to avoid mixed-content problems
//                     src="//i0.wp.com/kasadara.ai/wp-content/uploads/2025/10/kasadara_logo_black_512x96.png?fit=512%2C96&ssl=1"
//                     alt="Kasadara Logo"
//                     className="w-52 h-auto my-3"
//                     />

//                     <p className="text-gray-500">Upload resumes or ask questions to get started.</p>
//                 </div>
//                 ) : (
//                 <div className="space-y-5 max-w-3xl mx-auto">
//                     {messages.map((m) => {
//                     // ensure unique key: prefer id but fallback to index
//                     const key = m.id ?? `${m.sender}-${m.timestamp ?? Math.random()}`;

//                     const isUser = m.sender === "user";
//                     return (
//                         <div
//                         key={key}
//                         className={`flex ${isUser ? "justify-end" : "justify-start"}`}
//                         >
//                         {/* optional avatar for assistant */}
//                         {!isUser && (
//                             <div className="mr-3 flex-shrink-0">
//                             <div className="w-9 h-9 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 flex items-center justify-center text-white text-sm font-medium">
//                                 K
//                             </div>
//                             </div>
//                         )}

//                         <div
//                             className={`p-4 rounded-2xl shadow-sm max-w-[80%] break-words
//                             ${isUser ? "bg-gradient-to-r from-[#b6e6ff] to-[#88d4ff] text-gray-900" : "bg-[#f1fbf9] text-gray-800"}`}
//                             // improve contrast: add ring for focus
//                             tabIndex={0}
//                         >
//                             <div className="text-sm whitespace-pre-wrap">
//                             <ChatMessage text={m.text} />
//                             </div>

//                             <div className="mt-2 text-xs text-gray-500 flex gap-3 items-center">
//                             <button
//                                 onClick={() => navigator.clipboard?.writeText(m.text)}
//                                 className="hover:underline focus:outline-none"
//                                 aria-label="Copy message"
//                                 title="Copy"
//                             >
//                                 Copy
//                             </button>

//                             <button
//                                 className="hover:underline focus:outline-none"
//                                 onClick={() => {
//                                 // If you have an editor-add function, call it here.
//                                 // Provide a fallback handler in props if needed.
//                                 const event = new CustomEvent("add-to-editor", { detail: m.text });
//                                 window.dispatchEvent(event);
//                                 }}
//                                 aria-label="Add to editor"
//                                 title="Add to Editor"
//                             >
//                                 Add to Editor
//                             </button>

//                             {/* optional timestamp */}
//                             {m.timestamp && (
//                                 <span className="ml-2 text-xs text-gray-400">
//                                 {new Date(m.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
//                                 </span>
//                             )}
//                             </div>
//                         </div>
//                         </div>
//                     );
//                     })}

//                     {loading && (
//                     <div className="flex items-center gap-3 max-w-3xl mx-auto">
//                         <div className="inline-flex items-center gap-3 bg-[#f7fbff] p-3 rounded-xl shadow-sm">
//                         <span className="w-3 h-3 rounded-full animate-pulse bg-slate-400" />
//                         <span className="w-3 h-3 rounded-full animate-pulse bg-slate-400 delay-75" />
//                         <span className="w-3 h-3 rounded-full animate-pulse bg-slate-400 delay-150" />
//                         <span className="ml-2 text-sm text-gray-500">Agent is typing...</span>
//                         </div>
//                     </div>
//                     )}
//                 </div>
//                 )}
//             </div>

//             {/* ✅ Resume Dashboard below messages (keeps layout consistent) */}
//             {resumeData && (
//                 <div className="max-w-3xl mx-auto w-full z-10">
//                 <ResumeDashboard resumeData={resumeData} />
//                 </div>
//             )}

//             {/* Input area */}
//             <div className="mx-auto z-50 w-[95%] max-w-3xl panel-glass border border-gray-200 rounded-3xl p-3 flex items-center gap-3 bg-white shadow-lg">
//                 <Link to="/FileUpload" className="px-3 py-2 rounded-xl bg-white hover:bg-gray-100 flex items-center gap-2 text-sm border-2 border-blue-600">
//                 <Upload />
//                 </Link>

//                 <div className="flex-1 bg-white rounded-xl px-4 py-2 shadow-sm border border-blue-600">
//                 <input
//                     value={value}
//                     onChange={(e) => setValue(e.target.value)}
//                     onKeyDown={(e) => e.key === "Enter" && sendMessage()}
//                     placeholder="Ask or search anything..."
//                     className="w-full outline-none text-sm bg-transparent"
//                     aria-label="Type a message"
//                 />
//                 </div>

//                 <button
//                 onClick={sendMessage}
//                 className="bg-gradient-to-r from-cyan-400 to-blue-500 text-white rounded-xl px-4 py-2 flex items-center gap-2"
//                 aria-label="Send message"
//                 >
//                 <Send />
//                 </button>
//             </div>
//         </section>
//     );
// }



// // <div className="panel-glass border border-gray-200 rounded-2xl p-4 shadow-sm">
// //     <div className="flex items-center justify-between">
// //       <div>
// //         <h2 className="text-lg font-semibold">Super Chat</h2>
// //         <p className="text-sm text-gray-500">Ask questions or upload resumes to analyze candidates</p>
// //       </div>
// //       <div className="flex items-center gap-2">
// //         <button onClick={() => { /* regenerate placeholder */ }} className="px-3 py-1 bg-white rounded-full shadow-sm text-sm">Regenerate</button>
// //         <button onClick={clearChat} className="px-3 py-1 bg-white rounded-full shadow-sm text-sm">Clear</button>
// //       </div>
// //     </div>
// //   </div>

