"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Zap, Users, Briefcase, Target, Lock } from "lucide-react";
import {
  clearCareerMirrorData,
  getQuizAnswers,
  getResumeInput,
  type QuizAnswers,
  type ResumeInput,
} from "@/lib/career-storage";
import { generateRoadmap } from "@/lib/roadmap-generator";
import AuthModal from "@/components/auth-modal";

export default function RoadmapPage() {
  const [quiz, setQuiz] = useState<QuizAnswers | null>(null);
  const [resume, setResume] = useState<ResumeInput | null>(null);
  const [showAuthModal, setShowAuthModal] = useState(false);

  useEffect(() => {
    setQuiz(getQuizAnswers());
    setResume(getResumeInput());
  }, []);

  if (!quiz && !resume) {
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

  const roadmap = generateRoadmap(quiz || ({} as QuizAnswers), resume || ({} as ResumeInput));

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

        <Section title="Your Roadmap Dashboard">
          <div className="rounded-2xl bg-gradient-to-br from-slate-50 to-slate-100 p-8 shadow-sm border border-slate-200">
            <div className="mb-6">
              <h3 className="text-lg font-bold text-slate-900 mb-2">Track Your Progress</h3>
              <p className="text-sm text-slate-600">Monitor each milestone on your journey to your new career</p>
            </div>

            {/* Timeline */}
            <div className="space-y-4">
              {/* Phase 1 */}
              <div className="flex gap-4 items-start">
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-full bg-emerald-500 flex items-center justify-center text-white font-bold text-sm">✓</div>
                  <div className="w-1 h-12 bg-emerald-300 mt-2" />
                </div>
                <div className="flex-1 pt-1">
                  <div className="bg-white rounded-xl p-4 shadow-sm border border-emerald-200">
                    <p className="font-bold text-slate-900">Month 1-2: Upskill</p>
                    <p className="text-sm text-slate-600 mt-1">Complete foundational courses and build initial project</p>
                    <div className="mt-3 flex gap-2">
                      <span className="inline-block px-2 py-1 bg-emerald-100 text-emerald-700 text-xs font-semibold rounded-full">In Progress</span>
                      <span className="inline-block px-2 py-1 bg-slate-100 text-slate-600 text-xs rounded-full">2/4 tasks</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Phase 2 */}
              <div className="flex gap-4 items-start">
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold text-sm">2</div>
                  <div className="w-1 h-12 bg-slate-300 mt-2" />
                </div>
                <div className="flex-1 pt-1">
                  <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-200">
                    <p className="font-bold text-slate-900">Month 3-4: Network</p>
                    <p className="text-sm text-slate-600 mt-1">Build relationships with industry professionals and mentors</p>
                    <div className="mt-3 flex gap-2">
                      <span className="inline-block px-2 py-1 bg-blue-100 text-blue-700 text-xs font-semibold rounded-full">Not Started</span>
                      <span className="inline-block px-2 py-1 bg-slate-100 text-slate-600 text-xs rounded-full">0/3 tasks</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Phase 3 */}
              <div className="flex gap-4 items-start">
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-full bg-purple-500 flex items-center justify-center text-white font-bold text-sm">3</div>
                  <div className="w-1 h-12 bg-slate-300 mt-2" />
                </div>
                <div className="flex-1 pt-1">
                  <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-200">
                    <p className="font-bold text-slate-900">Month 5-6: Apply & Interview</p>
                    <p className="text-sm text-slate-600 mt-1">Start applying to target roles and practice interviews</p>
                    <div className="mt-3 flex gap-2">
                      <span className="inline-block px-2 py-1 bg-purple-100 text-purple-700 text-xs font-semibold rounded-full">Not Started</span>
                      <span className="inline-block px-2 py-1 bg-slate-100 text-slate-600 text-xs rounded-full">0/4 tasks</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Phase 4 */}
              <div className="flex gap-4 items-start">
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-full bg-pink-500 flex items-center justify-center text-white font-bold text-sm">4</div>
                </div>
                <div className="flex-1 pt-1">
                  <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-200">
                    <p className="font-bold text-slate-900">Month 7+: Transition</p>
                    <p className="text-sm text-slate-600 mt-1">Negotiate offer and prepare for your new role</p>
                    <div className="mt-3 flex gap-2">
                      <span className="inline-block px-2 py-1 bg-pink-100 text-pink-700 text-xs font-semibold rounded-full">Not Started</span>
                      <span className="inline-block px-2 py-1 bg-slate-100 text-slate-600 text-xs rounded-full">0/3 tasks</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Summary Stats */}
            <div className="mt-6 grid grid-cols-3 gap-4">
              <div className="bg-white rounded-lg p-4 text-center border border-slate-200">
                <p className="text-2xl font-bold text-emerald-600">25%</p>
                <p className="text-xs text-slate-600 mt-1">Roadmap Complete</p>
              </div>
              <div className="bg-white rounded-lg p-4 text-center border border-slate-200">
                <p className="text-2xl font-bold text-blue-600">2/10</p>
                <p className="text-xs text-slate-600 mt-1">Tasks Completed</p>
              </div>
              <div className="bg-white rounded-lg p-4 text-center border border-slate-200">
                <p className="text-2xl font-bold text-slate-700">6 mo</p>
                <p className="text-xs text-slate-600 mt-1">Timeline Est.</p>
              </div>
            </div>

            <p className="text-xs text-slate-600 mt-4 text-center">
              Sign in to save your progress and unlock the full interactive dashboard
            </p>
          </div>
        </Section>

        <div className="mt-8 flex flex-wrap gap-3">
          <button onClick={() => setShowAuthModal(true)} className="rounded-full bg-emerald-600 px-5 py-3 font-semibold text-white hover:bg-emerald-700">
            Sign In to Save
          </button>
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

        <AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} />
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