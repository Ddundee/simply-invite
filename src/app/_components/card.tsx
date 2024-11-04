import React from "react";
import { cn } from "~/lib/utils";

type Props = {
    children: React.ReactNode;
    title: string;
    className?: string;
};

function Card({ children, title, className }: Props) {
    return (
        <div
            className={cn(
                "rounded-lg border border-outline bg-primary-text bg-opacity-[.03] p-8",
                className,
            )}
        >
            <h4 className="mb-3">{title}</h4>
            {children}
        </div>
    );
}

export default Card;
