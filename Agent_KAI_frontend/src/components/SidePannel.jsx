import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Home,
  Compass,
  Boxes,
  Users,
  ChevronDown,
  Crown,
  Settings,
  LogOut,
  MessageSquare,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const history = [
  "Evaluate candidate John Doe",
  "Extract skills from resume (Mohan)",
  "Compare resumes — Data Engineer",
  "Shortlist top 5 front-end devs"
];

export default function SidePannel() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <div className={`${isCollapsed ? 'w-20' : 'w-64'} bg-white border-r border-gray-200 flex flex-col transition-all duration-300 relative z-50`}>

      {/* Toggle Button */}
      <button
        onClick = {() => setIsCollapsed(!isCollapsed)}
      className="absolute -right-3 top-8 bg-white border border-gray-200 rounded-full p-1.5 shadow-sm hover:shadow-md hover:bg-gray-50 z-50 text-gray-500 hover:text-blue-600 transition-all"
      >
      {isCollapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
    </button>

      {/* Logo */ }
  <div className={`flex items-center gap-3 p-6 ${isCollapsed ? 'justify-center' : ''}`}>
    <div className="w-8 h-8 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-lg flex items-center justify-center shadow-sm flex-shrink-0">
      <img src="src/assets/kasadara_logo.png" alt="K" className="w-5 h-5 brightness-0 invert" />
    </div>
    {!isCollapsed && <h1 className="text-lg font-bold tracking-tight text-gray-900">Agent Kai</h1>}
  </div>

  {/* User Section */ }
  <div className={`mx-4 mb-6 p-2 rounded-xl border border-gray-100 bg-gray-50/50 hover:bg-gray-100 transition-colors cursor-pointer group ${isCollapsed ? 'flex justify-center' : 'flex items-center justify-between'}`}>
    <div className="flex items-center gap-3">
      <img
        src="src/assets/user_avatar.jpeg"
        className="w-8 h-8 rounded-full object-cover ring-2 ring-white"
        alt="User"
      />
      {!isCollapsed && (
        <div className="overflow-hidden">
          <h3 className="font-semibold text-sm text-gray-900 truncate">Ken Rock</h3>
          <p className="text-xs text-gray-500 truncate">ken@kasadara.ai</p>
        </div>
      )}
    </div>
    {!isCollapsed && <ChevronDown className="w-4 h-4 text-gray-400 group-hover:text-gray-600" />}
  </div>

  {/* Menu */ }
  <nav className="flex flex-col gap-1 px-3">
    <Link
      to="/"
      className={`flex items-center gap-3 p-3 rounded-xl transition-all ${isActive('/') ? 'bg-blue-50 text-blue-600 font-medium' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'} ${isCollapsed ? 'justify-center' : ''}`}
      title={isCollapsed ? "Home" : ""}
    >
      <Home size={20} />
      {!isCollapsed && "Home"}
    </Link>

    <Link
      to="/chat"
      className={`flex items-center gap-3 p-3 rounded-xl transition-all ${isActive('/chat') ? 'bg-blue-50 text-blue-600 font-medium' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'} ${isCollapsed ? 'justify-center' : ''}`}
      title={isCollapsed ? "Chat" : ""}
    >
      <MessageSquare size={20} />
      {!isCollapsed && "Chat"}
    </Link>

    <button className={`flex items-center gap-3 p-3 rounded-xl text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-all ${isCollapsed ? 'justify-center' : ''}`} title={isCollapsed ? "Discover" : ""}>
      <Compass size={20} />
      {!isCollapsed && "Discover"}
    </button>

    <button className={`flex items-center gap-3 p-3 rounded-xl text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-all ${isCollapsed ? 'justify-center' : ''}`} title={isCollapsed ? "Plugins" : ""}>
      <Boxes size={20} />
      {!isCollapsed && "Plugins"}
    </button>

    <button className={`flex items-center gap-3 p-3 rounded-xl text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-all relative ${isCollapsed ? 'justify-center' : ''}`} title={isCollapsed ? "Community" : ""}>
      <Users size={20} />
      {!isCollapsed && "Community"}
      {!isCollapsed && (
        <span className="absolute right-3 bg-blue-100 text-blue-600 text-[10px] font-bold px-2 py-0.5 rounded-full">
          NEW
        </span>
      )}
      {isCollapsed && (
        <span className="absolute top-2 right-2 w-2 h-2 bg-blue-500 rounded-full border border-white"></span>
      )}
    </button>
  </nav>

  {/* Recents Section */ }
  <div className="mt-8 px-4 flex-1 overflow-y-auto">
    {!isCollapsed && <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3 px-2">Recents</p>}

    <div className={`flex flex-col gap-1 ${isCollapsed ? 'items-center' : ''}`}>
      {!isCollapsed ? (
        <ul className="space-y-1">
          {history.map((h, i) => (
            <li key={i} className="px-3 py-2 rounded-lg text-sm text-gray-600 hover:bg-gray-50 hover:text-gray-900 cursor-pointer truncate transition-colors">
              {h}
            </li>
          ))}
        </ul>
      ) : (
        <div className="flex flex-col gap-3 mt-2">
          {history.map((_, i) => (
            <div key={i} className="w-1.5 h-1.5 bg-gray-300 rounded-full hover:bg-blue-400 transition-colors"></div>
          ))}
        </div>
      )}
    </div>
  </div>

  {/* Bottom */ }
  <div className="mt-auto p-4 border-t border-gray-100 flex flex-col gap-1">
    <button className={`flex items-center gap-3 p-3 rounded-xl text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-all ${isCollapsed ? 'justify-center' : ''}`} title={isCollapsed ? "Plans" : ""}>
      <Crown size={20} />
      {!isCollapsed && "Plans"}
    </button>

    <button className={`flex items-center gap-3 p-3 rounded-xl text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-all ${isCollapsed ? 'justify-center' : ''}`} title={isCollapsed ? "Settings" : ""}>
      <Settings size={20} />
      {!isCollapsed && "Settings"}
    </button>

    <button className={`flex items-center gap-3 p-3 rounded-xl text-red-500 hover:bg-red-50 transition-all ${isCollapsed ? 'justify-center' : ''}`} title={isCollapsed ? "Logout" : ""}>
      <LogOut size={20} />
      {!isCollapsed && "Logout"}
    </button>
  </div>
    </div >
  );
}
