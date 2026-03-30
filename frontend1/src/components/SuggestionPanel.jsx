export default function SuggestionPanel({ loading, review }) {
  return (
    <div className="h-full p-4 overflow-y-auto">
      <h2 className="text-lg font-semibold mb-3">AI Review</h2>

      {loading ? (
        <p className="text-blue-400 animate-pulse">
          Analyzing code...
        </p>
      ) : review ? (
        <div className="space-y-4">
          {/* Issues */}
          <div className="bg-gray-800 p-3 rounded-lg">
            <h3 className="text-red-400 font-semibold mb-2">🐞 Issues</h3>
            {review.issues.map((item, i) => (
              <p key={i} className="text-sm text-gray-300">
                • {item}
              </p>
            ))}
          </div>

          {/* Suggestions */}
          <div className="bg-gray-800 p-3 rounded-lg">
            <h3 className="text-yellow-400 font-semibold mb-2">
              💡 Suggestions
            </h3>
            {review.suggestions.map((item, i) => (
              <p key={i} className="text-sm text-gray-300">
                • {item}
              </p>
            ))}
          </div>

          {/* Improvements */}
          <div className="bg-gray-800 p-3 rounded-lg">
            <h3 className="text-green-400 font-semibold mb-2">
              ⚡ Improvements
            </h3>
            {review.improvements.map((item, i) => (
              <p key={i} className="text-sm text-gray-300">
                • {item}
              </p>
            ))}
          </div>

          {/* Score */}
          <div className="bg-gray-900 p-3 rounded-lg border border-gray-700">
            <h3 className="text-blue-400 font-semibold">
              Score: {review.score}/100
            </h3>
          </div>
        </div>
      ) : (
        <div className="bg-gray-800 p-4 rounded-lg text-center text-gray-400">
          Click "Review Code" to get AI suggestions
        </div>
      )}
    </div>
  );
}