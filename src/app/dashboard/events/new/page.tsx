"use client";
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useWatch } from "react-hook-form";
import { z } from "zod";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "~/components/ui/popover";
import { CalendarIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";
import { Calendar } from "~/components/calender";
import { cn } from "~/lib/utils";
import { Textarea } from "~/components/ui/textarea";
import { toast } from "sonner";
import handleCreateEvent from "~/actions/handleCreateEvent";
import { useRouter } from "next/navigation";
import { Switch } from "~/components/ui/switch";
import EInviteDisplay from "~/app/_components/einvite-display";
import { Button } from "~/components/ui/button";

const formSchema = z.object({
    name: z.string().min(1).max(512),
    date: z.date(),
    hostName: z.string().min(1).max(512),
    location: z.string().min(1).max(512),
    note: z.string().max(2048).optional(),
    publicGuestList: z.boolean(),
});

export default function Page() {
    const router = useRouter();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            hostName: "",
            location: "",
            note: "",
            publicGuestList: false,
        },
    });
    const values = useWatch({
        control: form.control,
        name: [
            "name",
            "date",
            "location",
            "hostName",
            "note",
            "publicGuestList",
        ],
    });

    return (
        <div className="min-h-full gap-16 space-y-16 p-6 md:grid md:grid-cols-2 md:space-y-0 lg:grid-cols-3">
            <EInviteDisplay
                event={{
                    date: values[1],
                    name: values[0],
                    location: values[2],
                    hostName: values[3],
                    note: values[4] ? values[4] : null,
                    publicGuestList: values[5],
                }}
            />
            <section className="min-h-full space-y-9">
                <h1 className="text-2xl">Let&apos;s create an event</h1>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(async (data) => {
                            toast.loading("Creating Event...", {
                                id: "create-event",
                            });
                            try {
                                const id = await handleCreateEvent(data);
                                toast.success("Event created!", {
                                    id: "create-event",
                                });
                                void router.push(
                                    `/dashboard/events/${id[0]?.id}`,
                                );
                            } catch {
                                toast.error(
                                    "Failed to create event! 😭 Please try again later.",
                                    { id: "create-event" },
                                );
                            }
                        })}
                        className="space-y-8"
                    >
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Event Name</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder={"Thanksgiving Party"}
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="date"
                            render={({ field }) => (
                                <FormItem className="flex flex-col">
                                    <FormLabel>Date</FormLabel>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <FormControl>
                                                <Button
                                                    variant={"outline"}
                                                    className={cn(
                                                        "pl-3 text-left font-normal",
                                                        !field.value &&
                                                            "text-muted-foreground",
                                                    )}
                                                >
                                                    {field.value ? (
                                                        format(
                                                            field.value,
                                                            "PPP",
                                                        )
                                                    ) : (
                                                        <span>Pick a date</span>
                                                    )}
                                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                </Button>
                                            </FormControl>
                                        </PopoverTrigger>
                                        <PopoverContent
                                            className="w-auto p-0"
                                            align="start"
                                        >
                                            <Calendar
                                                mode="single"
                                                selected={field.value}
                                                onSelect={field.onChange}
                                                disabled={(date) =>
                                                    date <= new Date()
                                                }
                                                initialFocus
                                            />
                                        </PopoverContent>
                                    </Popover>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="location"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Location</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder={"123 Main St."}
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="hostName"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Host Name(s)</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder={"John Doe"}
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="note"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Note</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            placeholder="Simply invite is awesome..."
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="publicGuestList"
                            render={({ field }) => (
                                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                                    <div className="space-y-0.5">
                                        <FormLabel>Public Guest List</FormLabel>
                                        <FormDescription>
                                            Would you live your guests to see
                                            the guest list?
                                        </FormDescription>
                                    </div>
                                    <FormControl>
                                        <Switch
                                            checked={field.value}
                                            onCheckedChange={field.onChange}
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <div className="w-full">
                            <Button type="submit">Generate Link</Button>
                        </div>
                    </form>
                </Form>
            </section>
        </div>
    );
}
