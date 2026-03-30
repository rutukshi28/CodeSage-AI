import Editor from "@monaco-editor/react";
import { runCodeAPI } from "../services/api";

export default function EditorPanel({
  code,
  setCode,
  onReview,
  onRun,
  language,
  setLanguage,
  reviewLoading,
  runLoading,
  isError,
}) {
  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-2 bg-gray-800 border-b border-gray-700">
        <div className="flex items-center gap-3">
          <span className="text-sm text-gray-300">EDITOR</span>

          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="bg-gray-700 px-2 py-1 rounded text-sm"
          >
            <option value="javascript">JavaScript</option>
            <option value="python">Python</option>
            <option value="java">Java</option>
          </select>
        </div>

        <div className="flex gap-2">
          <button
            onClick={onReview}
            disabled={reviewLoading}
            className="bg-blue-500 hover:bg-blue-600 px-3 py-1 rounded text-sm disabled:opacity-50 transition cursor-pointer"
          >
            {reviewLoading ? "⏳ Analyzing..." : "🔍 Review Code"}
          </button>
          <button
            onClick={onRun}
            disabled={runLoading}
            className={`px-3 py-1 rounded text-sm transition 
    ${
      runLoading
        ? "bg-gray-500 cursor-not-allowed"
        : isError
          ? "bg-red-500 hover:bg-red-600"
          : "bg-green-500 hover:bg-green-600"
    }`}
          >
            {runLoading ? "Running..." : "▶ Predict Output"}
          </button>
        </div>
      </div>

      {/* Editor */}
      <Editor
        height="100%"
        theme="vs-dark"
        language={language}
        value={code}
        onChange={(value) => setCode(value)}
      />
    </div>
  );
}
