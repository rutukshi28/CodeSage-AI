export default function Navbar() {
  return (
   <div className="flex flex-col md:flex-row md:justify-between md:items-center px-4 py-3 border-b border-gray-700">
  
  <div>
    <h1 className="text-lg md:text-xl font-bold text-blue-400">
      CodeSage AI
    </h1>
    <p className="text-xs text-gray-400">
      Analyze. Improve. Ship Better Code.
    </p>
  </div>

  <div className="flex gap-2 mt-2 md:mt-0">
    <button className="px-3 py-1 border border-gray-600 rounded-md text-sm">
      Login
    </button>
    <button className="bg-blue-500 px-3 py-1 rounded-md text-sm">
      Sign Up
    </button>
  </div>
</div>
  );
}


