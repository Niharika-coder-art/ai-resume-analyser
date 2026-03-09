import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, FileSearch } from "lucide-react";
import { motion } from "framer-motion";
import { createPageUrl } from "@/utils";
import ATSScoreGauge from "../components/results/ATSScoreGauge";
import SkillsSection from "../components/results/SkillsSection";
import CandidateSummary from "../components/results/CandidateSummary";
import StrengthsWeaknesses from "../components/results/StrengthsWeaknesses";
import ImprovementSuggestions from "../components/results/ImprovementSuggestions";
import RolePrediction from "../components/results/RolePrediction";
import InterviewQuestions from "../components/results/InterviewQuestions";
import KeywordOptimization from "../components/results/KeywordOptimization";

export default function Results() {
  const [data, setData] = useState(null);
  const [rawDebug, setRawDebug] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem("analysisResult");
    if (stored) {
      const parsed = JSON.parse(stored);
      setRawDebug(parsed);
      const unwrapped = parsed?.candidate_summary ? parsed : parsed?.result?.candidate_summary ? parsed.result : parsed;
      setData(unwrapped);
    }
  }, []);

  if (!data) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <p className="text-slate-500 mb-4">No analysis results found.</p>
        <Button onClick={() => window.location.href = createPageUrl("Home")} variant="outline"><ArrowLeft className="w-4 h-4 mr-2" />Go Back</Button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50/30">
      <div className="border-b border-slate-100 bg-white/60 backdrop-blur-xl sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center"><FileSearch className="w-5 h-5 text-white" /></div>
            <div><h1 className="text-lg font-bold text-slate-800">ResumeAI</h1><p className="text-xs text-slate-400">Analysis Results</p></div>
          </div>
          <Button onClick={() => window.location.href = createPageUrl("Home")} variant="outline" className="rounded-xl text-sm"><ArrowLeft className="w-4 h-4 mr-1.5" />New Analysis</Button>
        </div>
      </div>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <Card className="border-0 shadow-sm h-full">
              <CardHeader className="pb-2"><CardTitle className="text-lg font-bold text-slate-800 text-center">ATS Score</CardTitle></CardHeader>
              <CardContent className="flex justify-center pt-2"><ATSScoreGauge score={data.ats_score?.overall || 0} breakdown={data.ats_score?.breakdown} /></CardContent>
            </Card>
          </motion.div>
          <div className="lg:col-span-2"><CandidateSummary summary={data.candidate_summary} /></div>
        </div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
          <Card className="border-0 shadow-sm mb-6">
            <CardHeader className="pb-2"><CardTitle className="text-lg font-bold text-slate-800">Skills Analysis</CardTitle></CardHeader>
            <CardContent><SkillsSection matching={data.matching_skills} missing={data.missing_skills} partial={data.partial_skills} /></CardContent>
          </Card>
        </motion.div>
        <div className="mb-6"><KeywordOptimization keywords={data.missing_keywords} /></div>
        <div className="mb-6"><StrengthsWeaknesses strengths={data.strengths} weaknesses={data.weaknesses} /></div>
        <div className="mb-6"><ImprovementSuggestions suggestions={data.improvement_suggestions} /></div>
        <div className="mb-6"><RolePrediction roles={data.recommended_roles} /></div>
        <div className="mb-8"><InterviewQuestions questions={data.interview_questions} /></div>
        <details className="mb-12 border border-slate-200 rounded-xl p-4 bg-slate-50">
          <summary className="text-xs text-slate-400 cursor-pointer font-medium">Debug: Raw API Response</summary>
          <pre className="text-xs text-slate-600 mt-3 overflow-auto max-h-96 whitespace-pre-wrap">{JSON.stringify(rawDebug, null, 2)}</pre>
        </details>
      </div>
    </div>
  );
}