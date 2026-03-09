import React, { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { base44 } from "@/api/base44Client";
import { Upload, FileText, X, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function ResumeUploader({ resumeText, setResumeText, resumeFile, setResumeFile }) {
  const [isExtracting, setIsExtracting] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setIsExtracting(true);
    setResumeFile(file);
    if (file.type === "text/plain" || file.name.endsWith(".txt")) {
      const text = await file.text();
      setResumeText(text);
      setIsExtracting(false);
      return;
    }
    const { file_url } = await base44.integrations.Core.UploadFile({ file });
    const result = await base44.integrations.Core.ExtractDataFromUploadedFile({
      file_url,
      json_schema: { type: "object", properties: { full_text: { type: "string" } } }
    });
    if (result.status === "success" && result.output?.full_text) setResumeText(result.output.full_text);
    setIsExtracting(false);
  };

  const removeFile = () => { setResumeFile(null); setResumeText(""); if (fileInputRef.current) fileInputRef.current.value = ""; };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <label className="text-sm font-semibold text-slate-700 tracking-wide uppercase">Resume</label>
        {resumeFile && <button onClick={removeFile} className="text-xs text-slate-400 hover:text-red-500 flex items-center gap-1"><X className="w-3 h-3" /> Remove file</button>}
      </div>
      <AnimatePresence mode="wait">
        {!resumeFile && !resumeText ? (
          <motion.div key="upload" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
            <Card className="border-2 border-dashed border-slate-200 hover:border-indigo-300 cursor-pointer group" onClick={() => fileInputRef.current?.click()}>
              <div className="flex flex-col items-center justify-center py-12 px-6">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-50 to-violet-50 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Upload className="w-6 h-6 text-indigo-500" />
                </div>
                <p className="text-sm font-medium text-slate-700">Upload your resume</p>
                <p className="text-xs text-slate-400 mt-1">PDF, DOCX, or TXT</p>
              </div>
            </Card>
            <input ref__={fileInputRef} type="file" accept=".pdf,.docx,.doc,.txt" onChange={handleFileUpload} className="hidden" />
            <div className="flex items-center gap-3 my-4"><div className="flex-1 h-px bg-slate-200" /><span className="text-xs text-slate-400 font-medium">or paste below</span><div className="flex-1 h-px bg-slate-200" /></div>
            <Textarea placeholder="Paste your resume text here..." value={resumeText} onChange={(e) => setResumeText(e.target.value)} className="min-h-[200px] resize-none text-sm" />
          </motion.div>
        ) : (
          <motion.div key="content" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
            {isExtracting ? (
              <Card className="border-slate-200"><div className="flex flex-col items-center justify-center py-16"><Loader2 className="w-8 h-8 text-indigo-500 animate-spin mb-4" /><p className="text-sm font-medium text-slate-600">Extracting resume content...</p></div></Card>
            ) : (
              <div>
                {resumeFile && <div className="flex items-center gap-3 p-3 bg-indigo-50 rounded-xl mb-3"><FileText className="w-5 h-5 text-indigo-500" /><span className="text-sm font-medium text-indigo-700 truncate">{resumeFile.name}</span></div>}
                <Textarea placeholder="Paste your resume text here..." value={resumeText} onChange={(e) => setResumeText(e.target.value)} className="min-h-[200px] resize-none text-sm" />
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}