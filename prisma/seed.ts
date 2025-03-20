import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  const vinyls = [
    {
      artist: "Pink Floyd",
      album: "The Dark Side of the Moon",
      year: 1973,
      timesPlayed: 0,
      genre: "Progressive Rock",
      artworkPath: "/uploads/dark-side-of-the-moon.png",
    },
    {
      artist: "The Beatles",
      album: "Abbey Road",
      year: 1969,
      timesPlayed: 0,
      genre: "Rock",
      artworkPath: "/uploads/abbey-road.jpg",
    },
    {
      artist: "Fleetwood Mac",
      album: "Rumours",
      year: 1977,
      timesPlayed: 0,
      genre: "Rock",
    },
  ];

  for (const vinyl of vinyls) {
    await prisma.vinyl.create({
      data: vinyl,
    });
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
