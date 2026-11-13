/**
 * About Project Details & Team Engine
 * JSPM University Pune | Academic Year 2026-27
 * Department of Electronics and Telecommunication Engineering
 */

export const PROJECT_DETAILS = {
  title: "AI-Based Cybercrime Detection and Awareness System (CyberGuard AI)",
  tagline: "Detect. Protect. Educate.",
  institution: "JSPM University Pune",
  faculty: "Faculty of Science and Technology",
  school: "School of Electrical and Communication Sciences",
  department: "Department of Electronics and Telecommunication Engineering",
  academicYear: "2026–27",
  course: "Innovation",
  courseCode: "230IINB02_05",
  guide: {
    title: "Faculty Project Guide",
    designation: "Assistant Professor",
    department: "Electronics and Telecommunication Engineering",
    institution: "JSPM University Pune"
  },
  divisions: [
    {
      id: 1,
      name: "AI & NLP Threat Modeling",
      domain: "Machine Learning & Heuristics",
      role: "Heuristic scam classification, linguistic syntax analysis & prompt engineering",
      icon: "🤖"
    },
    {
      id: 2,
      name: "UI/UX & Frontend Architecture",
      domain: "Design Systems & Web Client",
      role: "Apple-inspired minimalist design, accessibility & cross-platform responsiveness",
      icon: "🎨"
    },
    {
      id: 3,
      name: "Full-Stack & Backend Systems",
      domain: "Node.js & Security APIs",
      role: "Secure REST endpoints, threat database matching & session telemetry architecture",
      icon: "⚙️"
    },
    {
      id: 4,
      name: "Cybersecurity & Threat Research",
      domain: "Domain & Typosquat Analysis",
      role: "Levenshtein distance algorithms, TLD reputation audit & phishing gateway detection",
      icon: "🛡️"
    },
    {
      id: 5,
      name: "Awareness & Education Engine",
      domain: "Public Cyber Safety & Localization",
      role: "Multilingual awareness guides (EN, HI, MR), 1930 integration & interactive quiz",
      icon: "📚"
    }
  ]
};

export function renderAboutProjectSection() {
  const teamContainer = document.getElementById('project-team-grid');
  if (!teamContainer) return;

  teamContainer.innerHTML = PROJECT_DETAILS.divisions.map(div => `
    <div class="team-card">
      <div class="team-avatar-initials" style="font-size: 1.8rem;">${div.icon}</div>
      <h4 style="font-size: 1.05rem; margin-bottom: 4px;">${div.name}</h4>
      <p style="color: var(--color-secondary); font-weight: 600; font-size: 0.8125rem; margin-bottom: 8px;">${div.domain}</p>
      <p style="font-size: 0.8125rem; color: var(--color-text-secondary); line-height: 1.5;">${div.role}</p>
    </div>
  `).join('');
}
