import { Request, Response } from 'express';
import { StudentServices } from './student.service';

const createStudent = async (req: Request, res: Response) => {
  try {
    const { student: studentData } = req.body;

    const data = await StudentServices.createStudentIntoDB(studentData);

    res.status(200).json({
      status: true,
      message: 'Student created successfully',
      result: data,
    });
  } catch (error) {
    console.log(error);
  }
};

const getAllStudents = async (req: Request, res: Response) => {
  try {
    const result = await StudentServices.getAllStudentsFromDB();
    res.status(200).json({
      status: true,
      message: 'Students retrive successfully',
      result: result,
    });
  } catch (error) {
    console.log(error);
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
  } catch (error) {
    console.log(error);
  }
};

export const StudentControllers = {
  createStudent,
  getAllStudents,
  singleStudent,
};
