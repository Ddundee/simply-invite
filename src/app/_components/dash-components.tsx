"use client";
import { useEffect, useRef, useState } from "react";
import { Input } from "~/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "~/components/ui/select";
import useDashboardStore from "~/util/state/use-dashboard-store";
import EInviteCard from "../_components/einvite-card";

function SearchInput() {
    const alterList = useDashboardStore((state) => state.alterList);

    return (
        <Input
            placeholder="Search your events"
            className="h-13 flex-grow"
            onChange={(onChangeEvent) =>
                alterList({ search: onChangeEvent.target.value })
            }
        />
    );
}

function SortInput() {
    const possibleSortSelections = ["Sort alphabetically", "Sort by date"];
    const [sortValue, setSortValue] = useState<string>(
        possibleSortSelections[0]!,
    );

    const alterList = useDashboardStore((state) => state.alterList);

    return (
        <Select
            onValueChange={(value) => {
                setSortValue(value);
                alterList({
                    sort:
                        value === "Sort alphabetically"
                            ? "alphabetically"
                            : "date",
                });
            }}
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
    );
}

// function DisplayType() {

//     const possibleListToggles = [
//         {
//             value: "card",
//             label: <ViewGridIcon />,
//         },
//         {
//             value: "list",
//             label: <TextAlignJustifyIcon />,
//         },
//     ];
//     const [listValue, setListValue] = useState<string>("card");

//     return (
//         <ToggleGroup
//             type="single"
//             className="gap-0 overflow-clip rounded-md border"
//             value={listValue}
//             onValueChange={(value) => setListValue(value)}
//         >
//             {possibleListToggles.map((item, index) => (
//                 <ToggleGroupItem
//                     className="h-full"
//                     key={index}
//                     value={item.value}
//                 >
//                     {item.label}
//                 </ToggleGroupItem>
//             ))}
//         </ToggleGroup>
//     )
// }

function Data({
    data,
}: {
    data: {
        numGuests: number;
        date: Date;
        id: number;
        userId: string;
        name: string;
        hostName: string;
        location: string;
        note: string | null;
        publicGuestList: boolean;
    }[];
}) {
    const makeList = useDashboardStore((state) => state.makeList);
    useEffect(() => {
        makeList(data);
    }, [data, makeList]);

    const alteredList = useDashboardStore((state) => state.alteredList);
    console.log("DATA", data);
    console.log("ALTERED LIST", alteredList);
    const currentDate = useRef(new Date()).current;
    const currentEvents = alteredList.filter((event) => {
        const eventDate = new Date(event.date);
        return eventDate.toDateString() === currentDate.toDateString();
    });
    const pastEvents = alteredList
        .filter(({ date }) => new Date(date) < currentDate)
        .filter((event) => !currentEvents.includes(event));
    const upcomingEvents = alteredList
        .filter(({ date }) => new Date(date) > currentDate)
        .filter((event) => !currentEvents.includes(event));

    return (
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
                    <div className="grid w-full grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                        {currentEvents.map((event, index) => (
                            <EInviteCard key={index} event={event} />
                        ))}
                    </div>
                </div>
            )}
            {upcomingEvents.length > 0 && (
                <div className="space-y-3">
                    <h3>Upcoming event{upcomingEvents.length > 1 && "s"}</h3>
                    <div className="grid w-full grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                        {upcomingEvents.map((event, index) => (
                            <EInviteCard key={index} event={event} />
                        ))}
                    </div>
                </div>
            )}
            {pastEvents.length > 0 && (
                <div className="space-y-3">
                    <h3>Past event{pastEvents.length > 1 && "s"}</h3>
                    <div className="grid w-full grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                        {pastEvents.map((event, index) => (
                            <EInviteCard key={index} event={event} />
                        ))}
                    </div>
                </div>
            )}
        </>
    );
}

export { Data, SearchInput, SortInput };
