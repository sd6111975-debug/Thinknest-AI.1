import { Routes, Route } from "react-router-dom";

import AnimatedBackground from "./components/AnimatedBackground";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Features from "./components/Features";
import Footer from "./components/Footer";

import Chat from "./pages/Chat";

function Home() {
  return (
    <div className="relative z-10 bg-[#050816] text-white min-h-screen">
      <AnimatedBackground />
      <Navbar />
      <Hero />
      <Features />
      <Footer />
    </div>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/chat" element={<Chat />} />
    </Routes>
  );
}

export default App;