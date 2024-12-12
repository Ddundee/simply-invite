"use server";

import { getEventByIdForHost } from "~/server/db/queries";

export default async function handleFetchEvent(id: number) {
    return getEventByIdForHost(id).catch(() => {
        throw new Error("Failed to create event");
    });
}
