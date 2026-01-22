import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import * as Icons from 'lucide-react';
import axios from 'axios';

const Skills = () => {
    const [skills, setSkills] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSkills = async () => {
            try {
                const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/skills`);
                setSkills(res.data);
            } catch (error) {
                console.error("Error fetching skills:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchSkills();
    }, []);

    if (loading) {
        return <div className="text-center py-20 bg-gray-800 text-white">Loading skills...</div>;
    }

    return (
        <section id="skills" className="py-20 bg-gray-800 text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.h2
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    className="text-4xl font-bold mb-12 text-center"
                >
                    Skills
                </motion.h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {skills.map((skill, index) => {
                        const IconComponent = Icons[skill.icon] || Icons.Code; // Fallback to Code icon
                        return (
                            <motion.div
                                key={skill._id || index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="bg-gray-900 p-6 rounded-xl hover:bg-gray-700 transition-colors border border-gray-700 hover:border-blue-500"
                            >
                                <IconComponent className="w-12 h-12 text-blue-500 mb-4" />
                                <h3 className="text-xl font-bold mb-4">{skill.name}</h3>
                                <ul className="space-y-2">
                                    {skill.items && skill.items.map((item, i) => (
                                        <li key={i} className="text-gray-400 flex items-center">
                                            <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default Skills;
