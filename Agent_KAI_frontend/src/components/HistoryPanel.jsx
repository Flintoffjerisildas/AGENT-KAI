import React from "react";
import { Clock } from "lucide-react";

export default function HistoryPanel() {
  const history = [
    "Evaluate candidate John Doe",
    "Extract skills from resume (Mohan)",
    "Compare resumes — Data Engineer",
    "Shortlist top 5 front-end devs"
  ];

  return (
    <aside className="w-80 bottom-10">
      <div className="panel-glass border border-gray-200 rounded-2xl p-4 shadow-sm h-full flex flex-col justify-between">
        <div className="flex items-center justify-between">
          <h4 className="font-semibold">History</h4>
          <Clock size={16} className="text-gray-500" />
        </div>

        <ul className="mt-4 space-y-3 text-sm">
          {history.map((h, i) => (
            <li key={i} className="p-3 rounded-xl bg-white hover:bg-gray-50 cursor-pointer shadow-sm">
              {h}
            </li>
          ))}
        </ul>

        <div className="mt-6 p-4 rounded-xl bg-gradient-to-br from-[#fdfdf0] to-[#8ee1f2] text-gray-800">
          <div className="font-semibold">Pro Plan</div>
          <div className="text-2xl font-bold mt-1">Rs.###<span className="text-sm font-normal">/month</span></div>
          <button className="mt-4 bg-gradient-to-r from-orange-400 to-blue-500 text-white px-4 py-2 rounded-lg">Get Pro Plan Now</button>
        </div>
      </div>
    </aside>
  );
}
