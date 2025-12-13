import { useState, useEffect } from 'react';
import api from '../../api'; // Import the new api instance
import AdminLayout from '../../components/AdminLayout';
import ImageUpload from '../../components/ImageUpload';
import { Save, User, Lock, Mail, FileText } from 'lucide-react';

const Profile = () => {
    const [profile, setProfile] = useState({
        username: '',
        email: '',
        bio: '',
        avatar: '',
        password: '',
        newPassword: ''
    });
    const [loading, setLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [message, setMessage] = useState({ type: '', text: '' });

    useEffect(() => {
        fetchProfile();
    }, []);

    const fetchProfile = async () => {
        try {
            const res = await api.get('/auth/profile'); // Use the new api instance
            setProfile(p => ({ ...p, ...res.data }));
            setLoading(false);
        } catch (err) {
            console.error(err);
            setLoading(false);
        }
    };

    const handleSubmit = async () => {
        setIsSubmitting(true);
        setMessage({ type: '', text: '' });

        try {
            const payload = {
                bio: profile.bio,
                email: profile.email,
                avatar: profile.avatar
            };

            if (profile.newPassword) {
                payload.password = profile.newPassword;
            }

            await api.put('/auth/profile', payload); // Use the new api instance

            setMessage({ type: 'success', text: 'Profile updated successfully!' });
            setProfile(p => ({ ...p, newPassword: '' })); // Clear password field
        } catch (err) {
            const msg = err.response?.data?.message || 'Update failed';
            setMessage({ type: 'error', text: msg });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <AdminLayout>
            <div className="max-w-4xl mx-auto">
                <h1 className="text-2xl font-bold text-gray-900 mb-8">Profile Settings</h1>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Sidebar / Avatar */}
                    <div className="space-y-6">
                        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm text-center">
                            <div className="mb-4 flex justify-center">
                                <div className="w-32 h-32 rounded-full overflow-hidden bg-gray-100 border-4 border-white shadow-lg relative group">
                                    {profile.avatar ? (
                                        <img src={profile.avatar} alt="Profile" className="w-full h-full object-cover" />
                                    ) : (
                                        <User className="w-full h-full text-gray-300 p-6" />
                                    )}
                                </div>
                            </div>
                            <ImageUpload
                                label={profile.avatar ? "Change Photo" : "Upload Photo"}
                                onUpload={(url) => setProfile({ ...profile, avatar: url })}
                                // No preview needed here as we show it above, but ImageUpload might expect props
                                variant="minimal"
                            />
                            <h3 className="text-lg font-bold mt-4">{profile.username}</h3>
                            <p className="text-gray-500 text-sm">{profile.email || 'No email set'}</p>
                        </div>
                    </div>

                    {/* Main Form */}
                    <div className="md:col-span-2 space-y-6">
                        {message.text && (
                            <div className={`p-4 rounded-lg ${message.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                                {message.text}
                            </div>
                        )}

                        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm space-y-4">
                            <h3 className="font-bold flex items-center gap-2 mb-4">
                                <User size={18} className="text-blue-500" /> Personal Details
                            </h3>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
                                <input
                                    type="text"
                                    value={profile.username}
                                    disabled
                                    className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-gray-500 cursor-not-allowed"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                                    <input
                                        type="email"
                                        value={profile.email}
                                        onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                                        className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-100 outline-none"
                                        placeholder="admin@example.com"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
                                <div className="relative">
                                    <FileText className="absolute left-3 top-3 text-gray-400" size={16} />
                                    <textarea
                                        value={profile.bio}
                                        onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                                        className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-100 outline-none h-24 resize-none"
                                        placeholder="Tell a bit about yourself..."
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm space-y-4">
                            <h3 className="font-bold flex items-center gap-2 mb-4">
                                <Lock size={18} className="text-orange-500" /> Security
                            </h3>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
                                <input
                                    type="password"
                                    value={profile.newPassword}
                                    onChange={(e) => setProfile({ ...profile, newPassword: e.target.value })}
                                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-100 outline-none"
                                    placeholder="Leave blank to keep current"
                                />
                            </div>
                        </div>

                        <div className="flex justify-end">
                            <button
                                onClick={handleSubmit}
                                disabled={isSubmitting}
                                className="bg-blue-600 text-white px-6 py-2 rounded-lg font-bold hover:bg-blue-700 transition flex items-center gap-2 shadow-lg shadow-blue-500/20"
                            >
                                <Save size={18} />
                                {isSubmitting ? 'Saving...' : 'Save Changes'}
                            </button>
                        </div>

                    </div>
                </div>
            </div>
        </AdminLayout>
    );
};

export default Profile;
