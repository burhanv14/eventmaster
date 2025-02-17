"use client"

import { useState } from "react"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import EventList from "./event-list"
import EventForm from "./event-form"
import type { Event } from "@/types/event"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { toast } from "@/components/ui/use-toast"

async function fetchEvents() {
  const response = await fetch("/api/events")
  if (!response.ok) {
    throw new Error("Failed to fetch events")
  }
  return response.json()
}

async function createEvent(event: Omit<Event, "id">) {
  const response = await fetch("/api/events", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(event),
  })
  if (!response.ok) {
    throw new Error("Failed to create event")
  }
  return response.json()
}

async function updateEvent(event: Event) {
  const response = await fetch(`/api/events/${event.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(event),
  })
  if (!response.ok) {
    throw new Error("Failed to update event")
  }
  return response.json()
}

async function deleteEvent(id: number) {
  const response = await fetch(`/api/events/${id}`, {
    method: "DELETE",
  })
  if (!response.ok) {
    throw new Error("Failed to delete event")
  }
  return response.json()
}

export default function EventManagement() {
  const [editingEvent, setEditingEvent] = useState<Event | null>(null)
  const queryClient = useQueryClient()

  const {
    data: events = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["events"],
    queryFn: fetchEvents,
  })

  const createMutation = useMutation({
    mutationFn: createEvent,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["events"] })
      toast({ title: "Event created successfully" })
    },
    onError: () => {
      toast({ title: "Failed to create event", variant: "destructive" })
    },
  })

  const updateMutation = useMutation({
    mutationFn: updateEvent,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["events"] })
      setEditingEvent(null)
      toast({ title: "Event updated successfully" })
    },
    onError: () => {
      toast({ title: "Failed to update event", variant: "destructive" })
    },
  })

  const deleteMutation = useMutation({
    mutationFn: deleteEvent,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["events"] })
      toast({ title: "Event deleted successfully" })
    },
    onError: () => {
      toast({ title: "Failed to delete event", variant: "destructive" })
    },
  })

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>An error occurred: {(error as Error).message}</div>

  return (
    <div className="space-y-6">
      <Dialog>
        <DialogTrigger asChild>
          <Button>
            <Plus className="mr-2 h-4 w-4" /> Create Event
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingEvent ? "Edit Event" : "Create New Event"}</DialogTitle>
          </DialogHeader>
          <EventForm
            event={editingEvent}
            onSubmit={(event) => {
              if (editingEvent) {
                updateMutation.mutate(event as Event)
              } else {
                createMutation.mutate(event)
              }
            }}
            onCancel={() => setEditingEvent(null)}
          />
        </DialogContent>
      </Dialog>
      <EventList events={events} onEdit={setEditingEvent} onDelete={(id) => deleteMutation.mutate(id)} />
    </div>
  )
}

