import { useState } from "react";

export const DOCTORS = [
  {
    id: "D-001",
    name: "Dr. Karim",
    initials: "DK",
    specialty: "Cardiology",
    patients: 142,
    status: "Active",
    avatar: "bg-blue-100 text-blue-700",
    experience: "12 yrs",
    rating: 4.9,
    phone: "+880 1711-001001",
    email: "karim@medportal.com",
  },
  {
    id: "D-002",
    name: "Dr. Rahman",
    initials: "DR",
    specialty: "Neurology",
    patients: 98,
    status: "Active",
    avatar: "bg-purple-100 text-purple-700",
    experience: "9 yrs",
    rating: 4.7,
    phone: "+880 1711-002002",
    email: "rahman@medportal.com",
  },
  {
    id: "D-003",
    name: "Dr. Ahmed",
    initials: "DA",
    specialty: "Pediatrics",
    patients: 207,
    status: "Active",
    avatar: "bg-green-100 text-green-700",
    experience: "15 yrs",
    rating: 4.8,
    phone: "+880 1711-003003",
    email: "ahmed@medportal.com",
  },
  {
    id: "D-004",
    name: "Dr. Chowdhury",
    initials: "DC",
    specialty: "Orthopedics",
    patients: 76,
    status: "On Leave",
    avatar: "bg-amber-100 text-amber-700",
    experience: "8 yrs",
    rating: 4.6,
    phone: "+880 1711-004004",
    email: "chowdhury@medportal.com",
  },
  {
    id: "D-005",
    name: "Dr. Sultana",
    initials: "DS",
    specialty: "Dermatology",
    patients: 115,
    status: "Active",
    avatar: "bg-pink-100 text-pink-700",
    experience: "11 yrs",
    rating: 4.8,
    phone: "+880 1711-005005",
    email: "sultana@medportal.com",
  },
];

export const PATIENTS = [
  {
    id: "P-001",
    name: "Samira Akter",
    initials: "SA",
    age: 34,
    blood: "B+",
    weight: "62 kg",
    height: "5'4\"",
    condition: "Hypertension",
    doctorId: "D-001",
    status: "Active",
    phone: "+880 1712-111111",
    email: "samira@email.com",
    avatar: "bg-emerald-100 text-emerald-700",
    lastVisit: "Apr 10",
  },
  {
    id: "P-002",
    name: "Rafiq Hossain",
    initials: "RH",
    age: 58,
    blood: "A+",
    weight: "78 kg",
    height: "5'8\"",
    condition: "Diabetes",
    doctorId: "D-002",
    status: "Active",
    phone: "+880 1712-222222",
    email: "rafiq@email.com",
    avatar: "bg-blue-100 text-blue-700",
    lastVisit: "Apr 8",
  },
  {
    id: "P-003",
    name: "Nadia Khan",
    initials: "NK",
    age: 27,
    blood: "O-",
    weight: "55 kg",
    height: "5'2\"",
    condition: "Migraine",
    doctorId: "D-002",
    status: "Pending",
    phone: "+880 1712-333333",
    email: "nadia@email.com",
    avatar: "bg-amber-100 text-amber-700",
    lastVisit: "Mar 22",
  },
  {
    id: "P-004",
    name: "Masud Islam",
    initials: "MI",
    age: 45,
    blood: "AB+",
    weight: "85 kg",
    height: "5'10\"",
    condition: "Fracture",
    doctorId: "D-004",
    status: "Active",
    phone: "+880 1712-444444",
    email: "masud@email.com",
    avatar: "bg-purple-100 text-purple-700",
    lastVisit: "Apr 15",
  },
  {
    id: "P-005",
    name: "Taslima Begum",
    initials: "TB",
    age: 62,
    blood: "B-",
    weight: "68 kg",
    height: "5'1\"",
    condition: "Arthritis",
    doctorId: "D-001",
    status: "Inactive",
    phone: "+880 1712-555555",
    email: "taslima@email.com",
    avatar: "bg-red-100 text-red-700",
    lastVisit: "Feb 14",
  },
];

export const APPOINTMENTS = [
  {
    id: "A-001",
    patientId: "P-001",
    doctorId: "D-001",
    date: "May 5",
    day: "Mon",
    time: "10:00 AM",
    type: "Cardiology Check-up",
    status: "Confirmed",
  },
  {
    id: "A-002",
    patientId: "P-002",
    doctorId: "D-002",
    date: "May 6",
    day: "Tue",
    time: "11:30 AM",
    type: "Neurology Follow-up",
    status: "Confirmed",
  },
  {
    id: "A-003",
    patientId: "P-003",
    doctorId: "D-002",
    date: "May 7",
    day: "Wed",
    time: "02:00 PM",
    type: "Migraine Consultation",
    status: "Pending",
  },
  {
    id: "A-004",
    patientId: "P-004",
    doctorId: "D-004",
    date: "May 8",
    day: "Thu",
    time: "09:30 AM",
    type: "Fracture Follow-up",
    status: "Confirmed",
  },
  {
    id: "A-005",
    patientId: "P-005",
    doctorId: "D-001",
    date: "May 9",
    day: "Fri",
    time: "03:00 PM",
    type: "Arthritis Review",
    status: "Pending",
  },
  {
    id: "A-006",
    patientId: "P-001",
    doctorId: "D-005",
    date: "May 12",
    day: "Mon",
    time: "02:30 PM",
    type: "Dermatology Follow-up",
    status: "Pending",
  },
  {
    id: "A-007",
    patientId: "P-002",
    doctorId: "D-001",
    date: "Apr 10",
    day: "Thu",
    time: "10:00 AM",
    type: "Routine Check-up",
    status: "Completed",
  },
  {
    id: "A-008",
    patientId: "P-003",
    doctorId: "D-002",
    date: "Mar 22",
    day: "Sat",
    time: "11:00 AM",
    type: "Neurology Consultation",
    status: "Completed",
  },
];

export const PRESCRIPTIONS = [
  {
    id: "RX-001",
    patientId: "P-001",
    doctorId: "D-001",
    name: "Amlodipine",
    dose: "5mg",
    freq: "Once daily",
    refill: "May 10",
    issued: "Apr 10",
  },
  {
    id: "RX-002",
    patientId: "P-001",
    doctorId: "D-001",
    name: "Metoprolol",
    dose: "25mg",
    freq: "Twice daily",
    refill: "May 15",
    issued: "Apr 10",
  },
  {
    id: "RX-003",
    patientId: "P-002",
    doctorId: "D-002",
    name: "Metformin",
    dose: "500mg",
    freq: "Twice daily",
    refill: "May 20",
    issued: "Apr 8",
  },
  {
    id: "RX-004",
    patientId: "P-003",
    doctorId: "D-002",
    name: "Sumatriptan",
    dose: "50mg",
    freq: "As needed",
    refill: "May 25",
    issued: "Mar 22",
  },
];

export function getDoctor(id) {
  return DOCTORS.find((d) => d.id === id);
}
export function getPatient(id) {
  return PATIENTS.find((p) => p.id === id);
}
export function getApptsByDoctor(id) {
  return APPOINTMENTS.filter((a) => a.doctorId === id);
}
export function getApptsByPatient(id) {
  return APPOINTMENTS.filter((a) => a.patientId === id);
}
export function getRxByPatient(id) {
  return PRESCRIPTIONS.filter((r) => r.patientId === id);
}
export function getRxByDoctor(id) {
  return PRESCRIPTIONS.filter((r) => r.doctorId === id);
}

export function StatusBadge({ status }) {
  const map = {
    Active: "bg-emerald-50 text-emerald-700",
    Confirmed: "bg-emerald-50 text-emerald-700",
    Completed: "bg-blue-50 text-blue-700",
    Pending: "bg-amber-50 text-amber-700",
    "On Leave": "bg-amber-50 text-amber-700",
    Inactive: "bg-red-50 text-red-700",
    Cancelled: "bg-red-50 text-red-700",
  };
  return (
    <span
      className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium whitespace-nowrap ${map[status] || "bg-gray-100 text-gray-500"}`}
    >
      {status}
    </span>
  );
}

export function Avatar({ initials, colorClass, size = "md" }) {
  const s = {
    sm: "w-7 h-7 text-xs",
    md: "w-9 h-9 text-sm",
    lg: "w-12 h-12 text-base",
  }[size];
  return (
    <div
      className={`${s} rounded-full flex items-center justify-center font-semibold flex-shrink-0 ${colorClass}`}
    >
      {initials}
    </div>
  );
}

export function Card({ children, className = "" }) {
  return (
    <div className={`bg-white border border-gray-100 rounded-2xl ${className}`}>
      {children}
    </div>
  );
}

export function CardHeader({ title, action, actionLabel }) {
  return (
    <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
      <h3 className="text-sm font-semibold text-gray-800">{title}</h3>
      {action && (
        <button
          onClick={action}
          className="text-xs font-medium text-sky-500 hover:underline"
        >
          {actionLabel || "View all"}
        </button>
      )}
    </div>
  );
}

export function Icon({ name, cls = "w-4 h-4 stroke-current" }) {
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
        <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
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
    pill: (
      <svg className={cls} fill="none" strokeWidth={1.8} viewBox="0 0 24 24">
        <path d="M10.5 20H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v7" />
        <path d="m15 21 5-5m0 5-5-5" />
        <circle cx="18" cy="18" r="3" />
      </svg>
    ),
    file: (
      <svg className={cls} fill="none" strokeWidth={1.8} viewBox="0 0 24 24">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
      </svg>
    ),
    heart: (
      <svg className={cls} fill="none" strokeWidth={1.8} viewBox="0 0 24 24">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
    ),
    activity: (
      <svg className={cls} fill="none" strokeWidth={1.8} viewBox="0 0 24 24">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
      </svg>
    ),
    shield: (
      <svg className={cls} fill="none" strokeWidth={1.8} viewBox="0 0 24 24">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
    menu: (
      <svg className={cls} fill="none" strokeWidth={1.8} viewBox="0 0 24 24">
        <line x1="3" y1="6" x2="21" y2="6" />
        <line x1="3" y1="12" x2="21" y2="12" />
        <line x1="3" y1="18" x2="21" y2="18" />
      </svg>
    ),
    close: (
      <svg className={cls} fill="none" strokeWidth={1.8} viewBox="0 0 24 24">
        <line x1="18" y1="6" x2="6" y2="18" />
        <line x1="6" y1="6" x2="18" y2="18" />
      </svg>
    ),
    bell: (
      <svg className={cls} fill="none" strokeWidth={1.8} viewBox="0 0 24 24">
        <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
        <path d="M13.73 21a2 2 0 0 1-3.46 0" />
      </svg>
    ),
    layers: (
      <svg className={cls} fill="none" strokeWidth={1.8} viewBox="0 0 24 24">
        <polygon points="12 2 2 7 12 12 22 7 12 2" />
        <polyline points="2 17 12 22 22 17" />
        <polyline points="2 12 12 17 22 12" />
      </svg>
    ),
    check: (
      <svg className={cls} fill="none" strokeWidth={2} viewBox="0 0 24 24">
        <polyline points="20 6 9 17 4 12" />
      </svg>
    ),
    plus: (
      <svg className={cls} fill="none" strokeWidth={1.8} viewBox="0 0 24 24">
        <line x1="12" y1="5" x2="12" y2="19" />
        <line x1="5" y1="12" x2="19" y2="12" />
      </svg>
    ),
    phone: (
      <svg className={cls} fill="none" strokeWidth={1.8} viewBox="0 0 24 24">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.37 2 2 0 0 1 3.6 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9a16 16 0 0 0 6.91 6.91l.82-.82a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
      </svg>
    ),
    mail: (
      <svg className={cls} fill="none" strokeWidth={1.8} viewBox="0 0 24 24">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
        <polyline points="22,6 12,13 2,6" />
      </svg>
    ),
    stethoscope: (
      <svg className={cls} fill="none" strokeWidth={1.8} viewBox="0 0 24 24">
        <path d="M4.8 2.3A.3.3 0 1 0 5 2H4a2 2 0 0 0-2 2v5a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6V4a2 2 0 0 0-2-2h-1a.2.2 0 1 0 .3.3" />
        <path d="M8 15v1a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6v-4" />
        <circle cx="20" cy="10" r="2" />
      </svg>
    ),
    settings: (
      <svg className={cls} fill="none" strokeWidth={1.8} viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="3" />
        <path d="M19.07 4.93l-1.41 1.41M4.93 4.93l1.41 1.41M12 2v2M12 20v2M4.93 19.07l1.41-1.41M18.66 18.66l-1.41-1.41M2 12h2M20 12h2" />
      </svg>
    ),
    drop: (
      <svg className={cls} fill="none" strokeWidth={1.8} viewBox="0 0 24 24">
        <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
      </svg>
    ),
    wind: (
      <svg className={cls} fill="none" strokeWidth={1.8} viewBox="0 0 24 24">
        <path d="M9.59 4.59A2 2 0 1 1 11 8H2m10.59 11.41A2 2 0 1 0 14 16H2m15.73-8.27A2.5 2.5 0 1 1 19.5 12H2" />
      </svg>
    ),
  };
  return icons[name] || null;
}

export function RoleSelector({ onSelect }) {
  const roles = [
    {
      role: "admin",
      label: "Admin",
      sub: "Full system access",
      color: "bg-violet-500",
      light: "bg-violet-50 text-violet-700",
      icon: "shield",
    },
    {
      role: "doctor",
      label: "Doctor",
      sub: "Dr. Karim · Cardiology",
      color: "bg-sky-500",
      light: "bg-sky-50 text-sky-700",
      icon: "stethoscope",
    },
    {
      role: "patient",
      label: "Patient",
      sub: "Samira Akter · P-001",
      color: "bg-emerald-500",
      light: "bg-emerald-50 text-emerald-700",
      icon: "user",
    },
  ];
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6">
      <div className="mb-8 text-center">
        <div className="w-14 h-14 rounded-2xl bg-sky-500 flex items-center justify-center mx-auto mb-4 shadow-lg shadow-sky-200">
          <svg
            className="w-7 h-7 text-white"
            fill="none"
            stroke="currentColor"
            strokeWidth={2.2}
            viewBox="0 0 24 24"
          >
            <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
          </svg>
        </div>
        <h1 className="text-2xl font-bold text-gray-800">MedPortal</h1>
        <p className="text-gray-400 text-sm mt-1">
          Choose your role to continue
        </p>
      </div>
      <div className="w-full max-w-sm flex flex-col gap-3">
        {roles.map((r) => (
          <button
            key={r.role}
            onClick={() => onSelect(r.role)}
            className="flex items-center gap-4 p-4 bg-white border border-gray-100 rounded-2xl hover:border-sky-200 hover:shadow-sm transition-all text-left group"
          >
            <div
              className={`w-11 h-11 rounded-xl ${r.color} flex items-center justify-center flex-shrink-0 shadow-sm`}
            >
              <Icon name={r.icon} cls="w-5 h-5 stroke-white" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-semibold text-gray-800">
                {r.label}
              </div>
              <div className="text-xs text-gray-400 truncate">{r.sub}</div>
            </div>
            <svg
              className="w-4 h-4 stroke-gray-300 group-hover:stroke-sky-400 transition-colors flex-shrink-0"
              fill="none"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        ))}
      </div>
    </div>
  );
}

function Sidebar({
  navItems,
  active,
  setActive,
  onClose,
  accent,
  logo,
  profile,
}) {
  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
        <div className="flex items-center gap-2.5">
          <div
            className={`w-8 h-8 rounded-xl ${accent.bg} flex items-center justify-center flex-shrink-0`}
          >
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
            <div className="text-xs text-gray-400">{logo}</div>
          </div>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-gray-100 lg:hidden"
          >
            <Icon name="close" cls="w-5 h-5 stroke-gray-500" />
          </button>
        )}
      </div>

      <div
        className={`mx-4 my-4 p-3 ${accent.chip} rounded-xl flex items-center gap-3`}
      >
        <Avatar
          initials={profile.initials}
          colorClass={accent.avatar}
          size="md"
        />
        <div className="min-w-0">
          <div className="text-sm font-semibold text-gray-800 truncate">
            {profile.name}
          </div>
          <div className={`text-xs ${accent.text} truncate`}>{profile.sub}</div>
        </div>
      </div>

      <nav className="flex-1 px-3 flex flex-col gap-1 overflow-y-auto">
        {navItems.map((item) => (
          <button
            key={item.label}
            onClick={() => {
              setActive(item.label);
              onClose?.();
            }}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all text-left ${
              active === item.label
                ? `${accent.bg} text-white shadow-sm`
                : "text-gray-500 hover:bg-gray-50 hover:text-gray-700"
            }`}
          >
            <Icon
              name={item.icon}
              cls={`w-4 h-4 flex-shrink-0 ${active === item.label ? "stroke-white" : "stroke-gray-400"}`}
            />
            {item.label}
          </button>
        ))}
      </nav>

      <div className="px-3 py-4 border-t border-gray-100">
        <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-gray-400 hover:bg-red-50 hover:text-red-500 transition-colors">
          <svg
            className="w-4 h-4 flex-shrink-0"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.8}
            viewBox="0 0 24 24"
          >
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
            <polyline points="16 17 21 12 16 7" />
            <line x1="21" y1="12" x2="9" y2="12" />
          </svg>
          Sign out
        </button>
      </div>
    </div>
  );
}

export function DashboardShell({
  navItems,
  active,
  setActive,
  accent,
  logo,
  profile,
  onRoleSwitch,
  children,
}) {
  const [drawer, setDrawer] = useState(false);
  return (
    <div className="flex h-screen bg-gray-50 font-sans overflow-hidden">
      <aside className="hidden lg:flex w-60 flex-shrink-0 bg-white border-r border-gray-100 flex-col">
        <Sidebar
          navItems={navItems}
          active={active}
          setActive={setActive}
          accent={accent}
          logo={logo}
          profile={profile}
        />
      </aside>
      {drawer && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div
            className="absolute inset-0 bg-black/30"
            onClick={() => setDrawer(false)}
          />
          <aside className="absolute left-0 top-0 bottom-0 w-64 bg-white shadow-xl z-50 flex flex-col">
            <Sidebar
              navItems={navItems}
              active={active}
              setActive={setActive}
              accent={accent}
              logo={logo}
              profile={profile}
              onClose={() => setDrawer(false)}
            />
          </aside>
        </div>
      )}
      <div className="flex-1 flex flex-col overflow-hidden min-w-0">
        <header className="h-14 bg-white border-b border-gray-100 flex items-center justify-between px-4 md:px-6 flex-shrink-0">
          <div className="flex items-center gap-3">
            <button
              className="lg:hidden p-1.5 rounded-lg hover:bg-gray-100"
              onClick={() => setDrawer(true)}
            >
              <Icon name="menu" cls="w-5 h-5 stroke-gray-600" />
            </button>
            <h1 className="text-sm font-semibold text-gray-800">{active}</h1>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={onRoleSwitch}
              className="hidden sm:flex items-center gap-1.5 text-xs text-gray-400 hover:text-sky-500 px-2 py-1.5 rounded-lg hover:bg-sky-50 transition-colors border border-gray-100"
            >
              <Icon name="users" cls="w-3.5 h-3.5 stroke-current" /> Switch Role
            </button>
            <div className="relative w-8 h-8 rounded-lg bg-gray-50 border border-gray-100 flex items-center justify-center cursor-pointer hover:bg-gray-100">
              <Icon name="bell" cls="w-4 h-4 stroke-gray-500" />
              <span className="absolute top-1 right-1 w-1.5 h-1.5 bg-red-500 rounded-full" />
            </div>
            <Avatar
              initials={profile.initials}
              colorClass={accent.avatar + " ring-2 ring-white"}
              size="sm"
            />
          </div>
        </header>
        <main className="flex-1 overflow-y-auto p-4 md:p-6 pb-24 lg:pb-6">
          {children}
        </main>
        <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 flex z-30">
          {navItems.map((item) => (
            <button
              key={item.label}
              onClick={() => setActive(item.label)}
              className={`flex-1 flex flex-col items-center justify-center py-2.5 gap-1 transition-colors ${active === item.label ? accent.text : "text-gray-400"}`}
            >
              <Icon
                name={item.icon}
                cls={`w-4 h-4 ${active === item.label ? "stroke-current" : "stroke-gray-400"}`}
              />
              <span className="text-[10px] leading-none">{item.label}</span>
            </button>
          ))}
        </nav>
      </div>
    </div>
  );
}
