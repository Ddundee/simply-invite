"use client";
import { CheckIcon, ClipboardIcon } from "@radix-ui/react-icons";
import React, { type ReactNode, useState } from "react";
import { cn } from "~/lib/utils";

export interface CopyBlockProps extends React.HTMLAttributes<HTMLDivElement> {
    href?: string;
    children: string;
    target?: "_blank" | "_self" | "_parent" | "_top";
}

export default function CopyBlock({
    target,
    href,
    children,
    className,
    ...props
}: CopyBlockProps) {
    const copyHandler = (text: string) => {
        void navigator.clipboard.writeText(text);
    };

    const [clipboardIcon, setClipboardIcon] = useState<ReactNode>(
        <ClipboardIcon width={24} />,
    );

    return (
        <div
            className={cn(
                `flex w-full justify-between gap-4 rounded-md border border-border bg-background p-4`,
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
                onClick={() => {
                    copyHandler(children);
                    setClipboardIcon(<CheckIcon width={24} />);
                    setTimeout(() => {
                        setClipboardIcon(<ClipboardIcon width={24} />);
                    }, 2000);
                }}
            >
                {clipboardIcon}
            </button>
        </div>
    );
}
