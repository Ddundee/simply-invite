import { z } from "zod";
export const invitationFormSchema = z.object({
    name: z.string().min(2).max(50),
    coming: z.boolean().default(false),
    numPeople: z.number().int().min(1).max(10).optional(),
});
