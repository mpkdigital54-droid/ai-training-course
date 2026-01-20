"use client";

import { useState, FormEvent } from "react";
import {
  CheckCircle,
  AlertCircle,
  Clock,
  Star,
  Users,
  Shield,
  Globe,
} from "lucide-react";

export default function Home() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    level: "",
    plan: "",
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [language, setLanguage] = useState("en");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...formData, language }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Registration failed");
      }

      setSubmitted(true);
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-900 flex items-center justify-center p-4">
        <div className="bg-slate-800 border border-purple-500/30 rounded-2xl p-8 max-w-md w-full text-center">
          <CheckCircle className="w-20 h-20 text-green-400 mx-auto mb-6" />
          <h2 className="text-3xl font-bold text-white mb-4">Success!</h2>
          <p className="text-gray-300 mb-6">
            Thank you,{" "}
            <span className="font-semibold text-purple-400">
              {formData.name}
            </span>
            !
          </p>
          <div className="bg-purple-900/30 border border-purple-500/30 rounded-lg p-6">
            <p className="text-gray-200 mb-3">
              We will contact you within 24 hours at:
            </p>
            <p className="font-semibold text-white">{formData.email}</p>
            <p className="font-semibold text-white">{formData.phone}</p>
          </div>
          <div className="mt-6 flex items-center justify-center gap-2 text-green-400">
            <Shield className="w-5 h-5" />
            <span>Your information is secure</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-900 py-12 px-4">
      <div className="max-w-4xl mx-auto mb-4 flex justify-end">
        <button
          onClick={() => setLanguage(language === "en" ? "sw" : "en")}
          className="flex items-center gap-2 px-4 py-2 bg-slate-800 border border-purple-500/30 rounded-lg text-white hover:bg-slate-700 transition"
        >
          <Globe className="w-4 h-4" />
          {language === "en" ? "Swahili" : "English"}
        </button>
      </div>

      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-pink-400 via-purple-400 to-orange-400 bg-clip-text text-transparent mb-3">
            AI Training Course
          </h1>
          <p className="text-lg text-purple-200">
            Master Generative AI: Text, Image & Video Creation
          </p>

          <div className="flex items-center justify-center gap-6 mt-6 flex-wrap">
            <div className="flex items-center gap-2 text-gray-300">
              <Users className="w-5 h-5 text-purple-400" />
              <span className="text-sm">500+ Students</span>
            </div>
            <div className="flex items-center gap-2 text-gray-300">
              <Star className="w-5 h-5 text-yellow-400" />
              <span className="text-sm">4.9/5 Rating</span>
            </div>
            <div className="flex items-center gap-2 text-gray-300">
              <Shield className="w-5 h-5 text-green-400" />
              <span className="text-sm">Certified</span>
            </div>
          </div>
        </div>

        <div className="bg-slate-800 border border-purple-500/30 rounded-2xl p-8 shadow-2xl">
          <h2 className="text-2xl font-bold text-white mb-6">Register Now</h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="name"
                className="block text-white mb-2 font-medium"
              >
                Full Name *
              </label>
              <input
                type="text"
                id="name"
                required
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="w-full px-4 py-3 bg-slate-700 text-white border border-slate-600 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
                placeholder="Enter your full name"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-white mb-2 font-medium"
              >
                Email Address *
              </label>
              <input
                type="email"
                id="email"
                required
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="w-full px-4 py-3 bg-slate-700 text-white border border-slate-600 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
                placeholder="your.email@example.com"
              />
            </div>

            <div>
              <label
                htmlFor="phone"
                className="block text-white mb-2 font-medium"
              >
                Phone Number *
              </label>
              <input
                type="tel"
                id="phone"
                required
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
                className="w-full px-4 py-3 bg-slate-700 text-white border border-slate-600 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
                placeholder="+254 700 000 000"
              />
            </div>

            <div>
              <label
                htmlFor="level"
                className="block text-white mb-2 font-medium"
              >
                Select Your Level *
              </label>
              <select
                id="level"
                required
                value={formData.level}
                onChange={(e) =>
                  setFormData({ ...formData, level: e.target.value })
                }
                className="w-full px-4 py-3 bg-slate-700 text-white border border-slate-600 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
              >
                <option value="">Choose your level</option>
                <option value="beginner">Beginner - Learn AI basics</option>
                <option value="intermediate">
                  Intermediate - Advanced skills
                </option>
                <option value="expert">Expert - Master AI workflows</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="plan"
                className="block text-white mb-2 font-medium"
              >
                Select Your Plan *
              </label>
              <select
                id="plan"
                required
                value={formData.plan}
                onChange={(e) =>
                  setFormData({ ...formData, plan: e.target.value })
                }
                className="w-full px-4 py-3 bg-slate-700 text-white border border-slate-600 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
              >
                <option value="">Choose a plan</option>
                <option value="free">Free Version</option>
                <option value="premium">Premium Version - KSh 2,750</option>
              </select>
            </div>

            {error && (
              <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 flex items-center gap-2">
                <AlertCircle className="w-5 h-5" />
                <span>{error}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-4 rounded-lg font-semibold text-white transition ${
                loading
                  ? "bg-gray-600 cursor-not-allowed"
                  : "bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600 hover:shadow-xl"
              }`}
            >
              {loading ? "Submitting..." : "Register Now →"}
            </button>
          </form>

          <div className="mt-6 p-4 bg-purple-900/30 border border-purple-500/30 rounded-lg">
            <p className="text-sm text-gray-200 text-center flex items-center justify-center gap-2">
              <Clock className="w-4 h-4" />
              We will contact you within 24 hours
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
