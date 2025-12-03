import React, { useState } from 'react';
import { User, Bell, Moon, Sun, Shield, HelpCircle, LogOut, ChevronRight } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

export default function SettingsPage() {
    const { theme, toggleTheme } = useTheme();
    const [notifications, setNotifications] = useState({
        email: true,
        push: false,
        updates: true
    });

    const toggleNotification = (key) => {
        setNotifications(prev => ({ ...prev, [key]: !prev[key] }));
    };

    return (
        <div className="flex-1 h-screen overflow-y-auto bg-gray-50 dark:bg-gray-900 p-8">
            <div className="max-w-4xl mx-auto animate-fadeIn">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Settings</h1>

                {/* Profile Section */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700 mb-6">
                    <div className="flex items-center gap-4">
                        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center text-white text-2xl font-bold shadow-lg">
                            KR
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Ken Rock</h2>
                            <p className="text-gray-500 dark:text-gray-400">ken@kasadara.ai</p>
                            <button className="mt-2 text-sm text-blue-600 dark:text-blue-400 font-medium hover:underline">
                                Edit Profile
                            </button>
                        </div>
                    </div>
                </div>

                {/* Appearance */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 mb-6 overflow-hidden">
                    <div className="p-4 border-b border-gray-100 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-800/50">
                        <h3 className="font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                            <Moon size={18} /> Appearance
                        </h3>
                    </div>
                    <div className="p-6 flex items-center justify-between">
                        <div>
                            <p className="font-medium text-gray-900 dark:text-white">Dark Mode</p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Adjust the appearance of the application</p>
                        </div>
                        <button
                            onClick={toggleTheme}
                            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${theme === 'dark' ? 'bg-blue-600' : 'bg-gray-200'}`}
                        >
                            <span
                                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${theme === 'dark' ? 'translate-x-6' : 'translate-x-1'}`}
                            />
                        </button>
                    </div>
                </div>

                {/* Notifications */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 mb-6 overflow-hidden">
                    <div className="p-4 border-b border-gray-100 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-800/50">
                        <h3 className="font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                            <Bell size={18} /> Notifications
                        </h3>
                    </div>
                    <div className="p-6 space-y-6">
                        {Object.entries(notifications).map(([key, value]) => (
                            <div key={key} className="flex items-center justify-between">
                                <div className="capitalize">
                                    <p className="font-medium text-gray-900 dark:text-white">{key} Notifications</p>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">Receive updates via {key}</p>
                                </div>
                                <button
                                    onClick={() => toggleNotification(key)}
                                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${value ? 'bg-blue-600' : 'bg-gray-200'}`}
                                >
                                    <span
                                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${value ? 'translate-x-6' : 'translate-x-1'}`}
                                    />
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

                {/* General / About */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 mb-6 overflow-hidden">
                    <div className="p-4 border-b border-gray-100 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-800/50">
                        <h3 className="font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                            <Shield size={18} /> General
                        </h3>
                    </div>
                    <div className="divide-y divide-gray-100 dark:divide-gray-700">
                        <button className="w-full p-4 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors text-left">
                            <span className="text-gray-700 dark:text-gray-300">Privacy Policy</span>
                            <ChevronRight size={16} className="text-gray-400" />
                        </button>
                        <button className="w-full p-4 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors text-left">
                            <span className="text-gray-700 dark:text-gray-300">Terms of Service</span>
                            <ChevronRight size={16} className="text-gray-400" />
                        </button>
                        <button className="w-full p-4 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors text-left">
                            <span className="text-gray-700 dark:text-gray-300">Help & Support</span>
                            <ChevronRight size={16} className="text-gray-400" />
                        </button>
                    </div>
                </div>

                <div className="text-center text-sm text-gray-400 mt-8 mb-8">
                    Agent KAI v1.0.0
                </div>

            </div>
        </div>
    );
}
