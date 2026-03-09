import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { User, GraduationCap, Briefcase, Award, Wrench } from "lucide-react";
import { motion } from "framer-motion";

const infoItem = (Icon, label, value) => !value ? null : (
  <div className="flex gap-3">
    <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center shrink-0"><Icon className="w-4 h-4 text-slate-400" /></div>
    <div className="min-w-0"><p className="text-xs font-medium text-slate-400 uppercase tracking-wider">{label}</p><p className="text-sm text-slate-700 mt-0.5 leading-relaxed">{value}</p></div>
  </div>
);

export default function CandidateSummary({ summary }) {
  if (!summary) return null;
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
      <Card className="border-0 shadow-sm bg-white h-full">
        <CardHeader className="pb-2"><CardTitle className="text-lg font-bold text-slate-800">Candidate Summary</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          {infoItem(User, "Name", summary.candidate_name)}
          {infoItem(GraduationCap, "Education", summary.education)}
          {infoItem(Briefcase, "Experience", summary.work_experience)}
          {infoItem(Award, "Certifications", summary.certifications)}
          {infoItem(Wrench, "Tools & Technologies", summary.tools_and_technologies)}
        </CardContent>
      </Card>
    </motion.div>
  );
}