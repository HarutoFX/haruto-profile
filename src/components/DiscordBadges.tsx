"use client";

import React from "react";

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

interface DiscordBadgesProps {
  badges: DiscordBadge[];
  profile: DiscordProfile | null;
}

interface BadgeProps {
  label: string;
  description?: string;
  children: React.ReactNode;
}

function Badge({
  label,
  description,
  children,
}: BadgeProps) {
  return (
    <div
      title={
        description
          ? `${label} — ${description}`
          : label
      }
      className="
        group relative
        flex h-7 w-7 items-center justify-center
        rounded-md
        border border-white/[0.10]
        bg-white/[0.055]
        text-white/70
        shadow-[0_4px_15px_rgba(0,0,0,0.18)]
        backdrop-blur-md
        transition-all duration-300
        hover:-translate-y-0.5
        hover:border-white/20
        hover:bg-white/[0.10]
        hover:text-white
      "
    >
      {children}

      <span
        className="
          pointer-events-none absolute
          -top-9 left-1/2
          -translate-x-1/2
          whitespace-nowrap
          rounded-md
          border border-white/10
          bg-black/80
          px-2 py-1
          text-[9px]
          text-white/80
          opacity-0
          shadow-xl
          backdrop-blur-md
          transition-opacity
          group-hover:opacity-100
          z-50
        "
      >
        {label}
      </span>
    </div>
  );
}

function HypeSquadBadge({
  badge,
}: {
  badge: DiscordBadge;
}) {
  return (
    <Badge
      label={badge.name}
      description={badge.description}
    >
      <svg
        viewBox="0 0 24 24"
        className="h-[16px] w-[16px]"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M12 2.8L14.2 8.2L19.8 10.4L14.2 12.6L12 18.2L9.8 12.6L4.2 10.4L9.8 8.2L12 2.8Z"
          fill="currentColor"
        />

        <circle
          cx="12"
          cy="20"
          r="1.3"
          fill="currentColor"
          opacity="0.55"
        />
      </svg>
    </Badge>
  );
}

function NitroBadge() {
  return (
    <Badge
      label="Discord Nitro"
      description="Discord Nitro subscriber"
    >
      <svg
        viewBox="0 0 24 24"
        className="h-[15px] w-[15px]"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M12 3.5L19.5 12L12 20.5L4.5 12L12 3.5Z"
          fill="currentColor"
          opacity="0.9"
        />

        <path
          d="M12 6.5L16.5 12L12 17.5L7.5 12L12 6.5Z"
          fill="black"
          opacity="0.35"
        />
      </svg>
    </Badge>
  );
}

function ActiveDeveloperBadge({
  badge,
}: {
  badge: DiscordBadge;
}) {
  return (
    <Badge
      label={badge.name}
      description={badge.description}
    >
      <svg
        viewBox="0 0 24 24"
        className="h-[16px] w-[16px]"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M7 4.5L3.5 8V16L7 19.5"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        <path
          d="M17 4.5L20.5 8V16L17 19.5"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        <path
          d="M13.5 4L10.5 20"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    </Badge>
  );
}

function QuestBadge({
  badge,
}: {
  badge: DiscordBadge;
}) {
  return (
    <Badge
      label={badge.name}
      description={badge.description}
    >
      <svg
        viewBox="0 0 24 24"
        className="h-[16px] w-[16px]"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M12 3.5L19.5 8V16L12 20.5L4.5 16V8L12 3.5Z"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinejoin="round"
        />

        <path
          d="M8.5 10.5L12 8.5L15.5 10.5V14L12 16L8.5 14V10.5Z"
          fill="currentColor"
          opacity="0.55"
        />
      </svg>
    </Badge>
  );
}

function GenericBadge({
  badge,
}: {
  badge: DiscordBadge;
}) {
  return (
    <Badge
      label={badge.name}
      description={badge.description}
    >
      <svg
        viewBox="0 0 24 24"
        className="h-[16px] w-[16px]"
        fill="none"
        aria-hidden="true"
      >
        <circle
          cx="12"
          cy="12"
          r="8"
          stroke="currentColor"
          strokeWidth="1.6"
        />

        <path
          d="M12 8V12L14.5 14.5"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </Badge>
  );
}

function NameplateBadge({
  nameplate,
}: {
  nameplate: DiscordNameplate;
}) {
  return (
    <Badge
      label="Discord Nameplate"
      description={nameplate.label}
    >
      <div className="flex h-full w-full items-center justify-center">
        <span className="text-[8px] font-bold tracking-[-0.03em] text-white/80">
          NP
        </span>
      </div>
    </Badge>
  );
}

function GuildTagBadge({
  profile,
}: {
  profile: DiscordProfile;
}) {
  const guild = profile.primaryGuild;

  if (!guild) {
    return null;
  }

  if (!guild.badgeUrl && !guild.tag) {
    return null;
  }

  return (
    <Badge
      label={
        guild.tag
          ? `Server Tag: ${guild.tag}`
          : "Server Tag"
      }
      description="Primary Discord server identity"
    >
      {guild.badgeUrl ? (
        <img
          src={guild.badgeUrl}
          alt={
            guild.tag
              ? `${guild.tag} server badge`
              : "Discord server badge"
          }
          className="h-[17px] w-[17px] object-contain"
        />
      ) : (
        <span className="text-[8px] font-bold text-white/80">
          {guild.tag}
        </span>
      )}
    </Badge>
  );
}

export default function DiscordBadges({
  badges,
  profile,
}: DiscordBadgesProps) {
  const renderedBadges: React.ReactNode[] = [];

  /*
   * REAL DISCORD BADGES
   *
   * We only render badges that actually exist
   * in the data returned by Discord.
   */

  for (const badge of badges) {
    const id = badge.id.toLowerCase();

    if (
      id === "hypesquad_bravery" ||
      id === "hypesquad_brilliance" ||
      id === "hypesquad_balance"
    ) {
      renderedBadges.push(
        <HypeSquadBadge
          key={badge.id}
          badge={badge}
        />
      );

      continue;
    }

    if (
      id === "active_developer" ||
      id === "active_developer_badge"
    ) {
      renderedBadges.push(
        <ActiveDeveloperBadge
          key={badge.id}
          badge={badge}
        />
      );

      continue;
    }

    if (
      id === "quest" ||
      id === "quests"
    ) {
      renderedBadges.push(
        <QuestBadge
          key={badge.id}
          badge={badge}
        />
      );

      continue;
    }

    if (
      id === "discord_nitro" ||
      id === "nitro"
    ) {
      renderedBadges.push(
        <NitroBadge key={badge.id} />
      );

      continue;
    }

    renderedBadges.push(
      <GenericBadge
        key={badge.id}
        badge={badge}
      />
    );
  }

  /*
   * NITRO
   *
   * Discord profile premiumType:
   *
   * 0 = None
   * 1 = Nitro Classic
   * 2 = Nitro
   *
   * We only show Nitro when the API actually
   * tells us that the account has it.
   */

  const hasNitro =
    profile?.premiumType === 1 ||
    profile?.premiumType === 2;

  if (
    hasNitro &&
    !badges.some(
      (badge) =>
        badge.id === "discord_nitro" ||
        badge.id === "nitro"
    )
  ) {
    renderedBadges.push(
      <NitroBadge key="premium_nitro" />
    );
  }

  /*
   * NAMEPLATE
   *
   * Your Discord account currently has:
   *
   * collectibles.nameplate
   *
   * with:
   * gothica / nevermore
   */

  const nameplate =
    profile?.collectibles?.nameplate;

  if (nameplate) {
    renderedBadges.push(
      <NameplateBadge
        key={`nameplate-${nameplate.skuId}`}
        nameplate={nameplate}
      />
    );
  }

  /*
   * PRIMARY SERVER / GUILD TAG
   *
   * Your current Discord data contains:
   *
   * primaryGuild.tag = "GI"
   *
   * primaryGuild.badge
   */

  if (profile?.primaryGuild) {
    renderedBadges.push(
      <GuildTagBadge
        key="primary-guild"
        profile={profile}
      />
    );
  }

  /*
   * Nothing to display.
   */

  if (renderedBadges.length === 0) {
    return null;
  }

  return (
    <div
      className="mt-3 flex items-center justify-center gap-1.5"
      aria-label="Discord profile badges"
    >
      {renderedBadges}
    </div>
  );
}