import { Button } from "@/components/ui/button"

import { Icons } from "@/components/icons"

export default function ExportButton() {
  return (
    <Button size="sm" variant="outline" className="h-8 gap-1">
      <Icons.File className="h-3.5 w-3.5" />
      <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">Export PDF</span>
    </Button>
  )
}
