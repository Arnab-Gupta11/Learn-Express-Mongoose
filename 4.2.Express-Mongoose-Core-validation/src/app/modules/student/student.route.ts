import express from 'express';
import { StudentControllers } from './student.controller';

const router = express.Router();

router.route('/create-student').post(StudentControllers.createStudent);
router.get('/', StudentControllers.getAllStudents);
router
  .route('/:studentId')
  .get(StudentControllers.getSingleStudent)
  .put(StudentControllers.deleteSingleStudent);

export const StudentRoutes = router;
