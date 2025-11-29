import React, { useEffect, useRef, useState } from "react";
import { Send, Upload } from "lucide-react";
import axios from "axios";
import ResumeDashboard from "./ResumeDashboard.jsx";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import { Link } from "react-router-dom";

export default function ChatWindow() {
  const [messages, setMessages] = useState([]);
  const [value, setValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [resumeData, setResumeData] = useState(null);
  const scrollRef = useRef();

  // Scroll always to bottom for smooth UX
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: "smooth"
      });
    }
  }, [messages, loading]);

  /** ------------------------------
   *  ✉️ SEND MESSAGE (Optimized)
   *  ------------------------------ */
  const sendMessage = async () => {
    if (!value.trim()) return;

    const userMsg = {
      id: Date.now(),
      sender: "user",
      text: value.trim()
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

      // Safe JSON detection (no breaking)
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
            text: "📄 Structured resume data received."
          };
        } catch {
          botMsg = {
            id: Date.now() + 1,
            sender: "agent",
            type: "text",
            text: agentText
          };
        }
      } else {
        botMsg = {
          id: Date.now() + 1,
          sender: "agent",
          type: "text",
          text: agentText
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
          text: "❌ Error contacting server."
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  /** ------------------------------
   *  🧹 CLEAR CHAT
   *  ------------------------------ */
  const clearChat = () => {
    setMessages([]);
    setResumeData(null);
  };

  /** ------------------------------
   *  📝 RENDER MARKDOWN MESSAGES
   *  ------------------------------ */
  const ChatMessage = ({ text }) => (
    <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeHighlight]}
        components={{
            p: ({ node, ...props }) => <p className="text-gray-800 leading-relaxed" {...props} />,
            li: ({ node, ...props }) => <li className="ml-5 list-disc" {...props} />,
            code: ({ node, inline, ...props }) =>
            inline ? (
                <code className="bg-gray-200 px-1 rounded text-sm" {...props} />
            ) : (
                <code className="block bg-gray-900 text-white p-2 rounded-md text-sm my-2" {...props} />
            ),
        }}
        >
        {text}
    </ReactMarkdown>

  );

  return (
    <section className="flex-1 flex flex-col gap-4 relative min-h-0">
      {/* --------------------------- */}
      {/* 🌟 TOP HEADER (clean, simple) */}
      {/* --------------------------- */}
      <div className=" panel-glass border border-gray-200 rounded-2xl p-3 shadow-sm max-w-3xl mx-auto flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-gray-800">Kasadara AI – Agent KAI</h2>
          <p className="text-sm text-gray-500">
            Ask questions or upload resumes for smart analysis.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={clearChat}
            className="px-4 py-1 bg-white shadow-sm border rounded-full text-sm hover:bg-gray-100"
          >
            Clear
          </button>
        </div>
      </div>

      {/* --------------------------- */}
      {/* 💬 MESSAGES AREA */}
      {/* --------------------------- */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-6 bg-white panel-glass border border-gray-100 shadow rounded-xl"
      >
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-96 text-center animate-fadeIn">
            <h3 className="text-4xl font-semibold text-gray-800 mb-2">
              <i className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
                Agent KAI
              </i>
            </h3>

            <img
              src="//i0.wp.com/kasadara.ai/wp-content/uploads/2025/10/kasadara_logo_black_512x96.png?fit=512%2C96&ssl=1"
              alt="Kasadara Logo"
              className="w-52 h-auto my-3"
            />

            <p className="text-gray-500">Upload resumes or ask questions to get started.</p>
          </div>
        ) : (
          <div className="space-y-5 max-w-3xl mx-auto">
            {messages.map((m) => {
              const isUser = m.sender === "user";

              return (
                <div
                  key={m.id}
                  className={`flex gap-3 items-start animate-fadeIn ${
                    isUser ? "justify-end" : "justify-start"
                  }`}
                >
                  {!isUser && (
                    <div className="w-9 h-9 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 text-white flex items-center justify-center font-medium shadow">
                      K
                    </div>
                  )}

                  <div
                    className={`p-4 rounded-2xl shadow-md max-w-[80%] text-sm leading-relaxed ${
                      isUser
                        ? "bg-gradient-to-r from-[#b6e6ff] to-[#88d4ff] text-gray-900"
                        : "bg-[#f1fbf9] text-gray-800"
                    }`}
                  >
                    <ChatMessage text={m.text} />

                    <div className="flex gap-4 mt-2 text-xs text-gray-500">
                      <button
                        onClick={() => navigator.clipboard.writeText(m.text)}
                        className="hover:underline"
                      >
                        Copy
                      </button>
                      <button
                        onClick={() =>
                          window.dispatchEvent(
                            new CustomEvent("add-to-editor", { detail: m.text })
                          )
                        }
                        className="hover:underline"
                      >
                        Add to Editor
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}

            {loading && (
              <div className="flex items-center gap-2 max-w-3xl mx-auto animate-fadeIn">
                <div className="p-3 rounded-xl bg-[#f7fbff] shadow-sm flex items-center gap-3">
                  <span className="w-3 h-3 rounded-full animate-ping bg-slate-400" />
                  <span className="w-3 h-3 rounded-full animate-ping bg-slate-400 delay-75" />
                  <span className="w-3 h-3 rounded-full animate-ping bg-slate-400 delay-150" />
                  <p className="text-sm text-gray-500">Agent is typing...</p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* --------------------------- */}
      {/* 📊 RESUME DASHBOARD */}
      {/* --------------------------- */}
      {resumeData && (
        <div className="max-w-3xl mx-auto w-full animate-fadeIn">
          <ResumeDashboard resumeData={resumeData} />
        </div>
      )}

      {/* --------------------------- */}
      {/* 📝 INPUT BAR */}
      {/* --------------------------- */}
      <div className="mx-auto w-[95%] max-w-3xl panel-glass border border-gray-200 rounded-3xl p-3 flex items-center gap-3 bg-white shadow-xl">
        <Link
          to="/FileUpload"
          className="p-2 rounded-xl border border-blue-600 bg-white hover:bg-blue-50"
        >
          <Upload className="text-blue-600" size={20} />
        </Link>

        <div className="flex-1 bg-white rounded-xl px-4 py-2 shadow-sm border border-blue-600">
          <input
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            placeholder="Ask or search anything..."
            className="w-full outline-none text-sm bg-transparent"
          />
        </div>

        <button
          onClick={sendMessage}
          className="bg-gradient-to-r from-cyan-400 to-blue-500 text-white rounded-xl px-5 py-2 shadow hover:opacity-90 transition"
        >
          <Send size={18} />
        </button>
      </div>
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
