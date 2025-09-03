"use client"

import { useMemo, useState } from "react"
import { MainNav } from "@/components/main-nav"
import { FileUpload } from "@/components/file-upload"
import { samplesMock } from "@/lib/mock-data"
import type { Sample } from "@/lib/types"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"

export default function DataExplorerPage() {
  const [data, setData] = useState<Sample[]>(samplesMock)
  const [country, setCountry] = useState<string>("all")
  const [year, setYear] = useState<string>("all")
  const [lineage, setLineage] = useState<string>("all")
  const [search, setSearch] = useState("")

  const countries = useMemo(() => Array.from(new Set(data.map((d) => d.country))).sort(), [data])
  const years = useMemo(() => Array.from(new Set(data.map((d) => d.year))).sort((a, b) => a - b), [data])
  const lineages = useMemo(() => Array.from(new Set(data.map((d) => d.lineage))).sort(), [data])

  const filtered = data.filter((d) => {
    const countryOk = country === "all" || d.country === country
    const yearOk = year === "all" || d.year === Number(year)
    const lineageOk = lineage === "all" || d.lineage === lineage
    const text =
      `${d.id} ${d.country} ${d.year} ${d.lineage} ${d.variant} ${d.mutations.join(" ")} ${d.resistance}`.toLowerCase()
    const searchOk = search.trim() === "" || text.includes(search.toLowerCase())
    return countryOk && yearOk && lineageOk && searchOk
  })

  const onUpload = (rows: Sample[]) => {
    const map = new Map<string, Sample>()
    data.forEach((r) => map.set(r.id, r))
    rows.forEach((r) => map.set(r.id, r))
    setData(Array.from(map.values()))
  }

  return (
    <>
      <MainNav />
      <main className="mx-auto w-full max-w-6xl px-4 pb-12 pt-6">
        <section className="mb-4 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <h1 className="text-xl font-semibold text-gray-900">Data Explorer</h1>
          <div className="flex items-center gap-3">
            <a href="/data/mock-samples.csv" download className="text-sm font-medium text-blue-600 hover:underline">
              Download sample CSV
            </a>
            <FileUpload onData={onUpload} />
          </div>
        </section>

        <section className="rounded-lg border border-gray-200 p-4">
          <div className="grid grid-cols-1 gap-3 md:grid-cols-4">
            <div className="flex flex-col gap-1">
              <label className="text-xs font-medium text-gray-600">Search</label>
              <Input placeholder="Search samples..." value={search} onChange={(e) => setSearch(e.target.value)} />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs font-medium text-gray-600">Country</label>
              <Select value={country} onValueChange={setCountry}>
                <SelectTrigger>
                  <SelectValue placeholder="All" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  {countries.map((c) => (
                    <SelectItem key={c} value={c}>
                      {c}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs font-medium text-gray-600">Year</label>
              <Select value={year} onValueChange={setYear}>
                <SelectTrigger>
                  <SelectValue placeholder="All" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  {years.map((y) => (
                    <SelectItem key={y} value={String(y)}>
                      {y}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs font-medium text-gray-600">Lineage</label>
              <Select value={lineage} onValueChange={setLineage}>
                <SelectTrigger>
                  <SelectValue placeholder="All" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  {lineages.map((l) => (
                    <SelectItem key={l} value={l}>
                      {l}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="mt-4 flex items-center justify-between">
            <p className="text-sm text-gray-600">
              {filtered.length} of {data.length} samples
            </p>
            <Button
              variant="outline"
              className="border-gray-300 bg-transparent"
              onClick={() => {
                setCountry("all")
                setYear("all")
                setLineage("all")
                setSearch("")
              }}
            >
              Reset Filters
            </Button>
          </div>

          <div className="mt-4 overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Country</TableHead>
                  <TableHead>Year</TableHead>
                  <TableHead>Lineage</TableHead>
                  <TableHead>Variant</TableHead>
                  <TableHead>Mutations</TableHead>
                  <TableHead>Resistance</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map((r) => (
                  <TableRow key={r.id}>
                    <TableCell className="font-medium">{r.id}</TableCell>
                    <TableCell>{r.country}</TableCell>
                    <TableCell>{r.year}</TableCell>
                    <TableCell>{r.lineage}</TableCell>
                    <TableCell>{r.variant}</TableCell>
                    <TableCell className="whitespace-nowrap text-xs text-gray-700">{r.mutations.join(", ")}</TableCell>
                    <TableCell>
                      <Badge
                        className={
                          r.resistance === "High"
                            ? "bg-red-100 text-red-700"
                            : r.resistance === "Medium"
                              ? "bg-blue-100 text-blue-700"
                              : "bg-emerald-100 text-emerald-700"
                        }
                        variant="secondary"
                      >
                        {r.resistance}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </section>
      </main>
    </>
  )
}
