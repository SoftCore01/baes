import * as z from "zod";
export const payerSchema = z.object({
    fullName: z
        .string("Full Name must be a string.")
        .min(5, "Full Name must be at least 5 characters long.")
        .max(70, "Full Name must be less than 70 characters long."),
    matricNo: z
        .string()
        .min(11, "Matric Number must be 11 characters long.")
        .max(11, "Matric Number must be no longer than 11 characters.")
        .regex(/BU[0-9]+(MCT|EEE)+[0-9]+/, "Matric number must be a valid Bowen matriculation number."), //BU[0-9]+MCT[0-9]+
    level: z.literal(['100', '200', '300', '400', '500'], "Level input must be one of the following '100', '200', '300', '400', '500'"),
    email: z.email("Enter a valid email"),
    department: z.literal(["EEE", "MCT"], "Department must be either 'EEE' or 'MCT'"),
    phoneNo: z
        .string("Phone number must be a string")
        .min(11, "Phone number must be 11 characters long.")
        .max(11, "Phone number must be no longer than 11 characters.")
        .regex(/[0-9]+/, "Your Input must be a valid phone number."),
    payerName: z
        .string("Payer name must be a string.")
        .min(5, "Payer name must be at least 5 characters long.")
        .max(70, "Payer name must be less than 70 characters long."),
});
