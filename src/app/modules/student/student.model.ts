import { Schema, model } from 'mongoose';
import {
  TGuardian,
  TLocalGuardian,
  TStudent,
  StudentModel,
  TUserName,
} from './student.interface';
import validator from 'validator';
import bcrypt from 'bcrypt';
import config from '../../config';

const userNameSchema = new Schema<TUserName>({
  firstName: {
    type: String,
    required: [true, 'First name is required.'],
    maxlength: [30, 'First name cannot exceed 30 characters.'],
    trim: true,
    match: [/^[A-Z][a-z]*$/, 'First name must be capitalized.'],
  },
  middleName: {
    type: String,
    trim: true,
    maxlength: [30, 'Middle name cannot exceed 30 characters.'],
  },
  lastName: {
    type: String,
    required: [true, 'Last name is required.'],
    trim: true,
    maxlength: [50, 'Last name cannot exceed 50 characters.'],
    validate: {
      validator: (value: string) => {
        return validator.isAlpha(value);
      },
      message: 'Last name must contain only alphabetic characters.',
    },
  },
});

const guardianSchema = new Schema<TGuardian>({
  fathersName: {
    type: String,
    required: [true, "Father's name is required."],
  },
  fathersOccupation: {
    type: String,
    required: [true, "Father's occupation is required."],
  },
  fathersContactNo: {
    type: String,
    required: [true, "Father's contact number is required."],
  },
  mothersName: {
    type: String,
    required: [true, "Mother's name is required."],
  },
  mothersOccupation: {
    type: String,
    required: [true, "Mother's occupation is required."],
  },
  mothersContactNo: {
    type: String,
    required: [true, "Mother's contact number is required."],
  },
});

const localGuardianSchema = new Schema<TLocalGuardian>({
  name: {
    type: String,
    required: [true, "Local guardian's name is required."],
  },
  occupation: {
    type: String,
    required: [true, "Local guardian's occupation is required."],
  },
  contactNo: {
    type: String,
    required: [true, "Local guardian's contact number is required."],
  },
  address: {
    type: String,
    required: [true, "Local guardian's address is required."],
  },
});

const studentSchema = new Schema<TStudent, StudentModel>(
  {
    id: {
      type: String,
      required: [true, 'Student ID is required.'],
      unique: true,
      maxlength: 8,
    },
    password: {
      type: String,
      required: [true, 'Password is required.'],
      maxlength: 20,
    },
    name: {
      type: userNameSchema,
      required: [true, 'Name is required.'],
      _id: false,
    },
    gender: {
      type: String,
      enum: {
        values: ['Male', 'Female', 'Others'],
        message:
          'Invalid gender: {VALUE}. Please choose Male, Female, or Others.',
      },
      required: [true, 'Gender is required.'],
    },
    dateOfBirth: {
      type: String,
      required: [true, 'Date of birth is required.'],
    },
    email: {
      type: String,
      required: [true, 'Email is required.'],
      unique: true,
    },
    contactNo: {
      type: String,
      required: [true, 'Contact number is required.'],
    },
    emergencyContactNo: {
      type: String,
      required: [true, 'Emergency contact number is required.'],
    },
    bloodGroup: {
      type: String,
      enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
    },
    presentAddress: {
      type: String,
      required: [true, 'Present address is required.'],
    },
    permanentAddress: {
      type: String,
      required: [true, 'Permanent address is required.'],
    },
    guardian: {
      type: guardianSchema,
      required: [true, 'Guardian information is required.'],
      _id: false,
    },
    localGuardian: {
      type: localGuardianSchema,
      required: [true, 'Local guardian information is required.'],
      _id: false,
    },
    image: {
      type: String,
      required: [true, 'Image URL is required.'],
    },
    isActive: {
      type: String,
      enum: ['active', 'blocked'],
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
  },
);

//Virtual
studentSchema.virtual('fullName').get(function () {
  return `${this.name.firstName} ${this.name.middleName} ${this.name.lastName}`;
});

//pre save middleware
studentSchema.pre('save', async function (next) {
  // const user = this;
  this.password = await bcrypt.hash(
    this.password,
    Number(config.bcrypt_salt_rounds),
  );
  next();
});

studentSchema.post('save', function (docs, next) {
  docs.password = '';
  next();
});

//query middleware
studentSchema.pre('find', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});
studentSchema.pre('findOne', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});
studentSchema.pre('aggregate', function (next) {
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
  next();
});

// studentSchema.methods.isUserExists = async function (id: string) {
//   const existingUser = await Student.findOne({ id });
//   return existingUser;
// };

//for static
studentSchema.statics.isUserExists = async function (id: string) {
  const existingUser = await Student.findOne({ id });
  return existingUser;
};

export const Student = model<TStudent, StudentModel>('Student', studentSchema);
