"use server";
// import { use } from "react";
import { getAllEvents } from "~/server/db/queries";

export default async function handleFetchAllEvents() {
    return getAllEvents();
}
