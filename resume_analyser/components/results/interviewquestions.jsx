import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageSquare, Code, Layers, Users } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const tabs = [
  { id: "technical", label: "Technical", icon: Code },
  { id: "project_based", label: "Project-Based", icon: Layers },
  { id: "behavioral", label: "Behavioral", icon: Users },
];

export default function InterviewQuestions({ questions }) {
  const [activeTab, setActiveTab] = useState("technical");
  const allQuestions = { technical: questions?.technical || [], project_based: questions?.project || questions?.project_based || [], behavioral: questions?.behavioral || [] };
  if (!questions) return null;
  const currentQuestions = allQuestions[activeTab] || [];

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
      <Card className="border-0 shadow-sm">
        <CardHeader className="pb-3"><div className="flex items-center gap-2"><div className="w-7 h-7 rounded-lg bg-cyan-50 flex items-center justify-center"><MessageSquare className="w-4 h-4 text-cyan-500" /></div><CardTitle className="text-base font-bold text-slate-800">Interview Preparation</CardTitle></div></CardHeader>
        <CardContent>
          <div className="flex gap-1 p-1 bg-slate-50 rounded-xl mb-5">
            {tabs.map(({ id, label, icon: Icon }) => (
              <button key={id} onClick={() => setActiveTab(id)} className={`flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg text-xs font-medium transition-all ${activeTab === id ? "bg-white text-slate-800 shadow-sm" : "text-slate-500 hover:text-slate-700"}`}>
                <Icon className="w-3.5 h-3.5" /><span className="hidden sm:inline">{label}</span>
              </button>
            ))}
          </div>
          <AnimatePresence mode="wait">
            <motion.div key={activeTab} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.2 }} className="space-y-3">
              {currentQuestions.map((q, i) => (
                <div key={i} className="flex gap-3 p-3 rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors">
                  <span className="text-xs font-bold text-slate-300 mt-0.5 shrink-0 w-5">{String(i + 1).padStart(2, "0")}</span>
                  <p className="text-sm text-slate-700 leading-relaxed">{q}</p>
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
        </CardContent>
      </Card>
    </motion.div>
  );
}