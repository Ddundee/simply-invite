import { format } from "date-fns";
import React from "react";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "~/components/ui/sheet";
import Card from "./card";
import { Button } from "./button";
import { Separator } from "~/components/ui/separator";

type Props = {
    event: {
        date: Date;
        id?: number;
        userId?: string;
        name: string;
        hostName: string;
        location: string;
        note: string | null;
        publicGuestList: boolean;
    };
    guests?: {
        id: number;
        name: string;
        eventId: number;
        numGuests: number;
        response: "accepted" | "declined" | "pending";
    }[];
};
// name: ["name", "date", "location", "hostName", "note", "publicGuestList"]
export default function EInvite({
    event: { name, date, location, hostName, note, publicGuestList },

    guests,
}: Props) {
    return (
        <div className="flex-col gap-9 p-4 sm:flex md:grid-cols-2 md:p-16 lg:col-span-2">
            <Card
                title={name ? name : ""}
                className="space-y-4 [&>h4]:truncate [&>h4]:text-2xl"
            >
                {date && (
                    <p>
                        <span>When: </span>
                        <span className="text-secondary-text">
                            {format(date, "MM/dd/yyyy @ hh:mma")}
                        </span>
                    </p>
                )}
                {location && (
                    <p>
                        <span>Where: </span>
                        <span className="truncate text-secondary-text">
                            {location}
                        </span>
                    </p>
                )}
                {hostName && (
                    <p>
                        <span>Hosted by: </span>
                        <span className="truncate text-secondary-text">
                            {hostName}
                        </span>
                    </p>
                )}
                {note && (
                    <p>
                        <span>Note from host: </span>
                        <span className="truncate text-secondary-text">
                            {note}
                        </span>
                    </p>
                )}
                {publicGuestList && (
                    <>
                        <Separator />
                        <h4 className="text-2xl">Who’s coming</h4>
                        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                            {hostName && (
                                <div className="space-y-2 rounded-lg border p-2">
                                    <div className="flex justify-between">
                                        <h6>{hostName} (host)</h6>
                                        {/* <p>1 guests</p> */}
                                    </div>
                                </div>
                            )}
                            {guests?.map(
                                (guest) =>
                                    guest.numGuests != 0 && (
                                        <div
                                            className="space-y-2 rounded-lg border p-2"
                                            key={guest.id}
                                        >
                                            <div className="flex justify-between">
                                                <h6>{guest.name}</h6>
                                                <p className="text-green-500">
                                                    {guest.numGuests} guests
                                                </p>
                                            </div>
                                        </div>
                                    ),
                            )}
                        </div>
                        {guests && guests.length >= 4 && (
                            <div className="flex w-full justify-end">
                                <Sheet>
                                    <SheetTrigger asChild>
                                        <Button variant="outline">
                                            See more
                                        </Button>
                                    </SheetTrigger>
                                    <SheetContent>
                                        <SheetHeader>
                                            <SheetTitle>
                                                Who&apos;s coming
                                            </SheetTitle>
                                        </SheetHeader>
                                        <div className="my-8 flex flex-col gap-3">
                                            {guests?.map(
                                                (guest) =>
                                                    guest.numGuests != 0 && (
                                                        <div
                                                            className="space-y-2 rounded-lg border p-2"
                                                            key={guest.id}
                                                        >
                                                            <div className="flex justify-between">
                                                                <h6>
                                                                    {guest.name}
                                                                </h6>
                                                                <p className="text-green-500">
                                                                    {
                                                                        guest.numGuests
                                                                    }{" "}
                                                                    guests
                                                                </p>
                                                            </div>
                                                        </div>
                                                    ),
                                            )}
                                        </div>
                                    </SheetContent>
                                </Sheet>
                            </div>
                        )}
                    </>
                )}
            </Card>
        </div>
    );
}
