"use server";

import { prisma } from "@/lib/db";
import fs from "fs/promises";
import path from "path";

export async function addVinyl(formData: FormData) {
  const artist = formData.get("artist");
  const album = formData.get("album");
  const year = formData.get("year");
  const genre = formData.get("genre");

  // Process artwork upload
  const artworkFile = formData.get("artwork");
  let artworkPath: string | null = null;

  if (artworkFile && artworkFile instanceof File) {
    const buffer = Buffer.from(await artworkFile.arrayBuffer());

    // Define the directory where you want to store the files
    // Using "public/uploads" makes the images accessible as static assets.
    const uploadsDir = path.join(process.cwd(), "public", "uploads");

    // Ensure the directory exists
    try {
      await fs.mkdir(uploadsDir, { recursive: true });
    } catch (err) {
      console.error("Error creating uploads directory:", err);
    }

    // Write the file to disk
    const filePath = path.join(uploadsDir, artworkFile.name);
    try {
      await fs.writeFile(filePath, new Uint8Array(buffer));
      artworkPath = `/uploads/${artworkFile.name}`;
    } catch (err) {
      console.error("Error saving the file:", err);
    }
  }

  // Create the vinyl record in the database
  await prisma.vinyl.create({
    data: {
      artist: artist as string,
      album: album as string,
      year: Number(year),
      genre: genre as string,
      artworkPath,
    },
  });
}
