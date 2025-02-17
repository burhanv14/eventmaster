import type React from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Calendar, Users, BarChart } from "lucide-react"

export default function Home() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <section className="py-20 text-center">
        <h1 className="text-4xl font-bold mb-6">Welcome to EventMaster</h1>
        <p className="text-xl mb-8 text-muted-foreground">
          Simplify your event management process with our powerful and intuitive platform.
        </p>
        <Link href="/events" passHref>
          <Button size="lg">Get Started</Button>
        </Link>
      </section>

      <section className="py-20">
        <h2 className="text-3xl font-bold mb-12 text-center">Why Choose EventMaster?</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <FeatureCard
            icon={<Calendar className="h-10 w-10" />}
            title="Easy Event Creation"
            description="Create and manage events with just a few clicks. Our intuitive interface makes event planning a breeze."
          />
          <FeatureCard
            icon={<Users className="h-10 w-10" />}
            title="Attendee Management"
            description="Keep track of your attendees, send invitations, and manage RSVPs all in one place."
          />
          <FeatureCard
            icon={<BarChart className="h-10 w-10" />}
            title="Insightful Analytics"
            description="Gain valuable insights into your events with our comprehensive analytics and reporting tools."
          />
        </div>
      </section>
    </div>
  )
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="flex flex-col items-center text-center p-6 border rounded-lg">
      <div className="mb-4 text-primary">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  )
}

