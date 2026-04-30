import { useState } from "react";

// ─── Data ────────────────────────────────────────────────────────────────────

const patients = [
  {
    id: "P-00412",
    name: "Samira Akter",
    initials: "SA",
    age: 34,
    condition: "Hypertension",
    status: "Active",
    color: "bg-emerald-50 text-emerald-700",
  },
  {
    id: "P-00411",
    name: "Rafiq Hossain",
    initials: "RH",
    age: 58,
    condition: "Diabetes",
    status: "Active",
    color: "bg-blue-50 text-blue-700",
  },
  {
    id: "P-00410",
    name: "Nadia Khan",
    initials: "NK",
    age: 27,
    condition: "Migraine",
    status: "Pending",
    color: "bg-amber-50 text-amber-700",
  },
  {
    id: "P-00409",
    name: "Masud Islam",
    initials: "MI",
    age: 45,
    condition: "Fracture",
    status: "Active",
    color: "bg-purple-50 text-purple-700",
  },
  {
    id: "P-00408",
    name: "Taslima Begum",
    initials: "TB",
    age: 62,
    condition: "Arthritis",
    status: "Inactive",
    color: "bg-red-50 text-red-700",
  },
];

const doctors = [
  {
    id: "D-0021",
    name: "Dr. Karim",
    initials: "DK",
    specialty: "Cardiology",
    patients: 142,
    status: "Active",
    avatarColor: "bg-blue-50 text-blue-700",
    specColor: "bg-blue-50 text-blue-700",
  },
  {
    id: "D-0020",
    name: "Dr. Rahman",
    initials: "DR",
    specialty: "Neurology",
    patients: 98,
    status: "Active",
    avatarColor: "bg-purple-50 text-purple-700",
    specColor: "bg-purple-50 text-purple-700",
  },
  {
    id: "D-0019",
    name: "Dr. Ahmed",
    initials: "DA",
    specialty: "Pediatrics",
    patients: 207,
    status: "Active",
    avatarColor: "bg-green-50 text-green-700",
    specColor: "bg-green-50 text-green-700",
  },
  {
    id: "D-0018",
    name: "Dr. Chowdhury",
    initials: "DC",
    specialty: "Orthopedics",
    patients: 76,
    status: "On Leave",
    avatarColor: "bg-amber-50 text-amber-700",
    specColor: "bg-amber-50 text-amber-700",
  },
  {
    id: "D-0017",
    name: "Dr. Sultana",
    initials: "DS",
    specialty: "Dermatology",
    patients: 115,
    status: "Active",
    avatarColor: "bg-pink-50 text-pink-700",
    specColor: "bg-pink-50 text-pink-700",
  },
];

const appointments = [
  {
    time: "09:00 AM",
    name: "Samira Akter",
    initials: "SA",
    doctor: "Dr. Karim · Cardiology",
    status: "Confirmed",
    avatarColor: "bg-emerald-50 text-emerald-700",
  },
  {
    time: "10:30 AM",
    name: "Masud Islam",
    initials: "MI",
    doctor: "Dr. Chowdhury · Ortho",
    status: "Waiting",
    avatarColor: "bg-purple-50 text-purple-700",
  },
  {
    time: "11:00 AM",
    name: "Rafiq Hossain",
    initials: "RH",
    doctor: "Dr. Rahman · Neurology",
    status: "Confirmed",
    avatarColor: "bg-blue-50 text-blue-700",
  },
  {
    time: "02:00 PM",
    name: "Nadia Khan",
    initials: "NK",
    doctor: "Dr. Rahman · Neurology",
    status: "Cancelled",
    avatarColor: "bg-pink-50 text-pink-700",
  },
  {
    time: "03:30 PM",
    name: "Taslima Begum",
    initials: "TB",
    doctor: "Dr. Ahmed · Pediatrics",
    status: "Waiting",
    avatarColor: "bg-amber-50 text-amber-700",
  },
];

const weeklyBars = [45, 62, 55, 85, 70, 30, 20];
const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const deptSplit = [
  { label: "Cardiology", count: 218, color: "bg-emerald-500" },
  { label: "Neurology", count: 174, color: "bg-purple-400" },
  { label: "Pediatrics", count: 210, color: "bg-green-400" },
  { label: "Others", count: 161, color: "bg-amber-400" },
];

const stats = [
  {
    label: "Total Patients",
    value: "3,482",
    change: "↑ 12% this month",
    up: true,
    bg: "bg-emerald-50",
    iconColor: "text-emerald-600",
  },
  {
    label: "Active Doctors",
    value: "84",
    change: "↑ 3 new this week",
    up: true,
    bg: "bg-blue-50",
    iconColor: "text-blue-600",
  },
  {
    label: "Appointments Today",
    value: "127",
    change: "↓ 5% vs yesterday",
    up: false,
    bg: "bg-amber-50",
    iconColor: "text-amber-600",
  },
  {
    label: "Pending Reviews",
    value: "18",
    change: "↑ 4 need urgent action",
    up: false,
    bg: "bg-red-50",
    iconColor: "text-red-600",
  },
];

const navItems = [
  { label: "Dashboard", icon: "grid" },
  { label: "Patients", icon: "users" },
  { label: "Doctors", icon: "user" },
  { label: "Appointments", icon: "calendar" },
];

const navManage = [
  { label: "Departments", icon: "layers" },
  { label: "Billing", icon: "shield" },
  { label: "Settings", icon: "settings" },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

function StatusBadge({ status }) {
  const map = {
    Active: "bg-emerald-50 text-emerald-700",
    Pending: "bg-amber-50 text-amber-700",
    Inactive: "bg-red-50 text-red-700",
    "On Leave": "bg-amber-50 text-amber-700",
    Confirmed: "bg-emerald-50 text-emerald-700",
    Waiting: "bg-amber-50 text-amber-700",
    Cancelled: "bg-red-50 text-red-700",
  };
  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium whitespace-nowrap ${map[status] || "bg-gray-100 text-gray-600"}`}
    >
      {status}
    </span>
  );
}

function Avatar({ initials, colorClass, size = "md" }) {
  const s = size === "sm" ? "w-7 h-7 text-xs" : "w-8 h-8 text-xs";
  return (
    <div
      className={`${s} rounded-full flex items-center justify-center font-medium shrink-0 ${colorClass}`}
    >
      {initials}
    </div>
  );
}

function NavIcon({ icon, active }) {
  const cls = `w-4 h-4 flex-shrink-0 ${active ? "stroke-emerald-600" : "stroke-gray-400"}`;
  const icons = {
    grid: (
      <svg className={cls} fill="none" strokeWidth={1.8} viewBox="0 0 24 24">
        <rect x="3" y="3" width="7" height="7" />
        <rect x="14" y="3" width="7" height="7" />
        <rect x="14" y="14" width="7" height="7" />
        <rect x="3" y="14" width="7" height="7" />
      </svg>
    ),
    users: (
      <svg className={cls} fill="none" strokeWidth={1.8} viewBox="0 0 24 24">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    user: (
      <svg className={cls} fill="none" strokeWidth={1.8} viewBox="0 0 24 24">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
      </svg>
    ),
    calendar: (
      <svg className={cls} fill="none" strokeWidth={1.8} viewBox="0 0 24 24">
        <rect x="3" y="4" width="18" height="18" rx="2" />
        <line x1="16" y1="2" x2="16" y2="6" />
        <line x1="8" y1="2" x2="8" y2="6" />
        <line x1="3" y1="10" x2="21" y2="10" />
      </svg>
    ),
    layers: (
      <svg className={cls} fill="none" strokeWidth={1.8} viewBox="0 0 24 24">
        <polygon points="12 2 2 7 12 12 22 7 12 2" />
        <polyline points="2 17 12 22 22 17" />
        <polyline points="2 12 12 17 22 12" />
      </svg>
    ),
    shield: (
      <svg className={cls} fill="none" strokeWidth={1.8} viewBox="0 0 24 24">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
    settings: (
      <svg className={cls} fill="none" strokeWidth={1.8} viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="3" />
        <path d="M19.07 4.93l-1.41 1.41M4.93 4.93l1.41 1.41M12 2v2M12 20v2M4.93 19.07l1.41-1.41M18.66 18.66l-1.41-1.41M2 12h2M20 12h2" />
      </svg>
    ),
    menu: (
      <svg
        className="w-5 h-5 stroke-gray-600"
        fill="none"
        strokeWidth={1.8}
        viewBox="0 0 24 24"
      >
        <line x1="3" y1="6" x2="21" y2="6" />
        <line x1="3" y1="12" x2="21" y2="12" />
        <line x1="3" y1="18" x2="21" y2="18" />
      </svg>
    ),
    close: (
      <svg
        className="w-5 h-5 stroke-gray-600"
        fill="none"
        strokeWidth={1.8}
        viewBox="0 0 24 24"
      >
        <line x1="18" y1="6" x2="6" y2="18" />
        <line x1="6" y1="6" x2="18" y2="18" />
      </svg>
    ),
  };
  return icons[icon] || null;
}

// ─── Sidebar content (reused in desktop + mobile drawer) ─────────────────────

function SidebarContent({ activeNav, setActiveNav, onClose }) {
  return (
    <div className="flex flex-col h-full">
      {/* Logo row */}
      <div className="flex items-center justify-between px-4 py-4 border-b border-gray-100">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-emerald-500 flex items-center justify-center shrink-0">
            <svg
              className="w-4 h-4 text-white"
              fill="none"
              stroke="currentColor"
              strokeWidth={2.2}
              viewBox="0 0 24 24"
            >
              <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
            </svg>
          </div>
          <div>
            <div className="text-sm font-semibold text-gray-800">MedPortal</div>
            <div className="text-xs text-gray-400">Admin Console</div>
          </div>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-gray-100"
          >
            <NavIcon icon="close" />
          </button>
        )}
      </div>

      {/* Nav links */}
      <nav className="flex-1 py-3 px-2 flex flex-col gap-0.5 overflow-y-auto">
        <p className="text-xs text-gray-400 font-medium uppercase tracking-wider px-2 py-2">
          Overview
        </p>
        {navItems.map((item) => (
          <button
            key={item.label}
            onClick={() => {
              setActiveNav(item.label);
              onClose?.();
            }}
            className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-colors text-left ${
              activeNav === item.label
                ? "bg-emerald-50 text-emerald-700 font-medium"
                : "text-gray-500 hover:bg-gray-50 hover:text-gray-700"
            }`}
          >
            <NavIcon icon={item.icon} active={activeNav === item.label} />
            {item.label}
          </button>
        ))}

        <p className="text-xs text-gray-400 font-medium uppercase tracking-wider px-2 py-2 mt-2">
          Management
        </p>
        {navManage.map((item) => (
          <button
            key={item.label}
            onClick={() => {
              setActiveNav(item.label);
              onClose?.();
            }}
            className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-colors text-left ${
              activeNav === item.label
                ? "bg-emerald-50 text-emerald-700 font-medium"
                : "text-gray-500 hover:bg-gray-50 hover:text-gray-700"
            }`}
          >
            <NavIcon icon={item.icon} active={activeNav === item.label} />
            {item.label}
          </button>
        ))}
      </nav>

      {/* Profile */}
      <div className="px-3 py-3 border-t border-gray-100">
        <div className="flex items-center gap-2.5 px-2 py-2 rounded-lg hover:bg-gray-50 cursor-pointer">
          <div className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center text-white text-xs font-medium shrink-0">
            AD
          </div>
          <div className="min-w-0">
            <div className="text-xs font-medium text-gray-800">Admin</div>
            <div className="text-xs text-gray-400 truncate">
              admin@medportal.com
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Main export ──────────────────────────────────────────────────────────────

export default function AdminDashboard() {
  const [activeNav, setActiveNav] = useState("Dashboard");
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <div className="flex h-screen bg-gray-50 font-sans overflow-hidden">
      {/* Desktop sidebar */}
      <aside className="hidden lg:flex w-56 flex-shrink-0 bg-white border-r border-gray-100 flex-col">
        <SidebarContent activeNav={activeNav} setActiveNav={setActiveNav} />
      </aside>

      {/* Mobile drawer */}
      {drawerOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div
            className="absolute inset-0 bg-black/30"
            onClick={() => setDrawerOpen(false)}
          />
          <aside className="absolute left-0 top-0 bottom-0 w-64 bg-white shadow-xl z-50 flex flex-col">
            <SidebarContent
              activeNav={activeNav}
              setActiveNav={setActiveNav}
              onClose={() => setDrawerOpen(false)}
            />
          </aside>
        </div>
      )}

      {/* Main */}
      <div className="flex-1 flex flex-col overflow-hidden min-w-0">
        {/* Topbar */}
        <header className="h-14 bg-white border-b border-gray-100 flex items-center justify-between px-4 md:px-6 flex-shrink-0">
          <div className="flex items-center gap-3">
            <button
              className="lg:hidden p-1.5 rounded-lg hover:bg-gray-100"
              onClick={() => setDrawerOpen(true)}
            >
              <NavIcon icon="menu" />
            </button>
            <h1 className="text-sm font-semibold text-gray-800">
              Admin Dashboard
            </h1>
          </div>
          <div className="flex items-center gap-2 md:gap-3">
            <div className="hidden sm:flex items-center gap-2 bg-gray-50 border border-gray-100 rounded-lg px-3 py-1.5 w-36 md:w-48">
              <svg
                className="w-3.5 h-3.5 text-gray-400 flex-shrink-0"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <span className="text-xs text-gray-400">Search...</span>
            </div>
            <div className="relative w-8 h-8 rounded-lg bg-gray-50 border border-gray-100 flex items-center justify-center cursor-pointer hover:bg-gray-100">
              <svg
                className="w-4 h-4 text-gray-500"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.8}
                viewBox="0 0 24 24"
              >
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                <path d="M13.73 21a2 2 0 0 1-3.46 0" />
              </svg>
              <span className="absolute top-1 right-1 w-1.5 h-1.5 bg-red-500 rounded-full" />
            </div>
            <div className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center text-white text-xs font-medium cursor-pointer">
              AD
            </div>
          </div>
        </header>

        {/* Scrollable content — extra bottom padding for mobile nav */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6 pb-20 lg:pb-6 flex flex-col gap-4 md:gap-5">
          {/* Stats: 2 cols mobile → 4 cols desktop */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            {stats.map((s) => (
              <div
                key={s.label}
                className="bg-white border border-gray-100 rounded-xl p-3 md:p-4"
              >
                <div
                  className={`w-8 h-8 md:w-9 md:h-9 rounded-lg ${s.bg} flex items-center justify-center mb-2 md:mb-3`}
                >
                  <svg
                    className={`w-4 h-4 ${s.iconColor}`}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={1.8}
                    viewBox="0 0 24 24"
                  >
                    <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                  </svg>
                </div>
                <p className="text-xs text-gray-400 mb-0.5 leading-tight">
                  {s.label}
                </p>
                <p className="text-xl md:text-2xl font-semibold text-gray-800">
                  {s.value}
                </p>
                <p
                  className={`text-xs mt-1 leading-tight ${s.up ? "text-emerald-600" : "text-red-500"}`}
                >
                  {s.change}
                </p>
              </div>
            ))}
          </div>

          {/* Tables: stacked → side-by-side on xl */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 md:gap-5">
            {/* Patients */}
            <div className="bg-white border border-gray-100 rounded-xl overflow-hidden">
              <div className="flex items-center justify-between px-4 md:px-5 py-3.5 border-b border-gray-100">
                <h2 className="text-sm font-semibold text-gray-800">
                  Recent Patients
                </h2>
                <button className="text-xs text-emerald-600 hover:underline">
                  View all
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm min-w-[400px]">
                  <thead>
                    <tr>
                      {["Patient", "Age", "Condition", "Status"].map((h) => (
                        <th
                          key={h}
                          className="text-left text-xs text-gray-400 font-medium uppercase tracking-wider px-4 md:px-5 py-2.5 border-b border-gray-100"
                        >
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {patients.map((p) => (
                      <tr
                        key={p.id}
                        className="hover:bg-gray-50 transition-colors"
                      >
                        <td className="px-4 md:px-5 py-3">
                          <div className="flex items-center gap-2">
                            <Avatar
                              initials={p.initials}
                              colorClass={p.color}
                            />
                            <div>
                              <div className="text-xs font-medium text-gray-800 whitespace-nowrap">
                                {p.name}
                              </div>
                              <div className="text-xs text-gray-400">
                                {p.id}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 md:px-5 py-3 text-xs text-gray-600">
                          {p.age}
                        </td>
                        <td className="px-4 md:px-5 py-3 text-xs text-gray-600 whitespace-nowrap">
                          {p.condition}
                        </td>
                        <td className="px-4 md:px-5 py-3">
                          <StatusBadge status={p.status} />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Doctors */}
            <div className="bg-white border border-gray-100 rounded-xl overflow-hidden">
              <div className="flex items-center justify-between px-4 md:px-5 py-3.5 border-b border-gray-100">
                <h2 className="text-sm font-semibold text-gray-800">
                  Doctors Overview
                </h2>
                <button className="text-xs text-emerald-600 hover:underline">
                  View all
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm min-w-[400px]">
                  <thead>
                    <tr>
                      {["Doctor", "Specialty", "Patients", "Status"].map(
                        (h) => (
                          <th
                            key={h}
                            className="text-left text-xs text-gray-400 font-medium uppercase tracking-wider px-4 md:px-5 py-2.5 border-b border-gray-100"
                          >
                            {h}
                          </th>
                        ),
                      )}
                    </tr>
                  </thead>
                  <tbody>
                    {doctors.map((d) => (
                      <tr
                        key={d.id}
                        className="hover:bg-gray-50 transition-colors"
                      >
                        <td className="px-4 md:px-5 py-3">
                          <div className="flex items-center gap-2">
                            <Avatar
                              initials={d.initials}
                              colorClass={d.avatarColor}
                            />
                            <div>
                              <div className="text-xs font-medium text-gray-800 whitespace-nowrap">
                                {d.name}
                              </div>
                              <div className="text-xs text-gray-400">
                                {d.id}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 md:px-5 py-3">
                          <span
                            className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium whitespace-nowrap ${d.specColor}`}
                          >
                            {d.specialty}
                          </span>
                        </td>
                        <td className="px-4 md:px-5 py-3 text-xs text-gray-600">
                          {d.patients}
                        </td>
                        <td className="px-4 md:px-5 py-3">
                          <StatusBadge status={d.status} />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Bottom row: stacked → side-by-side on xl */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 md:gap-5">
            {/* Appointments */}
            <div className="bg-white border border-gray-100 rounded-xl overflow-hidden">
              <div className="flex items-center justify-between px-4 md:px-5 py-3.5 border-b border-gray-100">
                <h2 className="text-sm font-semibold text-gray-800">
                  Today's Appointments
                </h2>
                <button className="text-xs text-emerald-600 hover:underline">
                  Full schedule
                </button>
              </div>
              {appointments.map((a, i) => (
                <div
                  key={i}
                  className={`flex items-center gap-3 px-4 md:px-5 py-3 hover:bg-gray-50 transition-colors ${i < appointments.length - 1 ? "border-b border-gray-100" : ""}`}
                >
                  <span className="text-xs text-gray-400 w-16 flex-shrink-0">
                    {a.time}
                  </span>
                  <Avatar
                    initials={a.initials}
                    colorClass={a.avatarColor}
                    size="sm"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-medium text-gray-800 truncate">
                      {a.name}
                    </div>
                    <div className="text-xs text-gray-400 truncate">
                      {a.doctor}
                    </div>
                  </div>
                  <StatusBadge status={a.status} />
                </div>
              ))}
            </div>

            {/* Weekly chart */}
            <div className="bg-white border border-gray-100 rounded-xl overflow-hidden">
              <div className="flex items-center justify-between px-4 md:px-5 py-3.5 border-b border-gray-100">
                <h2 className="text-sm font-semibold text-gray-800">
                  Weekly Appointments
                </h2>
                <span className="text-xs text-gray-400">Apr 24 – Apr 30</span>
              </div>
              <div className="px-4 md:px-5 pt-4 pb-2">
                <div className="flex items-baseline justify-between mb-4">
                  <span className="text-2xl font-semibold text-gray-800">
                    763
                  </span>
                  <span className="text-xs text-emerald-600">
                    ↑ 8.4% vs last week
                  </span>
                </div>
                <div className="flex items-end gap-1.5 h-16 mb-1">
                  {weeklyBars.map((h, i) => (
                    <div
                      key={i}
                      className={`flex-1 rounded-t-sm transition-colors ${h === 85 ? "bg-emerald-500" : "bg-emerald-100 hover:bg-emerald-300"}`}
                      style={{ height: `${h}%` }}
                    />
                  ))}
                </div>
                <div className="flex justify-between text-xs text-gray-300">
                  {weekDays.map((d) => (
                    <span key={d}>{d}</span>
                  ))}
                </div>
              </div>
              <div className="border-t border-gray-100 px-4 md:px-5 py-3">
                <p className="text-xs text-gray-400 font-medium mb-2">
                  Department split
                </p>
                <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                  {deptSplit.map((d) => (
                    <div
                      key={d.label}
                      className="flex items-center gap-2 text-xs"
                    >
                      <div
                        className={`w-2 h-2 rounded-sm ${d.color} flex-shrink-0`}
                      />
                      <span className="flex-1 text-gray-400 truncate">
                        {d.label}
                      </span>
                      <span className="font-medium text-gray-700">
                        {d.count}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </main>

        {/* Mobile bottom nav */}
        <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 flex z-30">
          {navItems.map((item) => (
            <button
              key={item.label}
              onClick={() => setActiveNav(item.label)}
              className={`flex-1 flex flex-col items-center justify-center py-2 gap-1 transition-colors ${activeNav === item.label ? "text-emerald-600" : "text-gray-400"}`}
            >
              <NavIcon icon={item.icon} active={activeNav === item.label} />
              <span className="text-[10px] leading-none">{item.label}</span>
            </button>
          ))}
        </nav>
      </div>
    </div>
  );
}
