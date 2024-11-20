import { TStudent } from './student.interface';
import { Student } from './student.model';

const createStudentToDB = async (studentData: TStudent) => {
  if (await Student.isStudentExists(studentData.id)) {
    throw new Error('User already exists!!!');
  }
  const result = await Student.create(studentData);
  //Implement custom instance method.
  /* const student = new Student(studentData);
  if (await student.isStudentExists(studentData.id)) {
    throw new Error('User already exists!');
  }
  const result = student.save(); */
  return result;
};

const getAllStudentsFromDB = async () => {
  const result = await Student.find({});
  return result;
};

const getSingleStudentFromDB = async (id: string) => {
  const result = await Student.aggregate([{ $match: { id } }]);
  return result;
};

const deleteStudentFromDB = async (id: string) => {
  const result = await Student.updateOne({ id }, { isDeleted: true });
  return result;
};

export const StudentServices = {
  createStudentToDB,
  getAllStudentsFromDB,
  getSingleStudentFromDB,
  deleteStudentFromDB,
};
