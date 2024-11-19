import { Student } from './student.interface';
import { studentModel } from './student.model';

const createStudentToDB = async (student: Student) => {
  const result = await studentModel.create(student);
  return result;
};

const getAllStudentsFromDB = async () => {
  const result = studentModel.find();
  return result;
};

const getSingleStudentFromDB = async (id: string) => {
  const result = studentModel.findById(id);
  return result;
};

export const StudentServices = {
  createStudentToDB,
  getAllStudentsFromDB,
  getSingleStudentFromDB,
};
