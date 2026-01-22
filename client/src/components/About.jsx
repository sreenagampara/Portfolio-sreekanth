import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';

const About = () => {
    const [about, setAbout] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAbout = async () => {
            try {
                const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/about`);
                setAbout(res.data);
            } catch (error) {
                console.error("Error fetching about data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchAbout();
    }, []);

    if (loading) {
        return <div className="text-center py-20 bg-gray-900 text-white">Loading...</div>;
    }

    if (!about) {
        return <div className="text-center py-20 bg-gray-900 text-white">Something went wrong.</div>;
    }

    return (
        <section id="about" className="py-20 bg-gray-900 text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="flex flex-col md:flex-row items-center gap-12"
                >
                    <div className="flex-1">
                        <motion.h2
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            className="text-4xl font-bold mb-6 text-blue-500"
                        >
                            About Me
                        </motion.h2>
                        <p className="text-xl text-gray-300 mb-6 leading-relaxed">
                            {about.description1}
                        </p>
                        <p className="text-gray-400 mb-6 leading-relaxed">
                            {about.description2}
                        </p>
                        <div className="grid grid-cols-2 gap-4 text-gray-300">
                            <div>
                                <h4 className="font-bold text-white mb-2">Education</h4>
                                <p>{about.education}</p>
                            </div>
                            <div>
                                <h4 className="font-bold text-white mb-2">Experience</h4>
                                <p>{about.experience}</p>
                            </div>
                        </div>
                    </div>

                    <div className="flex-1 flex justify-center">
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            whileInView={{ scale: 1, opacity: 1 }}
                            transition={{ delay: 0.2, duration: 0.8 }} // Fix duration string
                            className="relative w-64 h-64 md:w-80 md:h-80 bg-blue-600 rounded-2xl rotate-3 hover:rotate-0 transition-transform duration-500 overflow-hidden"
                        >
                            {about.image ? (
                                <img src={about.image} alt="Profile" className="w-full h-full object-cover" />
                            ) : (
                                <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-purple-700 opacity-90 flex items-center justify-center">
                                    <span className="text-6xl font-bold text-white opacity-20">Me</span>
                                </div>
                            )}
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default About;
