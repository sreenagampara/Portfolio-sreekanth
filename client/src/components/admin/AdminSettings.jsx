import React, { useContext, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';

const AdminSettings = () => {
    const { user, updateCredentials } = useContext(AuthContext);
    const [username, setUsername] = useState(user.username);
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await updateCredentials(username, password);
        if (res.success) {
            setMessage({ type: 'success', text: 'Credentials updated successfully' });
            setPassword('');
        } else {
            setMessage({ type: 'error', text: res.message });
        }
    };

    return (
        <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8">Admin Settings</h2>

            <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
                <h3 className="text-xl font-bold mb-6">Update Credentials</h3>
                {message && (
                    <div className={`p-4 rounded mb-6 ${message.type === 'success' ? 'bg-green-500/20 text-green-500' : 'bg-red-500/20 text-red-500'}`}>
                        {message.text}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6 max-w-md">
                    <div>
                        <label className="block text-gray-400 mb-2">Username</label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full bg-gray-900 border border-gray-700 rounded px-4 py-2 text-white focus:outline-none focus:border-blue-500"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-400 mb-2">New Password (leave blank to keep current)</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full bg-gray-900 border border-gray-700 rounded px-4 py-2 text-white focus:outline-none focus:border-blue-500"
                            placeholder="New Password"
                        />
                    </div>
                    <button
                        type="submit"
                        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded transition-colors"
                    >
                        Update Credentials
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AdminSettings;
