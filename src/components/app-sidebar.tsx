"use client"

import React from "react"
import { cn } from "@/lib/utils"
import { Sidebar, SidebarBody } from "@/components/ui/sidebar"
import Link from "next/link"
import {
  Home,
  BookOpen,
  Users,
  Info,
  Search,
  Mic,
} from "lucide-react"

const links = [
  {
    label: "HOME",
    href: "/",
    icon: <Home className="h-5 w-5 flex-shrink-0" />,
  },
  {
    label: "AGENCY",
    href: "/agency",
    icon: <Users className="h-5 w-5 flex-shrink-0" />,
  },
  {
    label: "ATLAS",
    href: "/atlas",
    icon: <BookOpen className="h-5 w-5 flex-shrink-0" />,
  },
  {
    label: "EXPLORE",
    href: "/explore",
    icon: <Search className="h-5 w-5 flex-shrink-0" />,
  },
  {
    label: "PODCAST",
    href: "/podcast",
    icon: <Mic className="h-5 w-5 flex-shrink-0" />,
  },
  {
    label: "ABOUT",
    href: "/about",
    icon: <Info className="h-5 w-5 flex-shrink-0" />,
  },
]

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarBody className="justify-between gap-10">
        <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
          <div className="mt-8 flex flex-col gap-2">
            {links.map((link, idx) => (
              <Link
                key={idx}
                href={link.href}
                className={cn(
                  "flex items-center justify-start gap-2 group/sidebar py-2 text-neutral-700 dark:text-neutral-200 hover:text-[var(--ruixen-primary)] dark:hover:text-[var(--ruixen-primary)] transition-colors"
                )}
              >
                {link.icon}
                <span className="text-sm group-hover/sidebar:translate-x-1 transition duration-150 whitespace-pre inline-block !p-0 !m-0">
                  {link.label}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </SidebarBody>
    </Sidebar>
  )
}
