import { z } from "zod";

export const contactFormSchema = z.object({
    firstName: z.string().min(1).max(64),
    lastName: z.string().min(1).max(64),
    email: z.string().email(),
    type: z.enum([
        "Select an option",
        "Support",
        "Request Feature",
        "Report Bug",
        "Sales",
        "Other",
    ]),
    message: z.string().max(512).optional(),
});
