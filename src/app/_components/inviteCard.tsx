/* eslint-disable @typescript-eslint/no-unsafe-call */
import React from "react";
import Card from "./card";
import { formatDistanceToNow } from "date-fns";
import { CalendarIcon, PersonIcon } from "@radix-ui/react-icons";
import Link from "next/link";

type Props = {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    event: {
        date: Date;
        id: number;
        userId: string;
        name: string;
        hostName: string;
        location: string;
        note: string | null;
        publicGuestList: boolean;
    };
};

export default function InviteCard({ event }: Props) {
    // const coming = event.guestList.filter(
    //     (guest) => guest.status === "accepted",
    // ).length;
    // const maybe = event.guestList.filter(
    //     (guest) => guest.status === "pending",
    // ).length;
    // const notComing = event.guestList.filter(
    //     (guest) => guest.status === "declined",
    // ).length;
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
                                {0} parties invited
                            </p>
                        </div>
                    </div>
                    {/* <div className="space-y-1">
                    <div className="flex items-center gap-3">
                        <div className="h-3 w-3 rounded-full bg-green-500 p-[3px]" />
                        <p className="flex gap-1 text-secondary-text">
                            {coming} people RSVP-ed yes
                        </p>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="h-3 w-3 rounded-full bg-red-500 p-[3px]" />
                        <p className="flex gap-1 text-secondary-text">
                            {notComing} people RSVP-ed no
                        </p>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="h-3 w-3 rounded-full bg-outline p-[3px]" />
                        <p className="flex gap-1 text-secondary-text">
                            {maybe} people haven’t RSVP-ed
                        </p>
                    </div>
                </div> */}
                </div>
            </Card>
        </Link>
    );
}
