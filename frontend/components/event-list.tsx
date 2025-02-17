import type { Event } from "@/types/event"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Edit, Trash2 } from "lucide-react"

interface EventListProps {
  events: Event[]
  onEdit: (event: Event) => void
  onDelete: (id: number) => void
}

export default function EventList({ events, onEdit, onDelete }: EventListProps) {
  if (events.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">No events found. Create one to get started!</p>
      </div>
    )
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {events.map((event) => (
        <Card key={event.id}>
          <CardHeader>
            <CardTitle>{event.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-2">{new Date(event.date).toLocaleDateString()}</p>
            <p className="text-sm">{event.description}</p>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" size="sm" onClick={() => onEdit(event)}>
              <Edit className="h-4 w-4 mr-2" /> Edit
            </Button>
            <Button variant="destructive" size="sm" onClick={() => onDelete(event.id)}>
              <Trash2 className="h-4 w-4 mr-2" /> Delete
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}

