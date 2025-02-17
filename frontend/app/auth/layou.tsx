import type React from "react"
import { Calendar } from "lucide-react"

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* Content */}
      <div className="flex items-center justify-center p-8">{children}</div>

      {/* Background Pattern */}
      <div className="hidden lg:block relative">
        <div className="absolute inset-0 bg-muted/50 backdrop-blur-xl">
          <div className="absolute inset-0 bg-gradient-to-t from-background to-background/60" />
          <div className="absolute inset-0">
            <div className="h-full w-full object-cover">
              <div className="h-full w-full flex items-center justify-center">
                <div className="p-8 text-center">
                  <Calendar className="h-24 w-24 mx-auto mb-8 text-primary" />
                  <h1 className="text-4xl font-bold tracking-tight mb-4">EventMaster</h1>
                  <p className="text-lg text-muted-foreground max-w-sm mx-auto">
                    Your all-in-one solution for event management. Create, manage, and track events with ease.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

