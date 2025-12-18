import { prisma } from "../lib/prisma";

async function clearDatabase() {
  console.log("🧹 Clearing database...");

  await prisma.user.deleteMany();

  console.log("✅ All users deleted");
}

clearDatabase()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });
