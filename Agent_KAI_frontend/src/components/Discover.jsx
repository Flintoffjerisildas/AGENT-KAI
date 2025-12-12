import React from 'react';
import { FileText, Users, TrendingUp, Shield, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Discover() {
    const navigate = useNavigate();

    const categories = [
        {
            id: 'recruitment',
            title: 'Recruitment',
            icon: <Users size={24} />,
            color: 'bg-blue-100 text-blue-600',
            templates: [
                { title: 'Job Description', desc: 'Generate a JD for a Senior React Developer.', prompt: 'Write a comprehensive job description for a Senior React Developer position, including responsibilities, required skills (React, Node.js, Tailwind), and benefits.' },
                { title: 'Interview Questions', desc: 'Technical questions for a Data Scientist.', prompt: 'List 10 technical interview questions for a Data Scientist role focusing on Machine Learning and Python, with expected answer outlines.' },
                { title: 'Rejection Email', desc: 'Polite rejection email for candidates.', prompt: 'Draft a polite and professional rejection email for a candidate who was interviewed but not selected for the role.' }
            ]
        },
        {
            id: 'onboarding',
            title: 'Onboarding',
            icon: <FileText size={24} />,
            color: 'bg-cyan-100 text-cyan-600',
            templates: [
                { title: 'Welcome Email', desc: 'Warm welcome email for new hires.', prompt: 'Write a warm and welcoming email to a new employee named [Name] starting on [Date] as a [Role]. Include details about their first day schedule.' },
                { title: '30-60-90 Day Plan', desc: 'Success plan for the first 3 months.', prompt: 'Create a 30-60-90 day onboarding plan for a new Marketing Manager, focusing on learning, contribution, and leadership phases.' },
                { title: 'IT Setup Checklist', desc: 'Hardware and software requirements.', prompt: 'Create a checklist for IT provisioning for a new remote software engineer, including hardware, software access, and security setup.' }
            ]
        },
        {
            id: 'performance',
            title: 'Performance',
            icon: <TrendingUp size={24} />,
            color: 'bg-indigo-100 text-indigo-600',
            templates: [
                { title: 'Goal Setting (OKRs)', desc: 'Draft OKRs for Q3.', prompt: 'Draft 3 Objectives and Key Results (OKRs) for a Sales Team for Q3, focusing on revenue growth and customer acquisition.' },
                { title: 'Feedback Framework', desc: 'Constructive feedback script.', prompt: 'Write a script for giving constructive feedback to an employee who has been missing deadlines recently, using the Situation-Behavior-Impact (SBI) model.' },
                { title: 'Self-Evaluation', desc: 'Questions for annual review.', prompt: 'List 5 thought-provoking questions for employees to answer during their annual self-evaluation performance review.' }
            ]
        },
        {
            id: 'policies',
            title: 'Policies',
            icon: <Shield size={24} />,
            color: 'bg-emerald-100 text-emerald-600',
            templates: [
                { title: 'Remote Work Policy', desc: 'Guidelines for WFH employees.', prompt: 'Draft a comprehensive Remote Work Policy covering eligibility, working hours, communication expectations, and data security.' },
                { title: 'Leave Policy', desc: 'Standard leave policy outline.', prompt: 'Outline a standard Leave Policy for a mid-sized tech company, including sick leave, casual leave, and earned leave entitlements.' },
                { title: 'Code of Conduct', desc: 'Workplace behavior guidelines.', prompt: 'Draft a Code of Conduct for the workplace, emphasizing respect, diversity, and professional integrity.' }
            ]
        }
    ];

    const handleUseTemplate = (prompt) => {
        // In a real app, we might pass this via state or context.
        // For now, let's just navigate to chat.
        // Ideally, ChatWindow would read location.state
        navigate('/chat', { state: { initialMessage: prompt } });
    };

    return (
        <div className="flex-1 h-screen overflow-y-auto bg-gray-50 dark:bg-gray-900 p-8">
            <div className="max-w-6xl mx-auto">
                <div className="mb-10">
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">Discover Templates</h1>
                    <p className="text-gray-500 dark:text-gray-400">Explore pre-built templates to accelerate your HR workflows.</p>
                </div>

                <div className="space-y-12">
                    {categories.map((category) => (
                        <section key={category.id}>
                            <div className="flex items-center gap-3 mb-6">
                                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${category.color}`}>
                                    {category.icon}
                                </div>
                                <h2 className="text-xl font-bold text-gray-900 dark:text-gray-200">{category.title}</h2>
                            </div>

                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {category.templates.map((template, idx) => (
                                    <div key={idx} className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-100 dark:border-gray-700 hover:shadow-lg transition-all duration-300 group flex flex-col">
                                        <h3 className="font-semibold text-gray-900 dark:text-gray-200 mb-2">{template.title}</h3>
                                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-6 flex-1">{template.desc}</p>
                                        <button
                                            onClick={() => handleUseTemplate(template.prompt)}
                                            className="flex items-center gap-2 text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors mt-auto"
                                        >
                                            Use Template <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </section>
                    ))}
                </div>
            </div>
        </div>
    );
}
