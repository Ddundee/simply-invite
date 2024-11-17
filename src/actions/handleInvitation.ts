"use server";
import { addGuest } from "~/server/db/queries";

type InvitationResponseProps = {
    id: number;
    name?: string | undefined;
    numGuests?: number | undefined;
    coming?: boolean | undefined;
};
export default async function handleCreateGuest({
    id,
    name,
    numGuests,
    coming,
}: InvitationResponseProps) {
    return addGuest({
        eventId: id,
        name: name ?? "",
        numGuests: numGuests ?? 0,
        response: coming ? "accepted" : "declined",
    }).catch(() => {
        throw new Error("Failed to create event");
    });
}
