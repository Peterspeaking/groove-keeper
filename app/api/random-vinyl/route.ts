import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET() {
  const count = await prisma.vinyl.count();
  if (count === 0) {
    return NextResponse.json({ vinyl: null });
  }

  const randomOffset = Math.floor(Math.random() * count);

  const vinyls = await prisma.vinyl.findMany({
    skip: randomOffset,
    take: 1,
  });
  const vinyl = vinyls[0];
  return NextResponse.json({ vinyl });
}
