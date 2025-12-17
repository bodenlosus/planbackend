import {
  Tooltip as TooltipComponent,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import type React from "react";

interface IconT extends React.ComponentPropsWithoutRef<"div"> {
  name: string;
}

export default function Tooltip({ name, children, className }: IconT) {
  return (
    <TooltipProvider>
      <TooltipComponent>
        <TooltipTrigger className={className} asChild>
          {children}
        </TooltipTrigger>
        <TooltipContent>
          <p>{name}</p>
        </TooltipContent>
      </TooltipComponent>
    </TooltipProvider>
  );
}
