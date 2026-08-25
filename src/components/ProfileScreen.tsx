"use client";

import DiscordBadges from "./DiscordBadges";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  ExternalLink,
  Gamepad2,
  MapPin,
} from "lucide-react";
import {
  FaDiscord,
  FaGithub,
  FaYoutube,
} from "react-icons/fa";

const DISCORD_USER_ID = "875383052174524476";

interface DiscordActivity {
  name: string;
  type: string;
  details: string | null;
  state: string | null;
}

interface DiscordBadge {
  id: string;
  name: string;
  description: string;
}

interface DiscordNameplate {
  skuId: string;
  asset: string;
  label: string;
  palette: string;
}

interface DiscordProfile {
  premiumType: number | null;

  avatarDecoration: {
    asset: string | null;
    skuId: string | null;
  } | null;

  collectibles: {
    nameplate?: DiscordNameplate;
  };

  primaryGuild: {
    identityGuildId: string | null;
    identityEnabled: boolean | null;
    tag: string | null;
    badge: string | null;
    badgeUrl?: string | null;
  } | null;
}

interface DiscordPresence {
  userId: string;
  username: string;
  displayName: string;
  avatar: string | null;

  status:
    | "online"
    | "idle"
    | "dnd"
    | "offline";

  badges: DiscordBadge[];

  profile: DiscordProfile | null;

  activities: DiscordActivity[];

  updatedAt: string | null;
}

const statusConfig = {
  online: {
    label: "Online",
    color: "bg-emerald-400",
    glow:
      "shadow-[0_0_16px_rgba(52,211,153,0.9)]",
  },

  idle: {
    label: "Idle",
    color: "bg-yellow-400",
    glow:
      "shadow-[0_0_16px_rgba(250,204,21,0.9)]",
  },

  dnd: {
    label: "Do Not Disturb",
    color: "bg-red-500",
    glow:
      "shadow-[0_0_16px_rgba(239,68,68,0.9)]",
  },

  offline: {
    label: "Offline",
    color: "bg-zinc-500",
    glow: "",
  },
};

export default function ProfileScreen() {
  const [presence, setPresence] =
    useState<DiscordPresence | null>(null);

  const [flipped, setFlipped] =
    useState(false);

  useEffect(() => {
    const fetchPresence = async () => {
      try {
        const response = await fetch(
          "/api/discord",
          {
            cache: "no-store",
          }
        );

        if (!response.ok) {
          throw new Error(
            `Discord API returned ${response.status}`
          );
        }

        const data: DiscordPresence =
          await response.json();

        setPresence(data);
      } catch (error) {
        console.error(
          "Failed to fetch Discord presence:",
          error
        );
      }
    };

    fetchPresence();

    const interval = window.setInterval(
      fetchPresence,
      15000
    );

    return () => {
      window.clearInterval(interval);
    };
  }, []);

  const status =
    presence?.status ?? "offline";

  const config =
    statusConfig[status];

  const activity =
    presence?.activities?.[0] ?? null;

  const toggleFlip = () => {
    setFlipped((current) => !current);
  };

  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLDivElement>
  ) => {
    if (
      event.key === "Enter" ||
      event.key === " "
    ) {
      event.preventDefault();
      toggleFlip();
    }
  };

  return (
    <section className="flex min-h-screen items-center justify-center px-4 py-12 sm:px-6">
      <div className="w-full max-w-lg">

        {/* 3D CARD CONTAINER */}

        <div
          className="relative w-full cursor-pointer [perspective:1400px]"
          onClick={toggleFlip}
          onKeyDown={handleKeyDown}
          role="button"
          tabIndex={0}
          aria-label={
            flipped
              ? "Flip Discord card back"
              : "Flip Discord card"
          }
        >

          {/* FLIP INNER */}

          <motion.div
            animate={{
              rotateY: flipped ? 180 : 0,
            }}
            transition={{
              duration: 0.7,
              ease: [0.22, 1, 0.36, 1],
            }}
            style={{
              transformStyle: "preserve-3d",
            }}
            className="relative w-full"
          >

            {/* ================================================= */}
            {/* FRONT */}
            {/* ================================================= */}

            <div
              style={{
                backfaceVisibility: "hidden",
                WebkitBackfaceVisibility:
                  "hidden",
              }}
              className="relative w-full overflow-hidden rounded-[30px] border border-white/[0.14] bg-black/65 p-6 shadow-[0_25px_80px_rgba(0,0,0,0.55)] backdrop-blur-2xl sm:p-8"
            >

              {/* Glass */}

              <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.07),transparent_35%,transparent_70%,rgba(99,102,241,0.05))]" />

              <div className="pointer-events-none absolute left-1/2 top-0 h-px w-2/3 -translate-x-1/2 bg-gradient-to-r from-transparent via-white/30 to-transparent" />

              {/* Glow */}

              <div className="pointer-events-none absolute -left-32 -top-32 h-64 w-64 rounded-full bg-indigo-500/15 blur-[100px]" />

              <div className="pointer-events-none absolute -bottom-32 -right-32 h-64 w-64 rounded-full bg-cyan-400/10 blur-[100px]" />

              <div className="relative">

                {/* Avatar */}

                <div className="flex justify-center">

                  <div className="relative">

                    <div className="absolute -inset-3 rounded-full bg-indigo-400/10 blur-xl" />

                    <div className="relative h-28 w-28 overflow-hidden rounded-full border border-white/20 bg-black/40 p-1 shadow-2xl sm:h-32 sm:w-32">

                      <div className="h-full w-full overflow-hidden rounded-full">

                        {presence?.avatar ? (
                          <img
                            src={presence.avatar}
                            alt="Haruto"
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center text-4xl font-semibold text-white/50">
                            H
                          </div>
                        )}

                      </div>

                    </div>

                    {/* Status */}

                    <span
                      className={`absolute bottom-1 right-1 h-5 w-5 rounded-full border-[3px] border-black ${config.color} ${config.glow}`}
                    />

                  </div>

                </div>

                {/* Identity */}

                <div className="mt-5 text-center">

                  <h1 className="haruto-name text-4xl font-semibold tracking-[-0.03em] text-white sm:text-5xl">
                    {presence?.displayName ??
                      "HARUTO"}
                  </h1>

                  <p className="mt-1 text-sm text-white/35">
                    @{presence?.username ??
                      "haruto107_"}
                  </p>

                  {/* REAL DISCORD PROFILE DATA */}

                  <DiscordBadges
                    badges={
                      presence?.badges ?? []
                    }
                    profile={
                      presence?.profile ?? null
                    }
                  />

                </div>

                {/* Bio */}

                <p className="mx-auto mt-5 max-w-md text-center text-sm leading-6 text-white/65">
                  3D artist • 3D animator • programmer
                  <br />
                  building worlds one line of code at a time
                </p>

                {/* Location */}

                <div className="mt-4 flex items-center justify-center gap-1.5 text-xs text-white/40">
                  <MapPin size={13} />
                  <span>
                    Newport, Wales
                  </span>
                </div>

                {/* Divider */}

                <div className="my-7 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

                {/* Discord Status */}

                <div className="rounded-2xl border border-white/[0.09] bg-white/[0.035] p-4">

                  <div className="flex items-center justify-between">

                    <div className="flex items-center gap-3">

                      <span
                        className={`h-2.5 w-2.5 rounded-full ${config.color} ${config.glow}`}
                      />

                      <div>

                        <p className="text-xs font-medium text-white/85">
                          {config.label}
                        </p>

                        <p className="mt-0.5 text-[9px] uppercase tracking-[0.2em] text-white/25">
                          Discord presence
                        </p>

                      </div>

                    </div>

                    <span className="rounded-full border border-emerald-400/10 bg-emerald-400/[0.06] px-2.5 py-1 text-[9px] uppercase tracking-[0.18em] text-emerald-300/60">
                      Live
                    </span>

                  </div>

                  {/* Activity */}

                  <div className="mt-3 flex items-center gap-3 rounded-xl border border-white/[0.05] bg-black/25 px-3 py-3">

                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-indigo-400/10 bg-indigo-500/10 text-indigo-300">
                      <Gamepad2 size={15} />
                    </div>

                    <div className="min-w-0">

                      <p className="text-[9px] uppercase tracking-[0.2em] text-white/25">
                        Activity
                      </p>

                      {activity ? (
                        <>
                          <p className="truncate text-xs text-white/70">
                            {activity.name}
                          </p>

                          {activity.details && (
                            <p className="truncate text-[10px] text-white/35">
                              {activity.details}
                            </p>
                          )}

                          {activity.state && (
                            <p className="truncate text-[10px] text-white/35">
                              {activity.state}
                            </p>
                          )}
                        </>
                      ) : (
                        <p className="mt-0.5 text-xs text-white/35">
                          Nothing currently playing
                        </p>
                      )}

                    </div>

                  </div>

                </div>

                {/* Flip hint */}

                <div className="mt-5 text-center">

                  <p className="text-[9px] uppercase tracking-[0.25em] text-white/20">
                    Click to flip
                  </p>

                </div>

              </div>

            </div>

            {/* ================================================= */}
            {/* BACK */}
            {/* ================================================= */}

            <div
              style={{
                backfaceVisibility: "hidden",
                WebkitBackfaceVisibility:
                  "hidden",
                transform:
                  "rotateY(180deg)",
              }}
              className="absolute inset-0 flex min-h-full w-full flex-col overflow-hidden rounded-[30px] border border-white/[0.14] bg-black/75 p-6 shadow-[0_25px_80px_rgba(0,0,0,0.55)] backdrop-blur-2xl sm:p-8"
            >

              {/* Back glow */}

              <div className="pointer-events-none absolute -right-32 -top-32 h-64 w-64 rounded-full bg-indigo-500/15 blur-[100px]" />

              <div className="pointer-events-none absolute -bottom-32 -left-32 h-64 w-64 rounded-full bg-cyan-400/10 blur-[100px]" />

              <div className="relative flex flex-1 flex-col">

                {/* Header */}

                <div className="text-center">

                  <p className="text-[9px] uppercase tracking-[0.3em] text-indigo-300/50">
                    Haruto
                  </p>

                  <h2 className="mt-2 text-3xl font-semibold text-white">
                    Connect
                  </h2>

                  <p className="mt-2 text-sm text-white/35">
                    Find me around the internet.
                  </p>

                </div>

                {/* Links */}

                <div className="mt-8 space-y-3">

                  {/* Discord */}

                  <motion.a
                    href={`https://discord.com/users/${DISCORD_USER_ID}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(event) =>
                      event.stopPropagation()
                    }
                    whileHover={{
                      scale: 1.02,
                      y: -2,
                    }}
                    whileTap={{
                      scale: 0.98,
                    }}
                    className="flex items-center justify-between rounded-2xl border border-indigo-400/15 bg-indigo-500/[0.08] px-4 py-4 transition hover:border-indigo-400/30 hover:bg-indigo-500/[0.14]"
                  >

                    <div className="flex items-center gap-3">

                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-200">
                        <FaDiscord size={21} />
                      </div>

                      <div className="text-left">

                        <p className="text-sm font-medium text-white/80">
                          Discord
                        </p>

                        <p className="text-[10px] text-white/30">
                          @{presence?.username ??
                            "haruto107_"}
                        </p>

                      </div>

                    </div>

                    <ExternalLink
                      size={14}
                      className="text-white/30"
                    />

                  </motion.a>

                  {/* YouTube */}

                  <motion.a
                    href="https://www.youtube.com/@HarutoPlays73"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(event) =>
                      event.stopPropagation()
                    }
                    whileHover={{
                      scale: 1.02,
                      y: -2,
                    }}
                    whileTap={{
                      scale: 0.98,
                    }}
                    className="flex items-center justify-between rounded-2xl border border-white/[0.08] bg-white/[0.035] px-4 py-4 transition hover:border-red-400/30 hover:bg-red-500/10"
                  >

                    <div className="flex items-center gap-3">

                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-500/10 text-red-300">
                        <FaYoutube size={21} />
                      </div>

                      <div className="text-left">

                        <p className="text-sm font-medium text-white/80">
                          YouTube
                        </p>

                        <p className="text-[10px] text-white/30">
                          @HarutoPlays73
                        </p>

                      </div>

                    </div>

                    <ExternalLink
                      size={14}
                      className="text-white/30"
                    />

                  </motion.a>

                  {/* GitHub */}

                  <motion.a
                    href="https://github.com/HarutoFX"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(event) =>
                      event.stopPropagation()
                    }
                    whileHover={{
                      scale: 1.02,
                      y: -2,
                    }}
                    whileTap={{
                      scale: 0.98,
                    }}
                    className="flex items-center justify-between rounded-2xl border border-white/[0.08] bg-white/[0.035] px-4 py-4 transition hover:border-white/20 hover:bg-white/[0.08]"
                  >

                    <div className="flex items-center gap-3">

                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/[0.06] text-white/65">
                        <FaGithub size={21} />
                      </div>

                      <div className="text-left">

                        <p className="text-sm font-medium text-white/80">
                          GitHub
                        </p>

                        <p className="text-[10px] text-white/30">
                          @HarutoFX
                        </p>

                      </div>

                    </div>

                    <ExternalLink
                      size={14}
                      className="text-white/30"
                    />

                  </motion.a>

                </div>

                {/* About */}

                <div className="mt-5 rounded-2xl border border-white/[0.07] bg-white/[0.025] p-4">

                  <p className="text-[9px] uppercase tracking-[0.25em] text-white/25">
                    About
                  </p>

                  <p className="mt-2 text-xs leading-5 text-white/50">
                    3D artist • 3D animator • programmer
                    building worlds one line of code at a
                    time.
                  </p>

                  <div className="mt-3 flex items-center gap-1.5 text-[10px] text-white/30">
                    <MapPin size={11} />
                    Newport, Wales
                  </div>

                </div>

                {/* Flip back */}

                <div className="mt-auto pt-6 text-center">

                  <p className="text-[9px] uppercase tracking-[0.25em] text-white/20">
                    Click to flip back
                  </p>

                </div>

              </div>

            </div>

          </motion.div>

        </div>

      </div>
    </section>
  );
}
