import React from "react";
import { Plus, Trash2 } from "lucide-react";

export default function Sidebar() {
  return (
    <aside className="w-14 flex flex-col items-center gap-4">
      {/* floating left circular area */}
      <div className="panel-glass rounded-2xl p-2 shadow-sm w-full flex flex-col items-center">
        <button className="w-10 h-10 flex items-center justify-center rounded-lg bg-white shadow-sm">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="text-indigo-600">
            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            {/* <path d="M12 2L12 22" stroke="#0f172a" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M2 12L22 12" stroke="#0f172a" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/> */}
          </svg>
        </button>

        <div className="mt-3 flex flex-col gap-3">
          <button className="w-10 h-10 flex items-center justify-center rounded-lg bg-white shadow hover:bg-gray-50">
            <Plus />
          </button>
          <button className="w-10 h-10 flex items-center justify-center rounded-lg bg-white shadow hover:bg-gray-50">
            <Trash2 />
          </button>
        </div>
      </div>

      {/* bottom small label */}
      <div className="text-xs text-gray-400 mt-auto">v1.0</div>
    </aside>
  );
}
