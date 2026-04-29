"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { saveQuizAnswers } from "@/lib/career-storage";

const questions = [
  { key: "currentRole", label: "What is your current role or background?" },
  { key: "energizingWork", label: "What type of work energizes you?" },
  { key: "drainingWork", label: "What type of work drains you?" },
  { key: "workStyle", label: "What work style fits you best? (analytical, creative, technical, people-facing)" },
  { key: "salaryGoal", label: "What is your salary goal?" },
  { key: "timeline", label: "How soon do you want to pivot?" },
  { key: "industries", label: "What industries interest you?" },
  { key: "skills", label: "What skills do you already have?" },
  { key: "values", label: "What matters most: money, flexibility, mission, growth?" },
  { key: "targetRoles", label: "What roles are you curious about?" },
];

export default function QuizPage() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});

  const current = questions[step];
  const progress = ((step + 1) / questions.length) * 100;

  function update(value: string) {
    setAnswers({ ...answers, [current.key]: value });
  }

  function next() {
    if (step < questions.length - 1) {
      setStep(step + 1);
    } else {
      saveQuizAnswers(answers as any);
      router.push("/resume");
    }
  }

  function back() {
    if (step > 0) setStep(step - 1);
  }

  return (
    <main className="min-h-screen bg-[#f6fbf7] flex items-center justify-center px-6">
      <div className="w-full max-w-2xl rounded-3xl bg-white p-8 shadow-sm">
        <div className="mb-6 h-2 w-full rounded-full bg-slate-100">
          <div
            className="h-2 rounded-full bg-emerald-500 transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>

        <p className="text-sm text-slate-500">
          Step {step + 1} of {questions.length}
        </p>

        <h1 className="mt-3 text-3xl font-bold text-slate-900">
          {current.label}
        </h1>

        <textarea
          value={answers[current.key] || ""}
          onChange={(e) => update(e.target.value)}
          className="mt-6 min-h-32 w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-emerald-500"
          placeholder="Type your answer..."
        />

        <div className="mt-8 flex justify-between">
          <button
            onClick={back}
            disabled={step === 0}
            className="rounded-full px-5 py-3 text-slate-600 disabled:opacity-40"
          >
            Back
          </button>

          <button
            onClick={next}
            className="rounded-full bg-emerald-600 px-6 py-3 font-semibold text-white hover:bg-emerald-700"
          >
            {step === questions.length - 1 ? "Continue" : "Next"}
          </button>
        </div>
      </div>
    </main>
  );
}