import { useLoaderData } from "react-router";
import { ExerciseCard } from "~/components/exercise-card";
import { prisma } from "../../prisma/prisma";

export async function loader() {
  // Fetch all records for the user, ordered by createdAt
  const records = await prisma.record.findMany({
    where: {
      user: {
        email: "alex@example.com",
      },
    },
    orderBy: {
      createdAt: "desc",
    },
    select: {
      exerciseName: true,
      createdAt: true,
      reps: true,
      weight: true,
      unit: true,
    },
  });

  // Group records by exerciseName
  const grouped = records.reduce(
    (acc, rec) => {
      const name = rec.exerciseName;
      if (!acc[name]) {
        acc[name] = [];
      }
      acc[name].push({
        date: rec.createdAt,
        reps: rec.reps,
        weight: rec.weight,
        unit: rec.unit,
      });
      return acc;
    },
    {} as Record<
      string,
      Array<{ date: Date; reps: number; weight: number; unit: string }>
    >,
  );

  // Convert to desired array format
  const exercises = Object.entries(grouped).map(([exercise, data]) => ({
    exercise,
    data,
  }));

  return { exercises };
}

export default function Exercises() {
  const data = useLoaderData<typeof loader>();

  return (
    <div className="mx-6">
      This will be a page with exercises, you can add, delete, view exercises,
      also add my attempts history, view graphs, etc.
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-8">
        {data.exercises.map((ex) => (
          <ExerciseCard key={ex.exercise} name={ex.exercise} />
        ))}
      </div>
    </div>
  );
}
