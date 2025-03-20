import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function POST(request: Request) {
  try {
    const { vinylId } = await request.json();

    const updatedVinyl = await prisma.vinyl.update({
      where: { id: vinylId },
      data: {
        timesPlayed: {
          increment: 1,
        },
        lastPlayed: new Date(),
      },
    });

    return NextResponse.json({ vinyl: updatedVinyl });
  } catch (error) {
    console.error("Error updating vinyl play:", error);
    return NextResponse.json(
      { error: "Failed to update vinyl play" },
      { status: 500 }
    );
  }
}
