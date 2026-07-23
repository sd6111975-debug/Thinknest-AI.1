import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import AIOrb from "./AIOrb";
function Hero() {
  const navigate = useNavigate();

  return (
    <section className="min-h-screen flex items-center justify-between px-20">

      {/* Left Side */}
      <div className="max-w-2xl">

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-7xl font-bold bg-gradient-to-r from-cyan-400 via-white to-purple-500 bg-clip-text text-transparent"
        >
          Every Great Idea
          <br />
          Deserves a Nest.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-gray-300 text-xl mt-8"
        >
          ThinkNest AI transforms your ideas into organized, creative projects
          using the power of Artificial Intelligence.
        </motion.p>

        <motion.button
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate("/chat")} 
          className="mt-10 px-8 py-4 rounded-full bg-gradient-to-r from-cyan-400 to-purple-500 text-white font-semibold shadow-xl shadow-cyan-500/30"
        >
          🚀 Start Thinking
        </motion.button>

      </div>

      {/* Right Side */}
      <AIOrb />

    </section>
  );
}

export default Hero;