import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function SummaryCards(props: { items: { title: string; value: string | number; sub?: string }[] }) {
  return (
    <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {props.items.map((it) => (
        <Card key={it.title} className="border-gray-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">{it.title}</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="text-2xl font-semibold text-gray-900">{it.value}</div>
            {it.sub ? <p className="text-xs text-gray-500">{it.sub}</p> : null}
          </CardContent>
        </Card>
      ))}
    </section>
  )
}
