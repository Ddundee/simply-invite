import React, { Suspense, use } from "react";
import EInviteDisplay, {
    EInviteDisplayFallback,
    EInviteNotFound,
} from "~/app/_components/einvite-display";
import LinkToInvite from "~/app/_components/link-to-invite";
import { Skeleton } from "~/components/ui/skeleton";
import { getEventByIdForHost } from "~/server/db/queries";

export default async function Page({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    return (
        <Suspense
            fallback={
                <div className="min-h-full gap-16 space-y-16 p-6 md:grid md:grid-cols-2 md:space-y-0 lg:grid-cols-3">
                    <EInviteDisplayFallback />
                    <section className="min-h-full space-y-9">
                        <Skeleton className="h-8 max-w-64" />
                        <div className="isolate flex w-full justify-between gap-4 rounded-md border border-border bg-background p-4">
                            <Skeleton className="h-6 w-full max-w-72" />
                            <Skeleton className="aspect-square h-6" />
                        </div>
                    </section>
                </div>
            }
        >
            <Data param={params} />
        </Suspense>
    );
}

function Data({ param }: { param: Promise<{ id: string }> }) {
    const { id } = use(param);
    if (!Number.isInteger(+id)) return <EInviteNotFound />;

    const { event, guests } = use(getEventByIdForHost(+id));
    if (!event) return <EInviteNotFound />;
    if (!guests) return <EInviteNotFound />;
    return (
        <div className="min-h-full gap-16 space-y-16 p-6 md:grid md:grid-cols-2 md:space-y-0 lg:grid-cols-3">
            <EInviteDisplay event={event} guests={guests} className="fade-in" />
            <section className="min-h-full space-y-9">
                <h1 className="text-2xl">Copy the link and invite</h1>
                <LinkToInvite />
            </section>
        </div>
    );
}
