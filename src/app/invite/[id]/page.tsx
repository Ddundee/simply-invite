import Link from "next/link";
import React, { Suspense } from "react";
import { Button } from "~/app/_components/button";
import EInvite from "~/app/_components/einvite";
import { getEventById } from "~/server/db/queries";
import Loading from "./loading";
import InvitationResponse from "~/app/_components/invitation-response";
type Props = {
    params: { id: string };
};

export default async function Page({ params }: Props) {
    const { id } = params;
    if (!Number.isInteger(+id)) return <NotFound />;

    const eventPromise = getEventById(+id);

    return (
        <>
            <InvitationResponse id={+id} />
            <div className="min-h-full">
                <Suspense fallback={<Loading />}>
                    <Data eventPromise={eventPromise} />
                </Suspense>
            </div>
        </>
    );
}

function NotFound() {
    return (
        <div className="my-9 flex w-full flex-col items-center justify-center space-y-3">
            <h1>How&apos;d you get here?</h1>
            <Link href={"/"}>
                <Button>Go Home</Button>
            </Link>
        </div>
    );
}

type DataProps = {
    eventPromise: Promise<{
        guests: {
            id: number;
            name: string;
            eventId: number;
            numGuests: number;
            response: "accepted" | "declined" | "pending";
        }[];
        event:
            | {
                  id: number;
                  date: Date;
                  userId: string;
                  name: string;
                  hostName: string;
                  location: string;
                  note: string | null;
                  publicGuestList: boolean;
              }
            | undefined;
    }>;
};

async function Data({ eventPromise }: DataProps) {
    const { event, guests } = await eventPromise;

    if (!event) return <NotFound />;
    if (!guests) return <NotFound />;

    return <EInvite event={event} guests={guests} />;
}
