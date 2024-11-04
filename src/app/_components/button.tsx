import React from "react";
import { cn } from "~/lib/utils";

export function ButtonGroup({ children }: { children: React.ReactNode[] }) {
    return (
        <div className="flex items-center overflow-clip rounded-full border border-outline">
            {children.map((child, index) => (
                <div
                    className="cursor-pointer border-[.5px] bg-primary-text bg-opacity-[.03] px-6 py-3 duration-100 hover:bg-opacity-5"
                    key={index}
                >
                    {child}
                </div>
            ))}
        </div>
    );
}
export function Button({
    children,
    className,
    variant,
    type,
}: {
    children: React.ReactNode;
    className?: string;
    variant?: "primary" | "secondary" | "outline";
    type?: "submit";
}) {
    const classNames = {
        primary:
            "cursor-pointer px-6 py-3 bg-blue text-primary-text gap-1 rounded-full flex items-center overflow-clip hover:bg-opacity-80 duration-100 justify-center",
        secondary:
            "rounded-full border border-outline flex items-center cursor-pointer px-6 py-3 bg-primary-text bg-opacity-[.03] hover:bg-opacity-5 duration-100",
        outline:
            "rounded-full border border-outline flex items-center cursor-pointer px-6 py-3 hover:bg-opacity-5 duration-100 bg-transparent",
    };
    return (
        <button
            className={cn(classNames[variant ? variant : "primary"], className)}
            type={type}
        >
            {children}
        </button>
    );
}
