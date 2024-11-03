"use server"

import type { z } from "zod"
import type { contactFormSchema } from "~/app/_components/contactForm"
import { captureException } from "@sentry/nextjs";

interface DiscordEmbed {
    title: string;
    color: number;
    fields: {
        name: string;
        value: string;
    }[];
}


export default async function onContactFormSubmit(values: z.infer<typeof contactFormSchema>) {
    const embed: DiscordEmbed = {
        title: 'Simply-Invite Contact Form Submission',
        color: 0x1A69F3,
        fields: [
            { name: 'Name', value: `${values.firstName} ${values.lastName}` },
            { name: 'Type', value: values.type },
            { name: 'Email', value: values.email },
        ]
    };
    if (values.message) {
        embed.fields.push({ name: 'Message', value: values.message });
    }
    await fetch(process.env.DISCORD_WEBHOOK_URL!, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            username: 'Simply-Invite',
            avatar_url: 'https://i.imgur.com/AfFp7pu.png',
            embeds: [embed],
        }),
    });
}