import { format } from "date-fns";
import React from "react";

import Card from "./card";
import { Button } from "./button";
import { Separator } from "~/components/ui/separator";

type Props = {
    title: string;
    date: Date;
    location: string;
    hostName: string;
    note: string | undefined | null;
    publicGuestList: boolean;
};
// name: ["name", "date", "location", "hostName", "note", "publicGuestList"]
export default function EInvite({
    title,
    date,
    location,
    hostName,
    note,
    publicGuestList,
}: Props) {
    return (
        <div className="hidden flex-col gap-9 p-16 sm:flex md:grid-cols-2 lg:col-span-2">
            <Card
                title={title ? title : ""}
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
                            <div className="space-y-2 rounded-lg border p-2">
                                <div className="flex justify-between">
                                    <h6>John Doe</h6>
                                    <p className="text-green-500">3 guests</p>
                                </div>
                            </div>
                            <div className="space-y-2 rounded-lg border p-2">
                                <div className="flex justify-between">
                                    <h6>Diabeeto</h6>
                                    <p className="text-green-500">5 guests</p>
                                </div>
                            </div>
                            <div className="space-y-2 rounded-lg border p-2">
                                <div className="flex justify-between">
                                    <h6>Big man man</h6>
                                    <p className="text-green-500">1 guests</p>
                                </div>
                            </div>
                        </div>
                        <div className="flex w-full justify-end">
                            <Button variant="outline">See more</Button>
                        </div>
                    </>
                )}
            </Card>
        </div>
    );
}
