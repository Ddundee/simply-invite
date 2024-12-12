import React from "react";
import { formatDistanceToNow } from "date-fns";
import { CalendarIcon, PersonIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { ArrowRightIcon } from "lucide-react";

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
        <Link
            href={`/dashboard/events/${event.id}`}
            className="group duration-100"
        >
            <Card className="cursor-pointer duration-100 group-hover:border-black">
                <CardHeader className="duration-100 group-hover:pr-5">
                    <div className="item flex w-full justify-between">
                        <CardTitle>{event.name}</CardTitle>
                        <ArrowRightIcon
                            strokeWidth={"1.25px"}
                            height={"18px"}
                            className="stroke-gray-500 group-hover:stroke-black"
                        />
                    </div>
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
