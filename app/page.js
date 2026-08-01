"use client";

import { useState } from "react";
import ProjectsCarousel from "../components/ProjectsCarousel";
import projects from "../projects.json";
import roam from "../roam.json";

const codeModules = [
  "Agile Process Management",
  "Algorithms & Data Structures",
  "Automated Testing",
  "Business Model Design",
  "Clean Code",
  "Cloud Computing",
  "Collaboration",
  "Concepts of Programming Languages",
  "Cyber Security",
  "Finance and Controlling",
  "Generative Design",
  "Leadership",
  "Mobile App Development",
  "Physical Interfaces",
  "Product Innovation & Definition",
  "Product Strategy",
  "Relational Databases",
  "Web Technologies",
  "AI Basics",
];

const designModules = [
  "2D & 3D Animation",
  "Brand and Marketing",
  "Brand Strategy",
  "Communication Design",
  "Design Culture",
  "Graphic Design",
  "Ideation",
  "Multimedia",
  "Photography & Videography",
  "Research",
  "User Experience & User Interfaces",
  "Responsive & Inclusive Design",
];

const languageStack = [
  "JavaScript",
  "TypeScript",
  "Python",
  "React/Native",
  "Vue.js",
  "Node.js",
  "Next.js",
  "Qwik",
  "Tailwind",
  "Expo",
  "Flutter",
];

const toolsWorkflow = [
  "GitHub",
  "Copilot/Claude Code/V0",
  "Agile/Scrum/Kanban",
  "Figma",
  "Adobe Creative Suite",
  "Wordpress/Squarespace/Framer",
  "General Databases & ORMs",
];

const SITE_UNDER_CONSTRUCTION = true;

function UnderConstruction() {
  return (
    <main className="maintenance-screen">
      <div className="maintenance-card">
        <p className="maintenance-eyebrow">Alsje Lourens</p>
        <h1>Under construction</h1>
        <p>
          This portfolio is currently being reworked. Come back soon to see
          what&apos;s new.
        </p>
        <a className="maintenance-contact" href="mailto:alsje154@gmail.com">
          alsje154@gmail.com
        </a>
      </div>
    </main>
  );
}

export default function Page() {
  if (SITE_UNDER_CONSTRUCTION) {
    return <UnderConstruction />;
  }

  return (
    <>
      <nav className="sticky-nav" aria-label={copy.aria.nav}>
        <a className="nav-btn" href="#projects">
          {copy.nav.projects}
        </a>
        <a className="nav-btn" href="#clients">
          {copy.nav.clients}
        </a>
        <button
          className="nav-btn nav-toggle"
          type="button"
          data-language={language}
          onClick={() => setLanguage(language === "en" ? "de" : "en")}
          aria-label={copy.nav.toggleLabel}
          aria-pressed={language === "de"}
        >
          <span className="nav-toggle-track" aria-hidden="true">
            <span className="nav-toggle-label nav-toggle-label-left">EN</span>
            <span className="nav-toggle-label nav-toggle-label-right">DE</span>
            <span className="nav-toggle-thumb" />
          </span>
        </button>
      </nav>

      <main className="container">
        <header>
          <div>
            <h1>Alsje Lourens</h1>
            <p className="role">{copy.role}</p>
            <div className="meta">
              <ul className="meta-list">
                <li className="meta-item">
                  <svg
                    className="meta-icon"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                    focusable="false"
                  >
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 4.62 5.33 11.44 6.17 12.5.43.54 1.23.54 1.66 0C13.67 20.44 19 13.62 19 9c0-3.87-3.13-7-7-7Zm0 9.5A2.5 2.5 0 1 1 12 6a2.5 2.5 0 0 1 0 5.5Z" />
                  </svg>
                  Berlin 12437
                </li>
                <li className="meta-item">
                  <svg
                    className="meta-icon"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                    focusable="false"
                  >
                    <path d="M4 4h16a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H9l-5 4v-4H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Zm2 5h12v2H6V9Zm0 4h8v2H6v-2Z" />
                  </svg>
                  {language === "en"
                    ? "English & Afrikaans (Fluent), Deutsch (B1-2)"
                    : "Englisch & Afrikaans (fließend), Deutsch (B1-2)"}
                </li>
                <li>
                  <a className="meta-item" href="mailto:alsje154@gmail.com">
                    <svg
                      className="meta-icon"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                      focusable="false"
                    >
                      <path d="M3 6a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6Zm2 .8V8l7 4.5L19 8V6.8l-7 4.4-7-4.4Z" />
                    </svg>
                    alsje154@gmail.com
                  </a>
                </li>
                <li>
                  <a
                    className="meta-item"
                    href="https://www.linkedin.com/in/alsje"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <svg
                      className="meta-icon"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                      focusable="false"
                    >
                      <path d="M6.94 8.5H3.56V20h3.38V8.5ZM5.25 3A1.95 1.95 0 1 0 5.3 6.9 1.95 1.95 0 0 0 5.25 3ZM20 12.82c0-3.3-1.76-4.84-4.11-4.84a3.56 3.56 0 0 0-3.2 1.76h-.05V8.5H9.4V20h3.38v-5.7c0-1.5.28-2.95 2.14-2.95 1.82 0 1.85 1.7 1.85 3.05V20H20v-7.18Z" />
                    </svg>
                    linkedin.com/in/alsje
                  </a>
                </li>
                <li>
                  <a
                    className="meta-item"
                    href="https://www.github.com/alsje15"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <svg
                      className="meta-icon"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                      focusable="false"
                    >
                      <path d="M12 .5a11.5 11.5 0 0 0-3.64 22.42c.58.11.79-.25.79-.56v-2.15c-3.22.7-3.9-1.55-3.9-1.55-.52-1.33-1.29-1.68-1.29-1.68-1.05-.72.08-.71.08-.71 1.16.08 1.77 1.19 1.77 1.19 1.03 1.76 2.7 1.25 3.36.96.1-.74.4-1.25.73-1.54-2.57-.29-5.27-1.28-5.27-5.72 0-1.27.45-2.31 1.19-3.12-.12-.3-.52-1.49.11-3.1 0 0 .97-.31 3.18 1.19a11.01 11.01 0 0 1 5.8 0c2.21-1.5 3.18-1.19 3.18-1.19.63 1.61.23 2.8.11 3.1.74.81 1.19 1.85 1.19 3.12 0 4.45-2.7 5.42-5.28 5.71.41.36.78 1.08.78 2.18v3.24c0 .31.21.68.8.56A11.5 11.5 0 0 0 12 .5Z" />
                    </svg>
                    github.com/alsje15
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <img
            className="header-portrait"
            src="/assets/portrait.png"
            alt="Portrait photo of Alsje Lourens"
          />
        </header>

        <section id="summary">
          <h2>{copy.summaryTitle}</h2>
          <p>{copy.summary}</p>
        </section>

        <section id="education">
          <h2>{copy.educationTitle}</h2>
          <ul>
            {educationEntries.map((entry) => (
              <li key={entry.title.en}>
                <h3>{entry.title[language]}</h3>
                <p>{entry.institution[language]}</p>
                {entry.thesis ? (
                  <p>
                    {entry.thesisLabel[language]}{" "}
                    <em>{entry.thesis[language]}</em>
                  </p>
                ) : null}
                <details>
                  <summary>{copy.modulesLabel}</summary>
                  <div className="tag-list">
                    {entry.modules.map((module) => (
                      <span className="tag-chip" key={module}>
                        {module}
                      </span>
                    ))}
                  </div>
                </details>
              </li>
            ))}
          </ul>
        </section>

        <section id="skills">
          <h2>{copy.skillsTitle}</h2>
          <ul>
            <li>
              <h3>{copy.softSkillsTitle}</h3>
              <p>{copy.softSkills}</p>
            </li>
            <li>
              <h3>{copy.programmingTitle}</h3>
              <div className="tag-list">
                {languageStack.map((item) => (
                  <span className="tag-chip" key={item}>
                    {item}
                  </span>
                ))}
              </div>
            </li>
            <li>
              <h3>{copy.toolsTitle}</h3>
              <div className="tag-list">
                {toolsWorkflow.map((item) => (
                  <span className="tag-chip" key={item}>
                    {item}
                  </span>
                ))}
              </div>
            </li>
          </ul>
        </section>

        <section id="experience">
          <h2>{copy.experienceTitle}</h2>
          <div className="timeline" role="list">

            {/* chill */}
                        {/* <article className="timeline-item" role="listitem">
              <div className="timeline-marker">
                <span className="timeline-date">2025-Present</span>
              </div>
              <div className="timeline-card">
                <h3>Lead Designer</h3>
                <details className="timeline-details">
                  <summary><h4>DeBiasMe</h4></summary>
                  <p>
                    DeBiasMe is an early-stage startup aiming to educate around
                    AI usage and promote critical thinking. I own end-to-end
                    design across branding, UX/UI, and web, shaping the product
                    from concept to prototype. In collaboration with the
                    founder, I contribute to defining the product vision and
                    developing user-centered solutions.
                  </p>
                </details>
              </div>
            </article> */}

            <article className="timeline-item" role="listitem">
              <div className="timeline-marker">
                <span className="timeline-date">2024-Present</span>
              </div>
              <div className="timeline-card">
                <h3>Owner/Freelancer</h3>

                <details className="timeline-details">
                  <summary><h4>
                  <a
                    href="https://www.roamstudio.net"
                    target="_blank"
                    rel="noreferrer"
                  >
                    ROAM Studio
                  </a>
                </h4></summary>
                  <p>
                    ROAM is a design studio providing identity-focused branding
                    and design services for entrepreneurs and startups.
                    Collaborate with clients to translate brand values into
                    design systems that empower small businesses and
                    freedom-focused ventures.
                  </p>
                </details>
              </div>
            </article>

            <article className="timeline-item" role="listitem">
              <div className="timeline-marker">
                <span className="timeline-date">2023-Present</span>
              </div>
              <div className="timeline-card">
                <h3>Freelance Designer</h3>
                <details className="timeline-details">
                  <summary><h4>For A New Earth; FANE</h4></summary>
                  <p>
                    Provided a full rebrand and relaunch on the road to NGO
                    status. Continually provide design and tech support.
                  </p>
                </details>
              </div>
            </article>

                        <article className="timeline-item" role="listitem">
              <div className="timeline-marker">
                <span className="timeline-date">2022-2024</span>
              </div>
              <div className="timeline-card">
                <h3>UX & UI Designer</h3>
                <details className="timeline-details">
                  <summary><h4>Herbert Burda Media (TVSpielfilm, Fokus Online, CHIP ...)</h4></summary>
                  <p>
                    Optimized and enhanced digital user experiences across
                    multiple media platforms. Redesigned interfaces and
                    interactive elements to improve usability and engagement.
                    Created and developed design concepts, prototypes, and
                    campaign assets.
                  </p>
                  <a
                    className="timeline-link"
                    href="/assets/HBM_Zeugnis.pdf"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Testimony
                  </a>
                </details>
              </div>
            </article>

            <article className="timeline-item" role="listitem">
              <div className="timeline-marker">
                <span className="timeline-date">2021-2022</span>
              </div>
              <div className="timeline-card">
                <h3>Marketing & Event Coordinator</h3>
                <details className="timeline-details">
                  <summary><h4>Unicon</h4></summary>
                  <p>
                    Supported the organization and coordination of Unicon, an
                    annual student-led digital innovation and entrepreneurship
                    conference. Created and managed digital marketing materials,
                    branding and social media campaigns to increase event
                    visibility. Collaborated with a cross-functional team to
                    coordinate sponsors, speakers, and participants.
                  </p>
                </details>
              </div>
            </article>

            <article className="timeline-item" role="listitem">
              <div className="timeline-marker">
                <span className="timeline-date">2021</span>
              </div>
              <div className="timeline-card">
                <h3>Intern Software Developer</h3>
                <details className="timeline-details">
                  <summary><h4>Mernok Electronics (Pty) Ltd</h4></summary>
                  <p>
                    Designed and developed the front-end of a mobile
                    application available on Playstore (Xamarin, C#). Gained
                    hands-on experience in software engineering practices,
                    mobile app development, and technologies such as NFC.
                  </p>
                </details>
              </div>
            </article>
          </div>
        </section>

        <div id="projects" className="portfolio">
          <h1>{copy.projectsTitle}</h1>
          <ProjectsCarousel projects={projects} labels={copy.carousel} language={language} />
        </div>

        <div id="clients" className="portfolio">
          <h1>{copy.clientsTitle}</h1>
          <ProjectsCarousel
            projects={roam}
            labels={copy.carousel}
            language={language}
            coverAspectRatio="1500 / 700"
          />
        </div>

        <footer>
          <div>
            <ul>
              {copy.footerItems.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>

          <div className="contact">
            <p>
              <a href="mailto:alsje154@gmail.com">alsje154@gmail.com</a> •{" "}
              <a
                href="https://www.linkedin.com/in/alsje"
                target="_blank"
                rel="noreferrer"
              >
                LinkedIn
              </a>
            </p>
          </div>
        </footer>
      </main>
    </>
  );
}
