// ─────────────────────────────────────────────────────────────────────────────
// STATIC PROJECTS DATA
// Edit this file to add / update / remove projects.
// Each project's `id` is used in the URL: /project/<id>
// ─────────────────────────────────────────────────────────────────────────────

const projects = [
 {
  id: "hm-motors-ev",
  title: "HM Motors EV Website Redesign",
  shortDescription: "Redesigning a legacy automotive brand for the electric era.",
  description: "<p>A complete UX redesign of HM Motors' website — improving brand trust, product discovery, and user journey for EV-first users.</p>",
  thumbnailUrl: "/HM Thambinale.png",
  category: "UI/UX Design",
  year: "2025",
  role: "UI/UX Designer",
  tools: ["Figma", "Notion"],
  tags: ["UI/UX", "Web Design", "Automotive", "EV"],
  liveLink: "https://hindustan-motors.vercel.app/",
  repoLink: "",
  pdfUrl: "",
  images: [],
  contentModules: [
    {
      id: "mod-1",
      type: "image",
      content: {
        urls: ["/HM casstady.png"],
        caption: "HM Motors EV Website Redesign Case Study",
      },
    },
  ],
},

  // {
  //   id: "project-two",
  //   title: "Project Two",
  //   shortDescription: "Another showcase project highlighting your skills.",
  //   description: "<p>Describe what this project does, the problem it solves, and what you learned.</p>",
  //   thumbnailUrl: "https://placehold.co/800x500/16213e/7f5eff?text=Project+Two",
  //   category: "Development",
  //   year: "2024",
  //   role: "Full-Stack Developer",
  //   tools: ["Node.js", "Express", "MongoDB", "React"],
  //   tags: ["Full-Stack", "MERN", "Web App"],
  //   liveLink: "",
  //   repoLink: "https://github.com/yourusername/project-two",
  //   pdfUrl: "",
  //   images: [],
  //   contentModules: [],
  // },

  
];

export default projects;
