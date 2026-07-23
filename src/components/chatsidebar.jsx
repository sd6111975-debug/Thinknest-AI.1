import { useState } from "react";

const modes = [
  {
    name: "Brainstorm",
    icon: "🧠",
    description: "Ideas & creative thinking",
  },
  {
    name: "Study",
    icon: "📚",
    description: "Learn & solve doubts",
  },
  {
    name: "Coding",
    icon: "💻",
    description: "Code & debugging",
  },
  {
    name: "Writing",
    icon: "✍️",
    description: "Essays & content",
  },
  {
    name: "Project Planner",
    icon: "🚀",
    description: "Plan & organize projects",
  },
  {
    name: "Creative",
    icon: "🎨",
    description: "Stories & design ideas",
  },
];

function ChatSidebar({ selectedMode, setSelectedMode }) {
  const [chats, setChats] = useState([]);

  function handleNewChat() {
    setChats([]);
  }

  return (
    <aside className="w-72 min-h-screen bg-[#0b1220] border-r border-white/10 p-5 flex flex-col">

      {/* Logo */}
      <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent mb-6">
        ThinkNest AI
      </h1>

      {/* New Chat */}
      <button
        onClick={handleNewChat}
        className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-500 hover:scale-[1.02] transition font-semibold mb-7"
      >
        + New Chat
      </button>

      {/* Modes */}
      <div>
        <h2 className="text-sm text-gray-400 uppercase tracking-wider mb-3">
          🌟 AI Modes
        </h2>

        <div className="space-y-2">
          {modes.map((mode) => (
            <button
              key={mode.name}
              onClick={() => setSelectedMode(mode.name)}
              className={`w-full text-left p-3 rounded-xl transition ${
                selectedMode === mode.name
                  ? "bg-cyan-500/20 border border-cyan-400/40"
                  : "hover:bg-white/5 border border-transparent"
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="text-xl">{mode.icon}</span>

                <div>
                  <p className="font-semibold text-white">
                    {mode.name}
                  </p>

                  <p className="text-xs text-gray-400">
                    {mode.description}
                  </p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Recent Chats */}
      <div className="mt-8">
        <h2 className="text-sm text-gray-400 uppercase tracking-wider mb-3">
          Recent Chats
        </h2>

        {chats.length === 0 ? (
          <p className="text-sm text-gray-500">
            No recent chats
          </p>
        ) : (
          chats.map((chat, index) => (
            <div
              key={index}
              className="p-2 rounded-lg hover:bg-white/5 text-sm text-gray-300"
            >
              {chat}
            </div>
          ))
        )}
      </div>

    </aside>
  );
}

export default ChatSidebar;