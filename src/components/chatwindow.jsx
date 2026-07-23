import { useEffect, useRef, useState } from "react";

const MODES = [
  {
    name: "Brainstorm",
    icon: "🧠",
    description: "Ideas and problem solving",
  },
  {
    name: "Study",
    icon: "📚",
    description: "Learn and understand",
  },
  {
    name: "Coding",
    icon: "💻",
    description: "Code and debugging",
  },
  {
    name: "Writing",
    icon: "✍️",
    description: "Create and improve writing",
  },
  {
    name: "Project Planner",
    icon: "🚀",
    description: "Plan and build projects",
  },
  {
    name: "Creative",
    icon: "🎨",
    description: "Creative ideas and design",
  },
];

function ChatWindow() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [selectedMode, setSelectedMode] =
    useState("Brainstorm");
  const [loading, setLoading] = useState(false);
  const [backendOnline, setBackendOnline] =
    useState(true);

  const messagesEndRef = useRef(null);
  const textareaRef = useRef(null);

  const currentMode =
    MODES.find(
      (mode) => mode.name === selectedMode
    ) || MODES[0];

  // ============================================
  // AUTO SCROLL
  // ============================================

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, loading]);

  // ============================================
  // CHECK BACKEND
  // ============================================

  useEffect(() => {
    checkBackend();
  }, []);

  const checkBackend = async () => {
    try {
      const response = await fetch(
        "http://localhost:3001/api/health"
      );

      if (!response.ok) {
        throw new Error();
      }

      setBackendOnline(true);
    } catch {
      setBackendOnline(false);
    }
  };

  // ============================================
  // SEND MESSAGE
  // ============================================

  const sendMessage = async () => {
    const trimmedMessage = message.trim();

    if (!trimmedMessage || loading) {
      return;
    }

    // Save current conversation before adding new message
    const previousHistory = messages;

    // Add user message
    const userMessage = {
      role: "user",
      text: trimmedMessage,
    };

    setMessages((previousMessages) => [
      ...previousMessages,
      userMessage,
    ]);

    // Clear input
    setMessage("");

    // Start loading
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
          "ThinkNest AI server returned an invalid response."
        );
      }

      if (!response.ok) {
        throw new Error(
          data?.error ||
            `Server error: ${response.status}`
        );
      }

      // Backend is working
      setBackendOnline(true);

      // Add AI response
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

      // If backend cannot be reached
      if (
        error.message.includes(
          "Failed to fetch"
        )
      ) {
        setBackendOnline(false);
      }

      setMessages((previousMessages) => [
        ...previousMessages,
        {
          role: "ai",
          text:
            "⚠️ **ThinkNest AI is temporarily unavailable.**\n\n" +
            "Please make sure the ThinkNest AI server is running.\n\n" +
            "Run this command in your terminal:\n\n" +
            "node src/components/server/server.js",
        },
      ]);
    } finally {
      setLoading(false);

      // Return focus to input
      setTimeout(() => {
        textareaRef.current?.focus();
      }, 100);
    }
  };

  // ============================================
  // ENTER KEY
  // ============================================

  const handleKeyDown = (event) => {
    if (
      event.key === "Enter" &&
      !event.shiftKey
    ) {
      event.preventDefault();

      sendMessage();
    }
  };

  // ============================================
  // NEW CHAT
  // ============================================

  const clearChat = () => {
    setMessages([]);
    setMessage("");

    setTimeout(() => {
      textareaRef.current?.focus();
    }, 100);
  };

  // ============================================
  // MODE SELECTION
  // ============================================

  const selectMode = (modeName) => {
    setSelectedMode(modeName);
  };

  // ============================================
  // SUGGESTION
  // ============================================

  const useSuggestion = (text) => {
    setMessage(text);

    setTimeout(() => {
      textareaRef.current?.focus();
    }, 100);
  };

  // ============================================
  // RENDER
  // ============================================

  return (
    <div className="h-screen flex flex-col bg-[#050816] text-white">

      {/* ======================================
          HEADER
      ======================================= */}

      <header className="h-16 flex-shrink-0 border-b border-white/10 flex items-center justify-between px-6">

        <div className="flex items-center gap-3">

          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-400 to-purple-500 flex items-center justify-center text-xl shadow-lg shadow-cyan-500/20">
            🧠
          </div>

          <div>
            <h1 className="text-lg font-semibold">
              ThinkNest AI
            </h1>

            <p className="text-xs text-gray-400">
              Your intelligent creative assistant
            </p>
          </div>

        </div>

        <div className="flex items-center gap-4">

          {/* Backend Status */}

          <div className="hidden sm:flex items-center gap-2 text-sm">

            <span
              className={`w-2 h-2 rounded-full ${
                backendOnline
                  ? "bg-green-400 animate-pulse"
                  : "bg-red-400"
              }`}
            />

            <span className="text-gray-400">
              {backendOnline
                ? "AI Online"
                : "AI Offline"}
            </span>

          </div>

          {/* New Chat */}

          <button
            onClick={clearChat}
            className="text-sm text-gray-400 hover:text-white transition"
          >
            New Chat
          </button>

        </div>

      </header>


      {/* ======================================
          MODE SELECTOR
      ======================================= */}

      <div className="flex-shrink-0 border-b border-white/10 px-5 py-3">

        <div className="flex gap-2 overflow-x-auto">

          {MODES.map((mode) => (

            <button
              key={mode.name}
              onClick={() =>
                selectMode(mode.name)
              }
              title={mode.description}
              className={`flex items-center gap-2 px-4 py-2 rounded-full whitespace-nowrap text-sm transition ${
                selectedMode === mode.name
                  ? "bg-gradient-to-r from-cyan-400 to-purple-500 text-white shadow-lg shadow-cyan-500/10"
                  : "bg-white/5 border border-white/10 text-gray-300 hover:bg-white/10"
              }`}
            >

              <span>
                {mode.icon}
              </span>

              {mode.name}

            </button>

          ))}

        </div>

      </div>


      {/* ======================================
          CHAT AREA
      ======================================= */}

      <main className="flex-1 overflow-y-auto px-4 py-8">

        {messages.length === 0 ? (

          /* ==================================
             EMPTY STATE
          ================================== */

          <div className="h-full flex flex-col items-center justify-center text-center">

            <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-cyan-400/20 to-purple-500/20 border border-white/10 flex items-center justify-center text-4xl mb-6 shadow-xl shadow-cyan-500/10">

              {currentMode.icon}

            </div>

            <h2 className="text-3xl font-bold">

              How can I help you?

            </h2>

            <p className="text-gray-400 mt-3 max-w-xl">

              You are using{" "}

              <span className="text-cyan-400 font-medium">

                {selectedMode}

              </span>{" "}

              mode.

              Ask me anything related to your task.

            </p>


            {/* Suggestions */}

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
                  className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm text-gray-300 hover:border-cyan-400/50 hover:text-white hover:bg-cyan-400/5 transition"
                >
                  {suggestion}
                </button>

              ))}

            </div>

          </div>

        ) : (

          /* ==================================
             MESSAGES
          ================================== */

          <div className="max-w-4xl mx-auto space-y-8">

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

                  {/* AI Avatar */}

                  {msg.role === "ai" && (

                    <div className="w-9 h-9 flex-shrink-0 rounded-xl bg-gradient-to-br from-cyan-400 to-purple-500 flex items-center justify-center shadow-lg shadow-cyan-500/10">

                      🧠

                    </div>

                  )}


                  {/* Message */}

                  <div
                    className={`max-w-[80%] px-5 py-4 rounded-2xl whitespace-pre-wrap leading-relaxed ${
                      msg.role === "user"
                        ? "bg-gradient-to-r from-cyan-500 to-blue-600 rounded-br-md shadow-lg shadow-blue-500/10"
                        : "bg-white/5 border border-white/10 rounded-bl-md"
                    }`}
                  >

                    {msg.text}

                  </div>

                </div>

              )
            )}


            {/* =================================
                AI THINKING
            ================================= */}

            {loading && (

              <div className="flex gap-4">

                <div className="w-9 h-9 flex-shrink-0 rounded-xl bg-gradient-to-br from-cyan-400 to-purple-500 flex items-center justify-center">

                  🧠

                </div>

                <div className="bg-white/5 border border-white/10 px-5 py-4 rounded-2xl rounded-bl-md">

                  <div className="flex gap-1">

                    <span className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" />

                    <span
                      className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce"
                      style={{
                        animationDelay:
                          "150ms",
                      }}
                    />

                    <span
                      className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce"
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


      {/* ======================================
          INPUT AREA
      ======================================= */}

      <footer className="flex-shrink-0 p-5 border-t border-white/10">

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
              className="flex-1 resize-none bg-[#111827] border border-white/10 rounded-xl px-5 py-4 outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/30 transition disabled:opacity-50"
            />

            <button
              onClick={sendMessage}
              disabled={
                loading ||
                !message.trim()
              }
              className="px-6 py-4 rounded-xl bg-gradient-to-r from-cyan-400 to-purple-500 font-semibold hover:scale-105 hover:shadow-lg hover:shadow-purple-500/20 transition disabled:opacity-40 disabled:hover:scale-100"
            >

              {loading
                ? "..."
                : "Send 🚀"}

            </button>

          </div>

          <p className="text-xs text-gray-500 text-center mt-2">

            ThinkNest AI • Local AI Engine • No API key required

          </p>

        </div>

      </footer>

    </div>
  );
}

export default ChatWindow;