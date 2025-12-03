import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ChatWindow from "./components/ChatWindow";
import FileUpload from "./components/FileUpload";
import SidePannel from "./components/SidePannel";
import LandingPage from "./components/LandingPage";
import SettingsPage from "./components/SettingsPage";
import Pricing from "./components/Pricing";

export default function App() {
  return (
    <BrowserRouter>
      <div className="flex h-screen w-full bg-gray-50 dark:bg-gray-900 overflow-hidden">
        <SidePannel />

        <main className="flex-1 flex flex-col relative overflow-hidden">
          {/* 🌗 Theme Toggle - positioned top right */}
          {/* <div className="absolute top-4 right-6 z-50">
            <ThemeToggle />
          </div> */}

          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/chat" element={<ChatWindow />} />
            <Route path="/FileUpload" element={<FileUpload />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="/pricing" element={<Pricing />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}



// text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500
