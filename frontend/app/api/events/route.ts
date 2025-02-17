import { NextResponse } from "next/server"
import { db } from "@/db"
import { events } from "@/db/schema"
import { eq } from "drizzle-orm"
import { getServerSession } from "next-auth"
import { authOptions } from "../auth/[...nextauth]/route"
import { z } from "zod"
import { Ratelimit } from "@upstash/ratelimit"
import { Redis } from "@upstash/redis"
import { logger } from "@/lib/logger"

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
})

const ratelimit = new Ratelimit({
  redis: redis,
  limiter: Ratelimit.slidingWindow(10, "1 m"),
})

const eventSchema = z.object({
  title: z.string().min(1).max(255),
  description: z.string().optional(),
  date: z.string().datetime(),
})

export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { success } = await ratelimit.limit(session.user.id)
    if (!success) {
      return NextResponse.json({ error: "Too many requests" }, { status: 429 })
    }

    const result = await db.select().from(events).where(eq(events.userId, session.user.id))
    return NextResponse.json(result)
  } catch (error) {
    logger.error("Error fetching events", { error })
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { success } = await ratelimit.limit(session.user.id)
    if (!success) {
      return NextResponse.json({ error: "Too many requests" }, { status: 429 })
    }

    const json = await request.json()
    const validatedData = eventSchema.parse(json)

    const result = await db
      .insert(events)
      .values({
        ...validatedData,
        userId: session.user.id,
      })
      .returning()

    return NextResponse.json(result[0])
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 })
    }
    logger.error("Error creating event", { error })
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}

