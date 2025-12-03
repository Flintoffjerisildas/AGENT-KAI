import { CheckCircle } from 'lucide-react';

export default function Pricing() {
    return (
        <div className="bg-gray-50 dark:bg-gray-900 overflow-y-auto">
            {/* Plans Section */}
            <section className="py-16 px-8 md:px-16 bg-white dark:bg-gray-800">
                <div className="max-w-5xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-200 mb-4">Choose the Right Plan for Your Business</h2>
                        <p className="text-xl text-gray-600 dark:text-gray-200">Scalable solutions for teams of all sizes</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {/* Starter Plan */}
                        <div className="bg-gray-50 dark:bg-gray-900 rounded-2xl p-8 border border-gray-100 dark:border-gray-700 hover:shadow-xl transition-all duration-300 flex flex-col">
                            <h3 className="text-xl font-bold text-gray-900 dark:text-gray-200 mb-2">Starter</h3>
                            <div className="text-4xl font-bold text-gray-900 dark:text-gray-200 mb-4">$0<span className="text-lg text-gray-500 font-normal">/mo</span></div>
                            <p className="text-gray-600 dark:text-gray-400 text-sm mb-6">Perfect for small teams getting started with AI automation.</p>
                            <ul className="space-y-3 mb-8 flex-1">
                                <li className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300"><CheckCircle size={16} className="text-green-500" /> Basic HR Agent</li>
                                <li className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300"><CheckCircle size={16} className="text-green-500" /> 50 Queries/mo</li>
                                <li className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300"><CheckCircle size={16} className="text-green-500" /> Email Support</li>
                            </ul>
                            <button className="w-full py-3 rounded-xl border border-blue-600 text-blue-600 font-semibold hover:bg-blue-50 dark:hover:bg-gray-800 transition-colors">Get Started</button>
                        </div>

                        {/* Professional Plan */}
                        <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 border-2 border-blue-600 shadow-xl relative flex flex-col transform md:-translate-y-4">
                            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide">Most Popular</div>
                            <h3 className="text-xl font-bold text-gray-900 dark:text-gray-200 mb-2">Professional</h3>
                            <div className="text-4xl font-bold text-gray-900 dark:text-gray-200 mb-4">$49<span className="text-lg text-gray-500 font-normal">/mo</span></div>
                            <p className="text-gray-600 dark:text-gray-400 text-sm mb-6">For growing teams needing comprehensive HR support.</p>
                            <ul className="space-y-3 mb-8 flex-1">
                                <li className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300"><CheckCircle size={16} className="text-green-500" /> Full HR Suite</li>
                                <li className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300"><CheckCircle size={16} className="text-green-500" /> Employee Support Module</li>
                                <li className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300"><CheckCircle size={16} className="text-green-500" /> Unlimited Queries</li>
                                <li className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300"><CheckCircle size={16} className="text-green-500" /> Priority Support</li>
                            </ul>
                            <button className="w-full py-3 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors shadow-lg">Start Free Trial</button>
                        </div>

                        {/* Enterprise Plan */}
                        <div className="bg-gray-50 dark:bg-gray-900 rounded-2xl p-8 border border-gray-100 dark:border-gray-700 hover:shadow-xl transition-all duration-300 flex flex-col">
                            <h3 className="text-xl font-bold text-gray-900 dark:text-gray-200 mb-2">Enterprise</h3>
                            <div className="text-4xl font-bold text-gray-900 dark:text-gray-200 mb-4">Custom</div>
                            <p className="text-gray-600 dark:text-gray-400 text-sm mb-6">Tailored solutions for large organizations.</p>
                            <ul className="space-y-3 mb-8 flex-1">
                                <li className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300"><CheckCircle size={16} className="text-green-500" /> All Modules (HR, Sales, Support)</li>
                                <li className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300"><CheckCircle size={16} className="text-green-500" /> Custom Integrations</li>
                                <li className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300"><CheckCircle size={16} className="text-green-500" /> Dedicated Account Manager</li>
                                <li className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300"><CheckCircle size={16} className="text-green-500" /> SLA & Security Compliance</li>
                            </ul>
                            <button className="w-full py-3 rounded-xl border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-semibold hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">Contact Sales</button>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}