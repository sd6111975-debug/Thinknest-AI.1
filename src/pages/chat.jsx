import { useState } from "react";
import ChatSidebar from "../components/ChatSidebar";
import ChatWindow from "../components/ChatWindow";

function Chat() {
  const [selectedMode, setSelectedMode] = useState("Brainstorm");

  return (
    <div className="min-h-screen bg-[#050816] text-white flex">

      <ChatSidebar
        selectedMode={selectedMode}
        setSelectedMode={setSelectedMode}
      />

      <div className="flex-1">
        <ChatWindow selectedMode={selectedMode} />
      </div>

    </div>
  );
}

export default Chat;