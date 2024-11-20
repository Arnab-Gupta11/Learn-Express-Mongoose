import { model, Schema } from 'mongoose';
import {
  StudentModel,
  TGuardian,
  TLocalGuardian,
  TStudent,
  TUserName,
} from './student.interface';
import bcrypt from 'bcrypt';
import config from '../../config';

const userNameSchema = new Schema<TUserName>({
  firstName: {
    type: String,
    required: [true, 'First name is required.'],
    trim: true,
    minlength: [2, 'First name must be at least 2 characters long.'],
    maxlength: [50, 'First name cannot exceed 50 characters.'],
  },
  middleName: {
    type: String,
    trim: true,
    maxlength: [50, 'Middle name cannot exceed 50 characters.'],
  },
  lastName: {
    type: String,
    required: [true, 'Last name is required.'],
    trim: true,
    minlength: [2, 'Last name must be at least 2 characters long.'],
    maxlength: [50, 'Last name cannot exceed 50 characters.'],
  },
});

const guardianSchema = new Schema<TGuardian>({
  fatherName: {
    type: String,
    required: [true, "Father's name is required."],
    trim: true,
    minlength: [2, "Father's name must be at least 2 characters long."],
    maxlength: [100, "Father's name cannot exceed 100 characters."],
  },
  fatherOccupation: {
    type: String,
    required: [true, "Father's occupation is required."],
    trim: true,
    minlength: [2, "Father's occupation must be at least 2 characters long."],
    maxlength: [100, "Father's occupation cannot exceed 100 characters."],
  },
  fatherContactNo: {
    type: String,
    required: [true, "Father's contact number is required."],
    match: [
      /^\d{10}$/,
      "Father's contact number must be a valid 10-digit number.",
    ],
  },
  motherName: {
    type: String,
    required: [true, "Mother's name is required."],
    trim: true,
    minlength: [2, "Mother's name must be at least 2 characters long."],
    maxlength: [100, "Mother's name cannot exceed 100 characters."],
  },
  motherOccupation: {
    type: String,
    required: [true, "Mother's occupation is required."],
    trim: true,
    minlength: [2, "Mother's occupation must be at least 2 characters long."],
    maxlength: [100, "Mother's occupation cannot exceed 100 characters."],
  },
  motherContactNo: {
    type: String,
    required: [true, "Mother's contact number is required."],
    match: [
      /^\d{10}$/,
      "Mother's contact number must be a valid 10-digit number.",
    ],
  },
});
const localGuradianSchema = new Schema<TLocalGuardian>({
  name: {
    type: String,
    required: [true, "Local guardian's name is required."],
    trim: true,
    minlength: [2, 'Name must be at least 2 characters long.'],
    maxlength: [100, 'Name cannot exceed 100 characters.'],
  },
  occupation: {
    type: String,
    required: [true, "Local guardian's occupation is required."],
    trim: true,
    minlength: [2, 'Occupation must be at least 2 characters long.'],
    maxlength: [100, 'Occupation cannot exceed 100 characters.'],
  },
  contactNo: {
    type: String,
    required: [true, "Local guardian's contact number is required."],
    match: [/^\d{10}$/, 'Contact number must be a valid 10-digit number.'],
  },
  address: {
    type: String,
    required: [true, "Local guardian's address is required."],
    trim: true,
    minlength: [5, 'Address must be at least 5 characters long.'],
    maxlength: [255, 'Address cannot exceed 255 characters.'],
  },
});

const studentSchema = new Schema<TStudent, StudentModel>(
  {
    id: {
      type: String,
      required: [true, 'Student ID is required.'],
      trim: true,
    },
    password: {
      type: String,
      required: [true, 'Password is required.'],
      unique: true,
      trim: true,
    },
    name: {
      type: userNameSchema,
      required: [true, 'Student name is required.'],
    },
    gender: {
      type: String,
      enum: {
        values: ['male', 'female', 'other'],
        message:
          '{VALUE} is not a valid gender. Allowed values are male, female, or other.',
      },
    },
    dateOfBirth: {
      type: String,
      validate: {
        validator: function (value: string) {
          return /^\d{4}-\d{2}-\d{2}$/.test(value); // YYYY-MM-DD format
        },
        message: (props) =>
          `${props.value} is not a valid date of birth format. Use YYYY-MM-DD.`,
      },
    },
    email: {
      type: String,
      required: [true, 'Email address is required.'],
      unique: true,
      validate: {
        validator: function (value: string) {
          return /^\S+@\S+\.\S+$/.test(value); // Basic email validation
        },
        message: (props) => `${props.value} is not a valid email address.`,
      },
    },
    contactNo: {
      type: String,
      required: [true, 'Contact number is required.'],
      validate: {
        validator: function (value: string) {
          return /^\d{10}$/.test(value); // Validates 10-digit phone numbers
        },
        message: (props) =>
          `${props.value} is not a valid contact number. Must be 10 digits.`,
      },
    },
    emergencyContactNo: {
      type: String,
      required: [true, 'Emergency contact number is required.'],
      validate: {
        validator: function (value: string) {
          return /^\d{10}$/.test(value); // Validates 10-digit phone numbers
        },
        message: (props) =>
          `${props.value} is not a valid emergency contact number. Must be 10 digits.`,
      },
    },
    bloodGroup: {
      type: String,
      enum: {
        values: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
        message:
          '{VALUE} is not a valid blood group. Allowed values are A+, A-, B+, B-, AB+, AB-, O+, or O-.',
      },
    },
    presentAddress: {
      type: String,
      required: [true, 'Present address is required.'],
      trim: true,
    },
    permanentAddress: {
      type: String,
      required: [true, 'Permanent address is required.'],
      trim: true,
    },
    guardian: {
      type: guardianSchema,
      required: [true, 'Guardian information is required.'],
    },
    localGuardian: {
      type: localGuradianSchema,
      required: [true, 'Local guardian information is required.'],
    },
    profileImage: {
      type: String,
      validate: {
        validator: function (value: string) {
          return /^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|svg))$/.test(value); // Validates image URLs
        },
        message: (props) => `${props.value} is not a valid profile image URL.`,
      },
    },
    isActive: {
      type: String,
      enum: {
        values: ['active', 'blocked'],
        message:
          '{VALUE} is not a valid status. Allowed values are active or blocked.',
      },
      default: 'active',
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);

//virtual
studentSchema.virtual('fullName').get(function () {
  return `${this.name.firstName} ${this.name.middleName} ${this.name.lastName}`;
});

//Middleare

//Document middleware
studentSchema.pre('save', async function (next) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this;
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_round)
  );

  next();
});
studentSchema.post('save', function (doc, next) {
  doc.password = '';
  next();
});

//Query middleware
studentSchema.pre('find', async function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});
studentSchema.pre('aggregate', function (next) {
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
  next();
});

//Custom Static Method
studentSchema.statics.isStudentExists = async function (id: string) {
  const existingUser = await Student.findOne({ id });
  return existingUser;
};

//Custom instance method.
/* studentSchema.methods.isStudentExists = async function (id: string) {
  const existingUser = await Student.findOne({ id });
  return existingUser;
}; */

export const Student = model<TStudent, StudentModel>('Student', studentSchema);
