"use client"

import { MainNav } from "@/components/main-nav"
import { countryCounts, mutationFrequency, yearlyCounts } from "@/lib/mock-data"
import {
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  Legend,
  Cell,
} from "recharts"

// Restricted palette: blue (primary), red and green (accents), plus gray/white neutrals.
const COLORS = ["#2563eb", "#ef4444", "#16a34a", "#111827", "#ffffff"]

export default function AnalyticsPage() {
  const cc = countryCounts()
  const yc = yearlyCounts()
  const mf = mutationFrequency()

  return (
    <>
      <MainNav />
      <main className="mx-auto w-full max-w-6xl px-4 pb-12 pt-6">
        <h1 className="mb-4 text-xl font-semibold text-gray-900">Analytics</h1>

        <section className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          {/* Yearly timeline */}
          <div className="rounded-lg border border-gray-200 p-4">
            <h2 className="mb-2 text-sm font-medium text-gray-700">Samples over time</h2>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={yc}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="year" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="count" stroke="#2563eb" name="Samples" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Country distribution */}
          <div className="rounded-lg border border-gray-200 p-4">
            <h2 className="mb-2 text-sm font-medium text-gray-700">Distribution by country</h2>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={cc}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" name="Samples" fill="#2563eb" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Mutation frequency */}
          <div className="rounded-lg border border-gray-200 p-4 lg:col-span-2">
            <h2 className="mb-2 text-sm font-medium text-gray-700">Top mutation frequency</h2>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={mf} dataKey="count" nameKey="mutation" outerRadius={120} label>
                    {mf.map((_, idx) => (
                      <Cell key={idx} fill={COLORS[idx % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
