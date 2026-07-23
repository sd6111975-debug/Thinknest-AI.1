import { motion } from "framer-motion";

function Navbar() {
  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7 }}
      className="fixed top-0 left-0 w-full z-50 backdrop-blur-xl bg-white/5 border-b border-white/10"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-8 py-5">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
          ThinkNest AI
        </h1>

        <div className="hidden md:flex gap-10 text-white">
          <a href="#" className="hover:text-cyan-400 transition">Home</a>
          <a href="#" className="hover:text-cyan-400 transition">Features</a>
          <a href="#" className="hover:text-cyan-400 transition">About</a>
          <a href="#" className="hover:text-cyan-400 transition">Contact</a>
        </div>

        <button className="bg-gradient-to-r from-cyan-400 to-purple-500 text-white px-6 py-2 rounded-full hover:scale-105 transition duration-300 shadow-lg shadow-cyan-500/30">
          Get Started
        </button>
      </div>
    </motion.nav>
  );
}

export default Navbar;