"use client";

import { useState, useRef } from "react";
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

type TabType = "paste" | "upload" | "linkedin-url" | "linkedin-profile";

export default function ResumePage() {
  const router = useRouter();
  const [form, setForm] = useState(initialForm);
  const [activeTab, setActiveTab] = useState<TabType>("paste");
  const [linkedinUrl, setLinkedinUrl] = useState("");
  const [linkedinProfile, setLinkedinProfile] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  function updateField(field: keyof ResumeInput, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleFileUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    const text = await file.text();
    updateField("resumeText", text);
    setActiveTab("paste");
  }

  function handleLinkedinUrlSubmit() {
    if (linkedinUrl.trim()) {
      updateField("resumeText", `LinkedIn Profile: ${linkedinUrl}`);
      setLinkedinUrl("");
      setActiveTab("paste");
    }
  }

  function handleLinkedinProfileSubmit() {
    if (linkedinProfile.trim()) {
      updateField("resumeText", linkedinProfile);
      setLinkedinProfile("");
      setActiveTab("paste");
    }
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
          Choose how you'd like to share your experience. CareerMirror will analyze it into a pivot roadmap.
        </p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-5 rounded-3xl bg-white p-6 shadow-sm">
          {/* Tab Navigation */}
          <div className="flex border-b border-slate-200">
            <TabButton active={activeTab === "paste"} onClick={() => setActiveTab("paste")}>
              Paste Resume
            </TabButton>
            <TabButton active={activeTab === "upload"} onClick={() => setActiveTab("upload")}>
              Upload File
            </TabButton>
            <TabButton active={activeTab === "linkedin-url"} onClick={() => setActiveTab("linkedin-url")}>
              LinkedIn URL
            </TabButton>
            <TabButton active={activeTab === "linkedin-profile"} onClick={() => setActiveTab("linkedin-profile")}>
              Paste LinkedIn
            </TabButton>
          </div>

          {/* Tab Content */}
          <div className="space-y-4 pt-4">
            {activeTab === "paste" && (
              <div className="space-y-3">
                <Textarea
                  label="Paste your resume or experience"
                  value={form.resumeText}
                  onChange={(v) => updateField("resumeText", v)}
                  large
                />
              </div>
            )}

            {activeTab === "upload" && (
              <div className="space-y-3">
                <label className="block">
                  <span className="font-medium text-slate-800">Upload Resume File</span>
                  <div className="mt-2 rounded-2xl border-2 border-dashed border-slate-300 px-4 py-8 text-center hover:border-emerald-400">
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept=".txt,.pdf,.doc,.docx"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="text-emerald-600 hover:text-emerald-700 font-medium"
                    >
                      Click to upload or drag file
                    </button>
                    <p className="mt-2 text-sm text-slate-500">.txt, .pdf, .doc, .docx</p>
                  </div>
                </label>
              </div>
            )}

            {activeTab === "linkedin-url" && (
              <div className="space-y-3">
                <label className="block">
                  <span className="font-medium text-slate-800">LinkedIn Profile URL</span>
                  <input
                    type="url"
                    placeholder="https://linkedin.com/in/yourprofile"
                    value={linkedinUrl}
                    onChange={(e) => setLinkedinUrl(e.target.value)}
                    className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-emerald-500"
                  />
                </label>
                <button
                  type="button"
                  onClick={handleLinkedinUrlSubmit}
                  className="w-full rounded-full bg-emerald-600 px-6 py-3 font-semibold text-white hover:bg-emerald-700"
                >
                  Add LinkedIn URL
                </button>
              </div>
            )}

            {activeTab === "linkedin-profile" && (
              <div className="space-y-3">
                <Textarea
                  label="Paste your LinkedIn About & Experience"
                  value={linkedinProfile}
                  onChange={(v) => setLinkedinProfile(v)}
                  large
                />
                <button
                  type="button"
                  onClick={handleLinkedinProfileSubmit}
                  className="w-full rounded-full bg-emerald-600 px-6 py-3 font-semibold text-white hover:bg-emerald-700"
                >
                  Add LinkedIn Profile
                </button>
              </div>
            )}
          </div>

          {/* Details Section */}
          <div className="space-y-5 border-t border-slate-200 pt-6">
            <Textarea label="Education" value={form.education} onChange={(v) => updateField("education", v)} />
            <Textarea label="Top projects" value={form.projects} onChange={(v) => updateField("projects", v)} />
            <Textarea label="Certifications" value={form.certifications} onChange={(v) => updateField("certifications", v)} />
            <Textarea label="Tools or technologies" value={form.tools} onChange={(v) => updateField("tools", v)} />
            <Textarea label="Work achievements" value={form.achievements} onChange={(v) => updateField("achievements", v)} />
          </div>

          <button className="w-full rounded-full bg-emerald-600 px-6 py-3 font-semibold text-white hover:bg-emerald-700">
            Generate My Roadmap
          </button>
        </form>
      </div>
    </main>
  );
}

function TabButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`px-4 py-2 font-medium text-sm transition-colors ${
        active
          ? "text-emerald-600 border-b-2 border-emerald-600"
          : "text-slate-600 border-b-2 border-transparent hover:text-slate-800"
      }`}
    >
      {children}
    </button>
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