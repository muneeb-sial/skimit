import * as React from "react"

import { cn } from "@/lib/utils"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "min-h-9 w-full min-w-0 rounded-md border border-input bg-transparent px-2.5 py-1.5 text-sm caret-primary transition-colors outline-none placeholder:text-muted-foreground hover:border-foreground/45 focus-visible:border-ring focus-visible:outline-offset-0 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-45 aria-invalid:border-destructive",
        className
      )}
      {...props}
    />
  )
}

export { Input }
