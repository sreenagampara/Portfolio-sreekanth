import Skill from '../models/Skill.js';
import mongoose from 'mongoose';

export const getSkills = async (req, res) => {
    try {
        const skills = await Skill.find({});
        res.json(skills);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const createSkill = async (req, res) => {
    const { name, icon, items } = req.body;

    if (!name || !icon) {
        return res.status(400).json({ message: 'Name and Icon are required' });
    }

    try {
        const skill = await Skill.create({
            name,
            icon,
            items: items ? items.split(',').map(item => item.trim()) : [],
        });
        res.status(201).json(skill);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateSkill = async (req, res) => {
    const { name, icon, items } = req.body;

    try {
        const skill = await Skill.findById(req.params.id);

        if (skill) {
            skill.name = name || skill.name;
            skill.icon = icon || skill.icon;
            skill.items = items ? items.split(',').map(item => item.trim()) : skill.items;

            const updatedSkill = await skill.save();
            res.json(updatedSkill);
        } else {
            res.status(404).json({ message: 'Skill not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const deleteSkill = async (req, res) => {
    try {
        const skill = await Skill.findById(req.params.id);

        if (skill) {
            await skill.deleteOne();
            res.json({ message: 'Skill removed' });
        } else {
            res.status(404).json({ message: 'Skill not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
