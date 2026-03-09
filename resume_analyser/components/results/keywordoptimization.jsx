import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Search } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";

export default function KeywordOptimization({ keywords = [] }) {
  if (!keywords.length) return null;
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}>
      <Card className="border-0 shadow-sm">
        <CardHeader className="pb-2"><div className="flex items-center gap-2"><div className="w-7 h-7 rounded-lg bg-orange-50 flex items-center justify-center"><Search className="w-4 h-4 text-orange-500" /></div><CardTitle className="text-base font-bold text-slate-800">Missing Keywords</CardTitle></div><p className="text-xs text-slate-400 ml-9">Important keywords from the job description not found in your resume</p></CardHeader>
        <CardContent><div className="flex flex-wrap gap-2">{keywords.map((kw, i) => <Badge key={i} variant="outline" className="border-orange-200 text-orange-700 bg-orange-50 font-medium text-xs px-3 py-1">+ {kw}</Badge>)}</div></CardContent>
      </Card>
    </motion.div>
  );
}