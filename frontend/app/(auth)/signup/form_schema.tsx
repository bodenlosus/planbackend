import { z } from "zod";

export const name = z
  .string({ error: "Bitte gib deinen Namen ein" })
  .trim()
  .regex(/^[\w\s]*$/, { error: "Darf nur Buchstaben und Zahlen enthalten." })
  .min(1)
  .max(100);

export const email = z
  .email({
    error: "Bitte gib eine gültige E-Mail ein",
  })
  .trim();

export const password = z
  .string()
  .trim()
  .min(8, { error: "Bitte gib ein gültiges Passwort ein" });

export const formSchema = z
  .object({
    fullName: name,
    email: email,
    password: password,
    confirmPassword: password,
    termsAccepted: z.boolean({ error: "" }),
  })
  .superRefine(({ password, confirmPassword }, ctx) => {
    if (password === confirmPassword) {
      return;
    }
    ctx.addIssue({
      code: "custom",
      error: "Passwords do not match",
      path: ["confirmPassword"],
    });
  });
