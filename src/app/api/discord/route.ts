import { NextResponse } from "next/server";
import fs from "node:fs/promises";
import path from "node:path";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const presencePath = path.join(
      process.cwd(),
      "discord-bot",
      "data",
      "presence.json"
    );

    const file = await fs.readFile(
      presencePath,
      "utf8"
    );

    const presence = JSON.parse(file);

    return NextResponse.json(presence, {
      headers: {
        "Cache-Control": "no-store",
      },
    });
  } catch (error) {
    console.error(
      "Failed to read Discord presence:",
      error
    );

    return NextResponse.json(
      {
        userId: "875383052174524476",
        status: "offline",
        activities: [],
        updatedAt: null,
      },
      { status: 200 }
    );
  }
}