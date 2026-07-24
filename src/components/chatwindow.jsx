import { useEffect, useRef, useState } from "react";
import GalaxyBackground from "./GalaxyBackground";

const MODES = [
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

function ChatWindow() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [selectedMode, setSelectedMode] =
    useState("Brainstorm");
  const [loading, setLoading] = useState(false);
  const [recentChats, setRecentChats] = useState([]);

  const messagesEndRef = useRef(null);
  const textareaRef = useRef(null);

  const currentMode =
    MODES.find(
      (mode) => mode.name === selectedMode
    ) || MODES[0];

  // =========================================
  // AUTO SCROLL
  // =========================================

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, loading]);

  // =========================================
  // SEND MESSAGE
  // =========================================

  const sendMessage = async () => {
    const trimmedMessage = message.trim();

    if (!trimmedMessage || loading) {
      return;
    }

    const userMessage = {
      role: "user",
      text: trimmedMessage,
    };

    // Save old history before adding new message
    const previousHistory = messages;

    // Add user message immediately
    setMessages((previousMessages) => [
      ...previousMessages,
      userMessage,
    ]);

    // Add to recent chats
    setRecentChats((previousChats) => {
      const newChat = {
        id: Date.now(),
        title:
          trimmedMessage.length > 32
            ? trimmedMessage.substring(0, 32) + "..."
            : trimmedMessage,
        mode: selectedMode,
      };

      return [
        newChat,
        ...previousChats,
      ].slice(0, 8);
    });

    setMessage("");
    setLoading(true);

    try {
      const response = await fetch(
        "http://localhost:3001/api/chat",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            message: trimmedMessage,
            mode: selectedMode,
            history: previousHistory,
          }),
        }
      );

      let data;

      try {
        data = await response.json();
      } catch {
        throw new Error(
          "The ThinkNest AI server returned an invalid response."
        );
      }

      if (!response.ok) {
        throw new Error(
          data?.error ||
            `Server error (${response.status})`
        );
      }

      setMessages((previousMessages) => [
        ...previousMessages,
        {
          role: "ai",
          text:
            data?.reply ||
            "I couldn't generate a response.",
        },
      ]);
    } catch (error) {
      console.error(
        "ThinkNest AI Error:",
        error
      );

      setMessages((previousMessages) => [
        ...previousMessages,
        {
          role: "ai",
          text:
            "⚠️ ThinkNest AI Error\n\n" +
            error.message +
            "\n\nPlease check that the ThinkNest AI backend is running.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  // =========================================
  // KEYBOARD HANDLING
  // =========================================

  const handleKeyDown = (event) => {
    if (
      event.key === "Enter" &&
      !event.shiftKey
    ) {
      event.preventDefault();
      sendMessage();
    }
  };

  // =========================================
  // NEW CHAT
  // =========================================

  const clearChat = () => {
    setMessages([]);
    setMessage("");
    textareaRef.current?.focus();
  };

  // =========================================
  // MODE SELECTION
  // =========================================

  const selectMode = (modeName) => {
    setSelectedMode(modeName);
  };

  // =========================================
  // SUGGESTIONS
  // =========================================

  const useSuggestion = (text) => {
    setMessage(text);

    setTimeout(() => {
      textareaRef.current?.focus();
    }, 50);
  };

  // =========================================
  // RENDER
  // =========================================

  return (
    <div className="relative h-screen w-full overflow-hidden bg-[#050816] text-white">

      {/* ===================================== */}
      {/* GALAXY BACKGROUND                      */}
      {/* ===================================== */}

      <div className="fixed inset-0 z-0 pointer-events-none">
        <GalaxyBackground />
      </div>

      {/* DARK OVERLAY */}

      <div className="fixed inset-0 z-[1] bg-[#050816]/55 pointer-events-none" />


      {/* ===================================== */}
      {/* MAIN APPLICATION                       */}
      {/* ===================================== */}

      <div className="relative z-10 flex h-screen w-full">


        {/* ===================================== */}
        {/* SIDEBAR                               */}
        {/* ===================================== */}

        <aside className="hidden md:flex w-[285px] flex-shrink-0 flex-col border-r border-white/10 bg-[#050816]/75 backdrop-blur-xl">


          {/* SIDEBAR HEADER */}

          <div className="p-5 border-b border-white/10">

            <div className="flex items-center gap-3">

              <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-cyan-400 to-purple-500 flex items-center justify-center text-xl shadow-lg shadow-cyan-500/20">
                🧠
              </div>

              <div>

                <h1 className="font-bold text-lg">
                  ThinkNest AI
                </h1>

                <p className="text-xs text-gray-400">
                  Think. Create. Build.
                </p>

              </div>

            </div>

          </div>


          {/* NEW CHAT BUTTON */}

          <div className="p-5">

            <button
              onClick={clearChat}
              className="group relative w-full overflow-hidden rounded-xl px-5 py-3.5 font-semibold bg-gradient-to-r from-cyan-500 to-blue-600 transition-all duration-300 hover:scale-[1.03] hover:shadow-xl hover:shadow-cyan-500/30 active:scale-95"
            >

              <span className="relative z-10 flex items-center justify-center gap-2">
                <span className="text-lg">
                  +
                </span>

                New Chat
              </span>

              <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" />

            </button>

          </div>


          {/* AI MODES */}

          <div className="px-5">

            <p className="mb-4 text-xs font-medium uppercase tracking-wider text-gray-500">
              ✨ AI Modes
            </p>


            <div className="space-y-2">

              {MODES.map((mode) => (

                <button
                  key={mode.name}
                  onClick={() =>
                    selectMode(mode.name)
                  }
                  className={`group relative w-full flex items-center gap-3 rounded-xl px-3 py-3 text-left transition-all duration-300 ${
                    selectedMode === mode.name
                      ? "bg-cyan-400/10 border border-cyan-400/30 shadow-lg shadow-cyan-500/5"
                      : "border border-transparent hover:bg-white/5 hover:border-white/10"
                  }`}
                >

                  {/* ACTIVE LINE */}

                  {selectedMode === mode.name && (

                    <span className="absolute left-0 top-2 bottom-2 w-1 rounded-r-full bg-gradient-to-b from-cyan-400 to-purple-500" />

                  )}


                  {/* ICON */}

                  <span
                    className={`w-10 h-10 flex items-center justify-center rounded-xl text-lg transition-all duration-300 ${
                      selectedMode === mode.name
                        ? "bg-gradient-to-br from-cyan-400/20 to-purple-500/20 scale-110"
                        : "bg-white/5 group-hover:scale-110"
                    }`}
                  >
                    {mode.icon}
                  </span>


                  {/* TEXT */}

                  <span className="min-w-0">

                    <span
                      className={`block font-semibold text-sm ${
                        selectedMode === mode.name
                          ? "text-cyan-300"
                          : "text-gray-200"
                      }`}
                    >
                      {mode.name}
                    </span>

                    <span className="block text-xs text-gray-500 mt-0.5 truncate">
                      {mode.description}
                    </span>

                  </span>

                </button>

              ))}

            </div>

          </div>


          {/* RECENT CHATS */}

          <div className="flex-1 min-h-0 px-5 mt-7 overflow-hidden">

            <div className="flex items-center justify-between mb-4">

              <p className="text-xs font-medium uppercase tracking-wider text-gray-500">
                🕘 Recent Chats
              </p>

              {recentChats.length > 0 && (

                <button
                  onClick={() =>
                    setRecentChats([])
                  }
                  className="text-[10px] text-gray-600 hover:text-red-400 transition"
                >
                  Clear
                </button>

              )}

            </div>


            <div className="space-y-2 overflow-y-auto max-h-full pr-1">

              {recentChats.length === 0 ? (

                <div className="py-6 text-center">

                  <div className="text-2xl mb-2 opacity-50">
                    💬
                  </div>

                  <p className="text-xs text-gray-600">
                    No recent chats yet
                  </p>

                  <p className="text-[10px] text-gray-700 mt-1">
                    Start a conversation
                  </p>

                </div>

              ) : (

                recentChats.map((chat) => (

                  <div
                    key={chat.id}
                    className="group flex items-center gap-3 p-3 rounded-lg bg-white/[0.02] border border-transparent hover:border-white/10 hover:bg-white/5 transition-all duration-300"
                  >

                    <span className="text-sm">
                      {MODES.find(
                        (mode) =>
                          mode.name === chat.mode
                      )?.icon || "💬"}
                    </span>

                    <div className="min-w-0">

                      <p className="text-xs text-gray-300 truncate">
                        {chat.title}
                      </p>

                      <p className="text-[10px] text-gray-600 mt-1">
                        {chat.mode}
                      </p>

                    </div>

                  </div>

                ))

              )}

            </div>

          </div>


          {/* SIDEBAR FOOTER */}

          <div className="p-5 border-t border-white/10">

            <div className="flex items-center gap-3">

              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-purple-500/30 to-cyan-500/30 flex items-center justify-center">
                ✨
              </div>

              <div>

                <p className="text-xs font-medium text-gray-300">
                  ThinkNest AI
                </p>

                <p className="text-[10px] text-gray-600">
                  Creative intelligence
                </p>

              </div>

            </div>

          </div>

        </aside>


        {/* ===================================== */}
        {/* CHAT SECTION                           */}
        {/* ===================================== */}

        <div className="flex-1 min-w-0 flex flex-col">


          {/* ===================================== */}
          {/* HEADER                                */}
          {/* ===================================== */}

          <header className="h-16 flex-shrink-0 border-b border-white/10 bg-[#050816]/60 backdrop-blur-xl flex items-center justify-between px-5">

            <div className="flex items-center gap-3">

              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-400 to-purple-500 flex items-center justify-center shadow-lg shadow-cyan-500/20">
                🧠
              </div>

              <div>

                <h2 className="font-bold">
                  ThinkNest AI
                </h2>

                <p className="text-xs text-gray-500">
                  Your intelligent creative assistant
                </p>

              </div>

            </div>


            <div className="flex items-center gap-5">

              <div className="hidden sm:flex items-center gap-2 text-xs text-gray-400">

                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse shadow-lg shadow-green-400/50" />

                AI Online

              </div>


              <button
                onClick={clearChat}
                className="text-sm text-gray-400 hover:text-white transition-all duration-300 hover:scale-105"
              >
                New Chat
              </button>

            </div>

          </header>


          {/* ===================================== */}
          {/* MODE BUTTONS                          */}
          {/* ===================================== */}

          <div className="flex-shrink-0 border-b border-white/10 bg-[#050816]/40 backdrop-blur-xl px-5 py-3">

            <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-thin">

              {MODES.map((mode) => (

                <button
                  key={mode.name}
                  onClick={() =>
                    selectMode(mode.name)
                  }
                  className={`group relative flex items-center gap-2 px-4 py-2 rounded-full whitespace-nowrap text-sm font-medium transition-all duration-300 ${
                    selectedMode === mode.name
                      ? "bg-gradient-to-r from-cyan-400 to-purple-500 text-white shadow-lg shadow-purple-500/20 scale-105"
                      : "bg-white/5 border border-white/10 text-gray-300 hover:bg-white/10 hover:border-cyan-400/30 hover:scale-105"
                  }`}
                >

                  <span className="transition-transform duration-300 group-hover:rotate-12 group-hover:scale-125">
                    {mode.icon}
                  </span>

                  {mode.name}

                </button>

              ))}

            </div>

          </div>


          {/* ===================================== */}
          {/* CHAT CONTENT                          */}
          {/* ===================================== */}

          <main className="flex-1 overflow-y-auto px-4 py-8">


            {messages.length === 0 ? (

              /* EMPTY STATE */

              <div className="h-full flex flex-col items-center justify-center text-center">

                <div className="relative mb-6">

                  <div className="absolute inset-0 rounded-3xl bg-cyan-400/20 blur-2xl animate-pulse" />

                  <div className="relative w-20 h-20 rounded-3xl bg-gradient-to-br from-cyan-400/20 to-purple-500/20 border border-white/10 backdrop-blur-md flex items-center justify-center text-4xl shadow-2xl">
                    {currentMode.icon}
                  </div>

                </div>


                <h2 className="text-3xl font-bold">
                  How can I help you?
                </h2>


                <p className="text-gray-400 mt-3 max-w-xl">

                  You are using{" "}

                  <span className="text-cyan-400 font-semibold">
                    {selectedMode}
                  </span>

                  {" "}mode. Ask me anything related to your task.

                </p>


                {/* SUGGESTIONS */}

                <div className="mt-8 flex flex-wrap justify-center gap-3 max-w-2xl">

                  {[
                    "Help me solve a real-world problem",
                    "Explain this topic simply",
                    "Help me build a project",
                  ].map((suggestion) => (

                    <button
                      key={suggestion}
                      onClick={() =>
                        useSuggestion(suggestion)
                      }
                      className="group px-4 py-2.5 rounded-full bg-white/5 backdrop-blur-md border border-white/10 text-sm text-gray-300 transition-all duration-300 hover:bg-white/10 hover:border-cyan-400/40 hover:text-white hover:scale-105 hover:-translate-y-1 hover:shadow-lg hover:shadow-cyan-500/10 active:scale-95"
                    >
                      {suggestion}
                    </button>

                  ))}

                </div>

              </div>

            ) : (

              /* MESSAGES */

              <div className="max-w-4xl mx-auto space-y-7">

                {messages.map(
                  (msg, index) => (

                    <div
                      key={index}
                      className={`flex gap-4 ${
                        msg.role === "user"
                          ? "justify-end"
                          : "justify-start"
                      }`}
                    >

                      {msg.role === "ai" && (

                        <div className="w-9 h-9 flex-shrink-0 rounded-xl bg-gradient-to-br from-cyan-400 to-purple-500 flex items-center justify-center shadow-lg shadow-cyan-500/20">
                          🧠
                        </div>

                      )}


                      <div
                        className={`max-w-[80%] px-5 py-4 rounded-2xl whitespace-pre-wrap leading-relaxed backdrop-blur-md transition-all duration-300 ${
                          msg.role === "user"
                            ? "bg-gradient-to-r from-cyan-500/90 to-blue-600/90 rounded-br-md shadow-lg shadow-cyan-500/10"
                            : "bg-white/5 border border-white/10 rounded-bl-md"
                        }`}
                      >

                        {msg.text}

                      </div>

                    </div>

                  )
                )}


                {/* THINKING */}

                {loading && (

                  <div className="flex gap-4">

                    <div className="w-9 h-9 flex-shrink-0 rounded-xl bg-gradient-to-br from-cyan-400 to-purple-500 flex items-center justify-center">
                      🧠
                    </div>

                    <div className="bg-white/5 border border-white/10 backdrop-blur-md px-5 py-4 rounded-2xl rounded-bl-md">

                      <div className="flex gap-1">

                        <span className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" />

                        <span
                          className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"
                          style={{
                            animationDelay:
                              "150ms",
                          }}
                        />

                        <span
                          className="w-2 h-2 bg-pink-400 rounded-full animate-bounce"
                          style={{
                            animationDelay:
                              "300ms",
                          }}
                        />

                      </div>

                    </div>

                  </div>

                )}

                <div ref={messagesEndRef} />

              </div>

            )}

          </main>


          {/* ===================================== */}
          {/* INPUT                                 */}
          {/* ===================================== */}

          <footer className="flex-shrink-0 p-5 border-t border-white/10 bg-[#050816]/60 backdrop-blur-xl">

            <div className="max-w-4xl mx-auto">

              <div className="flex gap-3">

                <textarea
                  ref={textareaRef}
                  value={message}
                  onChange={(event) =>
                    setMessage(event.target.value)
                  }
                  onKeyDown={handleKeyDown}
                  disabled={loading}
                  rows={1}
                  placeholder={`Ask ThinkNest AI in ${selectedMode} mode...`}
                  className="flex-1 resize-none bg-[#111827]/80 backdrop-blur-md border border-white/10 rounded-xl px-5 py-4 outline-none transition-all duration-300 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/10 disabled:opacity-50"
                />


                <button
                  onClick={sendMessage}
                  disabled={
                    loading ||
                    !message.trim()
                  }
                  className="group relative overflow-hidden px-6 py-4 rounded-xl bg-gradient-to-r from-cyan-400 to-purple-500 font-semibold transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-purple-500/20 active:scale-95 disabled:opacity-40 disabled:hover:scale-100"
                >

                  <span className="relative z-10">
                    {loading
                      ? "..."
                      : "Send 🚀"}
                  </span>

                  {!loading && (

                    <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 group-hover:translate-x-full" />

                  )}

                </button>

              </div>


              <p className="text-xs text-gray-600 text-center mt-2">
                ThinkNest AI can make mistakes. Check important information.
              </p>

            </div>

          </footer>

        </div>

      </div>

    </div>
  );
}

export default ChatWindow;