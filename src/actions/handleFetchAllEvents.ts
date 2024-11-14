"use server";

import { getAllEventsForUser } from "~/server/db/queries";

export default async function handleFetchAllEvents() {
    return getAllEventsForUser().catch(() => {
        throw new Error("Failed to create event");
    });
}
