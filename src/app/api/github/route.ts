import { NextResponse } from "next/server";

const REPOSITORIES = [
  "HarutoFX/HarutoFx-Intro",
  "HarutoFX/voryn",
  "HarutoFX/AgriCrops-and-Disease-Detection-Website",
];

export async function GET() {
  try {
    const repositories = await Promise.all(
      REPOSITORIES.map(async (repository) => {
        try {
          const response = await fetch(
            `https://api.github.com/repos/${repository}`,
            {
              headers: {
                Accept: "application/vnd.github+json",
                "User-Agent": "HarutoFX-Portfolio",
              },
              next: {
                revalidate: 300,
              },
            }
          );

          if (!response.ok) {
            console.error(
              `GitHub returned ${response.status} for ${repository}`
            );

            return null;
          }

          return await response.json();
        } catch (error) {
          console.error(
            `Failed to fetch ${repository}:`,
            error
          );

          return null;
        }
      })
    );

    const validRepositories = repositories.filter(
      (repository) => repository !== null
    );

    return NextResponse.json(
      {
        repositories: validRepositories,
        count: validRepositories.length,
      },
      {
        status: 200,
        headers: {
          "Cache-Control":
            "public, s-maxage=300, stale-while-revalidate=600",
        },
      }
    );
  } catch (error) {
    console.error("GitHub API route error:", error);

    return NextResponse.json(
      {
        repositories: [],
        count: 0,
        error: "Failed to fetch GitHub repositories.",
      },
      {
        status: 500,
      }
    );
  }
}