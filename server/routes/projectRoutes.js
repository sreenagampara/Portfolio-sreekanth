import express from "express";
import { getProjects, createProject, updateProject, deleteProject } from "../controllers/projectController.js";
import { protect } from '../middleware/authMiddleware.js';
import multer from 'multer';
import { storage } from '../config/cloudinary.js';

const router = express.Router();
const upload = multer({ storage });

router.get('/', getProjects);
router.post('/', protect, upload.single('image'), createProject);
router.put('/:id', protect, upload.single('image'), updateProject);
router.delete('/:id', protect, deleteProject);

export default router;
