import React from "react";

export default function ScoreBar({ title, score }) {
  return (
    <div className="mb-4">
      <div className="flex justify-between text-sm font-medium text-gray-600 mb-1">
        <span>{title}</span>
        <span>{score}%</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-3">
        <div
          className={`h-3 rounded-full ${
            score >= 75 ? "bg-green-500" : score >= 50 ? "bg-yellow-400" : "bg-red-500"
          }`}
          style={{ width: `${score}%` }}
        ></div>
      </div>
    </div>
  );
}
