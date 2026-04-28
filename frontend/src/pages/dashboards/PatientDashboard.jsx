import { useState } from "react";
import {
  CalendarPlus,
  Calendar,
  Activity,
  Stethoscope,
  Sparkles,
  HeartPulse,
  Droplet,
  X,
  CheckCircle2,
} from "lucide-react";
import { useClerk } from "@clerk/react";

const PatientDashboard = () => {
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const { signOut } = useClerk();

  const handleLogout = () => {
    signOut();
  };
  // --- STATE MANAGEMENT ---
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [appointments, setAppointments] = useState([
    {
      id: 1,
      doctor: "Dr. Emily Chen",
      specialty: "Cardiology",
      date: "Oct 24",
      time: "10:00 AM",
    },
  ]);
  const [formData, setFormData] = useState({ doctor: "", date: "", time: "" });

  // --- HANDLERS ---
  const addNotification = (msg) => {
    const id = Date.now();
    setNotifications([...notifications, { id, msg }]);
    setTimeout(
      () => setNotifications((n) => n.filter((item) => item.id !== id)),
      3000,
    );
  };

  // 1. Define your available slots (could later come from an API)
  const timeSlots = [
    "09:00 AM",
    "10:30 AM",
    "01:00 PM",
    "02:30 PM",
    "04:00 PM",
    "09:00 AM",
    "10:30 AM",
    "01:00 PM",
    "02:30 PM",
    "04:00 PM",
  ];

  const handleBookAppointment = (e) => {
    e.preventDefault();
    if (!formData.doctor || !formData.date) return;

    const newApt = {
      id: appointments.length + 1,
      doctor: formData.doctor,
      specialty: "General Medicine",
      date: formData.date,
      time: formData.time || "09:00 AM",
    };

    setAppointments([newApt, ...appointments]);
    setIsModalOpen(false);
    setFormData({ doctor: "", date: "", time: "" });
    addNotification("Appointment booked successfully!");
  };
  return (
    <div className="max-w-384 mx-auto min-h-screen bg-[#F8FAFC] relative overflow-hidden font-sans text-slate-800">
      <div className="space-y-10 p-6 md:p-10 relative z-10">
        {/* Hero Section */}
        <div>
          <div className="space-y-3 flex flex-col md:flex-row md:items-center md:justify-between mb-8">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white shadow-sm border border-slate-100 text-sm font-medium text-slate-500">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>Monday, April 27</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900">
                Good morning, <span className="text-blue-600">Sarah</span>.
              </h1>
            </div>

            <div className="mt-4 md:mt-0 flex items-center gap-3">
              <img
                onClick={() => setShowLogoutConfirm(true)}
                src="https://i.pravatar.cc/100"
                className="w-12 h-12 rounded-full border cursor-pointer"
              />
            </div>
          </div>
        </div>

        {/* Primary Action Card */}
        <section className="relative group bg-slate-900 rounded-[2.5rem] p-8 md:p-10 text-white shadow-2xl shadow-slate-900/20 overflow-hidden">
          <div className="absolute inset-0 bg-linear-to-br from-blue-600 to-indigo-900 opacity-90"></div>
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="text-center md:text-left">
              <h2 className="text-3xl font-bold mb-2">Schedule a Checkup</h2>
              <p className="text-blue-100 text-lg font-light">
                Get expert medical advice from our top-rated specialists.
              </p>
            </div>
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-white text-indigo-600 hover:scale-105 active:scale-95 font-bold py-4 px-10 rounded-2xl shadow-lg transition-all flex items-center gap-2"
            >
              <CalendarPlus className="w-5 h-5" />
              Book Now
            </button>
          </div>
        </section>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Appointments Card with Dynamic Data */}
          <div className="bg-white rounded-4xl p-8 shadow-sm border border-slate-100">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-xl font-bold flex items-center gap-3">
                <Calendar className="text-blue-500" /> Upcoming
              </h3>
              <span className="bg-blue-50 text-blue-600 text-xs font-bold px-3 py-1 rounded-full">
                {appointments.length} Total
              </span>
            </div>

            <div className="space-y-4 max-h-75 overflow-y-auto pr-2 custom-scrollbar">
              {appointments.length > 0 ? (
                appointments.map((apt) => (
                  <div
                    key={apt.id}
                    className="group p-5 bg-slate-50 rounded-3xl border border-transparent hover:border-blue-100 hover:bg-white transition-all"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="bg-white p-3 rounded-2xl shadow-sm text-blue-600">
                          <Stethoscope />
                        </div>
                        <div>
                          <p className="font-bold text-slate-900">
                            {apt.doctor}
                          </p>
                          <p className="text-sm text-slate-500">
                            {apt.specialty}
                          </p>
                        </div>
                      </div>
                      <div className="text-right text-sm font-bold text-slate-700">
                        <div>{apt.date}</div>
                        <div className="text-blue-500">{apt.time}</div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-10 text-slate-400">
                  No appointments found.
                </div>
              )}
            </div>
          </div>

          {/* Health Stats */}
          <div className="bg-white rounded-4xl p-8 shadow-sm border border-slate-100">
            <h3 className="text-xl font-bold flex items-center gap-3 mb-8">
              <Activity className="text-teal-500" /> Vital Signs
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <HealthStat
                icon={<HeartPulse className="text-rose-500" />}
                label="Heart Rate"
                value="72"
                unit="bpm"
                color="bg-rose-50"
              />
              <HealthStat
                icon={<Droplet className="text-blue-500" />}
                label="Blood Pressure"
                value="120/80"
                unit=""
                color="bg-blue-50"
              />
            </div>
          </div>
        </div>
      </div>

      {/* --- MODAL DIALOG --- */}
      {isModalOpen && (
        <div className="fixed inset-0 z-100 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            onClick={() => setIsModalOpen(false)}
          ></div>
          <div className="relative bg-white w-full max-w-md rounded-[2.5rem] shadow-2xl p-8 animate-modal-up">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute right-6 top-6 p-2 hover:bg-slate-100 rounded-full transition-colors"
            >
              <X className="w-5 h-5 text-slate-400" />
            </button>
            <h2 className="text-2xl font-bold mb-6">Book an Appointment</h2>
            <form onSubmit={handleBookAppointment} className="space-y-5">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">
                  Select Doctor
                </label>
                <select
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-4 outline-none focus:ring-2 ring-blue-500/20"
                  onChange={(e) =>
                    setFormData({ ...formData, doctor: e.target.value })
                  }
                  required
                >
                  <option value="">Choose a specialist...</option>
                  <option value="Dr. James Wilson">
                    Dr. James Wilson (General)
                  </option>
                  <option value="Dr. Sarah Jenkins">
                    Dr. Sarah Jenkins (Dermatology)
                  </option>
                  <option value="Dr. Robert Fox">
                    Dr. Robert Fox (Neurology)
                  </option>
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">
                    Date
                  </label>
                  <input
                    type="date"
                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-4 outline-none focus:ring-2 ring-blue-500/20"
                    onChange={(e) =>
                      setFormData({ ...formData, date: e.target.value })
                    }
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">
                    Preferred Time
                  </label>

                  <div className="relative group">
                    <select
                      value={formData.time}
                      onChange={(e) =>
                        setFormData({ ...formData, time: e.target.value })
                      }
                      className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-4 outline-none focus:ring-2 ring-blue-500/20 appearance-none cursor-pointer font-medium text-slate-700 transition-all hover:border-slate-300"
                      required
                    >
                      <option value="" disabled>
                        Select a time slot...
                      </option>

                      {timeSlots.map((slot) => (
                        <option key={slot} value={slot}>
                          {slot}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white font-bold py-4 rounded-2xl shadow-lg shadow-blue-500/30 hover:bg-blue-700 transition-all mt-4"
              >
                Confirm Booking
              </button>
            </form>
          </div>
        </div>
      )}

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

// Helper Component for Stats
const HealthStat = ({ icon, label, value, unit, color }) => (
  <div
    className={`${color} p-6 rounded-4xl border border-white transition-transform hover:scale-[1.02]`}
  >
    <div className="bg-white w-10 h-10 rounded-xl flex items-center justify-center shadow-sm mb-4">
      {icon}
    </div>
    <p className="text-sm font-bold text-slate-500 mb-1">{label}</p>
    <p className="text-2xl font-black text-slate-900">
      {value}{" "}
      <span className="text-xs font-medium text-slate-400 uppercase tracking-widest">
        {unit}
      </span>
    </p>
  </div>
);

export default PatientDashboard;
