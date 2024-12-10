import Link from "next/link";
import React, { Suspense, use } from "react";
import { getEventById } from "~/server/db/queries";
import { Button } from "~/components/ui/button";
import EInviteDisplay, {
    EInviteDisplayFallback,
} from "~/app/_components/einvite-display";
import InvitationResponse from "~/app/_components/invitation-response";
type Props = {
    params: Promise<{ id: string }>;
};

function isNumeric(value: string): boolean {
    return !isNaN(Number(value)) && Number.isInteger(Number(value));
}

export default async function Page({ params }: Props) {
    return (
        <>
            <Suspense>
                <InvitationResponseData params={params} />
            </Suspense>
            <div className="min-h-screen">
                <Suspense fallback={<EInviteDisplayFallback />}>
                    <EInviteDisplayData params={params} />
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

function EInviteDisplayData({ params }: Props) {
    const { id } = use(params);
    if (!isNumeric(id)) return <NotFound />;

    const { event, guests } = use(getEventById(+id));

    if (!event) return <NotFound />;
    if (!guests) return <NotFound />;

    return <EInviteDisplay event={event} guests={guests} />;
}

function InvitationResponseData({ params }: Props) {
    const { id } = use(params);
    if (!isNumeric(id)) return <NotFound />;

    return <InvitationResponse id={+id} />;
}
