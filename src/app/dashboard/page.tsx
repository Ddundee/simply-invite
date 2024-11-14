"use client";

import { useEffect, useState } from "react";
import { Input } from "~/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "~/components/ui/select";
import { ToggleGroup, ToggleGroupItem } from "~/components/ui/toggle-group";
import { Button } from "../_components/button";
import InviteCard from "../_components/inviteCard";
import { TextAlignJustifyIcon, ViewGridIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import handleFetchAllEvents from "~/actions/handleFetchAllEvents";
import { toast } from "sonner";
import { Skeleton } from "~/components/ui/skeleton";

export default function Page() {
    const [fetchedEvents, setFetchedEvents] = useState<{
        events: {
            date: Date;
            id: number;
            userId: string;
            name: string;
            hostName: string;
            location: string;
            note: string | null;
            publicGuestList: boolean;
        }[];
        filterdEvents: {
            date: Date;
            id: number;
            userId: string;
            name: string;
            hostName: string;
            location: string;
            note: string | null;
            publicGuestList: boolean;
        }[];
    }>({ events: [], filterdEvents: [] });
    const [fetched, setFetched] = useState(false);
    useEffect(() => {
        handleFetchAllEvents()
            .then((events) => {
                events = events.sort((a, b) => a.name.localeCompare(b.name));
                setFetchedEvents({ events, filterdEvents: events });
                setFetched(true);
            })
            .catch((_) =>
                toast.error("Failed to fetch events", { id: "fetch-events" }),
            );
    }, []);
    const currentDate = new Date();

    const currentEvents = fetchedEvents.filterdEvents.filter((event) => {
        const eventDate = new Date(event.date);
        return eventDate.toDateString() === currentDate.toDateString();
    });
    const pastEvents = fetchedEvents.filterdEvents
        .filter(({ date }) => new Date(date) < currentDate)
        .filter((event) => !currentEvents.includes(event));
    const upcomingEvents = fetchedEvents.filterdEvents
        .filter(({ date }) => new Date(date) > currentDate)
        .filter((event) => !currentEvents.includes(event));

    const possibleSortSelections = ["Sort alphabetically", "Sort by date"];
    const possibleListToggles = [
        {
            value: "card",
            label: <ViewGridIcon />,
        },
        {
            value: "list",
            label: <TextAlignJustifyIcon />,
        },
    ];
    const [sortValue, setSortValue] = useState<string>("Sort alphabetically");
    const [listValue, setListValue] = useState<string>("card");
    return (
        <main className="mx-16 my-6 space-y-3">
            <div className="flex w-full gap-3">
                <Input
                    placeholder="Search your events"
                    className="h-13 flex-grow"
                    onChange={(onChangeEvent) => {
                        setFetchedEvents({
                            ...fetchedEvents,
                            filterdEvents: fetchedEvents.events.filter(
                                (event) =>
                                    event.name
                                        .toLowerCase()
                                        .includes(
                                            onChangeEvent.target.value.toLowerCase(),
                                        ),
                            ),
                        });
                    }}
                />

                <Select
                    onValueChange={(value) => {
                        setSortValue(value);
                        setFetchedEvents({
                            ...fetchedEvents,
                            filterdEvents: fetchedEvents.filterdEvents.sort(
                                (a, b) => {
                                    if (value === "Sort alphabetically") {
                                        return a.name.localeCompare(b.name);
                                    }
                                    return (
                                        new Date(a.date).getTime() -
                                        new Date(b.date).getTime()
                                    );
                                },
                            ),
                        });
                    }}
                    value={sortValue}
                >
                    <SelectTrigger className="h-13">
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                        {possibleSortSelections.map((value, index) => (
                            <SelectItem key={index} value={value}>
                                {value}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
                <ToggleGroup
                    type="single"
                    className="gap-0 overflow-clip rounded-md border"
                    value={listValue}
                    onValueChange={(value) => setListValue(value)}
                >
                    {possibleListToggles.map((item, index) => (
                        <ToggleGroupItem
                            className="h-full"
                            key={index}
                            value={item.value}
                        >
                            {item.label}
                        </ToggleGroupItem>
                    ))}
                </ToggleGroup>
                <Link href="/dashboard/events/new" className="">
                    <Button variant="outline" className="text-nowrap">
                        Create event
                    </Button>
                </Link>
            </div>
            {fetched ? (
                <>
                    {currentEvents.length > 0 && (
                        <div className="space-y-3">
                            <div className="flex items-center gap-2">
                                <div className="h-2 w-2 animate-pulse rounded-full bg-red-500 duration-1000" />
                                <h3>
                                    Currently ongoing event
                                    {currentEvents.length > 1 && "s"}
                                </h3>
                            </div>
                            <div className="grid w-full grid-cols-4 gap-3">
                                {currentEvents.map((event, index) => (
                                    <InviteCard key={index} event={event} />
                                ))}
                            </div>
                        </div>
                    )}
                    {upcomingEvents.length > 0 && (
                        <div className="space-y-3">
                            <h3>
                                Upcoming event{upcomingEvents.length > 1 && "s"}
                            </h3>
                            <div className="grid w-full grid-cols-4 gap-3">
                                {upcomingEvents.map((event, index) => (
                                    <InviteCard key={index} event={event} />
                                ))}
                            </div>
                        </div>
                    )}
                    {pastEvents.length > 0 && (
                        <div className="space-y-3">
                            <h3>Past event{pastEvents.length > 1 && "s"}</h3>
                            <div className="grid w-full grid-cols-4 gap-3">
                                {pastEvents.map((event, index) => (
                                    <InviteCard key={index} event={event} />
                                ))}
                            </div>
                        </div>
                    )}
                </>
            ) : (
                <>
                    <div className="space-y-3">
                        <Skeleton className="h-6 w-24 rounded-md" />
                        <div className="grid w-full grid-cols-4 gap-3">
                            <Skeleton className="h-40 w-full rounded-md" />
                            <Skeleton className="h-40 w-full rounded-md" />
                            <Skeleton className="h-40 w-full rounded-md" />
                            <Skeleton className="h-40 w-full rounded-md" />
                        </div>
                    </div>
                    <div className="space-y-3">
                        <Skeleton className="h-6 w-24 rounded-md" />
                        <div className="grid w-full grid-cols-4 gap-3">
                            <Skeleton className="h-40 w-full rounded-md" />
                            <Skeleton className="h-40 w-full rounded-md" />
                            <Skeleton className="h-40 w-full rounded-md" />
                        </div>
                    </div>
                    <div className="space-y-3">
                        <Skeleton className="h-6 w-24 rounded-md" />
                        <div className="grid w-full grid-cols-4 gap-3">
                            <Skeleton className="h-40 w-full rounded-md" />
                        </div>
                    </div>
                </>
            )}
        </main>
    );
}
