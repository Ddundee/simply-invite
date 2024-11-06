"use server";

import { createEvent, type createEventParamType } from "~/server/db/queries";

export default async function handleCreateEvent(data: createEventParamType) {
    return createEvent(data).catch(() => {
        throw new Error("Failed to create event");
    });
}
