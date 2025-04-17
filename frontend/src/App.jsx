  import React, { useState, useEffect } from "react";
  import UploadForm from "./components/UploadForm";
  import ResultCard from "./components/ResultCard";

  function App() {
    const [result, setResult] = useState(null);
useEffect(() => {
  console.log("RESULT:", result);
}, [result]);

    return (
      <div className="min-h-screen bg-gray-100 p-4">
        <h1 className="text-3xl font-bold text-center text-blue-700 mt-6">ATS Resume Checker</h1>
        <UploadForm setResult={setResult} />
{result ? (
  <ResultCard result={result} />
) : (
  <div className="text-center text-gray-500 mt-6">No result yet. Please submit a resume and job description.</div>
)}
      </div>
    );
  }

  export default App;
