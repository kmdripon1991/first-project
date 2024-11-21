import { Request, Response } from 'express';
import { StudentServices } from './student.service';
import studentValidationSchema from './student.validation';

const createStudent = async (req: Request, res: Response) => {
  try {
    const { student: studentData } = req.body;

    // data validation using Joy Schema
    // const { error, value } = studentValidationSchema.validate(studentData);
    // const data = await StudentServices.createStudentIntoDB(value);

    // data validation using Zod

    const zodParseData = studentValidationSchema.parse(studentData);

    const data = await StudentServices.createStudentIntoDB(zodParseData);

    // if (error) {
    //   res.status(500).json({
    //     status: false,
    //     message: 'Schema Validation Error',
    //     error,
    //   });
    // }

    res.status(200).json({
      status: true,
      message: 'Student created successfully',
      result: data,
    });
  } catch (err: any) {
    res.status(500).json({
      status: false,
      message: err.message || 'Something went wrong',
      error: err,
    });
  }
};

const getAllStudents = async (req: Request, res: Response) => {
  try {
    const result = await StudentServices.getAllStudentsFromDB();
    res.status(200).json({
      status: true,
      message: 'Students retrieve successfully',
      result: result,
    });
  } catch (err: any) {
    res.status(500).json({
      status: true,
      message: err.message || 'Student Data not Found',
      error: err,
    });
  }
};

const singleStudent = async (req: Request, res: Response) => {
  try {
    const { studentId } = req.params;
    const result = await StudentServices.getSingleStudentFromDB(studentId);
    res.status(200).json({
      status: true,
      message: 'Student is retrieve successfully',
      result: result,
    });
  } catch (err: any) {
    res.status(500).json({
      status: true,
      message: err.message || 'Student is retrieve successfully',
      error: err,
    });
  }
};

const deleteStudent = async (req: Request, res: Response) => {
  try {
    const { studentId } = req.params;
    const result = await StudentServices.deleteStudentFromDB(studentId);
    res.status(200).json({
      status: true,
      message: 'Student is deleted successfully',
      result: result,
    });
  } catch (err: any) {
    res.status(500).json({
      status: false,
      message: err.message || 'Something went wrong',
      error: err,
    });
  }
};

export const StudentControllers = {
  createStudent,
  getAllStudents,
  singleStudent,
  deleteStudent,
};
