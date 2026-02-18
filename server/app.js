const express = require("express");
const cors = require("cors");
const path = require("path");
const { env } = require("./config/env");
const contactRoutes = require("./routes/contactroutes");
const profileRoutes = require("./routes/profileroutes");
const skillsRoutes = require("./routes/skillsroutes");
const projectsRoutes = require("./routes/projectsroutes");
const { notFoundHandler, errorHandler } = require("./middleware/errorHandler");

const app = express();

app.use(
  cors({
    origin: env.frontendUrl === "*" ? true : env.frontendUrl
  })
);
app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "..", "public")));

app.get("/api/health", (req, res) => {
  res.json({ status: "ok", environment: env.nodeEnv });
});

app.use("/api/contact", contactRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/skills", skillsRoutes);
app.use("/api/projects", projectsRoutes);

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "public", "index.html"));
});

app.use(notFoundHandler);
app.use(errorHandler);

module.exports = app;
