import Link from "next/link"

export default function SettingsAside() {
  return (
    <aside className="grid gap-4 text-sm text-muted-foreground">
      <Link href="#" className="font-semibold text-primary">
        General
      </Link>
    </aside>
  )
}
