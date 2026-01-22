import Project from '../models/Project.js';
import mongoose from 'mongoose';

// Get all projects
export const getProjects = async (req, res) => {
    try {
        const projects = await Project.find({}).sort({ createdAt: -1 });
        res.json(projects);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Create a project
export const createProject = async (req, res) => {
    const { title, description, technologies, link, github } = req.body;

    // Image comes from Cloudinary (req.file.path)
    const image = req.file ? req.file.path : '';

    if (!title || !description || !image) {
        return res.status(400).json({ message: 'Please fill in all fields' });
    }

    try {
        const project = await Project.create({
            title,
            description,
            image,
            technologies: technologies ? technologies.split(',').map(tech => tech.trim()) : [],
            link,
            github,
        });
        res.status(201).json(project);
    } catch (error) {
        res.status(500).json({ message: error.message });
        console.log(error);
    }
};

// Update a project
export const updateProject = async (req, res) => {
    const { title, description, technologies, link, github } = req.body;

    try {
        const project = await Project.findById(req.params.id);

        if (project) {
            project.title = title || project.title;
            project.description = description || project.description;
            // Only update image if a new file is uploaded
            if (req.file) {
                project.image = req.file.path;
            }
            project.technologies = technologies ? technologies.split(',').map(tech => tech.trim()) : project.technologies;
            project.link = link || project.link;
            project.github = github || project.github;

            const updatedProject = await project.save();
            res.json(updatedProject);
        } else {
            res.status(404).json({ message: 'Project not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete a project
export const deleteProject = async (req, res) => {
    try {
        const project = await Project.findById(req.params.id);

        if (project) {
            await project.deleteOne();
            res.json({ message: 'Project removed' });
        } else {
            res.status(404).json({ message: 'Project not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
