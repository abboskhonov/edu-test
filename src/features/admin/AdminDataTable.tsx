import { type ReactNode } from "react"

interface AdminDataTableProps {
  headers: string[]
  children: ReactNode
}

export function AdminDataTable({ headers, children }: AdminDataTableProps) {
  return (
    <div className="mt-8 overflow-hidden rounded-2xl border border-border/60 bg-card">
      <table className="w-full text-left text-sm">
        <thead className="border-b border-border/60 bg-muted/50">
          <tr>
            {headers.map((h) => (
              <th key={h} className="px-5 py-3 font-medium text-foreground">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-border/40">{children}</tbody>
      </table>
    </div>
  )
}
