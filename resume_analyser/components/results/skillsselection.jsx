import React from "react";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, XCircle, AlertCircle } from "lucide-react";
import { motion } from "framer-motion";

const container = { hidden: {}, show: { transition: { staggerChildren: 0.04 } } };
const item = { hidden: { opacity: 0, scale: 0.8 }, show: { opacity: 1, scale: 1 } };

export default function SkillsSection({ matching = [], missing = [], partial = [] }) {
  return (
    <div className="space-y-6">
      {matching.length > 0 && <div>
        <div className="flex items-center gap-2 mb-3"><CheckCircle2 className="w-4 h-4 text-green-500" /><h4 className="text-sm font-semibold text-slate-700">Matching Skills</h4><span className="text-xs text-slate-400">({matching.length})</span></div>
        <motion.div className="flex flex-wrap gap-2" variants={container} initial="hidden" animate="show">{matching.map((s, i) => <motion.div key={i} variants={item}><Badge className="bg-green-50 text-green-700 border border-green-200 font-medium text-xs px-3 py-1">{s}</Badge></motion.div>)}</motion.div>
      </div>}
      {partial.length > 0 && <div>
        <div className="flex items-center gap-2 mb-3"><AlertCircle className="w-4 h-4 text-amber-500" /><h4 className="text-sm font-semibold text-slate-700">Partially Matching</h4><span className="text-xs text-slate-400">({partial.length})</span></div>
        <motion.div className="flex flex-wrap gap-2" variants={container} initial="hidden" animate="show">{partial.map((s, i) => <motion.div key={i} variants={item}><Badge className="bg-amber-50 text-amber-700 border border-amber-200 font-medium text-xs px-3 py-1">{s}</Badge></motion.div>)}</motion.div>
      </div>}
      {missing.length > 0 && <div>
        <div className="flex items-center gap-2 mb-3"><XCircle className="w-4 h-4 text-red-400" /><h4 className="text-sm font-semibold text-slate-700">Missing Skills</h4><span className="text-xs text-slate-400">({missing.length})</span></div>
        <motion.div className="flex flex-wrap gap-2" variants={container} initial="hidden" animate="show">{missing.map((s, i) => <motion.div key={i} variants={item}><Badge className="bg-red-50 text-red-600 border border-red-200 font-medium text-xs px-3 py-1">{s}</Badge></motion.div>)}</motion.div>
      </div>}
    </div>
  );
}