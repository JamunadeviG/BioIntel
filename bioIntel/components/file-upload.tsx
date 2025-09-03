"use client"

import { useRef } from "react"
import { Button } from "@/components/ui/button"
import type { Sample } from "@/lib/types"

type Props = { onData: (rows: Sample[]) => void }

function parseDelimited(text: string, delimiter: "," | "\t") {
  const lines = text.split(/\r?\n/).filter(Boolean)
  if (lines.length === 0) return []
  const headers = lines[0].split(delimiter).map((h) => h.trim())
  return lines.slice(1).map((line) => {
    const cols = line.split(delimiter).map((c) => c.trim())
    const obj: Record<string, string> = {}
    headers.forEach((h, i) => (obj[h] = cols[i] ?? ""))
    return obj
  })
}

function toSample(row: Record<string, string>): Sample | null {
  // Expected headers: id,country,year,lineage,variant,mutations,resistance
  const id = row.id || row.ID || row.srr || row.SRR
  const country = row.country || row.Country
  const yearStr = row.year || row.Year
  const lineage = row.lineage || row.Lineage
  const variant = row.variant || row.Variant
  const mutationsStr = row.mutations || row.Mutations
  const resistance = (row.resistance || row.Resistance) as Sample["resistance"]

  if (!id || !country || !yearStr || !lineage || !variant || !mutationsStr || !resistance) return null
  const year = Number(yearStr)
  const mutations = mutationsStr.split(/[;,\s]+/).filter(Boolean)
  if (!Number.isFinite(year)) return null
  return { id, country, year, lineage, variant, mutations, resistance }
}

export function FileUpload({ onData }: Props) {
  const inputRef = useRef<HTMLInputElement | null>(null)

  const handleFiles = async (file: File) => {
    const text = await file.text()
    const isTSV = file.name.toLowerCase().endsWith(".tsv")
    const rows = parseDelimited(text, isTSV ? "\t" : ",")
      .map(toSample)
      .filter(Boolean) as Sample[]
    if (rows.length > 0) onData(rows)
  }

  return (
    <div className="flex items-center gap-3">
      <input
        ref={inputRef}
        type="file"
        accept=".csv,.tsv,text/csv,text/tab-separated-values"
        className="hidden"
        onChange={(e) => {
          const f = e.target.files?.[0]
          if (f) handleFiles(f)
        }}
      />
      <Button
        variant="default"
        className="bg-blue-600 text-white hover:bg-blue-700"
        onClick={() => inputRef.current?.click()}
      >
        Upload CSV/TSV
      </Button>
      <p className="text-xs text-gray-600">
        Expected columns: id, country, year, lineage, variant, mutations, resistance
      </p>
    </div>
  )
}
