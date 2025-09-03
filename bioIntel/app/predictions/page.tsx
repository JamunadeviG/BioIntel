"use client"

import { useState } from "react"
import { MainNav } from "@/components/main-nav"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

type Pred = {
  transmissibility: number // 0-100
  resistanceRisk: "Low" | "Medium" | "High"
  variantClass: string
}

function mockPredict(id: string): Promise<Pred> {
  let h = 0
  for (let i = 0; i < id.length; i++) h = (h * 31 + id.charCodeAt(i)) % 1000
  const transmissibility = h % 100
  const levels: Pred["resistanceRisk"][] = ["Low", "Medium", "High"]
  const resistanceRisk = levels[h % levels.length]
  const variantClass = ["V1", "V2", "V3", "V4"][h % 4]
  return new Promise((res) => setTimeout(() => res({ transmissibility, resistanceRisk, variantClass }), 700))
}

export default function PredictionsPage() {
  const [runId, setRunId] = useState("")
  const [loading, setLoading] = useState(false)
  const [pred, setPred] = useState<Pred | null>(null)

  const doPredict = async () => {
    if (!runId.trim()) return
    setLoading(true)
    setPred(null)
    const out = await mockPredict(runId.trim())
    setPred(out)
    setLoading(false)
  }

  return (
    <>
      <MainNav />
      <main className="mx-auto w-full max-w-6xl px-4 pb-12 pt-6">
        <h1 className="mb-4 text-xl font-semibold text-gray-900">AI Predictions</h1>

        <section className="rounded-lg border border-gray-200 p-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
            <div className="flex-1">
              <label className="mb-1 block text-xs font-medium text-gray-600">Sequence / Run ID (e.g., SRR...)</label>
              <Input value={runId} onChange={(e) => setRunId(e.target.value)} placeholder="Enter FASTA ID or SRR" />
            </div>
            <Button
              onClick={doPredict}
              className="bg-blue-600 text-white hover:bg-blue-700"
              disabled={loading || !runId.trim()}
            >
              {loading ? "Predicting..." : "Predict"}
            </Button>
          </div>

          {loading && (
            <div className="mt-4">
              <Progress value={66} />
              <p className="mt-2 text-sm text-gray-600">Running model...</p>
            </div>
          )}

          {pred && (
            <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm text-gray-700">Transmissibility Risk</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-semibold text-gray-900">{pred.transmissibility}%</div>
                  <div className="mt-2 h-2 rounded bg-gray-200">
                    <div className="h-2 rounded bg-blue-600" style={{ width: `${pred.transmissibility}%` }} />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm text-gray-700">Drug Resistance</CardTitle>
                </CardHeader>
                <CardContent>
                  <Badge
                    className={
                      pred.resistanceRisk === "High"
                        ? "bg-red-100 text-red-700"
                        : pred.resistanceRisk === "Medium"
                          ? "bg-blue-100 text-blue-700"
                          : "bg-emerald-100 text-emerald-700"
                    }
                    variant="secondary"
                  >
                    {pred.resistanceRisk}
                  </Badge>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm text-gray-700">Variant Classification</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-semibold text-gray-900">{pred.variantClass}</div>
                  <p className="text-sm text-gray-600">Model-assigned variant class</p>
                </CardContent>
              </Card>
            </div>
          )}

          <p className="mt-6 text-xs text-gray-500">
            Note: This page uses mock predictions. Connect a backend API later to return real model outputs.
          </p>
        </section>
      </main>
    </>
  )
}
