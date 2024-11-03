"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "~/components/ui/form"
import { Input } from "~/components/ui/input"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "~/components/ui/select"
import { Button } from "./button"
import { Textarea } from "~/components/ui/textarea"
import onContactFormSubmit from "~/actions/handleContactFormSubmit"
import { toast } from "sonner"
import { captureException } from "@sentry/nextjs"


export const contactFormSchema = z.object({
    firstName: z.string().min(1).max(50),
    lastName: z.string().min(1).max(50),
    email: z.string().email(),
    type: z.enum(["Support", "Request Feature", "Report Bug", "Sales", "Other"]),
    message: z.string().max(500).optional(),
})

export default function ContactForm() {
    const form = useForm<z.infer<typeof contactFormSchema>>({
        resolver: zodResolver(contactFormSchema),
        defaultValues: {
            firstName: "",
            lastName: "",
            email: "",
            message: "",
        },
        // defaultValues: {
        //     firstName: "Dhanush",
        //     lastName: "Chilakala",
        //     type: "Support",
        //     email: "test@email.com",
        //     message: "",
        // },
    })



    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(async (data) => {
                toast.loading("Sending message...", { id: "contact-form" })
                onContactFormSubmit(data)
                    .then(() => {
                        form.reset()
                        toast.success("Message sent!", { id: "contact-form" })
                    })
                    .catch((error) => {
                        captureException(error)
                        toast.error("Failed to send message 😭! Please try again later.", { id: "contact-form" })
                    })
            })} className="space-y-6">
                <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <FormField
                        control={form.control}
                        name="firstName"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>First Name</FormLabel>
                                <FormControl>
                                    <Input placeholder="John" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="lastName"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Last Name</FormLabel>
                                <FormControl>
                                    <Input placeholder="Doe" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email Address</FormLabel>
                                <FormControl>
                                    <Input placeholder="johndoe@email.com" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="type"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Type</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select an option..." />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        {contactFormSchema.shape.type._def.values.map((value, index) => <QuickSelectItem key={index} value={value} />)}
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Message</FormLabel>
                            <FormControl>
                                <Textarea placeholder="Simply invite is awesome..." {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit">Submit</Button>
            </form>
        </Form>
    )

}

function QuickSelectItem({ value }: { value: string }) {
    return (
        <SelectItem value={value}>{value}</SelectItem>
    )
}