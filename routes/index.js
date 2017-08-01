import express from 'express';

import { register, login } from '../controllers/authentication/authenticationController';
import {
  getAllCourses,
  getCourseDetailsById,
  addCourse,
  updateCourseById,
  deleteCourseById
} from '../controllers/course/courseController';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);

router.get('/courses', getAllCourses);
router.get('/courses/:id', getCourseDetailsById);
router.post('/courses', addCourse);
router.put('/courses/:id', updateCourseById);
router.delete('/courses/:id', deleteCourseById);

export default router;
