import About from '../models/About.js';
import mongoose from 'mongoose';

export const getAbout = async (req, res) => {
    try {
        const aboutData = await About.findOne({});

        // If no data exists, return null or empty object, frontend handles it. 
        // Or create a default one if needed.
        if (!aboutData) {
            return res.json({});
        }

        res.json(aboutData);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateAbout = async (req, res) => {
    const { description1, description2, education, experience } = req.body;
    const image = req.file ? req.file.path : undefined;

    try {
        let about = await About.findOne({});

        if (about) {
            about.description1 = description1 || about.description1;
            about.description2 = description2 || about.description2;
            about.education = education || about.education;
            about.experience = experience || about.experience;
            if (image) {
                about.image = image;
            }
            const updatedAbout = await about.save();
            res.json(updatedAbout);
        } else {
            // Create if it doesn't exist
            const newAbout = await About.create({
                description1,
                description2,
                education,
                experience,
                image: image || '',
            });
            res.status(201).json(newAbout);
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
