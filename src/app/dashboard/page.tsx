"use client";

import { useState } from "react";
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

export const events = [
    {
        openToRSVP: true,
        title: "Birthday party",
        date: new Date("2025-01-01"),
        guestList: [
            {
                name: "John Doe",
                status: "accepted",
                guests: 10,
            },
            {
                name: "Jane Doe",
                status: "pending",
                guests: 1,
            },
            {
                name: "John Doe",
                status: "declined",
                guests: 1,
            },
            {
                name: "Lil Jonny",
                status: "accepted",
                guests: 1,
            },
            {
                name: "Mailman",
                status: "pending",
                guests: 1,
            },
            {
                name: "Sum guy",
                status: "declined",
                guests: 1,
            },
        ], // TODO
        id: 1092382903812903,
    },
    {
        openToRSVP: true,
        title: "Birthday party",
        date: new Date("2022-01-01"),
        guestList: [
            {
                name: "John Doe",
                status: "accepted",
                guests: 1,
            },
            {
                name: "Jane Doe",
                status: "pending",
                guests: 1,
            },
            {
                name: "John Doe",
                status: "declined",
                guests: 1,
            },
            {
                name: "Lil Jonny",
                status: "accepted",
                guests: 3,
            },
            {
                name: "Mailman",
                status: "pending",
                guests: 1,
            },
            {
                name: "Sum guy",
                status: "declined",
                guests: 1,
            },
        ], // TODO
        id: 1092382903812903,
    },
    {
        openToRSVP: true,
        title: "Birthday party",
        date: Date.now(),
        guestList: [
            {
                name: "John Doe",
                status: "accepted",
                guests: 1,
            },
            {
                name: "Jane Doe",
                status: "pending",
                guests: 1,
            },
            {
                name: "John Doe",
                status: "declined",
                guests: 1,
            },
            {
                name: "Lil Jonny",
                status: "accepted",
                guests: 3,
            },
            {
                name: "Mailman",
                status: "pending",
                guests: 1,
            },
            {
                name: "Sum guy",
                status: "declined",
                guests: 1,
            },
        ], // TODO
        id: 1092382903812903,
    },
];

export default function Page() {
    const currentDate = new Date();

    const currentEvents = events.filter((event) => {
        const eventDate = new Date(event.date);
        return eventDate.toDateString() === currentDate.toDateString();
    });
    const pastEvents = events
        .filter(({ date }) => new Date(date) < currentDate)
        .filter((event) => !currentEvents.includes(event));
    const upcomingEvents = events
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
                <Input placeholder="Search your events" className="flex-grow" />

                <Select
                    onValueChange={(value) => setSortValue(value)}
                    value={sortValue}
                >
                    <SelectTrigger>
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
                        <ToggleGroupItem key={index} value={item.value}>
                            {item.label}
                        </ToggleGroupItem>
                    ))}
                </ToggleGroup>
                <Button variant="outline" className="min-w-fit py-[-1px]">
                    Create event
                </Button>
            </div>
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
                    <h3>Upcoming event{upcomingEvents.length > 1 && "s"}</h3>
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
        </main>
    );
}

// function Dashboard() {

// }
