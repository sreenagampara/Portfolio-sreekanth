import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';
import { Save, Upload } from 'lucide-react';

const ManageAbout = () => {
    const { user } = useContext(AuthContext);
    const [formData, setFormData] = useState({
        description1: '',
        description2: '',
        education: '',
        experience: '',
    });
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState(null);
    const [message, setMessage] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAbout = async () => {
            try {
                const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/api/about`);
                setFormData({
                    description1: data.description1 || '',
                    description2: data.description2 || '',
                    education: data.education || '',
                    experience: data.experience || '',
                });
                if (data.image) setPreview(data.image);
                setLoading(false);
            } catch (error) {
                console.error(error);
                setLoading(false);
            }
        };
        fetchAbout();
    }, []);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setImage(file);
        setPreview(URL.createObjectURL(file));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage(null);

        const form = new FormData();
        form.append('description1', formData.description1);
        form.append('description2', formData.description2);
        form.append('education', formData.education);
        form.append('experience', formData.experience);
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

            await axios.put(`${import.meta.env.VITE_API_URL}/api/about`, form, config);
            setMessage({ type: 'success', text: 'About section updated successfully!' });
        } catch (error) {
            setMessage({
                type: 'error',
                text: error.response && error.response.data.message ? error.response.data.message : error.message
            });
        }
    };

    if (loading) return <div>Loading...</div>;

    return (
        <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8">Manage About Me</h2>

            {message && (
                <div className={`p-4 rounded mb-6 ${message.type === 'success' ? 'bg-green-500/20 text-green-500' : 'bg-red-500/20 text-red-500'}`}>
                    {message.text}
                </div>
            )}

            <form onSubmit={handleSubmit} className="bg-gray-800 p-6 rounded-xl border border-gray-700 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-6">
                        <div>
                            <label className="block text-gray-400 mb-2">Description Paragraph 1</label>
                            <textarea
                                value={formData.description1}
                                onChange={(e) => setFormData({ ...formData, description1: e.target.value })}
                                rows="4"
                                className="w-full bg-gray-900 border border-gray-700 rounded px-4 py-2 text-white focus:outline-none focus:border-blue-500"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-400 mb-2">Description Paragraph 2</label>
                            <textarea
                                value={formData.description2}
                                onChange={(e) => setFormData({ ...formData, description2: e.target.value })}
                                rows="4"
                                className="w-full bg-gray-900 border border-gray-700 rounded px-4 py-2 text-white focus:outline-none focus:border-blue-500"
                            />
                        </div>
                    </div>
                    <div className="space-y-6">
                        <div>
                            <label className="block text-gray-400 mb-2">Education</label>
                            <input
                                type="text"
                                value={formData.education}
                                onChange={(e) => setFormData({ ...formData, education: e.target.value })}
                                className="w-full bg-gray-900 border border-gray-700 rounded px-4 py-2 text-white focus:outline-none focus:border-blue-500"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-400 mb-2">Experience</label>
                            <input
                                type="text"
                                value={formData.experience}
                                onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                                className="w-full bg-gray-900 border border-gray-700 rounded px-4 py-2 text-white focus:outline-none focus:border-blue-500"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-400 mb-2">Profile Image</label>
                            <div className="flex items-center space-x-4">
                                {preview && (
                                    <img src={preview} alt="Preview" className="w-20 h-20 rounded-lg object-cover" />
                                )}
                                <label className="cursor-pointer bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-lg transition-colors flex items-center">
                                    <Upload className="w-4 h-4 mr-2" />
                                    Choose File
                                    <input type="file" className="hidden" onChange={handleFileChange} />
                                </label>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex justify-end">
                    <button
                        type="submit"
                        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg transition-colors flex items-center"
                    >
                        <Save className="w-5 h-5 mr-2" />
                        Save Changes
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ManageAbout;
