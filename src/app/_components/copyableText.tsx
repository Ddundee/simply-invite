"use client";
import { CheckIcon, CopyIcon } from "@radix-ui/react-icons";
import React, { type ReactNode, useEffect, useState } from "react";
import { toast } from "sonner";

export default function CopyableText() {
    const [url, setUrl] = useState("")
    useEffect(() => {
        setTimeout(() => {
            setUrl(window.location.href.split("dashboard/events").join("invite"));
        }, 1)
    }, [])
    const [state, setState] = useState<ReactNode>(
        <CopyIcon className="fill-secondary-text" />,
    );
    return (
        <div className="flex justify-between gap-3 rounded-lg border bg-outline/50 p-2 underline ring-1 ring-outline ring-offset-1">
            <a
                className="truncate text-secondary-text"
                href={url}
                target="_blank"
            >
                {url}
            </a>
            <button
                className=""
                onClick={() => {
                    toast("Copying to clipboard", { id: "copyable-text" });
                    navigator.clipboard
                        .writeText(url)
                        .then(() => {
                            console.log("copied");
                            toast.success("Copied to clipboard", {
                                id: "copyable-text",
                            });
                            setState(<CheckIcon />);
                            setTimeout(() => {
                                setState(
                                    <CopyIcon className="fill-secondary-text" />,
                                );
                            }, 4000);
                        })
                        .catch((_) => {
                            toast.error("Failed to copy to clipboard", {
                                id: "copyable-text",
                            });
                        });
                }}
            >
                {state}
            </button>
        </div>
    );
}
