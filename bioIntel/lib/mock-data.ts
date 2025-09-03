import type { Sample } from "./types"

const pick = <T,>(arr: T[]) => arr[Math.floor(Math.random() * arr.length)]

const countries = ["India", "South Africa", "USA", "UK", "Brazil", "China", "Russia", "Peru", "Kenya", "Spain"]
const lineages = ["L1", "L2", "L3", "L4", "L5", "L6"]
const variants = ["V1", "V2", "V3", "V4"]
const mutationsPool = ["rpoB_S450L", "katG_S315T", "inhA_c-15t", "gyrA_D94G", "gyrA_A90V", "pncA_H51R", "embB_M306V"]
const resistances = ["Low", "Medium", "High"] as const

function randomMutations(): string[] {
  const count = Math.floor(Math.random() * 3) + 1
  const set = new Set<string>()
  while (set.size < count) set.add(pick(mutationsPool))
  return Array.from(set)
}

export const samplesMock: Sample[] = Array.from({ length: 48 }).map((_, i) => ({
  id: `SRR${(100000 + i).toString()}`,
  country: pick(countries),
  year: 2017 + Math.floor(Math.random() * 8), // 2017-2024
  lineage: pick(lineages),
  variant: pick(variants),
  mutations: randomMutations(),
  resistance: pick(resistances),
}))

export const countryCounts = () => {
  const map = new Map<string, number>()
  samplesMock.forEach((s) => map.set(s.country, (map.get(s.country) || 0) + 1))
  return Array.from(map, ([name, value]) => ({ name, value })).sort((a, b) => b.value - a.value)
}

export const yearlyCounts = () => {
  const map = new Map<number, number>()
  samplesMock.forEach((s) => map.set(s.year, (map.get(s.year) || 0) + 1))
  return Array.from(map, ([year, count]) => ({ year, count })).sort((a, b) => a.year - b.year)
}

export const mutationFrequency = () => {
  const map = new Map<string, number>()
  samplesMock.forEach((s) => s.mutations.forEach((m) => map.set(m, (map.get(m) || 0) + 1)))
  return Array.from(map, ([mutation, count]) => ({ mutation, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 10)
}

export const summaryStats = () => {
  const countries = new Set(samplesMock.map((s) => s.country)).size
  const variants = new Set(samplesMock.map((s) => s.variant)).size
  const lineages = new Set(samplesMock.map((s) => s.lineage)).size
  return { totalSamples: samplesMock.length, countries, variants, lineages }
}
