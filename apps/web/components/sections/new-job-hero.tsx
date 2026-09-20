import { NEW_JOB_COPY } from "@/lib/constants"

export function NewJobHero() {
  return (
    <div className="mb-7 text-center">
      <p className="mb-2.5 text-xs tracking-widest text-accent-text uppercase">
        {NEW_JOB_COPY.kicker}
      </p>
      <h1 className="mb-2.5 text-4xl sm:text-5xl">{NEW_JOB_COPY.title}</h1>
      <p className="mx-auto max-w-md text-muted-foreground">
        {NEW_JOB_COPY.description}
      </p>
    </div>
  )
}
