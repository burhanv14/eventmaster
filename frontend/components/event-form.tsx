"use client"

import type React from "react"

import { useState } from "react"
import type { Event } from "@/types/event"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

interface EventFormProps {
  event?: Event
  onSubmit: (event: Omit<Event, "id">) => void
  onCancel: () => void
}

export default function EventForm({ event, onSubmit, onCancel }: EventFormProps) {
  const [title, setTitle] = useState(event?.title || "")
  const [date, setDate] = useState(event?.date ? new Date(event.date).toISOString().split("T")[0] : "")
  const [description, setDescription] = useState(event?.description || "")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit({ title, date: new Date(date).toISOString(), description })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="title">Title</Label>
        <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} required />
      </div>
      <div>
        <Label htmlFor="date">Date</Label>
        <Input id="date" type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
      </div>
      <div>
        <Label htmlFor="description">Description</Label>
        <Textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} required />
      </div>
      <div className="flex justify-end space-x-2">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">{event ? "Update" : "Create"} Event</Button>
      </div>
    </form>
  )
}

