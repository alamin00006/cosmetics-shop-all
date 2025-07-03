
import { z } from 'zod';

export const hospitalSchema = z.object({
  hospitalName: z.string().min(1, { message: "Hospital Name is required" }),
  hospitalRegistrationNum: z.string().min(1, { message: "Registration Number is required" }),
  yearsOfEstablishment: z.string().min(1, { message: "Years of Establishment is required" }),
  hospitalMail: z.string().email({ message: "Invalid email address" }),
  hospitalContactNumber: z.string().min(10, { message: "Phone number must be 10 digits" }),
  address: z.string().min(1, { message: "Address is required" }),
  hospitalType: z.enum(['Private', 'Government'], { message: "Invalid hospital type" }), 
  userName: z.string().min(1, { message: "Management Name is required" }),
  contactNumber: z.string().min(10, { message: "Contact number must be 10 digits" }),
  adminEmail: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
});

export type Hospital = z.infer<typeof hospitalSchema>;

