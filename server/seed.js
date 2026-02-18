const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const Profile = require("./models/Profile");
const Skills = require("./models/Skills");
const Project = require("./models/Project");

const profile = {
  name: "Shankar",
  title: "Full-Stack Engineer",
  bio: "I build reliable, responsive web apps with strong backend architecture and clean frontend experiences.",
  location: "United States",
  email: "shankar@example.com",
  social: {
    github: "https://github.com/",
    linkedin: "https://linkedin.com/",
    twitter: "https://x.com/"
  }
};

const skills = [
  { name: "HTML", category: "frontend", proficiency: 95 },
  { name: "CSS", category: "frontend", proficiency: 90 },
  { name: "JavaScript", category: "frontend", proficiency: 92 },
  { name: "Node.js", category: "backend", proficiency: 90 },
  { name: "Express", category: "backend", proficiency: 88 },
  { name: "MongoDB", category: "backend", proficiency: 86 },
  { name: "Git", category: "tools", proficiency: 90 }
];

const projects = [
  {
    title: "Portfolio Website",
    description: "Personal portfolio with dynamic data from REST APIs.",
    technologies: ["Node.js", "Express", "MongoDB", "JavaScript"],
    featured: true,
    liveLink: "https://example.com",
    githubLink: "https://github.com/"
  },
  {
    title: "Task API",
    description: "REST API with authentication and layered backend structure.",
    technologies: ["Express", "MongoDB", "JWT"],
    featured: false,
    githubLink: "https://github.com/"
  }
];

async function seed() {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error("MONGO_URI is required");
    }

    await mongoose.connect(process.env.MONGO_URI);

  await Promise.all([Profile.deleteMany({}), Skills.deleteMany({}), Project.deleteMany({})]);

  await Profile.create(profile);
  await Skills.insertMany(skills);
  await Project.insertMany(projects);

  console.log("Database seeded successfully");
} catch (error) {
  console.error("Seeding failed:", error.message);
  process.exitCode = 1;
} finally {
  await mongoose.disconnect();
}
}

seed();
