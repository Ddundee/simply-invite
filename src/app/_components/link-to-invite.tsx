"use client";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import CopyBlock from "~/components/ui/copy-block";

export default function LinkToInvite() {
    const [url, setUrl] = useState("");
    useEffect(() => {
        setTimeout(() => {
            setUrl(
                window.location.href.split("dashboard/events").join("invite"),
            );
        }, 1);
    }, []);

    return (
        <CopyBlock
            target="_blank"
            href={url}
            onClick={() => {
                toast.success("Copied to clipboard!");
            }}
            iconWaitPeriod={10000}
        >
            {url}
        </CopyBlock>
    );
}
