import { Link } from "@tanstack/react-router"
import { IconPencil, IconTrash } from "@tabler/icons-react"

interface AdminActionsProps {
  editTo: string
  editParams?: Record<string, string>
  onDelete: () => void
  deleteConfirmMessage: string
  isPending?: boolean
}

export function AdminActions({ editTo, editParams, onDelete, deleteConfirmMessage, isPending }: AdminActionsProps) {
  return (
    <div className="flex items-center gap-2">
      <Link
        to={editTo}
        params={editParams}
        className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-muted text-muted-foreground transition-colors hover:bg-primary/10 hover:text-primary"
      >
        <IconPencil size={14} />
      </Link>
      <button
        onClick={() => {
          if (confirm(deleteConfirmMessage)) {
            onDelete()
          }
        }}
        disabled={isPending}
        className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-muted text-muted-foreground transition-colors hover:bg-rose-100 hover:text-rose-600 disabled:opacity-50"
      >
        <IconTrash size={14} />
      </button>
    </div>
  )
}
