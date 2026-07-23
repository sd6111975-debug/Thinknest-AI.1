  import { FaBrain, FaLightbulb, FaMagic } from "react-icons/fa";
import { motion } from "framer-motion";

const features = [
  {
    icon: <FaBrain size={35} />,
    title: "AI Brainstorming",
    desc: "Generate creative and unique ideas instantly with AI.",
  },
  {
    icon: <FaLightbulb size={35} />,
    title: "Mind Mapping",
    desc: "Visualize and organize your thoughts beautifully.",
  },
  {
    icon: <FaMagic size={35} />,
    title: "Smart Suggestions",
    desc: "Get AI-powered recommendations to improve your ideas.",
  },
];

function Features() {
  return (
    <section className="py-24 px-8">
      <h2 className="text-5xl font-bold text-center mb-16">
        Why ThinkNest AI?
      </h2>

      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            whileHover={{ y: -10, scale: 1.03 }}
            transition={{ duration: 0.3 }}
            className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-xl"
          >
            <div className="text-cyan-400 mb-5">
              {feature.icon}
            </div>

            <h3 className="text-2xl font-semibold mb-3">
              {feature.title}
            </h3>

            <p className="text-gray-400">
              {feature.desc}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

export default Features;