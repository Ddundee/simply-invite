"use server";

import { deleteEvent } from "~/server/db/queries";

export default async function handleDeleteEvent(id: number) {
    await deleteEvent(id);
}
