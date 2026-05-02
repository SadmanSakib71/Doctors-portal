import { useState } from "react";
import {
  PATIENTS,
  DOCTORS,
  Avatar,
  Card,
  CardHeader,
  DashboardShell,
  Icon,
  StatusBadge,
  getDoctor,
  getApptsByPatient,
  getRxByPatient,
} from "./MedPortalShared";

const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function displayFromISODate(iso) {
  const [y, mo, d] = iso.split("-").map(Number);
  const dt = new Date(y, mo - 1, d);
  return {
    date: `${MONTHS[dt.getMonth()]} ${dt.getDate()}`,
    day: WEEKDAYS[dt.getDay()],
  };
}

function formatTime12(hhmm) {
  const [h, m] = hhmm.split(":").map(Number);
  const period = h >= 12 ? "PM" : "AM";
  const h12 = h % 12 || 12;
  return `${h12}:${String(m).padStart(2, "0")} ${period}`;
}

export default function PatientDashboard({ onRoleSwitch }) {
  const [active, setActive] = useState("Overview");
  const me = PATIENTS[0];
  const myDoctor = getDoctor(me.doctorId);
  const [myAppts, setMyAppts] = useState(() => [...getApptsByPatient(me.id)]);
  const [bookOpen, setBookOpen] = useState(false);
  const [bookForm, setBookForm] = useState({
    type: "",
    doctorId: me.doctorId,
    date: "",
    time: "",
  });
  const myRx = getRxByPatient(me.id);
  const bookableDoctors = DOCTORS.filter((d) => d.status === "Active");

  const openBookModal = () => {
    setBookForm({
      type: "",
      doctorId: me.doctorId,
      date: "",
      time: "",
    });
    setBookOpen(true);
  };

  const submitBooking = (e) => {
    e.preventDefault();
    const t = bookForm.type.trim();
    if (!t || !bookForm.date || !bookForm.time) return;
    const { date, day } = displayFromISODate(bookForm.date);
    const time = formatTime12(bookForm.time);
    const next = {
      id: `A-${Date.now()}`,
      patientId: me.id,
      doctorId: bookForm.doctorId,
      date,
      day,
      time,
      type: t,
      status: "Pending",
    };
    setMyAppts((prev) => [next, ...prev]);
    setBookOpen(false);
  };
  const accent = {
    bg: "bg-emerald-500",
    chip: "bg-emerald-50",
    text: "text-emerald-600",
    avatar: "bg-emerald-100 text-emerald-700",
  };

  const navItems = [
    { label: "Overview", icon: "grid" },
    { label: "Appointments", icon: "calendar" },
    { label: "Prescriptions", icon: "pill" },
    { label: "My Profile", icon: "user" },
  ];

  const pages = {
    Overview: (
      <div className="flex flex-col gap-5">
        <div className="bg-emerald-500 rounded-2xl p-5 md:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <p className="text-emerald-100 text-sm">Good morning 👋</p>
            <h2 className="text-xl md:text-2xl font-bold text-white mt-0.5">
              {me.name}
            </h2>
            <p className="text-emerald-100 text-sm mt-1">
              Patient ID: {me.id} · {me.condition}
            </p>
          </div>
          <button
            type="button"
            onClick={openBookModal}
            className="shrink-0 rounded-xl bg-white/15 hover:bg-white/25 text-white text-sm font-medium px-4 py-2.5 border border-white/30 transition-colors"
          >
            Book appointment
          </button>
        </div>

        <Card>
          <CardHeader title="Recent Appointments" action={openBookModal} actionLabel="Book" />
          {myAppts.map((a, i) => (
            <div
              key={a.id}
              className={`flex items-center gap-4 px-5 py-3.5 hover:bg-gray-50 transition-colors ${i < myAppts.length - 1 ? "border-b border-gray-100" : ""}`}
            >
              <div className="w-9 h-9 rounded-xl bg-blue-50 flex items-center justify-center shrink-0">
                <Icon name="check" cls="w-4 h-4 stroke-blue-400" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium text-gray-800 truncate">
                  {a.type}
                </div>
                <div className="text-xs text-gray-400">{a.date}</div>
              </div>
              <StatusBadge status={a.status} />
            </div>
          ))}
        </Card>
      </div>
    ),
    Appointments: (
      <div className="flex flex-col gap-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <h2 className="text-base font-semibold text-gray-800">
            My Appointments
          </h2>
          <button
            type="button"
            onClick={openBookModal}
            className="shrink-0 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-medium px-4 py-2.5 transition-colors"
          >
            Book appointment
          </button>
        </div>
        <Card>
          {myAppts.map((a, i) => {
            const d = getDoctor(a.doctorId);
            return (
              <div
                key={a.id}
                className={`flex flex-col sm:flex-row sm:items-center gap-3 px-5 py-4 hover:bg-gray-50 transition-colors ${i < myAppts.length - 1 ? "border-b border-gray-100" : ""}`}
              >
                <div className="flex items-center gap-4 flex-1 min-w-0">
                  <div className="w-12 h-12 rounded-xl bg-emerald-50 flex flex-col items-center justify-center shrink-0 border border-emerald-100">
                    <div className="text-base font-bold text-emerald-600 leading-tight">
                      {a.date.split(" ")[1]}
                    </div>
                    <div className="text-xs text-emerald-400">
                      {a.date.split(" ")[0]}
                    </div>
                  </div>
                  <div className="min-w-0">
                    <div className="text-sm font-semibold text-gray-800 truncate">
                      {a.type}
                    </div>
                    <div className="text-xs text-gray-400 mt-0.5">
                      {d?.name} · {a.day}, {a.time}
                    </div>
                  </div>
                </div>
                <StatusBadge status={a.status} />
              </div>
            );
          })}
        </Card>
      </div>
    ),
    Prescriptions: (
      <div className="flex flex-col gap-5">
        <h2 className="text-base font-semibold text-gray-800">
          My Prescriptions
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {myRx.map((rx) => {
            const d = getDoctor(rx.doctorId);
            return (
              <Card
                key={rx.id}
                className="p-5 hover:shadow-sm transition-shadow"
              >
                <div className="space-y-2 mb-4 text-xs">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Medicine</span>
                    <span className="font-semibold text-gray-800">
                      {rx.name}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Dosage</span>
                    <span className="font-semibold text-gray-800">
                      {rx.dose}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Prescribed by</span>
                    <span className="font-medium text-sky-600">{d?.name}</span>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    ),
    "My Profile": (
      <div className="flex flex-col gap-5">
        <h2 className="text-base font-semibold text-gray-800">My Profile</h2>
        <Card className="p-5">
          <div className="flex items-center gap-4 mb-5">
            <Avatar initials={me.initials} colorClass={me.avatar} size="lg" />
            <div>
              <div className="font-bold text-gray-800">{me.name}</div>
              <div className="text-xs text-gray-400">{me.id}</div>
              <div className="mt-1">
                <StatusBadge status={me.status} />
              </div>
            </div>
          </div>
          <div className="text-xs text-gray-500">
            {myDoctor?.name} · {myDoctor?.specialty}
          </div>
        </Card>
      </div>
    ),
  };

  const todayMin = (() => {
    const d = new Date();
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
  })();

  return (
    <>
      <DashboardShell
        navItems={navItems}
        active={active}
        setActive={setActive}
        accent={accent}
        logo="Patient Portal"
        profile={{
          name: me.name,
          initials: me.initials,
          sub: `${me.id} · ${me.condition}`,
        }}
        onRoleSwitch={onRoleSwitch}
      >
        {pages[active]}
      </DashboardShell>

      {bookOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40"
          role="presentation"
          onClick={() => setBookOpen(false)}
        >
          <div
            className="bg-white rounded-2xl shadow-xl max-w-md w-full p-5 border border-gray-100"
            role="dialog"
            aria-modal="true"
            aria-labelledby="book-appt-title"
            onClick={(e) => e.stopPropagation()}
          >
            <h3
              id="book-appt-title"
              className="text-base font-semibold text-gray-800 mb-4"
            >
              Book an appointment
            </h3>
            <form onSubmit={submitBooking} className="space-y-4">
              <div>
                <label
                  htmlFor="appt-type"
                  className="block text-xs font-medium text-gray-500 mb-1"
                >
                  Visit type
                </label>
                <input
                  id="appt-type"
                  type="text"
                  required
                  value={bookForm.type}
                  onChange={(e) =>
                    setBookForm((f) => ({ ...f, type: e.target.value }))
                  }
                  placeholder="e.g. Follow-up visit"
                  className="w-full rounded-xl border border-gray-200 px-3 py-2 text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500"
                />
              </div>
              <div>
                <label
                  htmlFor="appt-doctor"
                  className="block text-xs font-medium text-gray-500 mb-1"
                >
                  Doctor
                </label>
                <select
                  id="appt-doctor"
                  value={bookForm.doctorId}
                  onChange={(e) =>
                    setBookForm((f) => ({ ...f, doctorId: e.target.value }))
                  }
                  className="w-full rounded-xl border border-gray-200 px-3 py-2 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 bg-white"
                >
                  {bookableDoctors.map((doc) => (
                    <option key={doc.id} value={doc.id}>
                      {doc.name} — {doc.specialty}
                    </option>
                  ))}
                </select>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label
                    htmlFor="appt-date"
                    className="block text-xs font-medium text-gray-500 mb-1"
                  >
                    Date
                  </label>
                  <input
                    id="appt-date"
                    type="date"
                    required
                    min={todayMin}
                    value={bookForm.date}
                    onChange={(e) =>
                      setBookForm((f) => ({ ...f, date: e.target.value }))
                    }
                    className="w-full rounded-xl border border-gray-200 px-3 py-2 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500"
                  />
                </div>
                <div>
                  <label
                    htmlFor="appt-time"
                    className="block text-xs font-medium text-gray-500 mb-1"
                  >
                    Time
                  </label>
                  <input
                    id="appt-time"
                    type="time"
                    required
                    value={bookForm.time}
                    onChange={(e) =>
                      setBookForm((f) => ({ ...f, time: e.target.value }))
                    }
                    className="w-full rounded-xl border border-gray-200 px-3 py-2 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500"
                  />
                </div>
              </div>
              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setBookOpen(false)}
                  className="flex-1 rounded-xl border border-gray-200 py-2.5 text-sm font-medium text-gray-600 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white py-2.5 text-sm font-medium"
                >
                  Request slot
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
