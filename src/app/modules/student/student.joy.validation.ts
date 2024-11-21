import Joi from 'joi';

const userNameValidationSchema = Joi.object({
  firstName: Joi.string()
    .required()
    .max(30)
    .trim()
    .regex(/^[A-Z][a-z]*$/, 'capitalize')
    .messages({
      'string.pattern.name': 'First name must be capitalized.',
    }),
  middleName: Joi.string().max(30).trim().optional(),
  lastName: Joi.string()
    .required()
    .max(50)
    .trim()
    .regex(/^[A-Za-z]+$/, 'alpha')
    .messages({
      'string.pattern.name':
        'Last name must contain only alphabetic characters.',
    }),
});

const guardianValidationSchema = Joi.object({
  fathersName: Joi.string().required(),
  fathersOccupation: Joi.string().required(),
  fathersContactNo: Joi.string().required(),
  mothersName: Joi.string().required(),
  mothersOccupation: Joi.string().required(),
  mothersContactNo: Joi.string().required(),
});

const localGuardianValidationSchema = Joi.object({
  name: Joi.string().required(),
  occupation: Joi.string().required(),
  contactNo: Joi.string().required(),
  address: Joi.string().required(),
});

const studentValidationSchema = Joi.object({
  id: Joi.string().required().max(8),
  name: userNameValidationSchema.required(),
  gender: Joi.string().valid('Male', 'Female', 'Others').required().messages({
    'any.only':
      'Invalid gender: {VALUE}. Please choose Male, Female, or Others.',
  }),
  dateOfBirth: Joi.string().required(),
  email: Joi.string().email().required(),
  contactNo: Joi.string().required(),
  emergencyContactNo: Joi.string().required(),
  bloodGroup: Joi.string()
    .valid('A+', 'A-', 'AB+', 'AB-', 'B+', 'B-', 'O+', 'O-')
    .optional(),
  presentAddress: Joi.string().required(),
  permanentAddress: Joi.string().required(),
  guardian: guardianValidationSchema.required(),
  localGuardian: localGuardianValidationSchema.required(),
  image: Joi.string().required(),
  isActive: Joi.string().valid('active', 'blocked').default('active'),
});

export default studentValidationSchema;
