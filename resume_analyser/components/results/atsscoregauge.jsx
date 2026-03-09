
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function ATSScoreGauge({ score, breakdown }) {
  const [animatedScore, setAnimatedScore] = useState(0);
  const circumference = 2 * Math.PI * 70;
  const strokeDashoffset = circumference - (animatedScore / 100) * circumference;

  useEffect(() => { const t = setTimeout(() => setAnimatedScore(score), 300); return () => clearTimeout(t); }, [score]);

  const getScoreColor = (s) => {
    if (s >= 80) return { stroke: "#22c55e", text: "text-green-500", label: "Excellent" };
    if (s >= 60) return { stroke: "#eab308", text: "text-yellow-500", label: "Good" };
    if (s >= 40) return { stroke: "#f97316", text: "text-orange-500", label: "Fair" };
    return { stroke: "#ef4444", text: "text-red-500", label: "Needs Work" };
  };
  const colors = getScoreColor(score);

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-48 h-48">
        <svg className="w-48 h-48 -rotate-90" viewBox="0 0 160 160">
          <circle cx="80" cy="80" r="70" fill="none" stroke="#f1f5f9" strokeWidth="10" />
          <motion.circle cx="80" cy="80" r="70" fill="none" stroke={colors.stroke} strokeWidth="10" strokeLinecap="round" strokeDasharray={circumference} initial={{ strokeDashoffset: circumference }} animate={{ strokeDashoffset }} transition={{ duration: 1.5, ease: "easeOut" }} />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <motion.span className={`text-4xl font-bold ${colors.text}`} initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.5 }}>{animatedScore}%</motion.span>
          <span className="text-xs font-medium text-slate-400 mt-1">{colors.label}</span>
        </div>
      </div>
      {breakdown && (
        <div className="w-full mt-6 space-y-3">
          {Object.entries(breakdown).map(([key, value]) => (
            <div key={key}>
              <div className="flex justify-between text-xs mb-1"><span className="text-slate-500 capitalize">{key.replace(/_/g, " ")}</span><span className="font-semibold text-slate-700">{value}%</span></div>
              <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                <motion.div className="h-full rounded-full" style={{ background: `linear-gradient(90deg, ${colors.stroke}, ${colors.stroke}88)` }} initial={{ width: 0 }} animate={{ width: `${value}%` }} transition={{ duration: 1, ease: "easeOut", delay: 0.3 }} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}