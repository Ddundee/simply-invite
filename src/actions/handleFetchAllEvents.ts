"use server";

import { getAllEvents } from "~/server/db/queries";

export default async function handleFetchAllEvents() {
    return getAllEvents().catch(() => {
        throw new Error("Failed to create event");
    });
}
