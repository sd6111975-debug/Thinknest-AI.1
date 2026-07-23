function Logo() {
  return (
    <div className="flex items-center gap-3">
      <div className="w-10 h-10 rounded-full bg-gradient-to-r from-cyan-400 to-purple-500 flex items-center justify-center text-black font-bold">
        T
      </div>

      <div>
        <h1 className="text-2xl font-bold text-white">
          ThinkNest AI
        </h1>

        <p className="text-xs text-gray-400">
          by ANMR Labs
        </p>
      </div>
    </div>
  );
}

export default Logo;