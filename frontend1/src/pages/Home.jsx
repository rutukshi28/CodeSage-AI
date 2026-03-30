import { useState } from "react";
import Navbar from "../components/Navbar";
import EditorPanel from "../components/EditorPanel";
import SuggestionPanel from "../components/SuggestionPanel";
import OutputPanel from "../components/OutputPanel";
import { reviewCodeAPI, runCodeAPI } from "../services/api";

export default function Home() {
  const [code, setCode] = useState("// Write your code here...");
  
  const [reviewLoading, setReviewLoading] = useState(false);
const [runLoading, setRunLoading] = useState(false);

  const [review, setReview] = useState(null);
  const [language, setLanguage] = useState("javascript");
  const [output, setOutput] = useState("");
  const [isError, setIsError] = useState(false);
  

  const handleReview = async () => {

    setReviewLoading(true);

    try {
      const result = await reviewCodeAPI(code, language);

      setReview(result);

    } catch (error) {
      console.log("Frontend Error:", error);
    }

    setReviewLoading(false);
  };

  const handleRun = async () => {

    setRunLoading(true);
  setIsError(false);
  setOutput("");

  try {
    const result = await runCodeAPI(code, language);

    if (result.error) {
      setOutput(result.error);
      setIsError(true);
    } else {
      setOutput(result.output);
      setIsError(false);
    }
  } catch (err) {
    setIsError(true);
  }

  setRunLoading(false);
};


  return (
    <div className="h-screen flex flex-col bg-[#0f172a] text-white overflow-hidden">
      {/* ✅ Navbar */}
      <Navbar />

      {/* Main Content */}
      <div className="flex flex-col md:flex-row flex-1 overflow-hidden">
        {/* Editor */}
        <div className="w-full md:w-1/2 border-r border-gray-700 h-[50%] md:h-auto">
          <EditorPanel
            code={code}
            setCode={setCode}
            onReview={handleReview}
            language={language}
            setLanguage={setLanguage}
            reviewLoading={reviewLoading}
            runLoading={runLoading}
            onRun={handleRun}
            isError={isError}
          />
        </div>

        {/* AI Panel */}
        <div className="w-full md:w-1/2 h-[50%] md:h-auto">
          <SuggestionPanel loading={reviewLoading} review={review}
          />
        </div>
      </div>

      {/* Bottom Panel (optional) */}
      <div className="">
        <OutputPanel
        output={output}
        review={review}
         />
      </div>
    </div>
  );
}


