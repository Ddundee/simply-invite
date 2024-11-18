import React from "react";
import Card from "./card";
import { formatDistanceToNow } from "date-fns";
import { CalendarIcon, PersonIcon } from "@radix-ui/react-icons";
import Link from "next/link";

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

export default function InviteCard({ event }: Props) {
    return (
        <Link href={`/dashboard/events/${event.id}`}>
            <Card
                title={event.name}
                className="cursor-pointer duration-100 hover:bg-opacity-5"
            >
                <div className="space-y-3">
                    <div className="space-y-1">
                        <div className="flex items-center gap-3">
                            <CalendarIcon />
                            <p className="flex gap-1 text-secondary-text">
                                {formatDistanceToNow(event.date, {
                                    addSuffix: true,
                                })}
                            </p>
                        </div>
                        <div className="flex items-center gap-3">
                            <PersonIcon />
                            <p className="flex gap-1 text-secondary-text">
                                {event.numGuests} parties invited
                            </p>
                        </div>
                    </div>
                </div>
            </Card>
        </Link>
    );
}
