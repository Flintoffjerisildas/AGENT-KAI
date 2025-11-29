import React from "react";

export default function InfoCard({ title, data, className = "" }) {
  return (
    <div
      className={`bg-white/70 backdrop-blur-md rounded-2xl shadow-md border border-gray-200 p-6 hover:shadow-lg transition-all duration-300 ${className}`}
    >
      <h3 className="text-lg font-semibold text-gray-800 mb-4 border-b pb-2 border-gray-100">
        {title}
      </h3>
      <div className="space-y-2">
        {Object.entries(data || {}).map(([key, value], i) => (
          <div key={i} className="flex justify-between text-sm">
            <span className="font-medium text-gray-600">{key}</span>
            <span className="text-gray-800 text-right">{value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
