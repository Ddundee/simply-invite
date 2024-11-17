import React from "react";
import { Skeleton } from "~/components/ui/skeleton";

export default function Loading() {
    return (
        <main className="flex-col gap-9 p-16 sm:flex md:grid-cols-2 lg:col-span-2">
            <Skeleton className="h-80 w-full rounded-md" />
        </main>
    );
}
