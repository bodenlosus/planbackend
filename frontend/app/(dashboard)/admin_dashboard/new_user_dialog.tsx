import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { NewUserForm } from "./forms";
import { useState } from "react";

export function NewUserDialog({
  onSubmit,
  trigger,
}: {
  trigger?: React.ReactNode;
  onSubmit?: (data: {
    user_name: string;
    email: string;
    password: string;
  }) => void;
}) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger ?? <Button variant="outline">Neuer Benutzer</Button>}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Neuer Benutzer</DialogTitle>
          <DialogDescription>
            Fülle die folgenden Felder aus, um einen neuen Benutzer anzulegen.
          </DialogDescription>
        </DialogHeader>
        <NewUserForm
          onSubmit={(...args) => {
            setOpen(false);
            onSubmit?.(...args);
          }}
        />
      </DialogContent>
    </Dialog>
  );
}
