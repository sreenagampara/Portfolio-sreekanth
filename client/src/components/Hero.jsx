import React from 'react';
import { motion } from 'framer-motion';

const Hero = () => {
    const text = "Full Stack Developer";

    return (
        <section className="h-screen flex items-center justify-center bg-gray-900 text-white">
            <div className="text-center">
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-5xl md:text-7xl font-bold mb-4"
                >
                    Hi, I'm <span className="text-blue-500">Sreekanth</span>
                </motion.h1>
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                    className="text-2xl md:text-4xl text-gray-400 h-12"
                >
                    {text.split("").map((char, index) => (
                        <motion.span
                            key={index}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5 + index * 0.1 }}
                        >
                            {char}
                        </motion.span>
                    ))}
                </motion.div>
                <motion.a
                    href="#contact"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="mt-8 inline-block bg-blue-600 px-8 py-3 rounded-full text-lg font-semibold hover:bg-blue-700 transition-colors"
                >
                    Get in touch
                </motion.a>
            </div>
        </section>
    );
};

export default Hero;
