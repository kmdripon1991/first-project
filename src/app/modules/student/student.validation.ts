import { z } from 'zod';

const userNameValidationSchema = z.object({
  firstName: z
    .string()
    .max(30, { message: 'First name cannot exceed 30 characters.' })
    .regex(/^[A-Z][a-zA-Z-' ]*$/, {
      message:
        'First name must start with a capital letter and can only contain letters, spaces, hyphens, or apostrophes.',
    })
    .trim(),
  middleName: z
    .string()
    .max(30, { message: 'Middle name cannot exceed 30 characters.' })
    .regex(/^[A-Z][a-zA-Z-' ]*$/, {
      message:
        'Middle name must start with a capital letter and can only contain letters, spaces, hyphens, or apostrophes.',
    })
    .trim()
    .optional(),
  lastName: z
    .string()
    .max(50, { message: 'Last name cannot exceed 50 characters.' })
    .regex(/^[A-Z][a-zA-Z-' ]*$/, {
      message:
        'Last name must start with a capital letter and can only contain letters, spaces, hyphens, or apostrophes.',
    })
    .trim(),
});

const guardianValidationSchema = z.object({
  fathersName: z.string().min(1, { message: "Father's name is required." }),
  fathersOccupation: z
    .string()
    .min(1, { message: "Father's occupation is required." }),
  fathersContactNo: z
    .string()
    .min(1, { message: "Father's contact number is required." }),
  mothersName: z.string().min(1, { message: "Mother's name is required." }),
  mothersOccupation: z
    .string()
    .min(1, { message: "Mother's occupation is required." }),
  mothersContactNo: z
    .string()
    .min(1, { message: "Mother's contact number is required." }),
});

const localGuardianValidationSchema = z.object({
  name: z.string().min(1, { message: "Local guardian's name is required." }),
  occupation: z
    .string()
    .min(1, { message: "Local guardian's occupation is required." }),
  contactNo: z
    .string()
    .min(1, { message: "Local guardian's contact number is required." }),
  address: z
    .string()
    .min(1, { message: "Local guardian's address is required." }),
});

const studentValidationSchema = z.object({
  id: z
    .string()
    .max(8, { message: 'Student ID cannot exceed 8 characters.' })
    .trim(),
  password: z
    .string()
    .max(20, { message: 'Password cannot exceed 8 characters.' })
    .trim(),
  name: userNameValidationSchema,
  gender: z.enum(['Male', 'Female', 'Others']),
  dateOfBirth: z.string().min(1, { message: 'Date of birth is required.' }),
  email: z.string().email({ message: 'Invalid email format.' }),
  contactNo: z.string().min(1, { message: 'Contact number is required.' }),
  emergencyContactNo: z
    .string()
    .min(1, { message: 'Emergency contact number is required.' }),
  bloodGroup: z
    .enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'])
    .optional(),
  presentAddress: z
    .string()
    .min(1, { message: 'Present address is required.' }),
  permanentAddress: z
    .string()
    .min(1, { message: 'Permanent address is required.' }),
  guardian: guardianValidationSchema,
  localGuardian: localGuardianValidationSchema,
  image: z.string().min(1, { message: 'Image URL is required.' }),
  isActive: z.enum(['active', 'blocked']).default('active'),
  isDeleted: z.boolean(),
});

export default studentValidationSchema;
