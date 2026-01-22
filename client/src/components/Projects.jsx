import React, { useContext } from 'react';
import { ProjectContext } from '../context/ProjectContext';
import { motion } from 'framer-motion';
import { ExternalLink, Github } from 'lucide-react';

const Projects = () => {
    const { projects, loading } = useContext(ProjectContext);

    return (
        <section id="projects" className="py-20 bg-gray-900 text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.h2
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    className="text-4xl font-bold mb-12 text-center"
                >
                    Featured Projects
                </motion.h2>

                {loading ? (
                    <div className="text-center">Loading projects...</div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {projects.map((project, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                whileHover={{ y: -10 }}
                                transition={{ duration: 0.3 }}
                                className="bg-gray-800 rounded-xl overflow-hidden shadow-xl border border-gray-700"
                            >
                                <img src={project.image} alt={project.title} className="w-full h-48 object-cover" />
                                <div className="p-6">
                                    <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                                    <p className="text-gray-400 mb-4 h-20 overflow-hidden">{project.description}</p>
                                    <div className="flex flex-wrap gap-2 mb-6">
                                        {project.technologies.map((tech, i) => (
                                            <span key={i} className="bg-blue-900 text-blue-200 px-2 py-1 rounded text-xs">
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                    <div className="flex space-x-4">
                                        <a href={project.github} className="flex items-center text-gray-300 hover:text-white">
                                            <Github className="w-5 h-5 mr-1" /> Code
                                        </a>
                                        <a href={project.link} className="flex items-center text-blue-400 hover:text-blue-300">
                                            <ExternalLink className="w-5 h-5 mr-1" /> Live Demo
                                        </a>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
};

export default Projects;
