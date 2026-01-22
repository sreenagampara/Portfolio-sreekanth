import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';
import { Plus, Trash2, Edit2, Save, Upload, Link as LinkIcon, Github } from 'lucide-react';

const ManageProjects = () => {
    const { user } = useContext(AuthContext);
    const [projects, setProjects] = useState([]);
    const [editingId, setEditingId] = useState(null);
    const [isAdding, setIsAdding] = useState(false);

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        technologies: '',
        link: '',
        github: ''
    });
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState(null);

    const fetchProjects = async () => {
        try {
            const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/api/projects`);
            setProjects(data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchProjects();
    }, []);

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this project?')) {
            try {
                await axios.delete(`${import.meta.env.VITE_API_URL}/api/projects/${id}`, {
                    headers: { Authorization: `Bearer ${user.token}` }
                });
                fetchProjects();
            } catch (error) {
                console.error(error);
            }
        }
    };

    const handleEdit = (project) => {
        setEditingId(project._id);
        setIsAdding(false);
        setFormData({
            title: project.title,
            description: project.description,
            technologies: project.technologies.join(', '),
            link: project.link || '',
            github: project.github || ''
        });
        setPreview(project.image);
        setImage(null);
    };

    const handleCancel = () => {
        setEditingId(null);
        setIsAdding(false);
        setFormData({ title: '', description: '', technologies: '', link: '', github: '' });
        setPreview(null);
        setImage(null);
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setImage(file);
        setPreview(URL.createObjectURL(file));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const form = new FormData();
        form.append('title', formData.title);
        form.append('description', formData.description);
        form.append('technologies', formData.technologies);
        form.append('link', formData.link);
        form.append('github', formData.github);
        if (image) {
            form.append('image', image);
        }

        try {
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${user.token}`,
                },
            };

            if (editingId) {
                await axios.put(`${import.meta.env.VITE_API_URL}/api/projects/${editingId}`, form, config);
            } else {
                await axios.post(`${import.meta.env.VITE_API_URL}/api/projects`, form, config);
            }

            fetchProjects();
            handleCancel();
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="max-w-6xl mx-auto">
            <div className="flex justify-between items-center mb-8">
                <h2 className="text-3xl font-bold">Manage Projects</h2>
                {!isAdding && !editingId && (
                    <button
                        onClick={() => setIsAdding(true)}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center"
                    >
                        <Plus className="w-5 h-5 mr-2" /> Add Project
                    </button>
                )}
            </div>

            {(isAdding || editingId) && (
                <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 mb-8">
                    <h3 className="text-xl font-bold mb-4">{editingId ? 'Edit Project' : 'Add New Project'}</h3>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-gray-400 mb-2">Title</label>
                                <input
                                    type="text"
                                    value={formData.title}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                    className="w-full bg-gray-900 border border-gray-700 rounded px-4 py-2 text-white"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-gray-400 mb-2">Technologies (comma separated)</label>
                                <input
                                    type="text"
                                    value={formData.technologies}
                                    onChange={(e) => setFormData({ ...formData, technologies: e.target.value })}
                                    className="w-full bg-gray-900 border border-gray-700 rounded px-4 py-2 text-white"
                                    placeholder="React, Tailwind, Node.js"
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-gray-400 mb-2">Description</label>
                            <textarea
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                rows="3"
                                className="w-full bg-gray-900 border border-gray-700 rounded px-4 py-2 text-white"
                                required
                            />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-gray-400 mb-2">Live Link</label>
                                <input
                                    type="text"
                                    value={formData.link}
                                    onChange={(e) => setFormData({ ...formData, link: e.target.value })}
                                    className="w-full bg-gray-900 border border-gray-700 rounded px-4 py-2 text-white"
                                />
                            </div>
                            <div>
                                <label className="block text-gray-400 mb-2">GitHub Link</label>
                                <input
                                    type="text"
                                    value={formData.github}
                                    onChange={(e) => setFormData({ ...formData, github: e.target.value })}
                                    className="w-full bg-gray-900 border border-gray-700 rounded px-4 py-2 text-white"
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-gray-400 mb-2">Project Image</label>
                            <div className="flex items-center space-x-4">
                                {preview && (
                                    <img src={preview} alt="Preview" className="w-32 h-20 rounded-lg object-cover bg-gray-700" />
                                )}
                                <label className="cursor-pointer bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-lg transition-colors flex items-center">
                                    <Upload className="w-4 h-4 mr-2" />
                                    Choose File
                                    <input type="file" className="hidden" onChange={handleFileChange} />
                                </label>
                            </div>
                        </div>
                        <div className="flex justify-end space-x-3">
                            <button
                                type="button"
                                onClick={handleCancel}
                                className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center"
                            >
                                <Save className="w-4 h-4 mr-2" /> Save
                            </button>
                        </div>
                    </form>
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {projects.map((project) => (
                    <div key={project._id} className="bg-gray-900 rounded-xl overflow-hidden border border-gray-700 flex flex-col">
                        <div className="h-48 overflow-hidden bg-gray-800 relative">
                            {project.image ? (
                                <img src={project.image} alt={project.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-gray-600">No Image</div>
                            )}
                            <div className="absolute top-2 right-2 flex space-x-2">
                                <button onClick={() => handleEdit(project)} className="p-2 bg-gray-900/80 rounded-full text-blue-500 hover:bg-blue-600 hover:text-white transition-colors">
                                    <Edit2 className="w-4 h-4" />
                                </button>
                                <button onClick={() => handleDelete(project._id)} className="p-2 bg-gray-900/80 rounded-full text-red-500 hover:bg-red-600 hover:text-white transition-colors">
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                        <div className="p-6 flex-1 flex flex-col">
                            <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                            <p className="text-gray-400 mb-4 line-clamp-3 flex-1">{project.description}</p>
                            <div className="flex flex-wrap gap-2 mb-4">
                                {project.technologies.map((tech, index) => (
                                    <span key={index} className="text-xs bg-gray-800 border border-gray-700 px-2 py-1 rounded">
                                        {tech}
                                    </span>
                                ))}
                            </div>
                            <div className="flex gap-4">
                                <a href={project.github} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white"><Github className="w-5 h-5" /></a>
                                <a href={project.link} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white"><LinkIcon className="w-5 h-5" /></a>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ManageProjects;
