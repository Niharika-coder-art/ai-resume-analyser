import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Lightbulb, Plus, FileText, Layers, PenLine } from "lucide-react";
import { motion } from "framer-motion";

const iconMap = { skills_to_add: Plus, projects_to_strengthen: Layers, experience_description_tips: PenLine, formatting_improvements: FileText };
const sections = [
  { key: "skills_to_add", label: "Skills to Add" },
  { key: "projects_to_strengthen", label: "Projects to Strengthen Resume" },
  { key: "experience_description_tips", label: "Better Experience Descriptions" },
  { key: "formatting_improvements", label: "Formatting Improvements" },
];

export default function ImprovementSuggestions({ suggestions }) {
  if (!suggestions) return null;
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
      <Card className="border-0 shadow-sm">
        <CardHeader className="pb-2"><div className="flex items-center gap-2"><div className="w-7 h-7 rounded-lg bg-violet-50 flex items-center justify-center"><Lightbulb className="w-4 h-4 text-violet-500" /></div><CardTitle className="text-base font-bold text-slate-800">Improvement Suggestions</CardTitle></div></CardHeader>
        <CardContent className="space-y-5">
          {sections.map(({ key, label }) => {
            const items = suggestions[key];
            if (!items?.length) return null;
            const Icon = iconMap[key] || Lightbulb;
            return <div key={key}><div className="flex items-center gap-2 mb-2"><Icon className="w-3.5 h-3.5 text-slate-400" /><h4 className="text-sm font-semibold text-slate-600">{label}</h4></div><ul className="space-y-1.5 ml-5">{items.map((item, i) => <li key={i} className="text-sm text-slate-600 list-disc">{item}</li>)}</ul></div>;
          })}
        </CardContent>
      </Card>
    </motion.div>
  );
}
