"use client";
import { CheckIcon, ClipboardIcon } from "@radix-ui/react-icons";
import React, { type ReactNode, useState } from "react";
import { cn } from "~/lib/utils";
import { useCopyToClipboard } from "@uidotdev/usehooks";

export interface CopyBlockProps extends React.HTMLAttributes<HTMLDivElement> {
    href?: string;
    children: string;
    target?: "_blank" | "_self" | "_parent" | "_top";
    iconWaitPeriod?: number;
}

export default function CopyBlock({
    target,
    href,
    children,
    className,
    iconWaitPeriod = 2000,
    onClick,
    ...props
}: CopyBlockProps) {
    const [, copy] = useCopyToClipboard();

    const [clipboardIcon, setClipboardIcon] = useState<ReactNode>(
        <ClipboardIcon width={24} />,
    );

    return (
        <div
            className={cn(
                `isolate flex w-full justify-between gap-4 rounded-md border border-border bg-background p-4`,
                className,
            )}
            {...props}
        >
            <pre className={`${href && "truncate text-sm underline"}`}>
                {href ? (
                    <a target={target} href={href}>
                        {children}
                    </a>
                ) : (
                    <>{children}</>
                )}
            </pre>
            <button
                className="aspect-square h-full rounded-md hover:bg-foreground/10"
                onClick={(event) => {
                    void copy(children);
                    if (onClick)
                        onClick(
                            event as unknown as React.MouseEvent<
                                HTMLDivElement,
                                MouseEvent
                            >,
                        );
                    setClipboardIcon(<CheckIcon width={24} />);
                    setTimeout(() => {
                        setClipboardIcon(<ClipboardIcon width={24} />);
                    }, iconWaitPeriod);
                }}
            >
                {clipboardIcon}
            </button>
        </div>
    );
}
