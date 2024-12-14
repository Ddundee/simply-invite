import "server-only";
import { auth } from "@clerk/nextjs/server";
import { db } from ".";
import { event, guest } from "./schema";
import ratelimit from "~/util/rate-limit";
import { and, eq } from "drizzle-orm";

export type createEventParamType = {
    name: string;
    date: Date;
    hostName: string;
    location: string;
    note?: string;
    publicGuestList: boolean;
};

export async function getAllEvents() {
    const user = await auth();

    if (!user.userId) throw new Error("Unauthorized: Not logged in");

    const events = await db.query.event.findMany({
        where: (model, { eq }) => eq(model.userId, user.userId),
    });

    const eventsWithGuests = await Promise.all(
        events.map(async (event) => {
            const numGuests = await db.query.guest.findMany({
                where: (model, { eq }) => eq(model.eventId, event.id),
            });
            return {
                ...event,
                numGuests: numGuests
                    .map((g) => g.numGuests)
                    .reduce((a, b) => a + b, 0),
            };
        }),
    );

    return eventsWithGuests;
}

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
    const { success } = await ratelimit.limit(user.userId);
    console.log(success);
    if (!success) throw new Error("Rate limit exceeded");

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

export async function getEventByIdForHost(id: number) {
    const user = await auth();
    if (!user.userId) throw new Error("Unauthorized: Not logged in");

    const eventPromise = db.query.event.findFirst({
        where: (model, { eq, and }) =>
            and(eq(model.id, id), eq(model.userId, user.userId)),
    });
    const guestsPromise = db.query.guest.findMany({
        where: (model, { eq }) => eq(model.eventId, id),
    });

    const [event, guests] = await Promise.all([eventPromise, guestsPromise]);

    // if (!event) throw new Error("Event not found");
    return { event, guests };
}

export async function getEventByIdForGuest(id: number) {
    const eventPromise = db.query.event.findFirst({
        where: (model, { eq, and }) => and(eq(model.id, id)),
    });
    const guestsPromise = db.query.guest.findMany({
        where: (model, { eq }) => eq(model.eventId, id),
    });

    const [event, guests] = await Promise.all([eventPromise, guestsPromise]);

    // if (!event) throw new Error("Event not found");
    return { event, guests };
}

export async function addGuest({
    eventId,
    name,
    numGuests,
    response,
}: {
    eventId: number;
    name: string;
    numGuests: number;
    response: "accepted" | "declined";
}) {
    return await db
        .insert(guest)
        .values({
            eventId,
            name,
            numGuests,
            response,
        })
        .returning();
}

export async function deleteEvent(id: number) {
    const user = await auth();
    if (!user.userId) throw new Error("Unauthorized: Not logged in");

    await db
        .delete(event)
        .where(and(eq(event.id, id), eq(event.userId, user.userId)));
}
