"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StudentModel = void 0;
const mongoose_1 = require("mongoose");
const userNameSchema = new mongoose_1.Schema({
    firstName: { type: String, required: true },
    middleName: { type: String },
    lastName: { type: String, required: true },
});
const guardianSchema = new mongoose_1.Schema({
    fathersName: { type: String, required: true },
    fathersOccupation: { type: String, required: true },
    fathersContactNo: { type: String, required: true },
    mothersName: { type: String, required: true },
    mothersOccupation: { type: String, required: true },
    mothersContactNo: { type: String, required: true },
});
const localGuardianSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    occupation: { type: String, required: true },
    contactNo: { type: String, required: true },
    address: { type: String, required: true },
});
const studentSchema = new mongoose_1.Schema({
    id: { type: String },
    name: userNameSchema,
    gender: ['Male', 'Female'],
    dateOfBirth: { type: String },
    email: { type: String, required: true },
    contactNo: { type: String },
    emergencyContactNo: { type: String },
    bloodGroup: ['A+', 'A-', 'AB+', 'AB-', 'B+', 'B-', 'O+', 'O-'],
    presentAddress: { type: String, required: true },
    permanentAddress: { type: String, required: true },
    guardian: guardianSchema,
    localGuardian: localGuardianSchema,
    image: { type: String },
    isActive: ['active', 'inactive'],
});
exports.StudentModel = (0, mongoose_1.model)('Student', studentSchema);
