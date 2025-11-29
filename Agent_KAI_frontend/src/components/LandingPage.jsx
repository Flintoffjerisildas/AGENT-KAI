import React from 'react';
import { ArrowRight, CheckCircle, Users, TrendingUp, MessageSquare, Briefcase, Zap, Shield, Layers } from 'lucide-react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
    return (
        <div className="flex-1 h-screen overflow-y-auto bg-white shadow-sm relative">
            {/* Hero Section */}
            <section className="relative overflow-hidden pt-20 pb-16 px-8 md:px-16">
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-50 to-white -z-10 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100"></div>
                <div className="max-w-4xl mx-auto text-center">
                    <div className="inline-block mb-4 px-4 py-1.5 rounded-full bg-blue-100 text-blue-700 font-medium text-sm">
                        Agent Kai
                    </div>
                    <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                        Kasadara Artificial Intelligence for <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-600">Smarter Business Operations</span>
                    </h1>
                    <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
                        Where intelligence meets impact—transform how your business runs.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link to="/chat" className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1 flex items-center justify-center gap-2">
                            Talk To Our Experts <ArrowRight size={20} />
                        </Link>
                    </div>
                </div>
            </section>

            {/* Introduction Section */}
            <section className="py-16 px-8 md:px-16 bg-white">
                <div className="max-w-5xl mx-auto">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div>
                            <h2 className="text-3xl font-bold text-gray-900 mb-6">Preparing Your Workforce ‘Future Ready’</h2>
                            <p className="text-gray-600 mb-6 leading-relaxed">
                                Meet Agent Kai, Kasadara’s Talent Intelligence Agent designed with AI at the core to deliver the agile experience that you need to grow your workforce – and evolve your business.
                            </p>
                            <p className="text-gray-600 mb-6 leading-relaxed">
                                Kai is meant to simplify day-to-day work, reduce repetitive tasks, and provide quick access to information. With Kai handling routine processes, teams can focus on more important work, make faster decisions, and improve overall productivity.
                            </p>
                            <p className="text-gray-600 leading-relaxed">
                                Kai’s is set to expand its expertise to provide a better and efficient 24 x 7 Customer Interaction Experience, for our clients and partners across the geographical boundaries.
                            </p>
                        </div>
                        <div className="bg-gray-50 rounded-2xl p-8 border border-gray-100">
                            {/* Placeholder for an image or illustration */}
                            <div className="aspect-video bg-gradient-to-tr from-blue-100 to-cyan-50 rounded-xl flex items-center justify-center text-blue-300">
                                <Zap size={64} />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* HR Agent Section */}
            <section className="py-16 px-8 md:px-16 bg-gray-50">
                <div className="max-w-5xl mx-auto">
                    <div className="text-center mb-16">
                        <span className="text-blue-600 font-semibold tracking-wider uppercase text-sm">HR Agent</span>
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2 mb-4">Supporting HR: Helping Your People Team</h2>
                        <p className="text-xl text-gray-600">Simple, Quick, and Efficient</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600 mb-6">
                                <Users size={24} />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">Onboarding & Recruitment</h3>
                            <p className="text-gray-600 text-sm leading-relaxed">
                                Automates candidate screening, shortlists suitable candidates, schedules interviews, and assists in preparing offer letters.
                            </p>
                        </div>

                        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                            <div className="w-12 h-12 bg-cyan-100 rounded-xl flex items-center justify-center text-cyan-600 mb-6">
                                <MessageSquare size={24} />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">Employee Support</h3>
                            <p className="text-gray-600 text-sm leading-relaxed">
                                Handles leave applications, salary queries, payslips, and provides quick guidance on HR policies. Employees get instant support.
                            </p>
                        </div>

                        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                            <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center text-indigo-600 mb-6">
                                <TrendingUp size={24} />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">Performance & Learning</h3>
                            <p className="text-gray-600 text-sm leading-relaxed">
                                Tracks individual and team goals, collects feedback from managers, and recommends learning and training opportunities.
                            </p>
                        </div>
                    </div>

                    <div className="mt-12 bg-blue-600 rounded-2xl p-8 text-white text-center">
                        <h3 className="text-xl font-bold mb-2">Why It Matters</h3>
                        <p className="opacity-90 max-w-3xl mx-auto">
                            By automating routine HR tasks, Kai allows HR teams to focus on building talent, enhancing employee engagement, and supporting long-term growth, instead of spending time on repetitive administrative work.
                        </p>
                    </div>
                </div>
            </section>

            {/* Expansion Section */}
            <section className="py-16 px-8 md:px-16 bg-white">
                <div className="max-w-5xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Ready to Grow: Expansion Beyond HR</h2>
                        <p className="text-xl text-gray-600">Flexible, Scalable, and Future-Ready</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="group relative overflow-hidden rounded-2xl bg-gray-900 p-8 text-white">
                            <div className="absolute top-0 right-0 p-4 opacity-10">
                                <TrendingUp size={100} />
                            </div>
                            <h3 className="text-2xl font-bold mb-2">Sales & Marketing</h3>
                            <p className="text-gray-300 text-sm">
                                Provides support in generating leads, tracking campaigns, analysing customer behaviour, and providing insights.
                            </p>
                        </div>

                        <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-600 to-blue-800 p-8 text-white">
                            <div className="absolute top-0 right-0 p-4 opacity-10">
                                <MessageSquare size={100} />
                            </div>
                            <h3 className="text-2xl font-bold mb-2">Customer Support</h3>
                            <p className="text-blue-100 text-sm">
                                Assists with routine customer queries, schedules appointments, and completes simple tasks.
                            </p>
                        </div>

                        <div className="group relative overflow-hidden rounded-2xl bg-gray-900 p-8 text-white">
                            <div className="absolute top-0 right-0 p-4 opacity-10">
                                <Briefcase size={100} />
                            </div>
                            <h3 className="text-2xl font-bold mb-2">Digital Sales Executive</h3>
                            <p className="text-gray-300 text-sm">
                                Supports sales processes by tracking leads, managing follow-ups, and providing actionable suggestions.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Key Benefits Section */}
            <section className="py-16 px-8 md:px-16 bg-gray-50 mb-8">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-3xl font-bold text-gray-900 mb-10 text-center">Key Benefits of Agent Kai</h2>
                    <div className="grid sm:grid-cols-2 gap-6">
                        {[
                            { title: "Saves Time", desc: "Handles repetitive and routine tasks so teams can focus on higher-value work." },
                            { title: "Seamless Integration", desc: "Works with existing enterprise systems and processes without disruption." },
                            { title: "Scalable Support", desc: "Starts with HR and can expand to support multiple business functions in the future." },
                            { title: "Actionable Insights", desc: "Provides recommendations and insights to help teams make informed decisions quickly." },
                            { title: "Reliable and Consistent", desc: "Supports teams 24/7, reducing errors and ensuring tasks are completed accurately and on time." }
                        ].map((benefit, index) => (
                            <div key={index} className="flex gap-4 items-start">
                                <div className="mt-1 text-green-500 flex-shrink-0">
                                    <CheckCircle size={20} />
                                </div>
                                <div>
                                    <h4 className="font-bold text-gray-900">{benefit.title}</h4>
                                    <p className="text-gray-600 text-sm">{benefit.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default LandingPage;
