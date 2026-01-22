import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';
import { Code, FolderKanban, MessageSquare, Database } from 'lucide-react';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
    const { user } = useContext(AuthContext);
    const [stats, setStats] = useState({
        projects: 0,
        skills: 0,
        messages: 0,
    });

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const requests = [
                    axios.get(`${import.meta.env.VITE_API_URL}/api/projects`),
                    axios.get(`${import.meta.env.VITE_API_URL}/api/skills`)
                ];

                if (user && user.token) {
                    requests.push(
                        axios.get(`${import.meta.env.VITE_API_URL}/api/contact`, {
                            headers: { Authorization: `Bearer ${user.token}` }
                        })
                    );
                }

                const responses = await Promise.all(requests);
                const projRes = responses[0];
                const skillRes = responses[1];
                const msgRes = responses[2];

                setStats({
                    projects: projRes.data.length,
                    skills: skillRes.data.length,
                    messages: msgRes ? msgRes.data.length : 0
                });
            } catch (error) {
                console.error(error);
            }
        };
        fetchStats();
    }, [user]);

    const cards = [
        { title: 'Projects', count: stats.projects, icon: FolderKanban, link: '/admin/projects', color: 'bg-blue-600' },
        { title: 'Skills', count: stats.skills, icon: Database, link: '/admin/skills', color: 'bg-green-600' },
        { title: 'Messages', count: stats.messages, icon: MessageSquare, link: '/admin/messages', color: 'bg-purple-600' },
    ];

    return (
        <div>
            <h2 className="text-3xl font-bold mb-8">Dashboard Overview</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                {cards.map((card, index) => (
                    <Link key={index} to={card.link} className={`${card.color} p-6 rounded-xl hover:text-white text-blue-950 transition-opacity`}>
                        <div className="flex justify-between items-center">
                            <div>
                                <p className="text-lg font-semibold opacity-80">{card.title}</p>
                                <h3 className="text-4xl font-bold mt-2">{card.count}</h3>
                            </div>
                            <card.icon className="w-12 h-12 opacity-50" />
                        </div>
                    </Link>
                ))}
            </div>

            <div className="bg-gray-800 p-8 rounded-xl border border-gray-700">
                <h3 className="text-xl font-bold mb-4">Welcome Back, Admin</h3>
                <p className="text-gray-400">Use the sidebar to manage your portfolio content.</p>
            </div>
        </div>
    );
};

export default AdminDashboard;
