// lib/resumeData.js — Single source of truth for all resume content
// Update this file to change content across all persona zones

export const CONTACT = {
  name: 'Rahul Hiratsingh Sisode',
  email: 'sisoderahul643@gmail.com',
  phone: '+91-9730213645',
  location: 'Ratnagiri, Maharashtra',
  linkedin: 'https://linkedin.com/in/rahul-sisode',
  github: 'https://github.com/Rahul1613',
  victarc: 'https://victarc.in',
  hyrinx: 'https://hyrinx.in',
};

export const EDUCATION = [
  {
    degree: 'B.E. — Artificial Intelligence & Machine Learning',
    institute: 'Gharda Institute of Technology, Mumbai University',
    period: '2023 – 2026',
    result: 'CGPA: 6.57',
    icon: '🎓',
  },
  {
    degree: 'Diploma — Computer Science Engineering',
    institute: 'Rajendra Mane Polytechnic College, Ratnagiri',
    period: '2020 – 2023',
    result: '72.57%',
    icon: '📜',
  },
];

export const CERTIFICATIONS = [
  { name: 'AWS Cloud Foundations', issuer: 'Amazon Web Services', tags: ['dev', 'security'] },
  { name: 'Python Workshop', issuer: 'IIT Bombay', tags: ['dev'] },
  { name: 'AI Primer', issuer: 'Infosys Springboard', tags: ['dev', 'security'] },
  { name: 'Data Science Fundamentals', issuer: 'Infosys Springboard', tags: ['dev', 'marketing'] },
  { name: 'Digital Marketing', issuer: 'Google', tags: ['marketing'] },
  { name: 'Ethical Hacking 101', issuer: 'Simplilearn', tags: ['security'] },
  { name: 'UI/UX Design', issuer: 'CODEC Technologies', tags: ['dev', 'marketing'] },
  { name: 'Machine Learning', issuer: 'Great Learning Academy', tags: ['dev', 'security'] },
  { name: 'Data Analytics', issuer: 'Great Learning Academy', tags: ['dev', 'marketing'] },
  { name: 'Business Analytics', issuer: 'Great Learning Academy', tags: ['marketing'] },
  { name: 'Python for ML', issuer: 'Great Learning Academy', tags: ['dev'] },
  { name: 'NLP Fundamentals', issuer: 'Great Learning Academy', tags: ['dev', 'security'] },
  { name: 'Deep Learning', issuer: 'Great Learning Academy', tags: ['dev'] },
  { name: 'Computer Vision', issuer: 'Great Learning Academy', tags: ['dev'] },
  { name: 'OPSWAT Academy Portal', issuer: 'OPSWAT', tags: ['security'] },
];

export const PROJECTS = [
  {
    id: 'scalnex',
    filename: 'scalnex.py',
    name: 'Scalnex',
    tagline: 'Business Growth & Job SaaS Platform',
    description:
      'Production-ready SaaS with role-based dashboards, JWT auth, RESTful APIs, real-time notifications, and scalable MongoDB/PostgreSQL schemas covering business listings, lead generation & job discovery.',
    tech: ['React.js', 'Django', 'MongoDB', 'JWT', 'PostgreSQL'],
    year: '2026',
    status: 'LIVE',
    github: 'https://github.com/Rahul1613/Scalnex',
    live: 'https://scalnex-businessgrowthplatform.netlify.app',
    tags: ['dev', 'marketing'],
    securityTag: null,
  },
  {
    id: 'phishing',
    filename: 'phishing_engine.py',
    name: 'AI Phishing Detection Engine',
    tagline: 'Enterprise ML+NLP Threat Detection',
    description:
      'Enterprise-grade ML classifier with NLP feature extraction for real-time phishing URL detection; React.js threat dashboard with REST API inference pipeline for scalable threat intelligence.',
    tech: ['Python', 'ML', 'NLP', 'React.js', 'REST API'],
    year: '2024',
    status: 'LIVE',
    github: 'https://github.com/Rahul1613/AI-POWERED-PHISHING-DETECTION-ENGINE-ENTERPRISE-ACTIVE',
    live: 'https://phishing-detection-ai-powered.netlify.app',
    tags: ['dev', 'security'],
    securityTag: { severity: 'HIGH', category: 'THREAT DETECTION' },
  },
  {
    id: 'securepass',
    filename: 'securepass_ai.py',
    name: 'SecurePass AI',
    tagline: 'Intelligent Password Security Analyzer',
    description:
      'AI-driven password strength analyzer with client-side encryption, real-time entropy scoring, and ML-generated hardened suggestions; enforces best-practice credential hygiene at scale.',
    tech: ['Python', 'AI', 'React.js', 'Cryptography'],
    year: '2024',
    status: 'LIVE',
    github: 'https://github.com/Rahul1613/SecurePass-AI-',
    live: 'https://securepass-ai.netlify.app',
    tags: ['dev', 'security'],
    securityTag: { severity: 'MEDIUM', category: 'CREDENTIAL SECURITY' },
  },
  {
    id: 'assessment',
    filename: 'assessment_platform.py',
    name: 'Aptitude Assessment Platform',
    tagline: 'Multi-subject Quiz System with Chatbot',
    description:
      'Multi-subject quiz system (Python, Java, C) with CSV bulk upload, automated Excel reports, slot booking, chatbot support, and admin CRUD — scaled to 50+ concurrent test sessions.',
    tech: ['Django', 'SQLite', 'Admin Panel', 'Chatbot'],
    year: '2024',
    status: 'LIVE',
    github: 'https://github.com/Rahul1613/quizprojectapp',
    live: 'https://quizprojectapp.onrender.com',
    tags: ['dev'],
    securityTag: null,
  },
  {
    id: 'voice',
    filename: 'voice_assistant.py',
    name: 'AI Voice Assistant',
    tagline: 'Desktop Automation via NLP',
    description:
      'Voice-controlled desktop agent with speech recognition, TTS output, web navigation, and OS automation — applied NLP + system-level Python for hands-free productivity.',
    tech: ['Python', 'Speech Recognition', 'NLP', 'TTS'],
    year: '2023',
    status: 'LIVE',
    github: 'https://github.com/Rahul1613',
    live: null,
    tags: ['dev'],
    securityTag: null,
  },
  {
    id: 'stego',
    filename: 'steganography.py',
    name: 'Image Steganography Tool',
    tagline: 'LSB-based Data Concealment',
    description:
      'LSB-based data hiding in images; demonstrates information concealment and retrieval techniques using Python with zero visual degradation of carrier images.',
    tech: ['Python', 'Image Processing', 'Cryptography'],
    year: '2023',
    status: 'LIVE',
    github: 'https://github.com/Rahul1613',
    live: null,
    tags: ['security', 'dev'],
    securityTag: { severity: 'MEDIUM', category: 'COVERT CHANNEL' },
  },
  {
    id: 'victarc',
    filename: 'victarc.tsx',
    name: 'VICTARC',
    tagline: 'Live SaaS Product — Subscription Platform',
    description:
      'Self-shipped SaaS product with subscription tiers, user onboarding, JWT auth flow, and role-based dashboards. Live in production.',
    tech: ['React', 'Django', 'MongoDB', 'JWT'],
    year: '2025',
    status: 'LIVE',
    github: 'https://github.com/Rahul1613',
    live: 'https://victarc.in',
    tags: ['dev', 'marketing'],
    securityTag: null,
  },
  {
    id: 'hyrinx',
    filename: 'hyrinx.tsx',
    name: 'HYRINX',
    tagline: 'Live Advertising Platform',
    description:
      'Self-shipped advertising platform for local businesses with campaign management tools, business listings, and lead generation workflows. Live in production.',
    tech: ['React', 'Node.js', 'MongoDB'],
    year: '2025',
    status: 'LIVE',
    github: 'https://github.com/Rahul1613',
    live: 'https://hyrinx.in',
    tags: ['dev', 'marketing'],
    securityTag: null,
  },
];

export const EXPERIENCE = [
  {
    hash: 'a3f91bc',
    role: 'Python Developer Intern',
    company: 'PHP Web World',
    period: 'Dec 2023 – Jan 2024',
    bullets: [
      'Rebuilt Library Management System in Python; reduced manual catalog errors by ~40%',
      'Automated overdue tracking; cut staff processing time by 30%',
      'Refactored 3 legacy modules into maintainable architecture adopted across codebase',
    ],
    tags: ['dev'],
    icon: '💻',
    type: 'technical',
  },
  {
    hash: '7d2e4a1',
    role: 'Web Design Intern',
    company: 'Gadre Infotech Pvt. Ltd.',
    period: 'Jun 2022 – Jul 2022',
    bullets: [
      'Designed & delivered 5+ responsive HTML5/CSS3 pages for client-facing properties',
      'Reduced average page load time by ~20% through optimised asset structure',
      'Achieved 100% cross-browser compatibility across Chrome, Firefox, and Edge',
    ],
    tags: ['dev', 'marketing'],
    icon: '🎨',
    type: 'design',
  },
  {
    hash: 'f5c8d3e',
    role: 'UI/UX Intern',
    company: 'CODEC Technologies',
    period: '2022',
    bullets: [
      'Designed user interfaces and prototypes for client projects',
      'Conducted user research and created wireframes',
    ],
    tags: ['marketing'],
    icon: '🖌️',
    type: 'design',
  },
  {
    hash: 'b2a91f7',
    role: 'Campus Ambassador',
    company: 'IIT Bombay Techfest 2024',
    period: '2024',
    bullets: [
      'Led campus outreach and promotion for India\'s largest technical festival',
      'Coordinated student participation and event logistics at Gharda Institute',
    ],
    tags: ['marketing'],
    icon: '📣',
    type: 'marketing',
  },
];

export const SECURITY_LEARNING = [
  'Network Security Fundamentals',
  'TryHackMe — SOC Level 1 (In Progress)',
  'OPSWAT Academy Portal — Completed',
  'Kali Linux Basics',
  'Wireshark Packet Analysis',
  'Metasploit Framework Intro',
];

export const DEV_SKILLS = {
  languages: ['Python', 'JavaScript (ES6+)', 'C', 'Java'],
  frontend: ['React.js', 'HTML5', 'CSS3', 'Tailwind CSS', 'Three.js'],
  backend: ['Django', 'Node.js', 'REST APIs', 'JWT Auth'],
  databases: ['MongoDB', 'PostgreSQL', 'SQLite'],
  ai_ml: ['Supervised ML', 'Unsupervised ML', 'NLP', 'Prompt Engineering'],
  tools: ['Git', 'GitHub', 'Linux (Kali)', 'Vercel', 'AWS', 'Google Analytics'],
};

export const MARKETING_SKILLS = {
  digital_marketing: ['Google Analytics', 'SEO', 'Content Strategy', 'Growth Hacking', 'Google Tag Manager'],
  social_content: ['Content Planning', 'Instagram Strategy', 'Community Building', 'AI + Money + Mindset'],
  product_growth: ['GTM Strategy', 'Pricing', 'User Journey', 'Product Positioning', 'Conversion Optimization'],
  ai_marketing: ['AI Content Tools', 'Prompt Engineering', 'AI-Powered Campaigns', 'Automated Outreach'],
};

export const SECURITY_SKILLS = {
  tools: ['Kali Linux', 'Wireshark', 'Metasploit', 'Burp Suite Basics', 'Nmap'],
  programming: ['Python', 'C', 'Bash Scripting'],
  ai_security: ['NLP Threat Analysis', 'ML Classifiers', 'Cryptography', 'Entropy Analysis'],
  certifications: ['Ethical Hacking 101 (Simplilearn)', 'AWS Cloud Foundations', 'OPSWAT Academy'],
};
