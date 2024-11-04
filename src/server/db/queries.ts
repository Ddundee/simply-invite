import { auth } from "@clerk/nextjs/server";
import "server-only";
import { db } from ".";

export async function getAllEvents() {
    const user = await auth();

    if (!user.userId) throw new Error("Unauthorized: Not logged in");

    const events = await db.query.event.findMany({
        where: (model, { eq }) => eq(model.userId, user.userId),
    });
    return events;
}
