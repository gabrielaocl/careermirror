"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  clearCareerMirrorData,
  getQuizAnswers,
  getResumeInput,
  type QuizAnswers,
  type ResumeInput,
} from "@/lib/career-storage";
import { generateRoadmap } from "@/lib/roadmap-generator";

export default function RoadmapPage() {
  const [quiz, setQuiz] = useState<QuizAnswers | null>(null);
  const [resume, setResume] = useState<ResumeInput | null>(null);

  useEffect(() => {
    setQuiz(getQuizAnswers());
    setResume(getResumeInput());
  }, []);

  if (!quiz || !resume) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#f6fbf7] px-6">
        <div className="max-w-xl rounded-3xl bg-white p-8 text-center shadow-sm">
          <h1 className="text-3xl font-bold text-slate-900">No roadmap yet</h1>
          <p className="mt-3 text-slate-600">
            Complete the quiz and resume section first so CareerMirror can build your roadmap.
          </p>
          <Link
            href="/quiz"
            className="mt-6 inline-block rounded-full bg-emerald-600 px-6 py-3 font-semibold text-white hover:bg-emerald-700"
          >
            Start Quiz
          </Link>
        </div>
      </main>
    );
  }

  const roadmap = generateRoadmap(quiz, resume);

  function copyRoadmap() {
    navigator.clipboard.writeText(document.body.innerText);
  }

  function downloadRoadmap() {
    const blob = new Blob([document.body.innerText], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "careermirror-roadmap.txt";
    a.click();
    URL.revokeObjectURL(url);
  }

  function startOver() {
    clearCareerMirrorData();
    window.location.href = "/quiz";
  }

  return (
    <main className="min-h-screen bg-[#f6fbf7] px-6 py-10">
      <div className="mx-auto max-w-5xl">
        <div className="rounded-3xl bg-white p-8 shadow-sm">
          <p className="text-sm font-semibold uppercase tracking-wide text-emerald-700">
            CareerMirror Roadmap
          </p>
          <h1 className="mt-2 text-4xl font-bold text-slate-900">
            Your Personalized Career Pivot Plan
          </h1>
          <p className="mt-4 text-lg text-slate-600">{roadmap.summary}</p>

          <div className="mt-6 rounded-2xl bg-emerald-50 p-5">
            <p className="font-semibold text-slate-900">Confidence Score</p>
            <p className="mt-1 text-3xl font-bold text-emerald-700">{roadmap.confidence}/100</p>
            <p className="mt-1 text-slate-600">
              This score reflects how clearly your interests, skills, and target roles connect.
            </p>
          </div>
        </div>

        <Section title="Top 3 Recommended Pivot Paths">
          <div className="grid gap-4 md:grid-cols-3">
            {roadmap.paths.map((path) => (
              <div key={path} className="rounded-2xl bg-white p-5 shadow-sm">
                <h3 className="text-xl font-bold text-slate-900">{path}</h3>
                <p className="mt-2 text-slate-600">
                  This path fits your preferred work style, current skills, and stated interests.
                </p>
              </div>
            ))}
          </div>
        </Section>

        <Section title="Transferable Skills">
          <List items={roadmap.transferableSkills} />
        </Section>

        <Section title="Skills Gaps">
          <List items={roadmap.gaps} />
        </Section>

        <Section title="Resume Positioning Bullets">
          <List items={roadmap.bullets} />
        </Section>

        <Section title="LinkedIn Headline">
          <div className="rounded-2xl bg-white p-5 shadow-sm">
            <p className="text-slate-700">{roadmap.headline}</p>
          </div>
        </Section>

        <Section title="30 / 60 / 90 Day Plan">
          <div className="grid gap-4 md:grid-cols-3">
            <Plan title="First 30 Days" items={roadmap.plan30} />
            <Plan title="Days 31–60" items={roadmap.plan60} />
            <Plan title="Days 61–90" items={roadmap.plan90} />
          </div>
        </Section>

        <Section title="Networking Message Template">
          <div className="rounded-2xl bg-white p-5 shadow-sm">
            <p className="text-slate-700">{roadmap.networkingMessage}</p>
          </div>
        </Section>

        <div className="mt-8 flex flex-wrap gap-3">
          <button onClick={copyRoadmap} className="rounded-full bg-slate-900 px-5 py-3 font-semibold text-white">
            Copy Roadmap
          </button>
          <button onClick={downloadRoadmap} className="rounded-full bg-white px-5 py-3 font-semibold text-slate-900 shadow-sm">
            Download Text File
          </button>
          <button onClick={startOver} className="rounded-full bg-white px-5 py-3 font-semibold text-slate-900 shadow-sm">
            Start Over
          </button>
        </div>
      </div>
    </main>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-8">
      <h2 className="mb-4 text-2xl font-bold text-slate-900">{title}</h2>
      {children}
    </section>
  );
}

function List({ items }: { items: string[] }) {
  return (
    <ul className="space-y-3 rounded-2xl bg-white p-5 shadow-sm">
      {items.map((item) => (
        <li key={item} className="text-slate-700">
          • {item}
        </li>
      ))}
    </ul>
  );
}

function Plan({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="rounded-2xl bg-white p-5 shadow-sm">
      <h3 className="font-bold text-slate-900">{title}</h3>
      <ul className="mt-3 space-y-2">
        {items.map((item) => (
          <li key={item} className="text-slate-700">
            • {item}
          </li>
        ))}
      </ul>
    </div>
  );
}