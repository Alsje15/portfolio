import Link from "next/link";
import { readdir } from "node:fs/promises";
import path from "node:path";
import { notFound } from "next/navigation";
import projects from "../../../projects.json";

const IMAGE_EXTENSIONS = new Set([
  ".png",
  ".jpg",
  ".jpeg",
  ".webp",
  ".gif",
  ".avif",
]);

function slugify(value) {
  return (value || "project")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

async function getGalleryImages(slug) {
  const folderName = `${slug}-gallery`;
  const galleryDir = path.join(process.cwd(), "public", "assets", folderName);

  try {
    const entries = await readdir(galleryDir, { withFileTypes: true });

    const images = entries
      .filter(
        (entry) =>
          entry.isFile() && IMAGE_EXTENSIONS.has(path.extname(entry.name).toLowerCase()),
      )
      .map((entry) => entry.name)
      .sort((a, b) => a.localeCompare(b, undefined, { numeric: true, sensitivity: "base" }));

    return { folderName, images };
  } catch (error) {
    if (error?.code === "ENOENT" || error?.code === "ENOTDIR") {
      return { folderName, images: [] };
    }

    throw error;
  }
}

export function generateStaticParams() {
  return projects
    .filter((project) => project.details === true)
    .map((project) => ({ slug: slugify(project.title) }));
}

export default async function ProjectDetailPage({ params }) {
  const { slug } = await params;
  const { folderName, images } = await getGalleryImages(slug);

  const project = projects.find(
    (item) => item.details === true && slugify(item.title) === slug,
  );

  if (!project) {
    notFound();
  }

  if (images.length > 0) {
    return (
      <main className="container">
        <section className="project-detail chimera-gallery-page">
          <h1 className="project-detail-title">Gallery</h1>
          <div className="chimera-gallery" aria-label={`${project.title} gallery`}>
            {images.map((imageName) => {
              const imagePath = `/assets/${folderName}/${encodeURIComponent(imageName)}`;

              return (
                <img
                  key={imageName}
                  className="chimera-gallery-image"
                  src={imagePath}
                  alt={`${project.title} gallery ${imageName.replace(/\.[^.]+$/, "")}`}
                />
              );
            })}
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="container">
      <section className="project-detail">
        <p className="project-detail-back">
          <Link href="/#projects">Back to projects</Link>
        </p>

        <h1 className="project-detail-title">{project.title}</h1>
        <p className="project-detail-meta">
          {project.context} • {project.date} • {project.status}
        </p>

        <img
          className="project-detail-cover"
          src={project.cover || "/assets/chimera.png"}
          alt={`${project.title} cover`}
        />

        <p>{project.description}</p>

        {Array.isArray(project.skills) && project.skills.length > 0 ? (
          <div className="project-tag-groups" aria-label="Project skills and application">
            <div className="tag-group">
              <span className="tag-group-label" aria-label="Skills">
                <svg
                  className="tag-group-icon"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                  focusable="false"
                >
                  <path d="M21.7 7.3 16.7 2.3a1 1 0 0 0-1.4 0l-2.8 2.8 8 8 2.8-2.8a1 1 0 0 0 0-1.4ZM2 17.6V22h4.4l12.7-12.7-4.4-4.4L2 17.6Zm3.6 2.4H4v-1.6l10.7-10.7 1.6 1.6L5.6 20Z" />
                </svg>
              </span>
              <div className="tag-list">
                {project.skills.map((skill) => (
                  <span className="tag-chip" key={`${project.title}-skill-${skill}`}>
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {Array.isArray(project.application) && project.application.length > 0 ? (
              <div className="tag-group">
                <span className="tag-group-label" aria-label="Application">
                  <svg
                    className="tag-group-icon"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                    focusable="false"
                  >
                    <path d="M3 19h18v2H3v-2Zm2-2h4v-6H5v6Zm5 0h4V3h-4v14Zm5 0h4V8h-4v9Z" />
                  </svg>
                </span>
                <div className="tag-list">
                  {project.application.map((app) => (
                    <span className="tag-chip" key={`${project.title}-app-${app}`}>
                      {app}
                    </span>
                  ))}
                </div>
              </div>
            ) : null}
          </div>
        ) : null}
      </section>
    </main>
  );
}
