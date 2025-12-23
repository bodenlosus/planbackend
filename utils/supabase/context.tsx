import { createContext } from "react";
import { createClient } from "./server";

export const SupaBaseContext = createContext(createClient());
