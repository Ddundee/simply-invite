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
            <Suspense fallback={<Loading />}>
                <Data eventPromise={eventPromise} />
            </Suspense>
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
    eventPromise: Promise<
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
        | undefined
    >;
};

async function Data({ eventPromise }: DataProps) {
    const event = await eventPromise;

    if (!event) return <NotFound />;

    return (
        <>
            <div className="min-h-full">
                <EInvite
                    title={event.name}
                    date={event.date}
                    location={event.location}
                    hostName={event.hostName}
                    note={event.note}
                    publicGuestList={event.publicGuestList}
                />
            </div>
        </>
    );
}
