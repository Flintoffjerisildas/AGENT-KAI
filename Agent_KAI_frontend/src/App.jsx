import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ChatWindow from "./components/ChatWindow";
import FileUpload from "./components/FileUpload";
import SidePannel from "./components/SidePannel";
import LandingPage from "./components/LandingPage";
import SettingsPage from "./components/SettingsPage";
import Pricing from "./components/Pricing";
import Discover from "./components/Discover";

export default function App() {
  return (
    <BrowserRouter>
      <div className="flex h-screen w-full bg-gray-50 dark:bg-gray-900 overflow-hidden">
        <SidePannel />

        <main className="flex-1 flex flex-col relative overflow-hidden">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/chat" element={<ChatWindow />} />
            <Route path="/FileUpload" element={<FileUpload />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/discover" element={<Discover />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}



// text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500
