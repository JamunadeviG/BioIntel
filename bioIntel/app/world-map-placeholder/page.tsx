import { MainNav } from "@/components/main-nav"

export default function WorldMapPlaceholder() {
  return (
    <>
      <MainNav />
      <main className="mx-auto w-full max-w-6xl px-4 pb-12 pt-6">
        <h1 className="mb-4 text-xl font-semibold text-gray-900">Geographic Heatmap (Placeholder)</h1>
        <p className="mb-4 text-sm text-gray-600">
          In the full implementation, this page would show a choropleth world map with counts per country. For now, use
          the country bar chart on Analytics as a proxy.
        </p>
        <img
          src={
            "/placeholder.svg?height=480&width=960&query=World%20map%20heatmap%20placeholder%20for%20genomics%20surveillance"
          }
          alt="World map heatmap placeholder"
          className="h-auto w-full rounded-lg border border-gray-200"
        />
      </main>
    </>
  )
}
