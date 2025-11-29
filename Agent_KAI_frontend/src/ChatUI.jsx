import React, { useState } from "react";
import { Upload, Send } from "lucide-react";

const ChatUI = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;
    setMessages((prev) => [...prev, { sender: "user", text: input }]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("http://localhost:8000/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input }),
      });
      const data = await res.json();
      setMessages((prev) => [...prev, { sender: "agent", text: data.reply }]);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-[#0d1117] to-[#161b22] text-white">
      {/* Header */}
      <header className="flex justify-between items-center px-8 py-4 border-b border-gray-800">
        <div className="flex items-center gap-2">
          <div className="bg-blue-600 p-2 rounded-lg">
            <Upload size={18} />
          </div>
          <h1 className="text-lg font-semibold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Agent KAI</h1>
        </div>
        <span className="text-gray-400 text-sm">
          Kasadara - AI Assistant
        </span>
      </header>

      {/* Chat Area */}
      <main className="flex-1 flex flex-col justify-center items-center text-center px-4">
        {messages.length === 0 ? (
          <>
            <h2 className="text-2xl font-semibold mb-2">
              Welcome to Agent Kai 👋
            </h2>
            <p className="text-gray-400">
              Upload resumes or ask questions to start evaluating candidates.
            </p>
          </>
        ) : (
          <div className="w-full max-w-2xl h-[60vh] overflow-y-auto bg-[#1b1f24] rounded-2xl p-4 shadow-inner border border-gray-800">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`my-2 text-left ${
                  msg.sender === "user"
                    ? "text-blue-400 text-right"
                    : "text-gray-200 text-left"
                }`}
              >
                <div
                  className={`inline-block px-4 py-2 rounded-xl ${
                    msg.sender === "user"
                      ? "bg-blue-700"
                      : "bg-gray-800 border border-gray-700"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            {loading && (
              <p className="text-gray-500 text-sm italic mt-2">Agent is typing...</p>
            )}
          </div>
        )}
      </main>

      {/* Footer Input */}
      <footer className="flex justify-center items-center p-4 border-t border-gray-800">
        <div className="flex items-center bg-[#1f242b] rounded-2xl w-full max-w-2xl p-2">
          <button className="flex items-center bg-blue-700 hover:bg-blue-800 px-3 py-2 rounded-xl text-sm mr-2">
            <Upload size={16} className="mr-1" /> Upload Resumes
          </button>
          <input
            type="text"
            className="flex-grow bg-transparent focus:outline-none text-white placeholder-gray-500 px-2"
            placeholder="Ask something about the candidate..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          />
          <button
            onClick={sendMessage}
            className="p-2 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 transition shadow-md"
          >
            <Send size={18} />
          </button>
        </div>
      </footer>
    </div>
  );
};

export default ChatUI;
