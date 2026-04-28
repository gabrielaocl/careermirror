"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { saveResumeInput, type ResumeInput } from "@/lib/career-storage";

const initialForm: ResumeInput = {
  resumeText: "",
  education: "",
  projects: "",
  certifications: "",
  tools: "",
  achievements: "",
};

export default function ResumePage() {
  const router = useRouter();
  const [form, setForm] = useState(initialForm);

  function updateField(field: keyof ResumeInput, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    saveResumeInput(form);
    router.push("/roadmap");
  }

  return (
    <main className="min-h-screen bg-[#f6fbf7] px-6 py-10">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-4xl font-bold text-slate-900">Add Your Experience</h1>
        <p className="mt-3 text-slate-600">
          Paste your resume or summarize your experience. CareerMirror will translate it into a pivot roadmap.
        </p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-5 rounded-3xl bg-white p-6 shadow-sm">
          <Textarea label="Paste resume or LinkedIn-style experience" value={form.resumeText} onChange={(v) => updateField("resumeText", v)} large />
          <Textarea label="Education" value={form.education} onChange={(v) => updateField("education", v)} />
          <Textarea label="Top projects" value={form.projects} onChange={(v) => updateField("projects", v)} />
          <Textarea label="Certifications" value={form.certifications} onChange={(v) => updateField("certifications", v)} />
          <Textarea label="Tools or technologies" value={form.tools} onChange={(v) => updateField("tools", v)} />
          <Textarea label="Work achievements" value={form.achievements} onChange={(v) => updateField("achievements", v)} />

          <button className="w-full rounded-full bg-emerald-600 px-6 py-3 font-semibold text-white hover:bg-emerald-700">
            Generate My Roadmap
          </button>
        </form>
      </div>
    </main>
  );
}

function Textarea({
  label,
  value,
  onChange,
  large = false,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  large?: boolean;
}) {
  return (
    <label className="block">
      <span className="font-medium text-slate-800">{label}</span>
      <textarea
        className={`mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-emerald-500 ${
          large ? "min-h-48" : "min-h-24"
        }`}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </label>
  );
}