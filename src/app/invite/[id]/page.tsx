import React, { Suspense, use } from "react";
import { getEventByIdForGuest } from "~/server/db/queries";
import EInviteDisplay, {
    EInviteDisplayFallback,
    EInviteNotFound,
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
            <div className="flex min-h-screen justify-center p-6">
                <Suspense
                    fallback={
                        <EInviteDisplayFallback className="w-full max-w-screen-md" />
                    }
                >
                    <EInviteDisplayData params={params} />
                </Suspense>
            </div>
        </>
    );
}

function EInviteDisplayData({ params }: Props) {
    const { id } = use(params);
    if (!isNumeric(id)) return <EInviteNotFound />;

    const { event, guests } = use(getEventByIdForGuest(+id));

    if (!event) return <EInviteNotFound />;
    if (!guests) return <EInviteNotFound />;

    return (
        <EInviteDisplay
            className="w-full max-w-screen-md"
            event={event}
            guests={guests}
        />
    );
}

function InvitationResponseData({ params }: Props) {
    const { id } = use(params);
    if (!isNumeric(id)) return <EInviteNotFound />;

    return <InvitationResponse id={+id} />;
}
