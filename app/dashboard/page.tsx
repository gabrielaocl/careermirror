"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getQuizAnswers, getResumeInput } from "@/lib/career-storage";
import Link from "next/link";
import {
  LayoutDashboard,
  Briefcase,
  HelpCircle,
  LogOut,
  TrendingUp,
  CheckCircle,
  Clock,
  Zap,
} from "lucide-react";

type User = {
  id: string;
  email: string;
  name: string;
  createdAt: string;
};

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [quizData, setQuizData] = useState<any>(null);
  const [resumeData, setResumeData] = useState<any>(null);

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (!userData) {
      router.push("/auth");
      return;
    }

    setUser(JSON.parse(userData));
    setQuizData(getQuizAnswers());
    setResumeData(getResumeInput());
    setLoading(false);
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    router.push("/");
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-[#f6fbf7] flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-emerald-200 border-t-emerald-600 rounded-full animate-spin mx-auto" />
          <p className="mt-4 text-slate-600">Loading your dashboard...</p>
        </div>
      </main>
    );
  }

  if (!user) return null;

  return (
    <main className="min-h-screen bg-[#f6fbf7]">
      <div className="flex">
        {/* Sidebar */}
        <aside className="w-56 bg-white border-r border-slate-200 p-6 fixed h-screen overflow-y-auto">
          <div className="mb-8">
            <h2 className="text-sm font-semibold text-slate-600 uppercase">Menu</h2>
            <nav className="mt-4 space-y-2">
              {[
                {
                  icon: LayoutDashboard,
                  label: "Dashboard",
                  href: "/dashboard",
                  active: true,
                },
                { icon: Briefcase, label: "Career Quiz", href: "/quiz" },
                {
                  icon: HelpCircle,
                  label: "Resume Review",
                  href: "/resume",
                },
                { icon: TrendingUp, label: "Career Matches", href: "/matches" },
                { icon: Clock, label: "Roadmap", href: "/roadmap" },
              ].map((item, i) => (
                <Link
                  key={i}
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-2 rounded-lg text-sm font-medium transition ${
                    item.active
                      ? "bg-emerald-50 text-emerald-600"
                      : "text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50 rounded-lg transition mt-auto"
          >
            <LogOut className="w-5 h-5" />
            Logout
          </button>
        </aside>

        {/* Main Content */}
        <div className="ml-56 flex-1 p-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-slate-900">
              Welcome back, <span className="text-emerald-600">{user.name}</span>{" "}
              👋
            </h1>
            <p className="mt-2 text-slate-600">
              Your career transformation hub. Let's make progress today.
            </p>
          </div>

          {/* Workspace Cards Grid */}
          <div className="grid grid-cols-2 gap-6 mb-8">
            {/* Quiz Card */}
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-6 border border-purple-200">
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 bg-purple-500 rounded-xl flex items-center justify-center">
                  <Zap className="w-6 h-6 text-white" />
                </div>
                <CheckCircle className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900">Career Quiz</h3>
              <p className="text-sm text-slate-600 mt-1">Completed</p>
              <Link
                href="/quiz"
                className="text-purple-600 hover:text-purple-700 font-medium text-sm mt-4 inline-block"
              >
                Review →
              </Link>
            </div>

            {/* Resume Card */}
            <div className="bg-gradient-to-br from-emerald-50 to-green-100 rounded-2xl p-6 border border-emerald-200">
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 bg-emerald-600 rounded-xl flex items-center justify-center">
                  <Briefcase className="w-6 h-6 text-white" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-slate-900">Resume Review</h3>
              <p className="text-sm text-slate-600 mt-1">
                {resumeData ? "Analyzing your resume" : "Ready to upload"}
              </p>
              <div className="w-full bg-slate-200 rounded-full h-2 mt-4">
                <div className="bg-emerald-600 h-2 rounded-full" style={{ width: "78%" }} />
              </div>
              <p className="text-xs text-slate-600 mt-2">78%</p>
              <Link
                href="/resume"
                className="text-emerald-600 hover:text-emerald-700 font-medium text-sm mt-4 inline-block"
              >
                Open →
              </Link>
            </div>

            {/* LinkedIn Card */}
            <div className="bg-gradient-to-br from-blue-50 to-cyan-100 rounded-2xl p-6 border border-blue-200">
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center">
                  <Briefcase className="w-6 h-6 text-white" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-slate-900">
                LinkedIn Review
              </h3>
              <p className="text-sm text-slate-600 mt-1">Profile analyzed</p>
              <Link
                href="/resume?tab=linkedin-profile"
                className="text-blue-600 hover:text-blue-700 font-medium text-sm mt-4 inline-block"
              >
                Open →
              </Link>
            </div>

            {/* Roadmap Card */}
            <div className="bg-gradient-to-br from-pink-50 to-rose-100 rounded-2xl p-6 border border-pink-200">
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 bg-pink-600 rounded-xl flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-slate-900">
                Career Roadmap
              </h3>
              <p className="text-sm text-slate-600 mt-1">In progress</p>
              <div className="w-full bg-slate-200 rounded-full h-2 mt-4">
                <div className="bg-pink-600 h-2 rounded-full" style={{ width: "45%" }} />
              </div>
              <p className="text-xs text-slate-600 mt-2">45%</p>
              <Link
                href="/roadmap"
                className="text-pink-600 hover:text-pink-700 font-medium text-sm mt-4 inline-block"
              >
                Open →
              </Link>
            </div>
          </div>

          {/* Progress & Tasks */}
          <div className="grid grid-cols-3 gap-6">
            {/* Overall Progress */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200">
              <h3 className="font-semibold text-slate-900 mb-4">
                Your Progress
              </h3>
              <div className="flex items-center gap-4">
                <div className="w-24 h-24 relative">
                  <svg className="w-24 h-24 transform -rotate-90">
                    <circle
                      cx="48"
                      cy="48"
                      r="44"
                      fill="none"
                      stroke="#e5e7eb"
                      strokeWidth="4"
                    />
                    <circle
                      cx="48"
                      cy="48"
                      r="44"
                      fill="none"
                      stroke="#059669"
                      strokeWidth="4"
                      strokeDasharray="276"
                      strokeDashoffset="152"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-2xl font-bold text-emerald-600">
                      64%
                    </span>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-slate-600">Overall Progress</p>
                  <p className="text-xs text-slate-500 mt-1">
                    You're doing great!
                  </p>
                </div>
              </div>
            </div>

            {/* Upcoming Tasks */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200">
              <h3 className="font-semibold text-slate-900 mb-4">
                Upcoming Tasks
              </h3>
              <div className="space-y-3">
                <div className="flex gap-2">
                  <input type="checkbox" className="mt-1" />
                  <div>
                    <p className="text-sm font-medium text-slate-900">
                      Skill assessment
                    </p>
                    <p className="text-xs text-red-600">Due in 2 days</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <input type="checkbox" className="mt-1" />
                  <div>
                    <p className="text-sm font-medium text-slate-900">
                      Finish roadmap
                    </p>
                    <p className="text-xs text-slate-500">Due in 5 days</p>
                  </div>
                </div>
              </div>
            </div>

            {/* AI Tip */}
            <div className="bg-gradient-to-br from-emerald-50 to-green-50 rounded-2xl p-6 border border-emerald-200">
              <h3 className="font-semibold text-slate-900 mb-3">💡 AI Tip</h3>
              <p className="text-sm text-slate-700">
                Consider strengthening your leadership and storytelling skills.
                They unlock more senior opportunities for you.
              </p>
              <Link
                href="/resources"
                className="text-emerald-600 hover:text-emerald-700 font-medium text-sm mt-4 inline-block"
              >
                Explore Resources →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
