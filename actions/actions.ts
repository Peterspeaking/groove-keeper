"use server";

import { prisma } from "@/lib/db";

export async function addVinyl(formData: FormData) {
  const artist = formData.get("artist");
  const album = formData.get("album");
  const year = formData.get("year");
  const genre = formData.get("genre");

  await prisma.vinyl.create({
    data: {
      artist: artist as string,
      album: album as string,
      year: Number(year),
      genre: genre as string,
    },
  });
}
