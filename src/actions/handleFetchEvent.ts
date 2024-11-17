"use server";

import { getEventById } from "~/server/db/queries";

export default async function handleFetchEvent(id: number) {
    return getEventById(id)
        .catch(() => {
            throw new Error("Failed to create event");
        });
}
