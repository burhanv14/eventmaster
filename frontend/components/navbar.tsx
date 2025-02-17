"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/mode-toggle"

export default function Navbar() {
  const pathname = usePathname()

  return (
    <nav className="border-b">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <Calendar className="h-6 w-6 mr-2" />
              <span className="text-lg font-semibold">EventMaster</span>
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <Link href="/" passHref>
              <Button variant={pathname === "/" ? "default" : "ghost"}>Home</Button>
            </Link>
            <Link href="/events" passHref>
              <Button variant={pathname === "/events" ? "default" : "ghost"}>Events</Button>
            </Link>
            <ModeToggle />
          </div>
        </div>
      </div>
    </nav>
  )
}

