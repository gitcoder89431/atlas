"use client"

import React from "react"
import { cn } from "@/lib/utils"
import { Sidebar, SidebarBody } from "@/components/ui/sidebar"
import {
  Home,
  BookOpen,
  Users,
  Info,
  Search,
} from "lucide-react"

const links = [
  {
    label: "Home",
    href: "/",
    icon: <Home className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />,
  },
  {
    label: "Agency",
    href: "/agency",
    icon: <Users className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />,
  },
  {
    label: "Atlas",
    href: "/atlas",
    icon: <BookOpen className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />,
  },
  {
    label: "Explore",
    href: "/explore",
    icon: <Search className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />,
  },
  {
    label: "About",
    href: "/about",
    icon: <Info className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />,
  },
]

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarBody className="justify-between gap-10">
        <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
          <div className="mt-8 flex flex-col gap-2">
            {links.map((link, idx) => (
              <a
                key={idx}
                href={link.href}
                className={cn(
                  "flex items-center justify-start gap-2 group/sidebar py-2"
                )}
              >
                {link.icon}
                <span className="text-neutral-700 dark:text-neutral-200 text-sm group-hover/sidebar:translate-x-1 transition duration-150 whitespace-pre inline-block !p-0 !m-0">
                  {link.label}
                </span>
              </a>
            ))}
          </div>
        </div>
      </SidebarBody>
    </Sidebar>
  )
}