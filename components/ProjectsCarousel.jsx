"use client";

import { useEffect, useMemo, useRef } from "react";
import Link from "next/link";

function hexToRgbTriplet(value) {
  if (typeof value !== "string") {
    return "24 38 64";
  }

  const hex = value.trim().replace("#", "");
  const isValid = /^[0-9a-fA-F]{3}$|^[0-9a-fA-F]{6}$/.test(hex);
  if (!isValid) {
    return "24 38 64";
  }

  const fullHex =
    hex.length === 3
      ? hex
          .split("")
          .map((char) => `${char}${char}`)
          .join("")
      : hex;

  const r = Number.parseInt(fullHex.slice(0, 2), 16);
  const g = Number.parseInt(fullHex.slice(2, 4), 16);
  const b = Number.parseInt(fullHex.slice(4, 6), 16);
  return `${r} ${g} ${b}`;
}

function getProjectImage(project) {
  const imageUrl = project.cover;

  if (!imageUrl) {
    return "/assets/chimera.png";
  }

  if (imageUrl.startsWith("http://") || imageUrl.startsWith("https://")) {
    return imageUrl;
  }

  return imageUrl.startsWith("/")
    ? imageUrl
    : `/${imageUrl.replace(/^\.?\//, "")}`;
}

function slugify(value) {
  return (value || "project")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

function formatLinkLabel(url) {
  return (url || "").replace(/^https?:\/\//i, "");
}

export default function ProjectsCarousel({ projects, coverAspectRatio = "3 / 2" }) {
  const trackRef = useRef(null);
  const adjustingRef = useRef(false);

  const cards = useMemo(() => {
    return projects.map((project, index) => {
      const imageSrc = getProjectImage(project);
      const description =
        project.description?.trim() ||
        `Project work (${project.date || "n.d."})`;

      return {
        id: `${project.title || "project"}-${index}`,
        title: project.title || "Untitled Project",
        slug: slugify(project.title || `project-${index}`),
        hasDetails: project.details === true,
        context: project.context || "Independent project",
        date: project.date || "n.d.",
        status:
          typeof project.status === "string" && project.status.trim().length > 0
            ? project.status
            : null,
        skills: Array.isArray(project.skills) ? project.skills : [],
        application: Array.isArray(project.application)
          ? project.application
          : [],
        description,
        imageSrc,
        shadowRgb: hexToRgbTriplet(project.color),
        link: project.link,
      };
    });
  }, [projects]);

  const loopedCards = useMemo(() => {
    if (cards.length <= 1) {
      return cards.map((card, baseIndex) => ({
        ...card,
        baseIndex,
        copyIndex: 0,
      }));
    }

    return [0, 1, 2].flatMap((copyIndex) =>
      cards.map((card, baseIndex) => ({
        ...card,
        id: `${card.id}-c${copyIndex}`,
        baseIndex,
        copyIndex,
      })),
    );
  }, [cards]);

  useEffect(() => {
    const track = trackRef.current;
    if (!track || loopedCards.length === 0) {
      return undefined;
    }

    const setActiveElement = (activeEl, elements) => {
      elements.forEach((element) => {
        element.classList.remove("is-active");
      });

      if (activeEl) {
        activeEl.classList.add("is-active");
      }
    };

    if (cards.length > 1) {
      const firstMiddle = track.querySelector(
        '[data-copy="1"][data-base="0"]',
      );
      if (firstMiddle) {
        track.scrollTo({ left: firstMiddle.offsetLeft, behavior: "auto" });
        setActiveElement(firstMiddle, Array.from(track.children));
      }
    } else {
      setActiveElement(track.children[0], Array.from(track.children));
    }

    const handleScroll = () => {
      if (adjustingRef.current) {
        return;
      }

      const center = track.scrollLeft + track.clientWidth / 2;
      let nearestIndex = 0;
      let nearestDistance = Number.POSITIVE_INFINITY;
      const children = Array.from(track.children);

      children.forEach((child, index) => {
        const cardCenter = child.offsetLeft + child.clientWidth / 2;
        const distance = Math.abs(center - cardCenter);
        if (distance < nearestDistance) {
          nearestDistance = distance;
          nearestIndex = index;
        }
      });

      const nearestEl = children[nearestIndex];
      const base = Number.parseInt(nearestEl?.dataset.base || "0", 10);
      const copy = Number.parseInt(nearestEl?.dataset.copy || "0", 10);
      setActiveElement(nearestEl, children);

      if (cards.length <= 1) {
        return;
      }

      if (copy === 0 || copy === 2) {
        const middleMatch = track.querySelector(
          `[data-copy="1"][data-base="${base}"]`,
        );
        if (!middleMatch) {
          return;
        }

        adjustingRef.current = true;
        const delta = middleMatch.offsetLeft - nearestEl.offsetLeft;
        track.scrollTo({ left: track.scrollLeft + delta, behavior: "auto" });
        setActiveElement(middleMatch, children);
        requestAnimationFrame(() => {
          adjustingRef.current = false;
        });
      }
    };

    track.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);
    handleScroll();

    return () => {
      track.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [cards.length, loopedCards.length]);

  const scrollOne = (direction) => {
    const track = trackRef.current;
    if (!track || !track.children[0]) {
      return;
    }

    const gap = Number.parseFloat(getComputedStyle(track).columnGap) || 16;
    const step = track.children[0].getBoundingClientRect().width + gap;
    track.scrollBy({ left: step * direction, behavior: "smooth" });
  };

  return (
    <div
      className="carousel"
      aria-label="Project carousel"
      style={{ "--cover-aspect-ratio": coverAspectRatio }}
    >
      <div className="carousel-controls" aria-label="Carousel controls">
        <button
          className="carousel-btn prev"
          aria-label="Previous project"
          onClick={() => scrollOne(-1)}
          type="button"
        >
          &#10094;
        </button>

        <button
          className="carousel-btn next"
          aria-label="Next project"
          onClick={() => scrollOne(1)}
          type="button"
        >
          &#10095;
        </button>
      </div>

      <div className="carousel-track" id="project-track" ref={trackRef}>
        {loopedCards.map((card) => (
          <article
            className="project-card"
            key={card.id}
            data-base={card.baseIndex}
            data-copy={card.copyIndex}
            style={{ "--card-shadow-rgb": card.shadowRgb }}
          >
            <img
              src={card.imageSrc}
              alt={`${card.title} project cover`}
              loading="lazy"
              onError={(event) => {
                event.currentTarget.onerror = null;
                event.currentTarget.src = "/assets/chimera.png";
              }}
            />
            <div className="project-content">
              <h3>{card.title}</h3>
              <p className="project-meta-line">
                {[card.context, card.date, card.status].filter(Boolean).map((item, index) => (
                  <span key={`${card.id}-meta-${item}-${index}`}>
                    {index > 0 ? <span aria-hidden="true"> • </span> : null}
                    {item}
                  </span>
                ))}
              </p>
              <p>{card.description}</p>

              <div
                className="project-tag-groups"
                aria-label="Project skills and application"
              >
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
                    {card.skills.map((skill) => (
                      <span className="tag-chip" key={`${card.id}-skill-${skill}`}>
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

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
                    {card.application.map((app) => (
                      <span className="tag-chip" key={`${card.id}-app-${app}`}>
                        {app}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="project-actions">
                {card.link ? (
                  <p className="project-link-wrap">
                    <a href={card.link} target="_blank" rel="noreferrer">
                      {formatLinkLabel(card.link)}
                    </a>
                  </p>
                ) : null}
                {card.hasDetails ? (
                  <p className="project-link-wrap project-see-more-wrap">
                    <Link className="project-see-more" href={`/projects/${card.slug}`}>
                      see more
                    </Link>
                  </p>
                ) : null}
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
