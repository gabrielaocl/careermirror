"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, ArrowRight, Sparkles } from "lucide-react";
import { saveQuizAnswers } from "@/lib/career-storage";

const questions = [
  { key: "currentRole", label: "What is your current role or background?", placeholder: "Example: Sales engineer, student, data analyst, operations..." },
  { key: "energizingWork", label: "What type of work energizes you?", placeholder: "Example: solving problems, leading projects, working with customers..." },
  { key: "drainingWork", label: "What type of work drains you?", placeholder: "Example: repetitive admin work, unclear priorities, isolated tasks..." },
  { key: "workStyle", label: "What work style fits you best?", placeholder: "Analytical, creative, technical, people-facing, strategic..." },
  { key: "salaryGoal", label: "What is your salary goal?", placeholder: "Example: $120K+, higher long-term upside, stability..." },
  { key: "timeline", label: "How soon do you want to pivot?", placeholder: "Example: immediately, 6 months, 1 year..." },
  { key: "industries", label: "What industries interest you?", placeholder: "Example: AI, tech, healthcare, climate, finance..." },
  { key: "skills", label: "What skills do you already have?", placeholder: "Example: Python, sales, analytics, leadership, presentations..." },
  { key: "values", label: "What matters most to you?", placeholder: "Money, flexibility, mission, growth, prestige, stability..." },
  { key: "targetRoles", label: "What roles are you curious about?", placeholder: "Example: Product Manager, Data Scientist, Solutions Engineer..." },
];

export default function QuizPage() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});

  const current = questions[step];
  const progress = Math.round(((step + 1) / questions.length) * 100);
  const currentValue = answers[current.key] || "";

  function update(value: string) {
    setAnswers((prev) => ({ ...prev, [current.key]: value }));
  }

  function next() {
    if (!currentValue.trim()) return;

    if (step < questions.length - 1) {
      setStep((prev) => prev + 1);
    } else {
      saveQuizAnswers({ ...answers, [current.key]: currentValue } as any);
      router.push("/resume");
    }
  }

  function back() {
    if (step > 0) setStep((prev) => prev - 1);
  }

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top_left,#dcfce7,transparent_35%),linear-gradient(180deg,#ffffff,#f6fbf7)] px-6 py-10">
      <div className="mx-auto flex min-h-[85vh] max-w-5xl items-center justify-center">
        <section className="w-full overflow-hidden rounded-[2rem] border border-emerald-100 bg-white/85 shadow-2xl shadow-emerald-100/60 backdrop-blur">
          <div className="grid md:grid-cols-[0.9fr_1.4fr]">
            <aside className="hidden bg-emerald-600 p-10 text-white md:block">
              <div className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-sm font-medium">
                <Sparkles className="h-4 w-4" />
                CareerMirror Quiz
              </div>

              <h2 className="mt-8 text-4xl font-bold tracking-tight">
                Let’s map your next career move.
              </h2>

              <p className="mt-4 text-sm leading-6 text-emerald-50">
                Answer a few focused questions so CareerMirror can understand
                your goals, strengths, work style, and ideal direction.
              </p>

              <div className="mt-10 space-y-4">
                {questions.map((q, index) => (
                  <div
                    key={q.key}
                    className={`flex items-center gap-3 rounded-2xl px-4 py-3 text-sm transition ${
                      index === step
                        ? "bg-white text-emerald-700 shadow-sm"
                        : index < step
                        ? "bg-white/15 text-white"
                        : "text-emerald-50/75"
                    }`}
                  >
                    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/20 text-xs font-bold">
                      {index + 1}
                    </span>
                    <span className="line-clamp-1">{q.label}</span>
                  </div>
                ))}
              </div>
            </aside>

            <div className="p-7 md:p-10">
              <div className="mb-8">
                <div className="mb-3 flex items-center justify-between text-sm">
                  <span className="font-medium text-slate-500">
                    Step {step + 1} of {questions.length}
                  </span>
                  <span className="font-semibold text-emerald-600">
                    {progress}%
                  </span>
                </div>

                <div className="h-2 w-full rounded-full bg-slate-100">
                  <div
                    className="h-2 rounded-full bg-emerald-500 transition-all duration-500"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>

              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-600">
                Question {step + 1}
              </p>

              <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-950 md:text-4xl">
                {current.label}
              </h1>

              <p className="mt-3 text-sm leading-6 text-slate-500">
                Be honest and specific. The better your answer, the better your
                career recommendations will be.
              </p>

              <textarea
                value={currentValue}
                onChange={(e) => update(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();

                    if (currentValue.trim()) {
                      next();
                    }
                  }
                }}
                className="mt-8 min-h-44 w-full resize-none rounded-3xl border border-slate-200 bg-white px-5 py-4 text-base text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100"
                placeholder={current.placeholder}
/>

              <div className="mt-8 flex items-center justify-between gap-4">
                <button
                  onClick={back}
                  disabled={step === 0}
                  className="inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold text-slate-600 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Back
                </button>

                <button
                  onClick={next}
                  disabled={!currentValue.trim()}
                  className="inline-flex items-center gap-2 rounded-full bg-emerald-600 px-7 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-200 transition hover:-translate-y-0.5 hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:translate-y-0"
                >
                  {step === questions.length - 1 ? "Continue to Resume" : "Next"}
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}