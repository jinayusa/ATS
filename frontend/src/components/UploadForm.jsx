import React, { useState } from "react";
import { analyzeResume } from "../api";

export default function UploadForm({ setResult }) {
  const [resume, setResume] = useState(null);
  const [jdText, setJdText] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!resume || !jdText.trim()) return alert("Please upload resume and enter job description");

    setLoading(true);

    const jdBlob = new Blob([jdText], { type: "text/plain" });
    const jdFile = new File([jdBlob], "jd.txt", { type: "text/plain" });

    const result = await analyzeResume(resume, jdFile);
    setLoading(false);
    setResult(result);
  };

  return (
    <div className="bg-white shadow-md rounded-2xl p-8 max-w-2xl mx-auto mt-10 border border-gray-200">
      <h2 className="text-2xl font-bold mb-6 text-center text-blue-700">
        ATS Resume Checker
      </h2>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Resume Upload */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            Upload Resume (.pdf or .docx)
          </label>
          <input
            type="file"
            accept=".pdf,.docx"
            onChange={(e) => setResume(e.target.files[0])}
            className="block w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer focus:outline-none"
          />
        </div>

        {/* JD Text Area */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            Paste Job Description
          </label>
          <textarea
            rows="6"
            placeholder="Paste the job description here..."
            value={jdText}
            onChange={(e) => setJdText(e.target.value)}
            className="w-full p-3 text-sm text-gray-800 bg-gray-50 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          ></textarea>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className={`w-full py-3 rounded-lg text-white font-bold transition ${
            loading ? "bg-blue-300 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {loading ? "Analyzing..." : "Analyze Resume"}
        </button>
      </form>
    </div>
  );
}
