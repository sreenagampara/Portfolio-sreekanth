import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';
import { Plus, Trash2, Edit2, Save, X } from 'lucide-react';
import * as Icons from 'lucide-react';

const ManageSkills = () => {
    const { user } = useContext(AuthContext);
    const [skills, setSkills] = useState([]);
    const [editingId, setEditingId] = useState(null);
    const [formData, setFormData] = useState({ name: '', icon: '', items: '' });
    const [isAdding, setIsAdding] = useState(false);

    const fetchSkills = async () => {
        try {
            const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/api/skills`);
            setSkills(data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchSkills();
    }, []);

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this skill?')) {
            try {
                await axios.delete(`${import.meta.env.VITE_API_URL}/api/skills/${id}`, {
                    headers: { Authorization: `Bearer ${user.token}` }
                });
                fetchSkills();
            } catch (error) {
                console.error(error);
            }
        }
    };

    const handleEdit = (skill) => {
        setEditingId(skill._id);
        const iconName = skill.icon  // assuming backend returns icon name string
        setFormData({
            name: skill.name,
            icon: iconName,
            items: skill.items.join(', ')
        });
        setIsAdding(false);
    };

    const handleCancel = () => {
        setEditingId(null);
        setIsAdding(false);
        setFormData({ name: '', icon: '', items: '' });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${user.token}`,
                },
            };

            const payload = {
                ...formData,
                items: formData.items // Comma separated string, backend will split it
            };

            if (editingId) {
                await axios.put(`${import.meta.env.VITE_API_URL}/api/skills/${editingId}`, payload, config);
            } else {
                await axios.post(`${import.meta.env.VITE_API_URL}/api/skills`, payload, config);
            }

            fetchSkills();
            handleCancel();
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="max-w-6xl mx-auto">
            <div className="flex justify-between items-center mb-8">
                <h2 className="text-3xl font-bold">Manage Skills</h2>
                {!isAdding && !editingId && (
                    <button
                        onClick={() => setIsAdding(true)}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center"
                    >
                        <Plus className="w-5 h-5 mr-2" /> Add Skill
                    </button>
                )}
            </div>

            {(isAdding || editingId) && (
                <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 mb-8">
                    <h3 className="text-xl font-bold mb-4">{editingId ? 'Edit Skill' : 'Add New Skill'}</h3>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-gray-400 mb-2">Skill Category Name</label>
                                <input
                                    type="text"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className="w-full bg-gray-900 border border-gray-700 rounded px-4 py-2 text-white"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-gray-400 mb-2">Icon Name (Lucide React)</label>
                                <input
                                    type="text"
                                    value={formData.icon}
                                    onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                                    className="w-full bg-gray-900 border border-gray-700 rounded px-4 py-2 text-white"
                                    placeholder="e.g. Layout, Server, Database"
                                    required
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-gray-400 mb-2">Items (comma separated)</label>
                            <input
                                type="text"
                                value={formData.items}
                                onChange={(e) => setFormData({ ...formData, items: e.target.value })}
                                className="w-full bg-gray-900 border border-gray-700 rounded px-4 py-2 text-white"
                                placeholder="React, Node.js, MongoDB"
                                required
                            />
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
                {skills.map((skill) => {
                    const IconComponent = Icons[skill.icon] || Icons.Code;
                    return (
                        <div key={skill._id} className="bg-gray-800 p-6 rounded-xl border border-gray-700">
                            <div className="flex justify-between items-start mb-4">
                                <IconComponent className="w-8 h-8 text-blue-500" />
                                <div className="flex space-x-2">
                                    <button onClick={() => handleEdit(skill)} className="text-gray-400 hover:text-blue-500">
                                        <Edit2 className="w-5 h-5" />
                                    </button>
                                    <button onClick={() => handleDelete(skill._id)} className="text-gray-400 hover:text-red-500">
                                        <Trash2 className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>
                            <h3 className="text-xl font-bold mb-2">{skill.name}</h3>
                            <div className="flex flex-wrap gap-2">
                                {skill.items.map((item, index) => (
                                    <span key={index} className="bg-gray-700 text-xs px-2 py-1 rounded-full text-gray-300">
                                        {item}
                                    </span>
                                ))}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default ManageSkills;
