import React, { useState, useContext } from 'react';
import NavBar from '../Home/Navbar/NavBar';
import { AuthContext } from '../../../providers/AuthProvider';

const Setting = () => {
    const { user } = useContext(AuthContext);
    const [settings, setSettings] = useState({
        notifications: {
            email: true,
            push: false,
            sms: false,
            orderUpdates: true,
            promotions: true,
        },
        privacy: {
            profileVisible: true,
            showEmail: false,
            allowRecommendations: true,
        },
        preferences: {
            currency: 'BDT',
            language: 'English',
            theme: 'light',
        }
    });

    const handleToggle = (category, setting) => {
        setSettings(prev => ({
            ...prev,
            [category]: {
                ...prev[category],
                [setting]: !prev[category][setting]
            }
        }));
    };

    const handleSelectChange = (category, setting, value) => {
        setSettings(prev => ({
            ...prev,
            [category]: {
                ...prev[category],
                [setting]: value
            }
        }));
    };

    const handleSaveSettings = () => {
        console.log('Saving settings:', settings);
        alert('Settings saved successfully!');
    };

    return (
        <div>
            <NavBar />
            <div className="min-h-screen bg-gray-50 py-8">
                <div className="max-w-4xl mx-auto px-4">
                    {/* Header */}
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">Settings</h1>
                        <p className="text-gray-600">Manage your account settings and preferences</p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Settings Navigation */}
                        <div className="lg:col-span-1">
                            <div className="bg-white rounded-lg shadow-sm border p-6">
                                <h3 className="text-lg font-semibold mb-4">Settings Menu</h3>
                                <nav className="space-y-2">
                                    <a href="#account" className="block px-3 py-2 rounded-md bg-green-50 text-green-600 font-medium">
                                        Account Settings
                                    </a>
                                    <a href="#notifications" className="block px-3 py-2 rounded-md hover:bg-gray-50 text-gray-700">
                                        Notifications
                                    </a>
                                    <a href="#privacy" className="block px-3 py-2 rounded-md hover:bg-gray-50 text-gray-700">
                                        Privacy
                                    </a>
                                    <a href="#preferences" className="block px-3 py-2 rounded-md hover:bg-gray-50 text-gray-700">
                                        Preferences
                                    </a>
                                </nav>
                            </div>
                        </div>

                        {/* Settings Content */}
                        <div className="lg:col-span-2 space-y-6">
                            {/* Account Settings */}
                            <div id="account" className="bg-white rounded-lg shadow-sm border p-6">
                                <h3 className="text-xl font-semibold mb-6">Account Information</h3>
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                                        <input 
                                            type="email" 
                                            value={user?.email || ''} 
                                            disabled
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Display Name</label>
                                        <input 
                                            type="text" 
                                            placeholder="Enter your display name"
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                                        <input 
                                            type="tel" 
                                            placeholder="Enter your phone number"
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Notification Settings */}
                            <div id="notifications" className="bg-white rounded-lg shadow-sm border p-6">
                                <h3 className="text-xl font-semibold mb-6">Notification Preferences</h3>
                                <div className="space-y-4">
                                    {Object.entries(settings.notifications).map(([key, value]) => (
                                        <div key={key} className="flex items-center justify-between">
                                            <div>
                                                <h4 className="font-medium text-gray-900 capitalize">
                                                    {key.replace(/([A-Z])/g, ' $1').toLowerCase()}
                                                </h4>
                                                <p className="text-sm text-gray-500">
                                                    Receive {key.toLowerCase()} notifications
                                                </p>
                                            </div>
                                            <label className="relative inline-flex items-center cursor-pointer">
                                                <input 
                                                    type="checkbox" 
                                                    checked={value}
                                                    onChange={() => handleToggle('notifications', key)}
                                                    className="sr-only peer"
                                                />
                                                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                                            </label>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Privacy Settings */}
                            <div id="privacy" className="bg-white rounded-lg shadow-sm border p-6">
                                <h3 className="text-xl font-semibold mb-6">Privacy Settings</h3>
                                <div className="space-y-4">
                                    {Object.entries(settings.privacy).map(([key, value]) => (
                                        <div key={key} className="flex items-center justify-between">
                                            <div>
                                                <h4 className="font-medium text-gray-900 capitalize">
                                                    {key.replace(/([A-Z])/g, ' $1').toLowerCase()}
                                                </h4>
                                                <p className="text-sm text-gray-500">
                                                    Control your {key.toLowerCase()} settings
                                                </p>
                                            </div>
                                            <label className="relative inline-flex items-center cursor-pointer">
                                                <input 
                                                    type="checkbox" 
                                                    checked={value}
                                                    onChange={() => handleToggle('privacy', key)}
                                                    className="sr-only peer"
                                                />
                                                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                                            </label>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Preferences */}
                            <div id="preferences" className="bg-white rounded-lg shadow-sm border p-6">
                                <h3 className="text-xl font-semibold mb-6">General Preferences</h3>
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Currency</label>
                                        <select 
                                            value={settings.preferences.currency}
                                            onChange={(e) => handleSelectChange('preferences', 'currency', e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                        >
                                            <option value="BDT">BDT - Bangladeshi Taka</option>
                                            <option value="USD">USD - US Dollar</option>
                                            <option value="EUR">EUR - Euro</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Language</label>
                                        <select 
                                            value={settings.preferences.language}
                                            onChange={(e) => handleSelectChange('preferences', 'language', e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                        >
                                            <option value="English">English</option>
                                            <option value="Bengali">Bengali</option>
                                            <option value="Hindi">Hindi</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Theme</label>
                                        <select 
                                            value={settings.preferences.theme}
                                            onChange={(e) => handleSelectChange('preferences', 'theme', e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                        >
                                            <option value="light">Light</option>
                                            <option value="dark">Dark</option>
                                            <option value="system">System</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            {/* Save Button */}
                            <div className="flex justify-end">
                                <button 
                                    onClick={handleSaveSettings}
                                    className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-6 rounded-lg transition duration-300"
                                >
                                    Save Settings
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Setting;