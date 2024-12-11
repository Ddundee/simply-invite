import Link from "next/link";
import { Suspense } from "react";
import { Button } from "~/components/ui/button";
import { Skeleton } from "~/components/ui/skeleton";
import { Data, SearchInput, SortInput } from "../_components/dash-components";
import handleFetchAllEvents from "~/actions/handleFetchAllEvents";

export default function Page() {
    return (
        <main className="mx-16 my-6 space-y-3">
            <div className="grid w-full gap-3 md:grid-cols-2">
                <SearchInput />
                <div className="flex w-full flex-grow gap-3">
                    <SortInput />
                    {/* <DisplayType /> */}
                    <Link href="/dashboard/events/new" className="">
                        <Button variant="outline" className="text-nowrap">
                            Create event
                        </Button>
                    </Link>
                </div>
            </div>
            <Suspense fallback={<Loading />}>
                <DataSuspenseBoundary />
            </Suspense>
        </main>
    );
}

async function DataSuspenseBoundary() {
    const data = await handleFetchAllEvents();
    return <Data data={data} />;
}

function Loading() {
    return (
        <>
            <div className="space-y-3">
                <Skeleton className="h-6 w-24 rounded-md" />
                <div className="grid w-full grid-cols-4 gap-3">
                    <Skeleton className="h-40 w-full rounded-md" />
                    <Skeleton className="h-40 w-full rounded-md" />
                    <Skeleton className="h-40 w-full rounded-md" />
                    <Skeleton className="h-40 w-full rounded-md" />
                </div>
            </div>
            <div className="space-y-3">
                <Skeleton className="h-6 w-24 rounded-md" />
                <div className="grid w-full grid-cols-4 gap-3">
                    <Skeleton className="h-40 w-full rounded-md" />
                    <Skeleton className="h-40 w-full rounded-md" />
                    <Skeleton className="h-40 w-full rounded-md" />
                </div>
            </div>
            <div className="space-y-3">
                <Skeleton className="h-6 w-24 rounded-md" />
                <div className="grid w-full grid-cols-4 gap-3">
                    <Skeleton className="h-40 w-full rounded-md" />
                </div>
            </div>
        </>
    );
}
