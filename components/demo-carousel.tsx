"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, TrendingUp, Zap } from "lucide-react";

const cards = [
  {
    icon: Upload,
    title: "Resume Uploaded",
    subtitle: "Skills Detected",
    items: ["React / TypeScript", "Product Leadership", "AI/ML Integration", "Full-stack Development"],
    color: "from-emerald-50 to-green-50",
    borderColor: "border-emerald-200",
  },
  {
    icon: TrendingUp,
    title: "Career Match Scores",
    subtitle: "Top Opportunities",
    items: ["Product Manager - 94%", "Tech Lead - 92%", "Startup Founder - 88%", "Solutions Architect - 86%"],
    color: "from-teal-50 to-emerald-50",
    borderColor: "border-teal-200",
  },
  {
    icon: Zap,
    title: "Personalized Roadmap",
    subtitle: "Your Timeline",
    items: ["Month 1-2: Upskill", "Month 3-4: Network", "Month 5-6: Apply & Interview", "Month 7+: Transition"],
    color: "from-green-50 to-lime-50",
    borderColor: "border-green-200",
  },
];

export default function DemoCarousel() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % cards.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full h-96 flex items-center justify-center perspective">
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: -20 }}
          transition={{ duration: 0.5 }}
          className="absolute w-full max-w-sm"
        >
          <motion.div
            whileHover={{ y: -8 }}
            transition={{ duration: 0.3 }}
            className={`bg-gradient-to-br ${cards[current].color} rounded-2xl border ${cards[current].borderColor} p-8 shadow-lg`}
          >
            {/* Icon */}
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-green-600 flex items-center justify-center mb-6">
              {cards[current].icon && <cards[current].icon className="w-6 h-6 text-white" />}
            </div>

            {/* Header */}
            <div className="mb-6">
              <h3 className="text-2xl font-bold text-slate-900">{cards[current].title}</h3>
              <p className="text-sm text-slate-600 mt-1">{cards[current].subtitle}</p>
            </div>

            {/* Items */}
            <div className="space-y-3 mb-6">
              {cards[current].items.map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1, duration: 0.4 }}
                  className="flex items-center gap-3"
                >
                  <div className="w-2 h-2 rounded-full bg-emerald-600" />
                  <p className="text-sm font-medium text-slate-800">{item}</p>
                </motion.div>
              ))}
            </div>

            {/* Progress */}
            <div className="flex gap-2">
              {cards.map((_, idx) => (
                <motion.div
                  key={idx}
                  className={`h-1 flex-1 rounded-full ${
                    idx === current ? "bg-emerald-600" : "bg-slate-300"
                  }`}
                  initial={false}
                  animate={{ scaleX: idx === current ? 1 : 0.5 }}
                  transition={{ duration: 0.3 }}
                />
              ))}
            </div>
          </motion.div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
