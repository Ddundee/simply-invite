import React from "react";
import { formatDistanceToNow } from "date-fns";
import { CalendarIcon, PersonIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";

type Props = {
    event: {
        date: Date;
        id: number;
        userId: string;
        name: string;
        hostName: string;
        location: string;
        note: string | null;
        publicGuestList: boolean;
        numGuests: number;
    };
};

export default function EInviteCard({ event }: Props) {
    return (
        <Link href={`/dashboard/events/${event.id}`}>
            <Card className="cursor-pointer duration-100 hover:bg-opacity-5">
                <CardHeader>
                    <CardTitle>{event.name}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                    <div className="space-y-1">
                        <div className="flex items-center gap-3">
                            <CalendarIcon />
                            <p className="text-secondary-text flex gap-1">
                                {formatDistanceToNow(event.date, {
                                    addSuffix: true,
                                })}
                            </p>
                        </div>
                        <div className="flex items-center gap-3">
                            <PersonIcon />
                            <p className="text-secondary-text flex gap-1">
                                {event.numGuests} parties invited
                            </p>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </Link>
    );
}
