"use client";

import Container from "@/components/layout/Container";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { useState } from "react";

import { rtdb } from "@/lib/firebase";
import { ref, push, set } from "firebase/database";

export default function Contact() {
    const [form, setForm] = useState({
        firstName: "",
        lastName: "",
        email: "",
        subject: "",
        message: "",
    });

    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState<{ type: "success" | "error"; msg: string } | null>(null);

    const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus(null);

        // basic validation
        if (!form.firstName || !form.email || !form.subject || !form.message) {
            setStatus({ type: "error", msg: "Please fill required fields (First name, Email, Subject, Message)." });
            return;
        }

        try {
            setLoading(true);

            // Create a new child under "contactMessages"
            const newMsgRef = push(ref(rtdb, "contactMessages"));

            await set(newMsgRef, {
                ...form,
                createdAt: Date.now(), // or new Date().toISOString()
            });

            setStatus({ type: "success", msg: "Message sent successfully!" });
            setForm({ firstName: "", lastName: "", email: "", subject: "", message: "" });
        } catch (err) {
            console.error(err);
            setStatus({ type: "error", msg: "Failed to send message. Please try again." });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-gray-50 min-h-screen">
            {/* Hero Section */}
            <div className="bg-black py-16 md:py-24">
                <Container>
                    <div className="max-w-3xl px-4">
                        <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 md:mb-6">Get in Touch</h1>
                        <p className="text-lg md:text-xl text-blue-100 leading-relaxed">
                            Have a question, feedback, or just want to say hello? We'd love to hear from you. Our team typically responds within 24 hours.
                        </p>
                    </div>
                </Container>
            </div>

            <Container className="py-12 md:py-20 px-4">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">
                    {/* Contact Info */}
                    <div className="lg:col-span-1 space-y-8">
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-8">Contact Information</h2>
                            <div className="space-y-6">
                                <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 md:w-12 md:h-12 bg-black text-white rounded-xl md:rounded-2xl flex items-center justify-center shrink-0">
                                        <Mail className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold text-gray-900 mb-1">Email Us</p>
                                        <p className="text-gray-600 text-sm">hello@nextblog.com</p>
                                        <p className="text-gray-600 text-sm">support@nextblog.com</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 md:w-12 md:h-12 bg-black text-white rounded-xl md:rounded-2xl flex items-center justify-center shrink-0">
                                        <Phone className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold text-gray-900 mb-1">Call Us</p>
                                        <p className="text-gray-600 text-sm">+1 (555) 000-0000</p>
                                        <p className="text-gray-600 text-sm">Mon-Fri from 9am to 6pm</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 md:w-12 md:h-12 bg-black text-white rounded-xl md:rounded-2xl flex items-center justify-center shrink-0">
                                        <MapPin className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold text-gray-900 mb-1">Visit Us</p>
                                        <p className="text-gray-600 text-sm">123 Design Street, Creative Valley</p>
                                        <p className="text-gray-600 text-sm">San Francisco, CA 94103</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-2xl md:rounded-3xl p-6 md:p-12 shadow-sm border border-gray-100">
                            {status && (
                                <div
                                    className={`mb-6 rounded-xl px-4 py-3 text-sm ${status.type === "success" ? "bg-green-50 text-green-700 border border-green-100" : "bg-red-50 text-red-700 border border-red-100"
                                        }`}
                                >
                                    {status.msg}
                                </div>
                            )}

                            <form className="space-y-6" onSubmit={handleSubmit}>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-gray-700 ml-1">First Name *</label>
                                        <input
                                            name="firstName"
                                            value={form.firstName}
                                            onChange={onChange}
                                            type="text"
                                            placeholder="John"
                                            className="w-full h-12 px-4 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 transition-all bg-gray-50/50 text-sm"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-gray-700 ml-1">Last Name</label>
                                        <input
                                            name="lastName"
                                            value={form.lastName}
                                            onChange={onChange}
                                            type="text"
                                            placeholder="Doe"
                                            className="w-full h-12 px-4 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 transition-all bg-gray-50/50 text-sm"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-700 ml-1">Email Address *</label>
                                    <input
                                        name="email"
                                        value={form.email}
                                        onChange={onChange}
                                        type="email"
                                        placeholder="john@example.com"
                                        className="w-full h-12 px-4 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 transition-all bg-gray-50/50 text-sm"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-700 ml-1">Subject *</label>
                                    <input
                                        name="subject"
                                        value={form.subject}
                                        onChange={onChange}
                                        type="text"
                                        placeholder="How can we help?"
                                        className="w-full h-12 px-4 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 transition-all bg-gray-50/50 text-sm"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-700 ml-1">Message *</label>
                                    <textarea
                                        name="message"
                                        value={form.message}
                                        onChange={onChange}
                                        rows={6}
                                        placeholder="Write your message here..."
                                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 transition-all bg-gray-50/50 resize-none text-sm"
                                    />
                                </div>

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full md:w-auto px-8 h-12 md:h-14 bg-black text-white rounded-xl font-bold shadow-lg shadow-blue-200 hover:bg-blue-700 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 text-sm md:text-base disabled:opacity-60 disabled:cursor-not-allowed"
                                >
                                    {loading ? "Sending..." : "Send Message"}
                                    <Send className="w-4 h-4" />
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    );
}
