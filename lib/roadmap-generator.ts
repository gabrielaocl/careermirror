import type { QuizAnswers, ResumeInput } from "./career-storage";

export function generateRoadmap(quiz: QuizAnswers | any, resume: ResumeInput | any) {
  const workStyle = (quiz?.workStyle || "").toLowerCase();

  let paths = [
    "Product Manager",
    "Customer Success Manager",
    "Operations Analyst",
  ];

  if (workStyle.includes("technical")) {
    paths = ["Solutions Engineer", "Data Analyst", "Technical Product Manager"];
  } else if (workStyle.includes("creative")) {
    paths = ["UX Researcher", "Brand Strategist", "Content Marketing Manager"];
  } else if (workStyle.includes("people")) {
    paths = ["Customer Success Manager", "Account Executive", "Recruiter"];
  } else if (workStyle.includes("analytical")) {
    paths = ["Data Analyst", "Business Analyst", "Strategy Associate"];
  }

  return {
    summary: `Based on your background as ${quiz?.currentRole || "a professional"}, your strongest pivot direction is toward roles that combine ${quiz?.workStyle || "your preferred work style"} with your existing skills in ${quiz?.skills || "your current experience"}.`,
    paths,
    transferableSkills: [
      quiz?.skills || "Communication and problem solving",
      resume?.achievements || "Project execution",
      resume?.tools || "Tool and process experience",
    ],
    gaps: [
      "Build one portfolio project related to your target role",
      "Update your resume language for your new direction",
      "Start networking with people already in the role",
    ],
    bullets: [
      `Translated experience in ${quiz?.currentRole || "current role"} into measurable business impact.`,
      `Applied ${quiz?.skills || "transferable skills"} to solve cross-functional problems.`,
      `Built experience across ${quiz?.industries || "target industries"} with a focus on execution and learning.`,
    ],
    headline: `${quiz?.currentRole || "Professional"} pivoting into ${paths[0]} | ${quiz?.workStyle || "Strategic"} problem solver`,
    plan30: [
      "Finalize target role list",
      "Rewrite resume for top pivot path",
      "Update LinkedIn headline and about section",
      "Reach out to 5 people in target roles",
    ],
    plan60: [
      "Complete one role-relevant project",
      "Apply to 15 targeted roles",
      "Schedule 3 informational interviews",
      "Practice interview stories using STAR format",
    ],
    plan90: [
      "Apply to 30+ roles with referrals where possible",
      "Publish or share portfolio project",
      "Refine resume based on recruiter feedback",
      "Prepare salary and transition story",
    ],
    networkingMessage: `Hi [Name], I'm exploring a pivot from ${quiz?.currentRole || "my current background"} into ${paths[0]}. I'd really appreciate hearing how you got into the role and what skills matter most. Would you be open to a quick 15-minute chat?`,
    confidence: quiz?.skills && quiz?.targetRoles ? 82 : 68,
  };
}
