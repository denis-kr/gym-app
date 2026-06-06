import { useFetcher, useLoaderData } from "react-router";
import type { Route } from "./+types/exercise";
import { prisma } from "../../prisma/prisma";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import { cn } from "~/lib/utils";

type ExerciseRecord = {
  id: string;
  createdAt: Date | string;
  reps: number;
  weight: number;
  unit: string;
};

export async function loader({ request }: Route.LoaderArgs) {
  const url = new URL(request.url);
  const exerciseName = url.searchParams.get("name") ?? "";

  const records = await prisma.record.findMany({
    where: {
      exerciseName,
      user: { email: "alex@example.com" },
    },
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      createdAt: true,
      reps: true,
      weight: true,
      unit: true,
    },
  });

  return { exerciseName, records };
}

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData();
  const intent = formData.get("_intent");

  if (intent === "delete") {
    const id = formData.get("id") as string;
    await prisma.record.delete({ where: { id } });
    return { ok: true };
  }

  if (intent === "add") {
    const user = await prisma.user.findUniqueOrThrow({
      where: { email: "alex@example.com" },
    });
    await prisma.record.create({
      data: {
        exerciseName: formData.get("exerciseName") as string,
        reps: Number(formData.get("reps")),
        weight: Number(formData.get("weight")),
        unit: formData.get("unit") as "lbs" | "kg",
        userId: user.id,
      },
    });
    return { ok: true };
  }

  return { ok: false };
}

export default function Exercise() {
  const { exerciseName, records } = useLoaderData<typeof loader>();
  const addFetcher = useFetcher();

  return (
    <div className="mx-6 space-y-6">
      <h1 className="text-2xl font-bold">{exerciseName || "Exercise"}</h1>

      <addFetcher.Form
        method="post"
        className="flex flex-wrap gap-3 items-end"
        onSubmit={(e) => {
          const form = e.currentTarget;
          setTimeout(() => form.reset(), 0);
        }}
      >
        <input type="hidden" name="_intent" value="add" />
        <input type="hidden" name="exerciseName" value={exerciseName} />

        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium">Reps</label>
          <Input
            name="reps"
            type="number"
            min={1}
            required
            placeholder="10"
            className="w-24"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium">Weight</label>
          <Input
            name="weight"
            type="number"
            min={0}
            required
            placeholder="135"
            className="w-24"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium">Unit</label>
          <select
            name="unit"
            defaultValue="lbs"
            className={cn(
              "h-9 rounded-4xl border border-input bg-input/30 px-3 py-1 text-sm transition-colors outline-none",
              "focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50",
            )}
          >
            <option value="lbs">lbs</option>
            <option value="kg">kg</option>
          </select>
        </div>

        <Button type="submit" disabled={addFetcher.state !== "idle"}>
          {addFetcher.state !== "idle" ? "Adding…" : "Add Record"}
        </Button>
      </addFetcher.Form>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Reps</TableHead>
            <TableHead>Weight</TableHead>
            <TableHead>Unit</TableHead>
            <TableHead />
          </TableRow>
        </TableHeader>
        <TableBody>
          {records.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={5}
                className="text-center text-muted-foreground py-8"
              >
                No records yet. Add your first set above.
              </TableCell>
            </TableRow>
          ) : (
            records.map((record: ExerciseRecord) => (
              <RecordRow key={record.id} record={record} />
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}

function RecordRow({ record }: { record: ExerciseRecord }) {
  const fetcher = useFetcher();
  const isDeleting = fetcher.state !== "idle";

  return (
    <TableRow className={cn(isDeleting && "opacity-50")}>
      <TableCell>
        {new Date(record.createdAt).toLocaleDateString(undefined, {
          year: "numeric",
          month: "short",
          day: "numeric",
        })}
      </TableCell>
      <TableCell>{record.reps}</TableCell>
      <TableCell>{record.weight}</TableCell>
      <TableCell>{record.unit}</TableCell>
      <TableCell className="text-right">
        <fetcher.Form method="post">
          <input type="hidden" name="_intent" value="delete" />
          <input type="hidden" name="id" value={record.id} />
          <Button
            type="submit"
            variant="destructive"
            size="sm"
            disabled={isDeleting}
          >
            {isDeleting ? "Deleting…" : "Delete"}
          </Button>
        </fetcher.Form>
      </TableCell>
    </TableRow>
  );
}
