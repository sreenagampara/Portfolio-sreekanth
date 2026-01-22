import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';
import { Mail, Calendar } from 'lucide-react';

const ViewMessages = () => {
    const { user } = useContext(AuthContext);
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/api/contact`, {
                    headers: { Authorization: `Bearer ${user.token}` }
                });
                setMessages(data);
            } catch (error) {
                console.error(error);
            }
        };

        if (user) fetchMessages();
    }, [user]);

    return (
        <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold mb-8">Messages ({messages.length})</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {messages.map((msg) => (
                    <div key={msg._id} className="bg-gray-800 p-6 rounded-xl border border-gray-700">
                        <div className="flex justify-between items-start mb-4 border-b border-gray-700 pb-4">
                            <div>
                                <h3 className="text-lg font-bold text-blue-500">{msg.name}</h3>
                                <div className="flex items-center text-gray-400 text-sm mt-1">
                                    <Mail className="w-4 h-4 mr-2" />
                                    <a href={`mailto:${msg.email}`} className="hover:text-white transition-colors">{msg.email}</a>
                                </div>
                            </div>
                            <div className="flex items-center text-gray-500 text-xs">
                                <Calendar className="w-3 h-3 mr-1" />
                                {new Date(msg.createdAt).toLocaleDateString()}
                            </div>
                        </div>
                        <p className="text-gray-300 whitespace-pre-wrap">{msg.message}</p>
                    </div>
                ))}
                {messages.length === 0 && <p className="text-gray-500">No messages yet.</p>}
            </div>
        </div>
    );
};

export default ViewMessages;
