import { format } from "date-fns";
import React from "react";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "~/components/ui/sheet";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import { cn } from "~/lib/utils";
import { Skeleton } from "~/components/ui/skeleton";
import Link from "next/link";
import OptionsButton from "./einvite-display-options-button";

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
    className?: string;
    deletable?: boolean;
};

export default function EInviteDisplay({
    event: { name, id, date, location, hostName, note, publicGuestList },
    className,
    guests,
    deletable,
}: Props) {
    return (
        <div
            className={cn(
                "flex-col gap-9 sm:flex md:grid-cols-2 lg:col-span-2",
                className,
            )}
        >
            <Card
                title={name ? name : ""}
                className="space-y-4 [&>h4]:truncate [&>h4]:text-2xl"
            >
                <CardHeader className="flex w-full flex-row justify-between">
                    <div className="w-min">
                        <CardTitle>{name}</CardTitle>
                        {note && <CardDescription>{note}</CardDescription>}
                    </div>
                    {id && deletable && <OptionsButton id={id} />}
                </CardHeader>
                <CardContent>
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
                            <span className="text-secondary-text truncate">
                                {location}
                            </span>
                        </p>
                    )}
                    {hostName && (
                        <p>
                            <span>Hosted by: </span>
                            <span className="text-secondary-text truncate">
                                {hostName}
                            </span>
                        </p>
                    )}
                </CardContent>
                {publicGuestList && (
                    <CardFooter>
                        <div className="w-full">
                            <h4>Guest List</h4>
                            <div className="mt-2 grid grid-cols-1 gap-4 lg:grid-cols-2">
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
                                                        {guest.numGuests} guest
                                                        {guest.numGuests > 1
                                                            ? "s"
                                                            : ""}
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
                                                    Guest List
                                                </SheetTitle>
                                            </SheetHeader>
                                            <div className="my-8 flex flex-col gap-3">
                                                {guests?.map(
                                                    (guest) =>
                                                        guest.numGuests !=
                                                            0 && (
                                                            <div
                                                                className="space-y-2 rounded-lg border p-2"
                                                                key={guest.id}
                                                            >
                                                                <div className="flex justify-between">
                                                                    <h6>
                                                                        {
                                                                            guest.name
                                                                        }
                                                                    </h6>
                                                                    <p className="text-green-500">
                                                                        {
                                                                            guest.numGuests
                                                                        }{" "}
                                                                        guest
                                                                        {guest.numGuests >
                                                                        1
                                                                            ? "s"
                                                                            : ""}
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
                        </div>
                    </CardFooter>
                )}
            </Card>
        </div>
    );
}

export function EInviteDisplayFallback({ className }: { className?: string }) {
    return (
        <div
            className={cn(
                "flex-col gap-9 sm:flex md:grid-cols-2 lg:col-span-2",
                className,
            )}
        >
            <Card>
                <CardHeader className="w-full p-6">
                    <Skeleton className="h-4 w-72" />
                    <Skeleton className="mt-2 h-5 w-24" />
                </CardHeader>
                <div className="mt-4 px-6 pb-6">
                    <Skeleton className="h-24 w-48" />
                </div>
                <div className="mt-4 px-6 pb-6">
                    <Skeleton className="h-6 w-24" />
                    <div className="mt-2 grid grid-cols-1 gap-4 lg:grid-cols-2">
                        <Skeleton className="h-8 space-y-2 rounded-lg" />
                    </div>
                </div>
            </Card>
        </div>
    );
}

export function EInviteNotFound() {
    return (
        <div className="my-9 flex w-full flex-col items-center justify-center space-y-3">
            <h1>How&apos;d you get here?</h1>
            <Link href={"/"}>
                <Button>Go Home</Button>
            </Link>
        </div>
    );
}
