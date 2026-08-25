"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  GitFork,
  Loader2,
  Star,
} from "lucide-react";
import { FaGithub } from "react-icons/fa";

interface GitHubRepository {
  name: string;
  full_name: string;
  html_url: string;
  description: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  updated_at: string;
  topics: string[];
}

interface GitHubResponse {
  repositories: GitHubRepository[];
  count: number;
  error?: string;
}

const LANGUAGE_STYLES: Record<string, string> = {
  TypeScript:
    "border-blue-400/10 bg-blue-400/10 text-blue-300",

  JavaScript:
    "border-yellow-400/10 bg-yellow-400/10 text-yellow-300",

  Python:
    "border-cyan-400/10 bg-cyan-400/10 text-cyan-300",

  HTML:
    "border-orange-400/10 bg-orange-400/10 text-orange-300",

  CSS:
    "border-purple-400/10 bg-purple-400/10 text-purple-300",

  default:
    "border-white/[0.08] bg-white/[0.05] text-white/60",
};

function formatDate(date: string) {
  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) {
    return "Recently";
  }

  return new Intl.DateTimeFormat("en", {
    month: "short",
    year: "numeric",
  }).format(parsedDate);
}

function getLanguageStyle(language: string | null) {
  if (!language) {
    return LANGUAGE_STYLES.default;
  }

  return (
    LANGUAGE_STYLES[language] ??
    LANGUAGE_STYLES.default
  );
}

export default function ProjectsSection() {
  const [repositories, setRepositories] = useState<
    GitHubRepository[]
  >([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function loadProjects() {
      try {
        setLoading(true);
        setError(false);

        const response = await fetch("/api/github", {
          cache: "no-store",
        });

        if (!response.ok) {
          throw new Error(
            `GitHub API route returned ${response.status}`
          );
        }

        const data =
          (await response.json()) as GitHubResponse;

        if (!cancelled) {
          setRepositories(
            Array.isArray(data.repositories)
              ? data.repositories
              : []
          );
        }
      } catch (error) {
        console.error(
          "Failed to load GitHub projects:",
          error
        );

        if (!cancelled) {
          setError(true);
          setRepositories([]);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    loadProjects();

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section
      id="projects"
      className="relative px-4 py-24 sm:px-6"
    >
      <div className="mx-auto w-full max-w-6xl">

        {/* ================================================= */}
        {/* HEADER */}
        {/* ================================================= */}

        <motion.div
          initial={{
            opacity: 0,
            y: 30,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
            amount: 0.2,
          }}
          transition={{
            duration: 0.7,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="mb-10 text-center"
        >
          <p className="text-[9px] uppercase tracking-[0.3em] text-indigo-300/50">
            Selected work
          </p>

          <h2 className="mt-3 text-3xl font-semibold tracking-[-0.03em] text-white sm:text-5xl">
            Projects
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-white/40 sm:text-base">
            Things I&apos;ve built, experimented with,
            and continue to improve.
          </p>
        </motion.div>

        {/* ================================================= */}
        {/* LOADING */}
        {/* ================================================= */}

        {loading && (
          <div className="flex min-h-[260px] items-center justify-center">
            <div className="flex items-center gap-3 text-sm text-white/35">
              <Loader2
                size={18}
                className="animate-spin"
              />

              <span>
                Loading projects...
              </span>
            </div>
          </div>
        )}

        {/* ================================================= */}
        {/* ERROR */}
        {/* ================================================= */}

        {!loading && error && (
          <motion.div
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.5,
            }}
            className="rounded-[26px] border border-red-400/10 bg-black/50 p-8 text-center backdrop-blur-2xl"
          >
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl border border-red-400/10 bg-red-500/10 text-red-300">
              <FaGithub size={21} />
            </div>

            <p className="mt-4 text-sm text-white/50">
              Unable to load GitHub projects right now.
            </p>

            <p className="mx-auto mt-2 max-w-md text-xs leading-5 text-white/25">
              The GitHub API may be temporarily
              unavailable. You can still browse the
              repositories directly.
            </p>

            <a
              href="https://github.com/HarutoFX"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex items-center gap-2 text-xs text-white/50 transition hover:text-white"
            >
              View GitHub profile
              <ArrowUpRight size={13} />
            </a>
          </motion.div>
        )}

        {/* ================================================= */}
        {/* EMPTY STATE */}
        {/* ================================================= */}

        {!loading &&
          !error &&
          repositories.length === 0 && (
            <motion.div
              initial={{
                opacity: 0,
                y: 20,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.5,
              }}
              className="rounded-[26px] border border-white/[0.08] bg-black/50 p-10 text-center backdrop-blur-2xl"
            >
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.04] text-white/50">
                <FaGithub size={21} />
              </div>

              <h3 className="mt-4 text-sm font-medium text-white/70">
                Projects are temporarily unavailable
              </h3>

              <p className="mx-auto mt-2 max-w-md text-xs leading-5 text-white/30">
                GitHub did not return any repository
                data right now. You can still view all
                projects directly on GitHub.
              </p>

              <a
                href="https://github.com/HarutoFX"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-flex items-center gap-2 rounded-xl border border-white/[0.08] bg-white/[0.04] px-4 py-2.5 text-[10px] uppercase tracking-[0.16em] text-white/50 transition hover:border-white/20 hover:bg-white/[0.08] hover:text-white"
              >
                View GitHub
                <ArrowUpRight size={13} />
              </a>
            </motion.div>
          )}

        {/* ================================================= */}
        {/* PROJECT GRID */}
        {/* ================================================= */}

        {!loading &&
          !error &&
          repositories.length > 0 && (
            <div className="grid gap-4 md:grid-cols-2">
              {repositories.map(
                (project, index) => (
                  <motion.article
                    key={project.full_name}
                    initial={{
                      opacity: 0,
                      y: 30,
                    }}
                    whileInView={{
                      opacity: 1,
                      y: 0,
                    }}
                    viewport={{
                      once: true,
                      amount: 0.15,
                    }}
                    transition={{
                      duration: 0.6,
                      delay: index * 0.08,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    whileHover={{
                      y: -5,
                    }}
                    className="group relative overflow-hidden rounded-[26px] border border-white/[0.10] bg-black/55 p-5 shadow-[0_20px_60px_rgba(0,0,0,0.35)] backdrop-blur-2xl transition-colors duration-300 hover:border-white/[0.18] sm:p-6"
                  >
                    {/* Card glow */}

                    <div className="pointer-events-none absolute -right-24 -top-24 h-48 w-48 rounded-full bg-indigo-500/10 opacity-0 blur-[80px] transition-opacity duration-500 group-hover:opacity-100" />

                    <div className="pointer-events-none absolute bottom-0 left-1/3 h-px w-1/3 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                    <div className="relative">

                      {/* ================================================= */}
                      {/* TOP */}
                      {/* ================================================= */}

                      <div className="flex items-start justify-between gap-4">

                        <div className="flex min-w-0 items-center gap-3">

                          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.04] text-white/65 transition-all duration-300 group-hover:border-white/15 group-hover:bg-white/[0.08] group-hover:text-white">
                            <FaGithub size={21} />
                          </div>

                          <div className="min-w-0">

                            <p className="truncate text-[9px] uppercase tracking-[0.18em] text-white/25">
                              GitHub Repository
                            </p>

                            <h3 className="mt-1 truncate text-lg font-semibold text-white/85">
                              {project.name}
                            </h3>

                          </div>
                        </div>

                        <a
                          href={project.html_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`Open ${project.name} on GitHub`}
                          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-white/[0.08] bg-white/[0.035] text-white/35 transition-all duration-300 hover:border-white/20 hover:bg-white/[0.08] hover:text-white"
                        >
                          <ArrowUpRight size={15} />
                        </a>

                      </div>

                      {/* ================================================= */}
                      {/* DESCRIPTION */}
                      {/* ================================================= */}

                      <p className="mt-5 min-h-[48px] text-sm leading-6 text-white/40">
                        {project.description ??
                          "No description provided for this repository."}
                      </p>

                      {/* ================================================= */}
                      {/* TAGS */}
                      {/* ================================================= */}

                      <div className="mt-5 flex flex-wrap items-center gap-2">

                        {project.language && (
                          <span
                            className={`rounded-full border px-2.5 py-1 text-[9px] ${getLanguageStyle(
                              project.language
                            )}`}
                          >
                            {project.language}
                          </span>
                        )}

                        {Array.isArray(project.topics) &&
                          project.topics
                            .slice(0, 3)
                            .map((topic) => (
                              <span
                                key={topic}
                                className="rounded-full border border-white/[0.07] bg-white/[0.035] px-2.5 py-1 text-[9px] text-white/35"
                              >
                                {topic}
                              </span>
                            ))}
                      </div>

                      {/* ================================================= */}
                      {/* STATS */}
                      {/* ================================================= */}

                      <div className="mt-6 flex items-center justify-between border-t border-white/[0.07] pt-4">

                        <div className="flex items-center gap-4">

                          <span className="flex items-center gap-1.5 text-[10px] text-white/30">
                            <Star size={13} />
                            {project.stargazers_count}
                          </span>

                          <span className="flex items-center gap-1.5 text-[10px] text-white/30">
                            <GitFork size={13} />
                            {project.forks_count}
                          </span>

                        </div>

                        <span className="text-[9px] uppercase tracking-[0.16em] text-white/20">
                          Updated{" "}
                          {formatDate(
                            project.updated_at
                          )}
                        </span>

                      </div>

                      {/* ================================================= */}
                      {/* REPOSITORY BUTTON */}
                      {/* ================================================= */}

                      <a
                        href={project.html_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-4 flex items-center justify-center gap-2 rounded-xl border border-white/[0.07] bg-white/[0.025] py-3 text-[10px] uppercase tracking-[0.18em] text-white/35 transition-all duration-300 hover:border-white/15 hover:bg-white/[0.07] hover:text-white/70"
                      >
                        View Repository
                        <ArrowUpRight size={13} />
                      </a>

                    </div>
                  </motion.article>
                )
              )}
            </div>
          )}

        {/* ================================================= */}
        {/* GITHUB PROFILE */}
        {/* ================================================= */}

        {!loading &&
          !error &&
          repositories.length > 0 && (
            <motion.div
              initial={{
                opacity: 0,
              }}
              whileInView={{
                opacity: 1,
              }}
              viewport={{
                once: true,
              }}
              transition={{
                duration: 0.6,
                delay: 0.3,
              }}
              className="mt-8 text-center"
            >
              <a
                href="https://github.com/HarutoFX"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs text-white/30 transition hover:text-white/70"
              >
                <FaGithub size={14} />

                View all projects on GitHub

                <ArrowUpRight size={13} />
              </a>
            </motion.div>
          )}

      </div>
    </section>
  );
}