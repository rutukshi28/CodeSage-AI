import { useState } from "react";

export default function OutputPanel({output, review }) {
  const [height, setHeight] = useState(150);

  const startDrag = () => {
    const onMouseMove = (e) => {
      setHeight((prev) => {
        const newHeight = prev - e.movementY;
        return Math.max(100, Math.min(newHeight, 400));
      });
    };

    const onMouseUp = () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
  };

  return (
    <div className="w-full bg-[#020617] border-t border-gray-700">
      {/* Drag Handle */}
      <div
        onMouseDown={startDrag}
        className="h-2 cursor-row-resize bg-gray-700 hover:bg-blue-500 transition"
      ></div>

      {/* Panel */}
      <div style={{ height }} className="p-3 overflow-auto">
  {/* Tabs */}
  <div className="flex gap-6 text-sm mb-3">
    <span
      className={`cursor-pointer ${
        output ? "text-blue-400 border-b-2 border-blue-400" : "text-gray-400"
      }`}
    >
      Output
    </span>

    <span
      className={`cursor-pointer ${
        !output && review?.error
          ? "text-red-400 border-b-2 border-red-400"
          : "text-gray-400"
      }`}
    >
      Errors
    </span>
  </div>

  {/* 🟢 Output */}
  {output && (
    <pre className="text-green-400 mb-2 whitespace-pre-wrap">
      {output}
    </pre>
  )}

  {/* 🔴 Error */}
  {!output && review?.error && (
    <pre className="text-red-400 whitespace-pre-wrap">
      {review.error}
    </pre>
  )}

  {/* Score */}
  {review ? (
    <p className="text-green-400 mt-2">Score: {review.score}/100</p>
  ) : (
    <p className="text-gray-500">Review your code to see the score.</p>
  )}
</div>
    </div>
  );
}


