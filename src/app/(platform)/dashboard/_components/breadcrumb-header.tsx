"use client"

import React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"

import { cn } from "@/lib/utils"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

export default function BreadcrumbHeader() {
  const pathname = usePathname()
  const splitPathname = pathname.split("/").filter((path) => path !== "")

  return (
    <Breadcrumb className="hidden md:flex">
      <BreadcrumbList>
        {splitPathname.map((path, index) => (
          <React.Fragment key={`${path}-${index}`}>
            <BreadcrumbItem className={cn("capitalize")} key={`${path}-item`}>
              {index === splitPathname.length - 1 ? (
                <BreadcrumbPage>{path.includes("-") ? path.replace("-", " ") : path}</BreadcrumbPage>
              ) : (
                <BreadcrumbLink asChild>
                  <Link href={"/" + path} className={cn("capitalize")}>
                    {path.includes("-") ? path.replace("-", " ") : path}
                  </Link>
                </BreadcrumbLink>
              )}
            </BreadcrumbItem>
            {index !== splitPathname.length - 1 && <BreadcrumbSeparator key={`${path}-separator`} />}
          </React.Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  )
}
