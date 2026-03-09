import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { base44 } from "@/api/base44Client";
import { ArrowRight, Sparkles, FileSearch, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import { createPageUrl } from "@/utils";
import ResumeUploader from "../components/resume/ResumeUploader";

export default function Home() {
  const [resumeText, setResumeText] = useState("");
  const [resumeFile, setResumeFile] = useState(null);
  const [jobDescription, setJobDescription] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleAnalyze = async () => {
    if (!resumeText.trim() || !jobDescription.trim()) return;
    setIsAnalyzing(true);

    const result = await base44.integrations.Core.InvokeLLM({
      prompt: `You are an advanced AI Resume Analyzer, ATS evaluator, and career advisor.
Analyze this resume against the job description and provide a comprehensive evaluation.
RESUME:\n${resumeText}\nJOB DESCRIPTION:\n${jobDescription}\nProvide your analysis in the exact JSON structure specified.`,
      response_json_schema: {
        type: "object",
        properties: {
          candidate_summary: { type: "object", properties: { candidate_name: { type: "string" }, education: { type: "string" }, work_experience: { type: "string" }, certifications: { type: "string" }, tools_and_technologies: { type: "string" } } },
          skill_analysis: { type: "object", properties: { core_technical: { type: "array", items: { type: "string" } }, supporting: { type: "array", items: { type: "string" } }, soft_skills: { type: "array", items: { type: "string" } } } },
          ats_score: { type: "object", properties: { overall: { type: "number" }, breakdown: { type: "object", properties: { keyword_matching: { type: "number" }, skills_relevance: { type: "number" }, experience_alignment: { type: "number" }, education_relevance: { type: "number" }, resume_completeness: { type: "number" } } } } },
          matching_skills: { type: "array", items: { type: "string" } },
          missing_skills: { type: "array", items: { type: "string" } },
          partial_skills: { type: "array", items: { type: "string" } },
          missing_keywords: { type: "array", items: { type: "string" } },
          strengths: { type: "array", items: { type: "string" } },
          weaknesses: { type: "array", items: { type: "string" } },
          improvement_suggestions: { type: "object", properties: { skills_to_add: { type: "array", items: { type: "string" } }, projects_to_strengthen: { type: "array", items: { type: "string" } }, experience_description_tips: { type: "array", items: { type: "string" } }, formatting_improvements: { type: "array", items: { type: "string" } } } },
          recommended_roles: { type: "array", items: { type: "string" } },
          interview_questions: { type: "object", properties: { technical: { type: "array", items: { type: "string" } }, project: { type: "array", items: { type: "string" } }, behavioral: { type: "array", items: { type: "string" } } } }
        }
      }
    });

    const parsed = result?.candidate_summary ? result : (Object.values(result || {})[0] || result);
    localStorage.setItem("analysisResult", JSON.stringify(parsed));
    window.location.href = createPageUrl("Results");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50/30">
      <div className="border-b border-slate-100 bg-white/60 backdrop-blur-xl sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-4 flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center">
            <FileSearch className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-slate-800 tracking-tight">ResumeAI</h1>
            <p className="text-xs text-slate-400">ATS Analyzer & Career Advisor</p>
          </div>
        </div>
      </div>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-12 pb-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-50 border border-indigo-100 mb-6">
            <Sparkles className="w-3.5 h-3.5 text-indigo-500" />
            <span className="text-xs font-medium text-indigo-600">AI-Powered Resume Analysis</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight leading-tight">
            Get Your Resume <span className="bg-gradient-to-r from-indigo-500 to-violet-500 bg-clip-text text-transparent">ATS-Ready</span>
          </h2>
          <p className="text-slate-500 mt-3 max-w-lg mx-auto text-sm leading-relaxed">Upload your resume and paste the job description to get detailed ATS scoring, skill gap analysis, and personalized improvement suggestions.</p>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="border-0 shadow-sm p-6">
            <ResumeUploader resumeText={resumeText} setResumeText={setResumeText} resumeFile={resumeFile} setResumeFile={setResumeFile} />
          </Card>
          <Card className="border-0 shadow-sm p-6">
            <label className="text-sm font-semibold text-slate-700 tracking-wide uppercase block mb-4">Job Description</label>
            <Textarea placeholder="Paste the job description here..." value={jobDescription} onChange={(e) => setJobDescription(e.target.value)} className="min-h-[340px] resize-none border-slate-200 text-sm" />
          </Card>
        </motion.div>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="flex justify-center mt-8">
          <Button onClick={handleAnalyze} disabled={!resumeText.trim() || !jobDescription.trim() || isAnalyzing} className="bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white px-8 py-6 text-base font-semibold rounded-2xl shadow-lg shadow-indigo-200 disabled:opacity-50 transition-all">
            {isAnalyzing ? (<><Loader2 className="w-5 h-5 mr-2 animate-spin" />Analyzing Resume...</>) : (<>Analyze Resume<ArrowRight className="w-5 h-5 ml-2" /></>)}
          </Button>
        </motion.div>
      </div>
    </div>
  );
}