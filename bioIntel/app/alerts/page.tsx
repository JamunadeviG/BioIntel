"use client"

import { MainNav } from "@/components/main-nav"
import { samplesMock } from "@/lib/mock-data"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"

function computeAlerts() {
  const highResistant = samplesMock.filter((s) => s.resistance === "High")
  const mediumResistant = samplesMock.filter((s) => s.resistance === "Medium")
  const byMutation = new Map<string, number>()
  samplesMock.forEach((s) => s.mutations.forEach((m) => byMutation.set(m, (byMutation.get(m) || 0) + 1)))

  const mutationSpikes = Array.from(byMutation, ([mutation, count]) => ({ mutation, count }))
    .filter((m) => m.count >= 10)
    .sort((a, b) => b.count - a.count)

  return { highResistant, mediumResistant, mutationSpikes }
}

export default function AlertsPage() {
  const { highResistant, mediumResistant, mutationSpikes } = computeAlerts()

  return (
    <>
      <MainNav />
      <main className="mx-auto w-full max-w-6xl px-4 pb-12 pt-6">
        <h1 className="mb-4 text-xl font-semibold text-gray-900">Alerts Dashboard</h1>

        <section className="space-y-4">
          <Alert className="border-red-200 bg-red-50">
            <AlertTitle className="flex items-center gap-2 text-red-800">
              High Resistance Alert
              <Badge className="bg-red-100 text-red-700" variant="secondary">
                {highResistant.length} samples
              </Badge>
            </AlertTitle>
            <AlertDescription className="text-red-900/80">
              Number of samples with high drug resistance exceeds the threshold. Consider targeted review and response.
            </AlertDescription>
          </Alert>

          <Alert className="border-blue-200 bg-blue-50">
            <AlertTitle className="flex items-center gap-2 text-blue-800">
              Moderate Resistance Notice
              <Badge className="bg-blue-100 text-blue-700" variant="secondary">
                {mediumResistant.length} samples
              </Badge>
            </AlertTitle>
            <AlertDescription className="text-blue-900/80">
              Monitor for continued increases. Implement early containment strategies if trend persists.
            </AlertDescription>
          </Alert>

          {mutationSpikes.length > 0 ? (
            <Alert className="border-blue-200 bg-blue-50">
              <AlertTitle className="text-blue-800">Mutation Frequency Spike</AlertTitle>
              <AlertDescription className="text-blue-900/80">
                The following mutations crossed the monitoring threshold:
                <ul className="mt-2 list-inside list-disc text-sm">
                  {mutationSpikes.map((m) => (
                    <li key={m.mutation}>
                      <span className="font-medium">{m.mutation}</span> — {m.count} occurrences
                    </li>
                  ))}
                </ul>
              </AlertDescription>
            </Alert>
          ) : (
            <Alert className="border-emerald-200 bg-emerald-50">
              <AlertTitle className="text-emerald-900">All Clear</AlertTitle>
              <AlertDescription className="text-emerald-900/80">
                No mutation spikes detected above the current threshold.
              </AlertDescription>
            </Alert>
          )}
        </section>

        <p className="mt-6 text-xs text-gray-500">
          Note: Alerts are generated from mock data and static thresholds for demo purposes. In production, wire this to
          real-time analytics and policy configurations.
        </p>
      </main>
    </>
  )
}
