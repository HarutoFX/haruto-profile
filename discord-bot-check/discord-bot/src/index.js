"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const discord_js_1 = require("discord.js");
const node_fs_1 = __importDefault(require("node:fs"));
const node_path_1 = __importDefault(require("node:path"));
const token = process.env.DISCORD_TOKEN;
if (!token) {
    throw new Error("DISCORD_TOKEN is missing from the .env file.");
}
const TARGET_USER_ID = "875383052174524476";
const presenceFile = node_path_1.default.resolve(process.cwd(), "data", "presence.json");
const BADGE_DEFINITIONS = [
    {
        flag: discord_js_1.UserFlags.Staff,
        id: "staff",
        name: "Discord Staff",
        description: "Discord Employee",
    },
    {
        flag: discord_js_1.UserFlags.Partner,
        id: "partner",
        name: "Partnered Server Owner",
        description: "Partnered Server Owner",
    },
    {
        flag: discord_js_1.UserFlags.Hypesquad,
        id: "hypesquad",
        name: "HypeSquad Events",
        description: "HypeSquad Events Member",
    },
    {
        flag: discord_js_1.UserFlags.BugHunterLevel1,
        id: "bug_hunter_level_1",
        name: "Bug Hunter",
        description: "Bug Hunter Level 1",
    },
    {
        flag: discord_js_1.UserFlags.HypeSquadOnlineHouse1,
        id: "hypesquad_bravery",
        name: "HypeSquad Bravery",
        description: "House Bravery Member",
    },
    {
        flag: discord_js_1.UserFlags.HypeSquadOnlineHouse2,
        id: "hypesquad_brilliance",
        name: "HypeSquad Brilliance",
        description: "House Brilliance Member",
    },
    {
        flag: discord_js_1.UserFlags.HypeSquadOnlineHouse3,
        id: "hypesquad_balance",
        name: "HypeSquad Balance",
        description: "House Balance Member",
    },
    {
        flag: discord_js_1.UserFlags.PremiumEarlySupporter,
        id: "early_supporter",
        name: "Early Supporter",
        description: "Early Nitro Supporter",
    },
    {
        flag: discord_js_1.UserFlags.BugHunterLevel2,
        id: "bug_hunter_level_2",
        name: "Bug Hunter Gold",
        description: "Bug Hunter Level 2",
    },
    {
        flag: discord_js_1.UserFlags.VerifiedBot,
        id: "verified_bot",
        name: "Verified Bot",
        description: "Verified Bot",
    },
    {
        flag: discord_js_1.UserFlags.VerifiedDeveloper,
        id: "verified_developer",
        name: "Early Verified Bot Developer",
        description: "Early Verified Bot Developer",
    },
    {
        flag: discord_js_1.UserFlags.CertifiedModerator,
        id: "certified_moderator",
        name: "Moderator Alumni",
        description: "Moderator Programs Alumni",
    },
];
function extractBadges(member) {
    if (!member?.user?.flags) {
        return [];
    }
    return BADGE_DEFINITIONS
        .filter((badge) => member.user.flags.has(badge.flag))
        .map(({ flag: _flag, ...badge }) => badge);
}
function savePresence(member, presence) {
    const activities = presence?.activities.map((activity) => ({
        name: activity.name,
        type: discord_js_1.ActivityType[activity.type] ??
            String(activity.type),
        details: activity.details ?? null,
        state: activity.state ?? null,
    })) ?? [];
    const badges = extractBadges(member);
    const data = {
        userId: TARGET_USER_ID,
        username: member?.user.username ??
            "Haruto",
        displayName: member?.displayName ??
            member?.user.globalName ??
            member?.user.username ??
            "Haruto",
        avatar: member?.user.displayAvatarURL({
            extension: "png",
            size: 256,
        }) ?? null,
        status: presence?.status ??
            "offline",
        badges,
        activities,
        updatedAt: new Date().toISOString(),
    };
    node_fs_1.default.mkdirSync(node_path_1.default.dirname(presenceFile), {
        recursive: true,
    });
    node_fs_1.default.writeFileSync(presenceFile, JSON.stringify(data, null, 2), "utf8");
    console.log(`Presence saved: ${data.status} | ${activities.length} activity(s) | ${badges.length} badge(s)`);
    if (badges.length > 0) {
        console.log(`Badges: ${badges.map((badge) => badge.name).join(", ")}`);
    }
    else {
        console.log("Badges: none exposed by Discord");
    }
}
const client = new discord_js_1.Client({
    intents: [
        discord_js_1.GatewayIntentBits.Guilds,
        discord_js_1.GatewayIntentBits.GuildMembers,
        discord_js_1.GatewayIntentBits.GuildPresences,
    ],
});
client.once("clientReady", async (readyClient) => {
    console.log(`Discord bot logged in as ${readyClient.user.tag}`);
    console.log(`Connected to ${readyClient.guilds.cache.size} server(s).`);
    let foundMember = null;
    let foundPresence = null;
    for (const guild of readyClient.guilds.cache.values()) {
        try {
            const member = await guild.members.fetch(TARGET_USER_ID);
            console.log(`Found Haruto in server: ${guild.name}`);
            console.log(`Username: ${member.user.username}`);
            console.log(`Display name: ${member.displayName}`);
            console.log(`Status: ${member.presence?.status ?? "offline"}`);
            console.log(`Public flags: ${member.user.flags?.toArray().join(", ") ?? "none"}`);
            foundMember = member;
            foundPresence = member.presence;
            break;
        }
        catch {
            console.log(`Haruto was not found in: ${guild.name}`);
        }
    }
    savePresence(foundMember, foundPresence);
});
client.on("presenceUpdate", async (_oldPresence, newPresence) => {
    if (newPresence.userId !==
        TARGET_USER_ID) {
        return;
    }
    console.log("\n--- Haruto Presence Update ---");
    console.log(`Status: ${newPresence.status}`);
    for (const activity of newPresence.activities) {
        console.log(`Activity: ${activity.name} (${discord_js_1.ActivityType[activity.type] ?? activity.type})`);
        if (activity.details) {
            console.log(`Details: ${activity.details}`);
        }
        if (activity.state) {
            console.log(`State: ${activity.state}`);
        }
    }
    let member = null;
    try {
        const guild = newPresence.guild;
        if (!guild) {
            console.log("Presence update has no associated guild.");
            savePresence(null, newPresence);
            return;
        }
        member =
            await guild.members.fetch(TARGET_USER_ID);
    }
    catch {
        console.log("Could not fetch member information.");
    }
    savePresence(member, newPresence);
});
client.on("error", (error) => {
    console.error("Discord client error:", error);
});
client.login(token);
//# sourceMappingURL=index.js.map