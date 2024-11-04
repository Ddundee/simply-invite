"use client";
import { useState } from "react";
import { Slider } from "~/components/ui/slider";
import { cn } from "~/lib/utils";
import Card from "./card";
import { Button } from "./button";
import { CheckIcon } from "@radix-ui/react-icons";
export default function Pricing() {
    const computePricing = (invites: number) => {
        // TODO: Implement pricing computation
        return invites;
    };

    const [invites, setInvites] = useState<number>(33);
    return (
        <div className="space-y-9" id="pricing">
            <h2 className="text-2xl font-medium">Pricing</h2>
            <div className="flex justify-between gap-4">
                <p className="min-w-fit">
                    Up to <b>{invites}</b> invites
                </p>
                <Slider
                    defaultValue={[invites]}
                    max={1000}
                    step={1}
                    className={cn("")}
                    onValueChange={([val]) => setInvites(val!)}
                    value={[invites]}
                />
            </div>
            <div className="grid grid-cols-3 gap-6">
                <Card title="Free">
                    <div className="space-y-4">
                        <p className="text-secondary-text">
                            For users who want a straight forward way to share
                            invites with ease.
                        </p>
                        <p className="text-5xl">Free</p>
                        <Button className="w-full">Get Started</Button>
                        <ul className="space-y-2 text-secondary-text">
                            <li className="flex items-center gap-2">
                                <CheckIcon
                                    fill="#2C50B2"
                                    width="16"
                                    height="16"
                                />
                                Unlimited events & guests
                            </li>
                            <li className="flex items-center gap-2">
                                <CheckIcon
                                    fill="#2C50B2"
                                    width="16"
                                    height="16"
                                />
                                Link sharing
                            </li>
                            <li className="flex items-center gap-2">
                                <CheckIcon
                                    fill="#2C50B2"
                                    width="16"
                                    height="16"
                                />
                                Event status tracking
                            </li>
                            <li className="flex items-center gap-2">
                                <CheckIcon
                                    fill="#2C50B2"
                                    width="16"
                                    height="16"
                                />
                                Suggest features
                            </li>
                        </ul>
                    </div>
                </Card>
                <Card title="Pay as you go">
                    <div className="space-y-4">
                        <p className="text-secondary-text">
                            For users who want a straight forward way to share
                            invites with ease.
                        </p>
                        <p className="text-5xl">${computePricing(invites)}</p>
                        <Button className="w-full">Get Started</Button>
                        <ul className="space-y-2 text-secondary-text">
                            <li className="flex items-center gap-2">
                                <CheckIcon
                                    fill="#2C50B2"
                                    width="16"
                                    height="16"
                                />
                                <p>
                                    Everything in <b>Free</b>
                                </p>
                            </li>
                            <li className="flex items-center gap-2">
                                <CheckIcon
                                    fill="#2C50B2"
                                    width="16"
                                    height="16"
                                />
                                <p>
                                    Custom sent invitations via text-messages &
                                    email
                                </p>
                            </li>
                        </ul>
                    </div>
                </Card>
                <Card title="Custom">
                    <div className="space-y-4">
                        <p className="text-secondary-text">
                            Ideal for large events or organizations hosting
                            1,000+ guests.
                        </p>
                        <p className="text-5xl">Custom</p>
                        <Button className="w-full">Contact us</Button>
                        <ul className="space-y-2 text-secondary-text">
                            <li className="flex items-center gap-2">
                                <CheckIcon
                                    fill="#2C50B2"
                                    width="16"
                                    height="16"
                                />
                                <p>
                                    Everything in <b>Free</b>
                                </p>
                            </li>
                            <li className="flex items-center gap-2">
                                <CheckIcon
                                    fill="#2C50B2"
                                    width="16"
                                    height="16"
                                />
                                <p>
                                    Talk to us about custom pricing for your
                                    events
                                </p>
                            </li>
                        </ul>
                    </div>
                </Card>
            </div>
        </div>
    );
}
