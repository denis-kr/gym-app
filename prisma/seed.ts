import { prisma } from "./prisma";

export async function seed() {
  const users = await Promise.all([
    prisma.user.upsert({
      where: { email: "alex@example.com" },
      update: { name: "Alex" },
      create: { email: "alex@example.com", name: "Alex" },
    }),
    prisma.user.upsert({
      where: { email: "sam@example.com" },
      update: { name: "Sam" },
      create: { email: "sam@example.com", name: "Sam" },
    }),
    prisma.user.upsert({
      where: { email: "jordan@example.com" },
      update: { name: "Jordan" },
      create: { email: "jordan@example.com", name: "Jordan" },
    }),
  ]);

  const userByEmail = new Map(users.map((user) => [user.email, user.id]));

  await prisma.record.deleteMany({
    where: {
      userId: {
        in: users.map((user) => user.id),
      },
    },
  });

  await prisma.record.createMany({
    data: [
      {
        exerciseName: "Bench Press",
        reps: 8,
        weight: 185,
        unit: "lbs",
        userId: userByEmail.get("alex@example.com")!,
      },
      {
        exerciseName: "Squat",
        reps: 5,
        weight: 225,
        unit: "lbs",
        userId: userByEmail.get("alex@example.com")!,
      },
      {
        exerciseName: "Squat",
        reps: 8,
        weight: 185,
        unit: "lbs",
        userId: userByEmail.get("alex@example.com")!,
      },
      {
        exerciseName: "Squat",
        reps: 3,
        weight: 255,
        unit: "lbs",
        userId: userByEmail.get("alex@example.com")!,
      },
      {
        exerciseName: "Bench Press",
        reps: 6,
        weight: 195,
        unit: "lbs",
        userId: userByEmail.get("alex@example.com")!,
      },
      {
        exerciseName: "Deadlift",
        reps: 3,
        weight: 160,
        unit: "kg",
        userId: userByEmail.get("sam@example.com")!,
      },
      {
        exerciseName: "Overhead Press",
        reps: 10,
        weight: 95,
        unit: "lbs",
        userId: userByEmail.get("sam@example.com")!,
      },
      {
        exerciseName: "Deadlift",
        reps: 5,
        weight: 140,
        unit: "kg",
        userId: userByEmail.get("sam@example.com")!,
      },
      {
        exerciseName: "Overhead Press",
        reps: 6,
        weight: 115,
        unit: "lbs",
        userId: userByEmail.get("sam@example.com")!,
      },
      {
        exerciseName: "Lat Pulldown",
        reps: 12,
        weight: 60,
        unit: "kg",
        userId: userByEmail.get("jordan@example.com")!,
      },
      {
        exerciseName: "Dumbbell Row",
        reps: 10,
        weight: 35,
        unit: "kg",
        userId: userByEmail.get("jordan@example.com")!,
      },
      {
        exerciseName: "Lat Pulldown",
        reps: 10,
        weight: 70,
        unit: "kg",
        userId: userByEmail.get("jordan@example.com")!,
      },
      {
        exerciseName: "Dumbbell Row",
        reps: 12,
        weight: 30,
        unit: "kg",
        userId: userByEmail.get("jordan@example.com")!,
      },
    ],
  });
}

seed()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    // eslint-disable-next-line no-console
    console.error("Seeding failed:", error);
    await prisma.$disconnect();
    process.exit(1);
  });
