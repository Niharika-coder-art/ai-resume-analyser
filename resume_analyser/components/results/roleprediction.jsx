import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Target } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";

export default function RolePrediction({ roles = [] }) {
  if (!roles.length) return null;
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
      <Card className="border-0 shadow-sm">
        <CardHeader className="pb-2"><div className="flex items-center gap-2"><div className="w-7 h-7 rounded-lg bg-indigo-50 flex items-center justify-center"><Target className="w-4 h-4 text-indigo-500" /></div><CardTitle className="text-base font-bold text-slate-800">Recommended Roles</CardTitle></div></CardHeader>
        <CardContent><div className="flex flex-wrap gap-2">{roles.map((role, i) => <Badge key={i} className="bg-gradient-to-r from-indigo-50 to-violet-50 text-indigo-700 border border-indigo-200 font-medium text-sm px-4 py-1.5">{role}</Badge>)}</div></CardContent>
      </Card>
    </motion.div>
  );
}