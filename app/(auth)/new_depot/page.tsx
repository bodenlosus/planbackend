import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { createDepotAction } from "@/app/(auth)/actions";
import { toast } from "sonner";

export default async function Page() {
  "use server";
  return (
    <main className="grow flex justify-center items-center">
      <Card className="min-w-[350px] w-fit max-w-[33%] shadow-2xl">
        <CardHeader>
          <CardTitle>Eröffne dein erstes Depot</CardTitle>
          <CardDescription>
            Wir konnten kein Depot für deinen Account finden, bitte eröffne ein
            neues Depot.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Inner />
        </CardContent>
      </Card>
    </main>
  );
}
