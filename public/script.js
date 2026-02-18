const API_URL = "";

const elements = {
  navName: document.getElementById("nav-name"),
  heroTitle: document.getElementById("hero-title"),
  heroSubtitle: document.getElementById("hero-subtitle"),
  socialLinks: document.getElementById("social-links"),
  aboutBio: document.getElementById("about-bio"),
  aboutLocation: document.getElementById("about-location"),
  aboutEmail: document.getElementById("about-email"),
  frontendSkills: document.getElementById("frontend-skills"),
  backendSkills: document.getElementById("backend-skills"),
  toolsSkills: document.getElementById("tools-skills"),
  projectsGrid: document.getElementById("projects-grid"),
  footerYear: document.getElementById("footer-year"),
  footerName: document.getElementById("footer-name"),
  contactForm: document.getElementById("contactForm"),
  formMessage: document.getElementById("form-message"),
  mobileMenu: document.getElementById("mobile-menu"),
  navLinks: document.getElementById("nav-links")
};

document.addEventListener("DOMContentLoaded", () => {
  elements.footerYear.textContent = String(new Date().getFullYear());
  setupMobileMenu();
  setupContactForm();
  loadPortfolioData();
});

async function loadPortfolioData() {
  try {
    const [profileRes, skillsRes, projectsRes] = await Promise.all([
      fetch(`${API_URL}/api/profile`),
      fetch(`${API_URL}/api/skills`),
      fetch(`${API_URL}/api/projects`)
    ]);

    const profile = profileRes.ok ? await profileRes.json() : null;
    const skills = skillsRes.ok ? await skillsRes.json() : [];
    const projects = projectsRes.ok ? await projectsRes.json() : [];

    renderProfile(profile);
    renderSkills(skills);
    renderProjects(projects);
  } catch (error) {
    renderFallback();
  }
}

function renderProfile(profile) {
  if (!profile) {
    renderFallback();
    return;
  }

  const name = profile.name || "Portfolio";
  elements.navName.textContent = name;
  elements.heroTitle.textContent = `Hi, I am ${name}.`;
  elements.heroSubtitle.textContent = profile.title || "Full-Stack Engineer";
  elements.aboutBio.textContent = profile.bio || "No bio yet.";
  elements.aboutLocation.textContent = profile.location || "Location not set";
  elements.aboutEmail.textContent = profile.email || "Email not set";
  elements.footerName.textContent = name;

  const social = profile.social || {};
  const links = [
    { key: "github", label: "GitHub", href: social.github },
    { key: "linkedin", label: "LinkedIn", href: social.linkedin },
    { key: "twitter", label: "Twitter", href: social.twitter }
  ].filter((item) => item.href);

  elements.socialLinks.innerHTML = links.map((item) => `<a href="${item.href}" target="_blank" rel="noreferrer">${item.label}</a>`).join("");
}

function renderSkills(skills) {
  const byCategory = {
    frontend: skills.filter((item) => item.category === "frontend"),
    backend: skills.filter((item) => item.category === "backend"),
    tools: skills.filter((item) => item.category === "tools" || item.category === "other")
  };

  elements.frontendSkills.innerHTML = renderSkillCards(byCategory.frontend);
  elements.backendSkills.innerHTML = renderSkillCards(byCategory.backend);
  elements.toolsSkills.innerHTML = renderSkillCards(byCategory.tools);
}

function renderSkillCards(items) {
  if (!items.length) {
    return '<p class="no-data">No skills available.</p>';
  }

  return items
    .map(
      (item) =>
        `<div class="skill-card"><div class="skill-head"><span>${escapeHtml(item.name)}</span><span>${item.proficiency}%</span></div><div class="skill-bar"><div class="skill-progress" style="width:${Math.max(0, Math.min(100, item.proficiency || 0))}%"></div></div></div>`
    )
    .join("");
}

function renderProjects(projects) {
  if (!projects.length) {
    elements.projectsGrid.innerHTML = '<p class="no-data">No projects available.</p>';
    return;
  }

  elements.projectsGrid.innerHTML = projects
    .map((project) => {
      const tech = Array.isArray(project.technologies)
        ? project.technologies.map((tag) => `<span class="tech-tag">${escapeHtml(tag)}</span>`).join("")
        : "";

      const links = [
        project.liveLink ? `<a href="${project.liveLink}" target="_blank" rel="noreferrer">Live</a>` : "",
        project.githubLink ? `<a href="${project.githubLink}" target="_blank" rel="noreferrer">Code</a>` : ""
      ].join("");

      return `<article class="project-card"><h3>${escapeHtml(project.title || "Untitled")}</h3><p>${escapeHtml(project.description || "")}</p><div class="project-tech">${tech}</div><div class="project-links">${links}</div></article>`;
    })
    .join("");
}

function setupContactForm() {
  elements.contactForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const submitBtn = document.getElementById("submit-btn");
    submitBtn.disabled = true;
    submitBtn.textContent = "Sending...";

    const payload = {
      name: document.getElementById("name").value.trim(),
      email: document.getElementById("email").value.trim(),
      message: document.getElementById("message").value.trim()
    };

    try {
      const res = await fetch(`${API_URL}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      const data = await res.json();

      if (!res.ok) {
        setFormMessage(data.message || "Message failed to send.", "error");
      } else {
        setFormMessage(data.message || "Message sent.", "success");
        elements.contactForm.reset();
      }
    } catch (error) {
      setFormMessage("Message failed to send.", "error");
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = "Send Message";
    }
  });
}

function setupMobileMenu() {
  elements.mobileMenu.addEventListener("click", () => {
    elements.navLinks.classList.toggle("active");
  });

  elements.navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      elements.navLinks.classList.remove("active");
    });
  });
}

function setFormMessage(message, type) {
  elements.formMessage.textContent = message;
  elements.formMessage.classList.remove("success", "error");
  elements.formMessage.classList.add(type);
}

function renderFallback() {
  elements.heroSubtitle.textContent = "Portfolio data is temporarily unavailable.";
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}
