import "dotenv/config";
import {
  ActivityType,
  Client,
  GatewayIntentBits,
  GuildMember,
  Presence,
  UserFlags,
} from "discord.js";
import fs from "node:fs";
import path from "node:path";
import http from "node:http";

const token = process.env.DISCORD_TOKEN;
const BOT_API_SECRET = process.env.BOT_API_SECRET;
const BOT_API_PORT = Number(process.env.BOT_API_PORT ?? 3000);

if (!token) {
  throw new Error("DISCORD_TOKEN is missing from the .env file.");
}

const TARGET_USER_ID = "875383052174524476";

const presenceFile = path.resolve(
  process.cwd(),
  "data",
  "presence.json"
);

interface DiscordBadge {
  id: string;
  name: string;
  description: string;
}

interface PresenceData {
  userId: string;
  username: string;
  displayName: string;
  avatar: string | null;
  status: string;

  badges: DiscordBadge[];

  activities: {
    name: string;
    type: string;
    details: string | null;
    state: string | null;
  }[];

  updatedAt: string;
}

const BADGE_DEFINITIONS: {
  flag: UserFlags;
  id: string;
  name: string;
  description: string;
}[] = [
  {
    flag: UserFlags.Staff,
    id: "staff",
    name: "Discord Staff",
    description: "Discord Employee",
  },
  {
    flag: UserFlags.Partner,
    id: "partner",
    name: "Partnered Server Owner",
    description: "Partnered Server Owner",
  },
  {
    flag: UserFlags.Hypesquad,
    id: "hypesquad",
    name: "HypeSquad Events",
    description: "HypeSquad Events Member",
  },
  {
    flag: UserFlags.BugHunterLevel1,
    id: "bug_hunter_level_1",
    name: "Bug Hunter",
    description: "Bug Hunter Level 1",
  },
  {
    flag: UserFlags.HypeSquadOnlineHouse1,
    id: "hypesquad_bravery",
    name: "HypeSquad Bravery",
    description: "House Bravery Member",
  },
  {
    flag: UserFlags.HypeSquadOnlineHouse2,
    id: "hypesquad_brilliance",
    name: "HypeSquad Brilliance",
    description: "House Brilliance Member",
  },
  {
    flag: UserFlags.HypeSquadOnlineHouse3,
    id: "hypesquad_balance",
    name: "HypeSquad Balance",
    description: "House Balance Member",
  },
  {
    flag: UserFlags.PremiumEarlySupporter,
    id: "early_supporter",
    name: "Early Supporter",
    description: "Early Nitro Supporter",
  },
  {
    flag: UserFlags.BugHunterLevel2,
    id: "bug_hunter_level_2",
    name: "Bug Hunter Gold",
    description: "Bug Hunter Level 2",
  },
  {
    flag: UserFlags.VerifiedBot,
    id: "verified_bot",
    name: "Verified Bot",
    description: "Verified Bot",
  },
  {
    flag: UserFlags.VerifiedDeveloper,
    id: "verified_developer",
    name: "Early Verified Bot Developer",
    description: "Early Verified Bot Developer",
  },
  {
    flag: UserFlags.CertifiedModerator,
    id: "certified_moderator",
    name: "Moderator Alumni",
    description: "Moderator Programs Alumni",
  },
];

const apiServer = http.createServer(async (request, response) => {
  response.setHeader(
    "Content-Type",
    "application/json; charset=utf-8"
  );

  if (
    request.method !== "GET" ||
    request.url !== "/presence"
  ) {
    response.statusCode = 404;

    response.end(
      JSON.stringify({
        error: "Not found",
      })
    );

    return;
  }

  const authorization =
    request.headers.authorization;

  if (
    !BOT_API_SECRET ||
    authorization !== `Bearer ${BOT_API_SECRET}`
  ) {
    response.statusCode = 401;

    response.end(
      JSON.stringify({
        error: "Unauthorized",
      })
    );

    return;
  }

  try {
    const file = await fs.promises.readFile(
      presenceFile,
      "utf8"
    );

    response.statusCode = 200;
    response.setHeader(
      "Cache-Control",
      "no-store"
    );

    response.end(file);
  } catch (error) {
    console.error(
      "Failed to read presence file:",
      error
    );

    response.statusCode = 503;

    response.end(
      JSON.stringify({
        error: "Presence unavailable",
      })
    );
  }
});

apiServer.listen(
  BOT_API_PORT,
  "0.0.0.0",
  () => {
    console.log(
      `Presence API listening on port ${BOT_API_PORT}`
    );
  }
);
function extractBadges(member: GuildMember | null): DiscordBadge[] {
  if (!member?.user?.flags) {
    return [];
  }

  return BADGE_DEFINITIONS
    .filter((badge) => member.user.flags!.has(badge.flag))
    .map(({ flag: _flag, ...badge }) => badge);
}

function savePresence(
  member: GuildMember | null,
  presence: Presence | null
) {
  const activities =
    presence?.activities.map((activity) => ({
      name: activity.name,
      type:
        ActivityType[activity.type] ??
        String(activity.type),
      details: activity.details ?? null,
      state: activity.state ?? null,
    })) ?? [];

  const badges = extractBadges(member);

  const data: PresenceData = {
    userId: TARGET_USER_ID,

    username:
      member?.user.username ??
      "Haruto",

    displayName:
      member?.displayName ??
      member?.user.globalName ??
      member?.user.username ??
      "Haruto",

    avatar:
      member?.user.displayAvatarURL({
        extension: "png",
        size: 256,
      }) ?? null,

    status:
      presence?.status ??
      "offline",

    badges,

    activities,

    updatedAt:
      new Date().toISOString(),
  };

  fs.mkdirSync(
    path.dirname(presenceFile),
    {
      recursive: true,
    }
  );

  fs.writeFileSync(
    presenceFile,
    JSON.stringify(data, null, 2),
    "utf8"
  );

  console.log(
    `Presence saved: ${data.status} | ${activities.length} activity(s) | ${badges.length} badge(s)`
  );

  if (badges.length > 0) {
    console.log(
      `Badges: ${badges.map((badge) => badge.name).join(", ")}`
    );
  } else {
    console.log("Badges: none exposed by Discord");
  }
}

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildPresences,
  ],
});

client.once(
  "clientReady",
  async (readyClient) => {
    console.log(
      `Discord bot logged in as ${readyClient.user.tag}`
    );

    console.log(
      `Connected to ${readyClient.guilds.cache.size} server(s).`
    );

    let foundMember: GuildMember | null = null;
    let foundPresence: Presence | null = null;

    for (const guild of readyClient.guilds.cache.values()) {
      try {
        const member =
          await guild.members.fetch(
            TARGET_USER_ID
          );

        console.log(
          `Found Haruto in server: ${guild.name}`
        );

        console.log(
          `Username: ${member.user.username}`
        );

        console.log(
          `Display name: ${member.displayName}`
        );

        console.log(
          `Status: ${member.presence?.status ?? "offline"}`
        );

        console.log(
          `Public flags: ${member.user.flags?.toArray().join(", ") ?? "none"}`
        );

        foundMember = member;
        foundPresence = member.presence;

        break;
      } catch {
        console.log(
          `Haruto was not found in: ${guild.name}`
        );
      }
    }

    savePresence(
      foundMember,
      foundPresence
    );
  }
);

client.on(
  "presenceUpdate",
  async (_oldPresence, newPresence) => {
    if (
      newPresence.userId !==
      TARGET_USER_ID
    ) {
      return;
    }

    console.log(
      "\n--- Haruto Presence Update ---"
    );

    console.log(
      `Status: ${newPresence.status}`
    );

    for (
      const activity of
      newPresence.activities
    ) {
      console.log(
        `Activity: ${activity.name} (${ActivityType[activity.type] ?? activity.type})`
      );

      if (activity.details) {
        console.log(
          `Details: ${activity.details}`
        );
      }

      if (activity.state) {
        console.log(
          `State: ${activity.state}`
        );
      }
    }

    let member: GuildMember | null =
      null;

    try {
      const guild =
        newPresence.guild;

      if (!guild) {
        console.log(
          "Presence update has no associated guild."
        );

        savePresence(
          null,
          newPresence
        );

        return;
      }

      member =
        await guild.members.fetch(
          TARGET_USER_ID
        );
    } catch {
      console.log(
        "Could not fetch member information."
      );
    }

    savePresence(
      member,
      newPresence
    );
  }
);

client.on(
  "error",
  (error) => {
    console.error(
      "Discord client error:",
      error
    );
  }
);

client.login(token);



