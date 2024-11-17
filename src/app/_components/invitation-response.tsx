"use client";
import React, { useEffect } from "react";
import { toast } from "sonner";
import handleCreateGuest from "~/actions/handleInvitation";
import { Checkbox } from "~/components/ui/checkbox";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "~/components/ui/dialog";
import { Button } from "./button";

const formSchema = z.object({
    coming: z.boolean().default(false),
    name: z.string().min(2).max(50).optional(),
    numPeople: z.number().int().min(1).max(10).optional(),
});

type Props = {
    id: number;
};
export default function InvitationResponse({ id }: Props) {
    const [responded, setResponded] = React.useState(false);
    const [respond, setRespond] = React.useState(true);
    useEffect(() => {
        if (!responded) {
            toast("You have been invited!", {
                id: "invitation-dialog",
                action: {
                    label: "Respond to invitation",
                    onClick: () => {
                        // handleInvitation(id, true, 1)
                        setRespond(true);
                    },
                },
                duration: Infinity,
            });
        } else setResponded(true);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            coming: false,
            name: "",
            numPeople: 0,
        },
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        toast.loading("Responding to invitation...", {
            id: "invitation-response",
        });
        console.log(values);
        try {
            await handleCreateGuest({
                id: id,
                name: values.name,
                numGuests: values.numPeople,
                coming: values.coming,
            });
            toast.success("Successfully responded to invitation", {
                id: "invitation-response",
            });
        } catch {
            toast.error("Failed to respond to invitation", {
                id: "invitation-response",
            });
        }
    }

    return (
        <Dialog open={respond} onOpenChange={(open) => setRespond(open)}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Response to Invitation</DialogTitle>
                </DialogHeader>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-8 p-2"
                    >
                        <FormField
                            control={form.control}
                            name="coming"
                            render={({ field }) => (
                                <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                                    <FormControl>
                                        <Checkbox
                                            checked={field.value}
                                            onCheckedChange={field.onChange}
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
                            name="name"
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
                                        Name
                                    </FormLabel>
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
                                        How many people are coming with you?
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            type="number"
                                            {...field}
                                            onChange={(event) => {
                                                field.onChange({
                                                    target: {
                                                        value: parseInt(
                                                            event.target.value,
                                                        ),
                                                    },
                                                });
                                            }}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="submit">Submit</Button>
                    </form>
                </Form>
                <DialogFooter>
                    <Button type="submit">Confirm</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
