"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { type z } from "zod";
import handleCreateGuest from "~/actions/handleInvitation";
import { Checkbox } from "~/components/ui/checkbox";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";

import {
    Drawer,
    DrawerContent,
    DrawerDescription,
    DrawerOverlay,
    DrawerPortal,
    DrawerTitle,
} from "~/components/ui/drawer";

import clsx from "clsx";
import { Button } from "~/components/ui/button";
import { DialogFooter } from "~/components/ui/dialog";
import { invitationFormSchema } from "~/util/schema/invitation-form-schema";

type Props = {
    id: number;
};

const snapPoints = [0.18, 0.6];

export default function InvitationResponse({ id }: Props) {
    const [snap, setSnap] = useState<number | string | null>(snapPoints[0]!);
    const [open, setOpen] = useState(true);

    const form = useForm<z.infer<typeof invitationFormSchema>>({
        resolver: zodResolver(invitationFormSchema),
        defaultValues: {
            coming: false,
            name: "",
            numPeople: 0,
        },
    });

    async function onSubmit(values: z.infer<typeof invitationFormSchema>) {
        toast.loading("Responding to invitation...", {
            id: "invitation-response",
        });
        try {
            await handleCreateGuest({
                id,
                numGuests: values.numPeople,
                ...values,
            });
            toast.success("Successfully responded to invitation", {
                id: "invitation-response",
            });
        } catch {
            toast.error("Failed to respond to invitation", {
                id: "invitation-response",
            });
        }
        setOpen(false);
    }

    return (
        <Drawer
            snapPoints={snapPoints}
            activeSnapPoint={snap}
            setActiveSnapPoint={setSnap}
            open={open}
            shouldScaleBackground
            modal={false}
        >
            <DrawerOverlay className="fixed inset-0 bg-black/40" />
            <DrawerPortal>
                <DrawerContent
                    data-testid="content"
                    className="border-b-none fixed bottom-0 left-0 right-0 mx-[-1px] flex h-full max-h-[97%] flex-col rounded-t-[10px] border border-gray-200 bg-white"
                >
                    <div
                        className={clsx(
                            "mx-auto flex w-full max-w-md flex-col p-4 pt-5",
                            {
                                "overflow-y-auto": snap === 1,
                                "overflow-hidden": snap !== 1,
                            },
                        )}
                    >
                        <DrawerTitle className="mt-2 text-2xl font-medium text-gray-900">
                            You are invited!
                        </DrawerTitle>
                        <DrawerDescription className="mt-2 text-gray-500">
                            Swipe up or tap to respond.
                        </DrawerDescription>
                        <Form {...form}>
                            <form
                                onSubmit={form.handleSubmit(onSubmit)}
                                className="space-y-8 p-2"
                            >
                                <FormField
                                    control={form.control}
                                    name="name"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Name</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="John Doe"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="coming"
                                    render={({ field }) => (
                                        <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                                            <FormControl>
                                                <Checkbox
                                                    checked={field.value}
                                                    onCheckedChange={
                                                        field.onChange
                                                    }
                                                />
                                            </FormControl>
                                            <div className="space-y-1 leading-none">
                                                <FormLabel>
                                                    So are you coming?
                                                </FormLabel>
                                            </div>
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="numPeople"
                                    disabled={!form.getValues("coming")}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel
                                                className={
                                                    !form.getValues("coming")
                                                        ? `text-muted`
                                                        : ""
                                                }
                                            >
                                                How many people are coming with
                                                you?
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="number"
                                                    {...field}
                                                    onChange={(event) => {
                                                        const value =
                                                            event.target.value;
                                                        field.onChange(
                                                            value === ""
                                                                ? 0
                                                                : parseInt(
                                                                      value,
                                                                  ),
                                                        );
                                                    }}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <DialogFooter>
                                    <Button
                                        disabled={form.getValues("name") == ""}
                                        type="submit"
                                    >
                                        Confirm
                                    </Button>
                                </DialogFooter>
                            </form>
                        </Form>
                    </div>
                </DrawerContent>
            </DrawerPortal>
        </Drawer>
    );
}
