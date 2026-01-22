import express from 'express';
import { authAdmin, updateAdminCredentials, createInitialAdmin } from '../controllers/adminController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/login', authAdmin);
router.put('/update', protect, updateAdminCredentials);
router.post('/seed', createInitialAdmin);

export default router;
