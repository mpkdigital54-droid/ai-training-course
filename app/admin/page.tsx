"use client";

import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { Users, TrendingUp, DollarSign, Clock } from "lucide-react";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

interface Registration {
  id: string;
  created_at: string;
  name: string;
  email: string;
  phone: string;
  level: string;
  plan: string;
  status: string;
}

export default function AdminDashboard() {
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    total: 0,
    premium: 0,
    free: 0,
    today: 0,
  });

  useEffect(() => {
    fetchRegistrations();
  }, []);

  const fetchRegistrations = async () => {
    const { data, error } = await supabase
      .from("registrations")
      .select("*")
      .order("created_at", { ascending: false });

    if (data) {
      setRegistrations(data);

      const today = new Date().toDateString();
      setStats({
        total: data.length,
        premium: data.filter((r) => r.plan === "premium").length,
        free: data.filter((r) => r.plan === "free").length,
        today: data.filter(
          (r) => new Date(r.created_at).toDateString() === today,
        ).length,
      });
    }
    setLoading(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-8 py-6">
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow p-6 border-l-4 border-purple-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total</p>
                <p className="text-3xl font-bold">{stats.total}</p>
              </div>
              <Users className="w-12 h-12 text-purple-500" />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow p-6 border-l-4 border-green-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Premium</p>
                <p className="text-3xl font-bold">{stats.premium}</p>
              </div>
              <DollarSign className="w-12 h-12 text-green-500" />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow p-6 border-l-4 border-blue-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Free</p>
                <p className="text-3xl font-bold">{stats.free}</p>
              </div>
              <TrendingUp className="w-12 h-12 text-blue-500" />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow p-6 border-l-4 border-orange-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Today</p>
                <p className="text-3xl font-bold">{stats.today}</p>
              </div>
              <Clock className="w-12 h-12 text-orange-500" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow overflow-hidden">
          <div className="px-6 py-4 border-b">
            <h2 className="text-xl font-semibold">All Registrations</h2>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Phone
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Level
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Plan
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {registrations.map((reg) => (
                  <tr key={reg.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm">
                      {new Date(reg.created_at).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-sm font-medium">
                      {reg.name}
                    </td>
                    <td className="px-6 py-4 text-sm">{reg.email}</td>
                    <td className="px-6 py-4 text-sm">{reg.phone}</td>
                    <td className="px-6 py-4 text-sm">
                      <span className="px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800 capitalize">
                        {reg.level}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <span
                        className={`px-2 py-1 text-xs font-medium rounded-full capitalize ${
                          reg.plan === "premium"
                            ? "bg-purple-100 text-purple-800"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {reg.plan}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-8 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl shadow-lg p-8 text-white">
          <h3 className="text-2xl font-bold mb-4">Potential Revenue</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <p className="text-purple-200 mb-2">Premium Registrations</p>
              <p className="text-4xl font-bold">{stats.premium}</p>
            </div>
            <div>
              <p className="text-purple-200 mb-2">Total Potential</p>
              <p className="text-4xl font-bold">
                KSh {(stats.premium * 2750).toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
