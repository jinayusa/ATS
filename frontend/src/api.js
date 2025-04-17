export async function analyzeResume(resumeFile, jdFile) {
  const formData = new FormData();
  formData.append("resume", resumeFile);
  formData.append("jd", jdFile);

  try {
    const response = await fetch("http://localhost:8000/analyze/", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`❌ Server responded with ${response.status}:`, errorText);
      return null;
    }

    const json = await response.json();
    return json;
  } catch (error) {
    console.error("❌ API call failed:", error);
    return null;
  }
}
