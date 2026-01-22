import express from 'express';
import { sendContact, getMessages } from '../controllers/contactController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', sendContact);
router.get('/', protect, getMessages);

export default router;
