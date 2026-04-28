"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { saveQuizAnswers, type QuizAnswers } from "@/lib/career-storage";

const initialForm: QuizAnswers = {
  currentRole: "",
  energizingWork: "",
  drainingWork: "",
  workStyle: "",
  salaryGoal: "",
  timeline: "",
  industries: "",
  skills: "",
  values: "",
  targetRoles: "",
};

export default function QuizPage() {
  const router = useRouter();
  const [form, setForm] = useState(initialForm);

  function updateField(field: keyof QuizAnswers, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    saveQuizAnswers(form);
    router.push("/resume");
  }

  return (
    <main className="min-h-screen bg-[#f6fbf7] px-6 py-10">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-4xl font-bold text-slate-900">Career Mirror Quiz</h1>
        <p className="mt-3 text-slate-600">
          Answer a few questions so we can build a realistic career pivot roadmap.
        </p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-5 rounded-3xl bg-white p-6 shadow-sm">
          <Input label="Current role or background" value={form.currentRole} onChange={(v) => updateField("currentRole", v)} />
          <Textarea label="What type of work energizes you?" value={form.energizingWork} onChange={(v) => updateField("energizingWork", v)} />
          <Textarea label="What type of work drains you?" value={form.drainingWork} onChange={(v) => updateField("drainingWork", v)} />

          <Select
            label="Preferred work style"
            value={form.workStyle}
            onChange={(v) => updateField("workStyle", v)}
            options={["Analytical", "Creative", "People-facing", "Operational", "Technical", "Strategic"]}
          />

          <Input label="Salary goal" value={form.salaryGoal} onChange={(v) => updateField("salaryGoal", v)} />
          <Select
            label="Target timeline"
            value={form.timeline}
            onChange={(v) => updateField("timeline", v)}
            options={["30 days", "90 days", "6 months", "1 year"]}
          />

          <Textarea label="Industries you are interested in" value={form.industries} onChange={(v) => updateField("industries", v)} />
          <Textarea label="Skills you already have" value={form.skills} onChange={(v) => updateField("skills", v)} />
          <Textarea label="Values that matter to you" value={form.values} onChange={(v) => updateField("values", v)} />
          <Textarea label="Roles you are curious about" value={form.targetRoles} onChange={(v) => updateField("targetRoles", v)} />

          <button className="w-full rounded-full bg-emerald-600 px-6 py-3 font-semibold text-white hover:bg-emerald-700">
            Continue to Resume
          </button>
        </form>
      </div>
    </main>
  );
}

function Input({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <label className="block">
      <span className="font-medium text-slate-800">{label}</span>
      <input
        className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-emerald-500"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </label>
  );
}

function Textarea({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <label className="block">
      <span className="font-medium text-slate-800">{label}</span>
      <textarea
        className="mt-2 min-h-24 w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-emerald-500"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </label>
  );
}

function Select({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: string[];
}) {
  return (
    <label className="block">
      <span className="font-medium text-slate-800">{label}</span>
      <select
        className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-emerald-500"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        <option value="">Select one</option>
        {options.map((option) => (
          <option key={option}>{option}</option>
        ))}
      </select>
    </label>
  );
}
