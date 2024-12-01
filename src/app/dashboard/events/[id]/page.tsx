import Link from "next/link";
import React, { Suspense } from "react";
import EInviteDisplay from "~/app/_components/einvite-display";
import LinkToInvite from "~/app/_components/link-to-invite";
import { Button } from "~/components/ui/button";
import { getEventById } from "~/server/db/queries";

export default async function Page({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;
    if (!Number.isInteger(+id)) return <NotFound />;

    const { event, guests } = await getEventById(+id);
    if (!event) return <NotFound />;
    if (!guests) return <NotFound />;

    return (
        <div className="min-h-full md:grid md:grid-cols-2 lg:grid-cols-3">
            <Suspense>
                <EInviteDisplay
                    event={event}
                    guests={guests}
                    className="fade-in"
                />
            </Suspense>

            <section className="min-h-full space-y-9 p-6">
                <h1 className="text-2xl">Copy the link and invite</h1>
                <div>
                    <LinkToInvite />
                </div>
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
