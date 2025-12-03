import React from 'react';
import { ArrowRight, CheckCircle, Users, TrendingUp, MessageSquare, Briefcase, Zap, Shield, Layers, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
    return (
        <div className="flex-1 h-screen overflow-y-auto bg-white dark:bg-gray-900 shadow-sm relative scroll-smooth">
            {/* Hero Section */}
            <section className="relative overflow-hidden h-screen pt-20 pb-16 px-8 md:px-16 animate-fadeIn">
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-50 to-white -z-10 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100"></div>
                <div className="max-w-4xl mx-auto text-center">
                    <div className="inline-block mb-4 px-4 py-1.5 rounded-full bg-blue-100 text-blue-700 font-medium text-sm animate-slideDown">
                        Agent Kai
                    </div>
                    <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight animate-slideUp dark:text-gray-200" style={{ animationDelay: '0.1s' }}>
                        Kasadara Artificial Intelligence for <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-600">Smarter Business Operations</span>
                    </h1>
                    <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto animate-slideUp dark:text-gray-200" style={{ animationDelay: '0.2s' }}>
                        Where intelligence meets impact—transform how your business runs.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slideUp dark:text-gray-200" style={{ animationDelay: '0.3s' }}>
                        <Link to="/chat" className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1 hover:scale-105 flex items-center justify-center gap-2">
                            Talk To Our Experts <ArrowRight size={20} />
                        </Link>
                    </div>
                </div>
            </section>

            {/* Introduction Section */}
            <section className="py-16 px-8 md:px-16 bg-white dark:bg-gray-900">
                <div className="max-w-5xl mx-auto">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div className="animate-slideRight" style={{ animationDelay: '0.4s' }}>
                            <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-200 mb-6">Preparing Your Workforce ‘Future Ready’</h2>
                            <p className="text-gray-600 dark:text-gray-200 mb-6 leading-relaxed">
                                Meet Agent Kai, Kasadara’s Talent Intelligence Agent designed with AI at the core to deliver the agile experience that you need to grow your workforce – and evolve your business.
                            </p>
                            <p className="text-gray-600 dark:text-gray-200 mb-6 leading-relaxed">
                                Kai is meant to simplify day-to-day work, reduce repetitive tasks, and provide quick access to information. With Kai handling routine processes, teams can focus on more important work, make faster decisions, and improve overall productivity.
                            </p>
                            <p className="text-gray-600 dark:text-gray-200 leading-relaxed">
                                Kai’s is set to expand its expertise to provide a better and efficient 24 x 7 Customer Interaction Experience, for our clients and partners across the geographical boundaries.
                            </p>
                        </div>
                        <div className="bg-gray-50 dark:bg-gray-900 rounded-2xl p-8 border border-gray-100 animate-slideLeft hover:shadow-lg transition-shadow duration-300" style={{ animationDelay: '0.4s' }}>
                            {/* Placeholder for an image or illustration */}
                            <div className="aspect-video bg-gradient-to-tr from-blue-100 to-cyan-50 rounded-xl flex items-center justify-center text-blue-300 transform hover:scale-105 transition-transform duration-500">
                            <img src="https://cdn.prod.website-files.com/63974a9c19a1dd54281c47a8/64d0b5970be523e3ea00fe44_AI-Agents.webp" alt="AI Agents" size={64} />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* HR Agent Section */}
            <section className="py-16 px-8 md:px-16 bg-gray-50 dark:bg-gray-900">
                <div className="max-w-5xl mx-auto">
                    <div className="text-center mb-16">
                        <span className="text-blue-600 dark:text-blue-200 font-semibold tracking-wider uppercase text-sm">HR Agent</span>
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-200 mt-2 mb-4">Supporting HR: Helping Your People Team</h2>
                        <p className="text-xl text-gray-600 dark:text-gray-200">Simple, Quick, and Efficient</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl dark:bg-gray-800 dark:border dark:border-gray-700 transition-all duration-300 transform hover:-translate-y-2">
                            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600 mb-6">
                                <Users size={24} />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 dark:text-gray-200 mb-3">Onboarding & Recruitment</h3>
                            <p className="text-gray-600 dark:text-gray-200 text-sm leading-relaxed">
                                Automates candidate screening, shortlists suitable candidates, schedules interviews, and assists in preparing offer letters.
                            </p>
                        </div>

                        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl dark:bg-gray-800 dark:border dark:border-gray-700 transition-all duration-300 transform hover:-translate-y-2">
                            <div className="w-12 h-12 bg-cyan-100 rounded-xl flex items-center justify-center text-cyan-600 mb-6">
                                <MessageSquare size={24} />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 dark:text-gray-200 mb-3">Employee Support</h3>
                            <p className="text-gray-600 dark:text-gray-200 text-sm leading-relaxed">
                                Handles leave applications, salary queries, payslips, and provides quick guidance on HR policies. Employees get instant support.
                            </p>
                        </div>

                        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl dark:bg-gray-800 dark:border dark:border-gray-700 transition-all duration-300 transform hover:-translate-y-2">
                            <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center text-indigo-600 mb-6">
                                <TrendingUp size={24} />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 dark:text-gray-200 mb-3">Performance & Learning</h3>
                            <p className="text-gray-600 dark:text-gray-200 text-sm leading-relaxed">
                                Tracks individual and team goals, collects feedback from managers, and recommends learning and training opportunities.
                            </p>
                        </div>
                    </div>

                    <div className="mt-12 bg-blue-600 rounded-2xl p-8 text-white text-center shadow-lg hover:shadow-xl transition-shadow">
                        <h3 className="text-xl font-bold mb-2">Why It Matters</h3>
                        <p className="opacity-90 max-w-3xl mx-auto">
                            By automating routine HR tasks, Kai allows HR teams to focus on building talent, enhancing employee engagement, and supporting long-term growth, instead of spending time on repetitive administrative work.
                        </p>
                    </div>
                </div>
            </section>

            {/* Expansion Section */}
            <section className="py-16 px-8 md:px-16 bg-white dark:bg-gray-800">
                <div className="max-w-5xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-200 mb-4">Ready to Grow: Expansion Beyond HR</h2>
                        <p className="text-xl text-gray-600 dark:text-gray-200">Flexible, Scalable, and Future-Ready</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="group relative overflow-hidden rounded-2xl bg-gray-900 p-8 text-white hover:shadow-2xl transition-all duration-500">
                            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity transform group-hover:scale-110 duration-500">
                                <TrendingUp size={100} />
                            </div>
                            <h3 className="text-2xl font-bold mb-2 relative z-10">Sales & Marketing</h3>
                            <p className="text-gray-300 text-sm relative z-10">
                                Provides support in generating leads, tracking campaigns, analysing customer behaviour, and providing insights.
                            </p>
                        </div>

                        <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-600 to-blue-800 p-8 text-white hover:shadow-2xl transition-all duration-500">
                            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity transform group-hover:scale-110 duration-500">
                                <MessageSquare size={100} />
                            </div>
                            <h3 className="text-2xl font-bold mb-2 relative z-10">Customer Support</h3>
                            <p className="text-blue-100 text-sm relative z-10">
                                Assists with routine customer queries, schedules appointments, and completes simple tasks.
                            </p>
                        </div>

                        <div className="group relative overflow-hidden rounded-2xl bg-gray-900 p-8 text-white hover:shadow-2xl transition-all duration-500">
                            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity transform group-hover:scale-110 duration-500">
                                <Briefcase size={100} />
                            </div>
                            <h3 className="text-2xl font-bold mb-2 relative z-10">Digital Sales Executive</h3>
                            <p className="text-gray-300 text-sm relative z-10">
                                Supports sales processes by tracking leads, managing follow-ups, and providing actionable suggestions.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Key Benefits Section */}
            <section className="py-16 px-8 md:px-16 bg-gray-50 dark:bg-gray-900 dark:border dark:border-gray-700">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-3xl font-bold text-gray-900 mb-10 text-center dark:text-gray-200">Key Benefits of Agent Kai</h2>
                    <div className="grid sm:grid-cols-2 gap-6">
                        {[
                            { title: "Saves Time", desc: "Handles repetitive and routine tasks so teams can focus on higher-value work." },
                            { title: "Seamless Integration", desc: "Works with existing enterprise systems and processes without disruption." },
                            { title: "Scalable Support", desc: "Starts with HR and can expand to support multiple business functions in the future." },
                            { title: "Actionable Insights", desc: "Provides recommendations and insights to help teams make informed decisions quickly." },
                            { title: "Reliable and Consistent", desc: "Supports teams 24/7, reducing errors and ensuring tasks are completed accurately and on time." },
                            { title: "Cost-effective", desc: "Reduces the need for additional staff and lowers operational costs." },
                        ].map((benefit, index) => (
                            <div key={index} className="flex gap-4 items-start p-4 rounded-xl hover:bg-white dark:bg-gray-900 dark:border dark:border-gray-900 dark:hover:border-gray-200 dark:hover:bg-gray-900 transition-all duration-300">
                                <div className="mt-1 text-green-500 flex-shrink-0">
                                    <CheckCircle size={20} />
                                </div>
                                <div>
                                    <h4 className="font-bold text-gray-900 dark:text-gray-200">{benefit.title}</h4>
                                    <p className="text-gray-600 text-sm">{benefit.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Footer Section */}
            <section className="py-16 px-8 md:px-16 dark:bg-gray-900 dark:border dark:border-gray-700">
                <footer>
                    <div className="max-w-5xl mx-auto">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                            <div>
                                <h3 className="text-lg font-bold mb-4 dark:text-gray-200">About Us</h3>
                                <p className="text-gray-600 dark:text-gray-200">We are a team of passionate individuals who are dedicated to providing the best possible service to our clients.</p>
                            </div>
                            <div>
                                <h3 className="text-lg font-bold mb-4 dark:text-gray-200">Quick Links</h3>
                                <ul className="space-y-2">
                                    <li><a href="#" className="text-gray-600 hover:text-gray-900 dark:text-gray-200 dark:hover:text-gray-100">Home</a></li>
                                    <li><a href="#" className="text-gray-600 hover:text-gray-900 dark:text-gray-200 dark:hover:text-gray-100">About</a></li>
                                    <li><a href="#" className="text-gray-600 hover:text-gray-900 dark:text-gray-200 dark:hover:text-gray-100">Services</a></li>
                                    <li><a href="#" className="text-gray-600 hover:text-gray-900 dark:text-gray-200 dark:hover:text-gray-100">Contact</a></li>
                                </ul>
                            </div>
                            <div>
                                <h3 className="text-lg font-bold mb-4 dark:text-gray-200">Contact Us</h3>
                                <p className="text-gray-600 dark:text-gray-200">123 Main St, Anytown, India</p>
                                <p className="text-gray-600 dark:text-gray-200">Phone: (123) 456-7890</p>
                                <p className="text-gray-600 dark:text-gray-200">Email: info@example.com</p>
                            </div>
                            <div>
                                <h3 className="text-lg font-bold mb-4 dark:text-gray-200">Follow Us</h3>
                                <div className="flex gap-4">
                                    <a href="#" className="text-gray-600 hover:text-gray-900 dark:text-gray-200 dark:hover:text-gray-100">
                                        <Facebook size={20} />
                                    </a>
                                    <a href="#" className="text-gray-600 hover:text-gray-900 dark:text-gray-200 dark:hover:text-gray-100">
                                        <Twitter size={20} />
                                    </a>
                                    <a href="#" className="text-gray-600 hover:text-gray-900 dark:text-gray-200 dark:hover:text-gray-100">
                                        <Instagram size={20} />
                                    </a>
                                    <a href="#" className="text-gray-600 hover:text-gray-900 dark:text-gray-200 dark:hover:text-gray-100">
                                        <Linkedin size={20} />
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="mt-8 text-center text-gray-600 dark:text-gray-200">
                            &copy; {new Date().getFullYear()} Agent Kai. All rights reserved.
                        </div>
                    </div>
                </footer>
            </section>
        </div>
    );
};

export default LandingPage;
