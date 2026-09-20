import { NewJobForm } from "@/components/sections/new-job-form"
import { NewJobHero } from "@/components/sections/new-job-hero"
import { PageContainer } from "@/components/shared/page-container"

export default function NewJobPage() {
  return (
    <PageContainer className="max-w-2xl py-14">
      <NewJobHero />
      <NewJobForm />
    </PageContainer>
  )
}
