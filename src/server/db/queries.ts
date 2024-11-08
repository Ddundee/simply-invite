import { auth } from "@clerk/nextjs/server";
import "server-only";
import { db } from ".";
import posthog from "posthog-js";
import { event } from "./schema";
export async function getAllEvents() {
    const user = await auth();

    if (!user.userId) throw new Error("Unauthorized: Not logged in");

    const events = await db.query.event.findMany({
        where: (model, { eq }) => eq(model.userId, user.userId),
    });

    posthog.capture("get all events for user");

    return events;
}

export type createEventParamType = {
    name: string;
    date: Date;
    hostName: string;
    location: string;
    note?: string;
    publicGuestList: boolean;
};

export async function createEvent({
    name,
    date,
    hostName,
    location,
    note,
    publicGuestList,
}: createEventParamType) {
    const user = await auth();
    if (!user.userId) throw new Error("Unauthorized: Not logged in");

    const id = await db
        .insert(event)
        .values({
            userId: user.userId,
            name,
            date,
            hostName,
            location,
            note,
            publicGuestList,
        })
        .returning({ id: event.id });

    return id;
}

export async function getEventById(id: number) {
    const user = await auth();
    if (!user.userId) throw new Error("Unauthorized: Not logged in");

    const event = await db.query.event.findFirst({
        where: (model, { eq, and }) =>
            and(eq(model.id, id), eq(model.userId, user.userId)),
    });

    // if (!event) throw new Error("Event not found");
    return event;
}
