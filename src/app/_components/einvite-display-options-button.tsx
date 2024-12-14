"use client";

import { DotsVerticalIcon } from "@radix-ui/react-icons";
import { TrashIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import handleDeleteEvent from "~/actions/handleDeleteEvent";
import { Button } from "~/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";

export default function OptionsButton({ id }: { id: number }) {
    const router = useRouter();

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="w-min">
                    <DotsVerticalIcon />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuLabel>Options</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                    onClick={() => {
                        void handleDeleteEvent(id);
                        router.push("/dashboard");
                    }}
                >
                    <TrashIcon />
                    <span>Delete</span>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
