import Link from "next/link";
import React from "react";
import { Button } from "~/app/_components/button";
import CopyableText from "~/app/_components/copyableText";
import EInvite from "~/app/_components/einvite";
import { getEventById } from "~/server/db/queries";

export default async function Page({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;
    if (!Number.isInteger(+id)) return <NotFound />;

    const event = await getEventById(+id);
    if (!event) return <NotFound />;

    return (
        <div className="min-h-full md:grid md:grid-cols-2 lg:grid-cols-3">
            <EInvite
                title={event.name}
                date={event.date}
                location={event.location}
                hostName={event.hostName}
                note={event.note}
                publicGuestList={event.publicGuestList}
            />
            <section className="min-h-full space-y-9 border-l p-6">
                <h1 className="text-2xl">Copy the link and invite</h1>
                <CopyableText />
            </section>
        </div>
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
