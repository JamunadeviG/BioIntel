import Link from "next/link"
import { MainNav } from "@/components/main-nav"
import { SummaryCards } from "@/components/summary-cards"
import { summaryStats } from "@/lib/mock-data"
import { Button } from "@/components/ui/button"

export default function HomePage() {
  const stats = summaryStats()
  return (
    <>
      <MainNav />
      <main className="mx-auto w-full max-w-6xl px-4 pb-12 pt-8">
        {/* Hero */}
        <section className="mb-8 space-y-4">
          <h1 className="text-balance text-3xl font-semibold tracking-tight text-gray-900 sm:text-4xl">
            Genomics Surveillance for Emerging Pathogens
          </h1>
          <p className="max-w-2xl text-pretty text-gray-600">
            Upload datasets, explore metadata, visualize mutation trends, and preview AI predictions for
            transmissibility and drug resistance. Built for TB, SARS-CoV-2, and beyond.
          </p>
          <div className="flex gap-3">
            <Link href="/data-explorer">
              <Button className="bg-blue-600 text-white hover:bg-blue-700">Get Started</Button>
            </Link>
            <Link href="/analytics">
              <Button variant="outline" className="border-gray-300 bg-transparent text-gray-800 hover:bg-gray-100">
                View Analytics
              </Button>
            </Link>
          </div>
        </section>

        <SummaryCards
          items={[
            { title: "Total Samples", value: stats.totalSamples },
            { title: "Countries", value: stats.countries },
            { title: "Variants", value: stats.variants },
            { title: "Lineages", value: stats.lineages },
          ]}
        />

        {/* Value props */}
        <section className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3">
          {[
            {
              title: "Data Explorer",
              body: "Upload ENA metadata (CSV/TSV), filter by country, year, lineage, and review samples.",
              href: "/data-explorer",
            },
            {
              title: "Analytics",
              body: "Visualize mutation frequencies, geographic distribution, and collection timelines.",
              href: "/analytics",
            },
            {
              title: "AI Predictions",
              body: "Preview model outputs for transmissibility, resistance, and variant classification.",
              href: "/predictions",
            },
          ].map((c) => (
            <div key={c.title} className="rounded-lg border border-gray-200 p-4">
              <h3 className="mb-1 text-sm font-medium text-gray-700">{c.title}</h3>
              <p className="text-sm text-gray-600">{c.body}</p>
              <Link href={c.href} className="mt-3 inline-block text-sm font-medium text-blue-600 hover:underline">
                Open →
              </Link>
            </div>
          ))}
        </section>
      </main>
    </>
  )
}
