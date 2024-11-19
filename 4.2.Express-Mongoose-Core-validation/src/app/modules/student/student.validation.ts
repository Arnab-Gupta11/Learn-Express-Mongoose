import { z } from 'zod';

const userNameValidationSchema = z.object({
  firstName: z
    .string()
    .min(1, 'First name is required.')
    .min(2, 'First name must be at least 2 characters long.')
    .max(50, 'First name cannot exceed 50 characters.')
    .trim(),
  middleName: z
    .string()
    .max(50, 'Middle name cannot exceed 50 characters.')
    .trim()
    .optional(),

  lastName: z
    .string()
    .min(1, 'Last name is required.')
    .min(2, 'Last name must be at least 2 characters long.')
    .max(50, 'Last name cannot exceed 50 characters.')
    .trim(),
});

const guardianValidationSchema = z.object({
  fatherName: z
    .string()
    .min(1, "Father's name is required.")
    .min(2, "Father's name must be at least 2 characters long.")
    .max(100, "Father's name cannot exceed 100 characters.")
    .trim(),
  fatherOccupation: z
    .string()
    .min(1, "Father's occupation is required.")
    .min(2, "Father's occupation must be at least 2 characters long.")
    .max(100, "Father's occupation cannot exceed 100 characters.")
    .trim(),
  fatherContactNo: z
    .string()
    .min(1, "Father's contact number is required.")
    .regex(
      /^\d{10}$/,
      "Father's contact number must be a valid 10-digit number."
    ),
  motherName: z
    .string()
    .min(1, "Mother's name is required.")
    .min(2, "Mother's name must be at least 2 characters long.")
    .max(100, "Mother's name cannot exceed 100 characters.")
    .trim(),
  motherOccupation: z
    .string()
    .min(1, "Mother's occupation is required.")
    .min(2, "Mother's occupation must be at least 2 characters long.")
    .max(100, "Mother's occupation cannot exceed 100 characters.")
    .trim(),
  motherContactNo: z
    .string()
    .min(1, "Mother's contact number is required.")
    .regex(
      /^\d{10}$/,
      "Mother's contact number must be a valid 10-digit number."
    ),
});
const localGuardianValidationSchema = z.object({
  name: z
    .string()
    .min(1, "Local guardian's name is required.")
    .min(2, 'Name must be at least 2 characters long.')
    .max(100, 'Name cannot exceed 100 characters.')
    .trim(),
  occupation: z
    .string()
    .min(1, "Local guardian's occupation is required.")
    .min(2, 'Occupation must be at least 2 characters long.')
    .max(100, 'Occupation cannot exceed 100 characters.')
    .trim(),
  contactNo: z
    .string()
    .min(1, "Local guardian's contact number is required.")
    .regex(/^\d{10}$/, 'Contact number must be a valid 10-digit number.'),
  address: z
    .string()
    .min(1, "Local guardian's address is required.")
    .min(5, 'Address must be at least 5 characters long.')
    .max(255, 'Address cannot exceed 255 characters.')
    .trim(),
});
const studentValidationSchema = z.object({
  id: z.string().min(1, 'Student ID is required.').trim(),
  name: userNameValidationSchema,
  gender: z
    .enum(['male', 'female', 'other'])
    .refine((val) => ['male', 'female', 'other'].includes(val), {
      message: 'Gender must be male, female, or other.',
    }),
  dateOfBirth: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, 'Date of birth must be in YYYY-MM-DD format.')
    .optional(),
  email: z
    .string()
    .min(1, 'Email address is required.')
    .email('Email address must be valid.'),
  contactNo: z
    .string()
    .min(1, 'Contact number is required.')
    .regex(/^\d{10}$/, 'Contact number must be a valid 10-digit number.'),
  emergencyContactNo: z
    .string()
    .min(1, 'Emergency contact number is required.')
    .regex(
      /^\d{10}$/,
      'Emergency contact number must be a valid 10-digit number.'
    ),
  bloodGroup: z
    .enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'])
    .refine(
      (val) => ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].includes(val),
      {
        message: 'Blood group must be a valid type (A+, A-, etc.).',
      }
    )
    .optional(),
  presentAddress: z.string().min(1, 'Present address is required.').trim(),
  permanentAddress: z.string().min(1, 'Permanent address is required.').trim(),
  guardian: guardianValidationSchema,
  localGuardian: localGuardianValidationSchema,
  profileImage: z
    .string()
    .regex(
      /^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|svg))$/,
      'Profile image must be a valid URL.'
    )
    .optional(),
  isActive: z
    .enum(['active', 'blocked'])
    .refine((val) => ['active', 'blocked'].includes(val), {
      message: 'Status must be active or blocked.',
    }),
});

export default studentValidationSchema;
