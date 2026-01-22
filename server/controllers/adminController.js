import Admin from '../models/Admin.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    });
};

// @desc    Auth admin & get token
// @route   POST /api/admin/login
// @access  Public
export const authAdmin = async (req, res) => {
    const { username, password } = req.body;

    const admin = await Admin.findOne({ username });

    if (admin && (await admin.matchPassword(password))) {
        res.json({
            _id: admin._id,
            username: admin.username,
            token: generateToken(admin._id),
        });
    } else {
        res.status(401).json({ message: 'Invalid username or password' });
    }
};

// @desc    Update admin credentials
// @route   PUT /api/admin/update
// @access  Private
export const updateAdminCredentials = async (req, res) => {
    const admin = await Admin.findById(req.admin._id);

    if (admin) {
        admin.username = req.body.username || admin.username;
        if (req.body.password) {
            admin.password = req.body.password;
        }

        const updatedAdmin = await admin.save();

        res.json({
            _id: updatedAdmin._id,
            username: updatedAdmin.username,
            token: generateToken(updatedAdmin._id),
        });
    } else {
        res.status(404).json({ message: 'Admin not found' });
    }
};

// @desc    Create initial admin (seeder)
// @route   POST /api/admin/seed
// @access  Public (Should be protected or removed in prod)
export const createInitialAdmin = async (req, res) => {
    try {
        const existingAdmin = await Admin.findOne({ username: 'admin' });
        if (existingAdmin) {
            return res.status(400).json({ message: 'Admin already exists' });
        }

        const admin = await Admin.create({
            username: 'admin',
            password: 'password123', // Default password
        });

        res.status(201).json({
            _id: admin._id,
            username: admin.username,
            token: generateToken(admin._id),
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
