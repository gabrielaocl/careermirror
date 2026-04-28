export type QuizAnswers = {
  currentRole: string;
  energizingWork: string;
  drainingWork: string;
  workStyle: string;
  salaryGoal: string;
  timeline: string;
  industries: string;
  skills: string;
  values: string;
  targetRoles: string;
};

export type ResumeInput = {
  resumeText: string;
  education: string;
  projects: string;
  certifications: string;
  tools: string;
  achievements: string;
};

export const QUIZ_KEY = "careermirror_quiz";
export const RESUME_KEY = "careermirror_resume";

export function saveQuizAnswers(data: QuizAnswers) {
  localStorage.setItem(QUIZ_KEY, JSON.stringify(data));
}

export function getQuizAnswers(): QuizAnswers | null {
  const raw = localStorage.getItem(QUIZ_KEY);
  return raw ? JSON.parse(raw) : null;
}

export function saveResumeInput(data: ResumeInput) {
  localStorage.setItem(RESUME_KEY, JSON.stringify(data));
}

export function getResumeInput(): ResumeInput | null {
  const raw = localStorage.getItem(RESUME_KEY);
  return raw ? JSON.parse(raw) : null;
}

export function clearCareerMirrorData() {
  localStorage.removeItem(QUIZ_KEY);
  localStorage.removeItem(RESUME_KEY);
}