import { TStudent } from './student.interface';
import { Student } from './student.model';

const createStudentToDB = async (studentData: TStudent) => {
  // const result = await Student.create(student);
  const student = new Student(studentData);
  if (await student.isStudentExists(studentData.id)) {
    throw new Error('User already exists!');
  }
  const result = student.save();
  return result;
};

const getAllStudentsFromDB = async () => {
  const result = Student.find();
  return result;
};

const getSingleStudentFromDB = async (id: string) => {
  const result = Student.findById(id);
  return result;
};

export const StudentServices = {
  createStudentToDB,
  getAllStudentsFromDB,
  getSingleStudentFromDB,
};
