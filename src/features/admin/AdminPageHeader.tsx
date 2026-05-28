import { Link } from "@tanstack/react-router"
import { IconArrowLeft } from "@tabler/icons-react"
import { type ReactNode } from "react"

interface AdminPageHeaderProps {
  title: string
  subtitle?: string
  backTo?: string
  backParams?: Record<string, string>
  action?: ReactNode
}

export function AdminPageHeader({ title, subtitle, backTo, backParams, action }: AdminPageHeaderProps) {
  return (
    <div className="flex items-center justify-between">
      <div>
        {backTo && (
          <div className="flex items-center gap-2">
            <Link
              to={backTo}
              params={backParams}
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              <IconArrowLeft size={16} />
            </Link>
            <h1 className="text-2xl font-semibold text-foreground">{title}</h1>
          </div>
        )}
        {!backTo && (
          <h1 className="text-2xl font-semibold text-foreground">{title}</h1>
        )}
        {subtitle && (
          <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>
        )}
      </div>
      {action && <div>{action}</div>}
    </div>
  )
}
