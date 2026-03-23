import { PageLayout } from "@/app/components/layout/PageLayout";

export default function ExampleCaseStudyPage() {
  return (
    <PageLayout>
      <article className="space-y-10">
        <header className="space-y-3">
          <h1 className="text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">
            Example UX Case Study
          </h1>
          <p className="max-w-prose text-base leading-7 text-textPrimary/80">
            A realistic (but static) placeholder that shows how a future case
            study will read: scannable sections, semantic structure, and simple
            narrative flow.
          </p>
        </header>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold tracking-tight">Context</h2>
          <p className="max-w-prose text-base leading-7 text-textPrimary/80">
            The product had strong engagement, but users struggled at a key step
            in the journey. Support tickets and drop-off data pointed to a
            confusing handoff between “understanding” and “doing.”
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold tracking-tight">What was done</h2>
          <p className="max-w-prose text-base leading-7 text-textPrimary/80">
            The work focused on clarifying intent and reducing cognitive load:
            mapping the journey, tightening language, and reshaping the layout
            so the next action felt obvious.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold tracking-tight">Outcome</h2>
          <p className="max-w-prose text-base leading-7 text-textPrimary/80">
            The updated flow improved completion and reduced confusion. More
            importantly, the structure made future iterations easier: clearer
            sections, fewer one-off decisions, and better defaults.
          </p>
        </section>
      </article>
    </PageLayout>
  );
}


