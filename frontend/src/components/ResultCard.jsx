import React from "react";

export default function ResultCard({ result }) {
  if (!result) return null;

  return (
    <div className="bg-white shadow-md rounded-xl p-6 max-w-2xl mx-auto mt-8">
      <h2 className="text-xl font-bold mb-4 text-green-600 text-center">✅ Resume Analysis Result</h2>

      <p><strong>Overall Score:</strong> {result.overall_score}%</p>
      <p><strong>Keyword Match Score:</strong> {result.keyword_score}%</p>
      <p><strong>Semantic Match Score:</strong> {result.semantic_score}%</p>
      <p><strong>ATS Score:</strong> {result.ats_score}%</p>

      <div className="mt-4">
        <h4 className="font-semibold">Missing Keywords:</h4>
        <p>{result.missing_keywords.join(", ")}</p>
      </div>

      <div className="mt-4">
        <h4 className="font-semibold">Format Issues:</h4>
        <ul className="list-disc pl-5">
          {result.format_issues?.map((issue, idx) => (
            <li key={idx}>{issue}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
