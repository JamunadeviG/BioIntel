// Shared types for the dashboard

export type ResistanceLevel = "Low" | "Medium" | "High"

export type Sample = {
  id: string
  country: string
  year: number
  lineage: string
  variant: string
  mutations: string[]
  resistance: ResistanceLevel
}
