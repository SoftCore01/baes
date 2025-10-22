import * as z from "zod";
export const payerSchema = z.object({
    fullName: z.string("Input is not a string.").min(5, "Input must be at least 5 characters long.").max(70, "Input must be less than 70 characters long"),
    matricNo: z.string().regex(/BU[0-9]+[A-Za-z]+[0-9]+/),
    level: z.literal([100, 200, 300, 400, 500, 600]),
    email: z.email(),
    department: z.literal(["EEE", "MCT"]),
    phoneNo: z.string().min(11).regex(/[0-9]+/),
    payerName: z.string().min(5).max(70),
});
