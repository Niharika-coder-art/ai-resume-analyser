import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, TrendingDown } from "lucide-react";
import { motion } from "framer-motion";

export default function StrengthsWeaknesses({ strengths = [], weaknesses = [] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
        <Card className="border-0 shadow-sm h-full">
          <CardHeader className="pb-2"><div className="flex items-center gap-2"><div className="w-7 h-7 rounded-lg bg-green-50 flex items-center justify-center"><TrendingUp className="w-4 h-4 text-green-500" /></div><CardTitle className="text-base font-bold text-slate-800">Strengths</CardTitle></div></CardHeader>
          <CardContent><ul className="space-y-2.5">{strengths.map((s, i) => <li key={i} className="flex gap-2.5 text-sm text-slate-600"><span className="text-green-400 mt-1 shrink-0">●</span>{s}</li>)}</ul></CardContent>
        </Card>
      </motion.div>
      <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}>
        <Card className="border-0 shadow-sm h-full">
          <CardHeader className="pb-2"><div className="flex items-center gap-2"><div className="w-7 h-7 rounded-lg bg-red-50 flex items-center justify-center"><TrendingDown className="w-4 h-4 text-red-400" /></div><CardTitle className="text-base font-bold text-slate-800">Areas to Improve</CardTitle></div></CardHeader>
          <CardContent><ul className="space-y-2.5">{weaknesses.map((w, i) => <li key={i} className="flex gap-2.5 text-sm text-slate-600"><span className="text-red-400 mt-1 shrink-0">●</span>{w}</li>)}</ul></CardContent>
        </Card>
      </motion.div>
    </div>
  );
}