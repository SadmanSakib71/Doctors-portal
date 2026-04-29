import React, { useState } from "react";
import { Users, Calendar, FileText, DollarSign, Clock } from "lucide-react";
import { LineChart, Line, XAxis, Tooltip, ResponsiveContainer } from "recharts";
import { useClerk } from "@clerk/react";

const stats = [
  {
    title: "Total Patients",
    value: 1280,
    icon: Users,
    gradient: "from-blue-500 to-blue-300",
  },
  {
    title: "Today’s Appointments",
    value: 24,
    icon: Calendar,
    gradient: "from-green-500 to-green-300",
  },
  {
    title: "Pending Reports",
    value: 12,
    icon: FileText,
    gradient: "from-orange-500 to-orange-300",
  },
  {
    title: "Revenue",
    value: "$8,450",
    icon: DollarSign,
    gradient: "from-purple-500 to-purple-300",
  },
];

const appointments = [
  { name: "John Doe", time: "10:00 AM", status: "Confirmed" },
  { name: "Sarah Khan", time: "11:30 AM", status: "Pending" },
  { name: "Michael Lee", time: "01:00 PM", status: "Cancelled" },
  { name: "Emma Watson", time: "03:00 PM", status: "Confirmed" },
];

const chartData = [
  { name: "Mon", visits: 30 },
  { name: "Tue", visits: 45 },
  { name: "Wed", visits: 60 },
  { name: "Thu", visits: 40 },
  { name: "Fri", visits: 80 },
  { name: "Sat", visits: 55 },
  { name: "Sun", visits: 70 },
];

const StatusBadge = ({ status }) => {
  const color =
    status === "Confirmed"
      ? "bg-green-100 text-green-600"
      : status === "Pending"
        ? "bg-yellow-100 text-yellow-600"
        : "bg-red-100 text-red-600";

  return (
    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${color}`}>
      {status}
    </span>
  );
};

const DoctorsDashboard = () => {
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const { signOut } = useClerk();

  const handleLogout = () => {
    signOut();
  };
  return (
    <div className="max-w-384 mx-auto min-h-screen bg-slate-50 p-6 md:p-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-slate-800">
            Good morning, Dr. Ahmed 👨‍⚕️
          </h1>
          <p className="text-slate-500 mt-1">Tuesday, 28 April 2026</p>
        </div>

        <div className="mt-4 md:mt-0 flex items-center gap-3">
          <img
            onClick={() => setShowLogoutConfirm(true)}
            src="https://i.pravatar.cc/100"
            className="w-12 h-12 rounded-full border cursor-pointer"
          />
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((item, i) => {
          const Icon = item.icon;
          return (
            <div
              key={i}
              className={`p-5 rounded-2xl shadow-sm bg-gradient-to-r ${item.gradient} text-white`}
            >
              <div className="flex items-center justify-between">
                <Icon className="w-6 h-6 opacity-90" />
                <span className="text-sm opacity-80">Live</span>
              </div>
              <h2 className="text-2xl font-bold mt-4">{item.value}</h2>
              <p className="text-sm opacity-90">{item.title}</p>
            </div>
          );
        })}
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
        {/* Appointments */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm p-6">
          <h2 className="text-lg font-semibold text-slate-800 mb-4">
            Today’s Appointments
          </h2>

          <div className="space-y-4">
            {appointments.map((a, i) => (
              <div
                key={i}
                className="flex items-center justify-between p-4 bg-slate-50 rounded-xl"
              >
                <div>
                  <p className="font-medium text-slate-800">{a.name}</p>
                  <p className="text-sm text-slate-500 flex items-center gap-1">
                    <Clock className="w-4 h-4" /> {a.time}
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <StatusBadge status={a.status} />

                  <button className="text-sm px-3 py-1 rounded-lg bg-blue-600 text-white">
                    View
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Analytics */}
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <h2 className="text-lg font-semibold text-slate-800 mb-4">
            Patient Visits
          </h2>

          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <XAxis dataKey="name" />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="visits"
                  stroke="#3b82f6"
                  strokeWidth={3}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* --- MODAL signOut --- */}
      {showLogoutConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setShowLogoutConfirm(false)}
          />

          <div className="relative bg-white p-6 rounded-2xl shadow-xl w-80">
            <h2 className="text-lg font-bold mb-3">Sign out?</h2>
            <p className="text-sm text-slate-500 mb-5">
              Are you sure you want to Sign out?
            </p>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowLogoutConfirm(false)}
                className="px-4 py-2 rounded-xl bg-slate-100 cursor-pointer"
              >
                Cancel
              </button>

              <button
                onClick={handleLogout}
                className="px-4 py-2 rounded-xl bg-red-500 text-white cursor-pointer"
              >
                Sign out
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DoctorsDashboard;
