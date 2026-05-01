import { useState } from "react";
import {
  APPOINTMENTS,
  DOCTORS,
  PATIENTS,
  Avatar,
  Card,
  CardHeader,
  DashboardShell,
  Icon,
  StatusBadge,
  getDoctor,
  getPatient,
  getApptsByDoctor,
  getApptsByPatient,
} from "./MedPortalShared";

export default function AdminDashboard({ onRoleSwitch }) {
  const [active, setActive] = useState("Overview");
  const accent = { bg: "bg-violet-500", chip: "bg-violet-50", text: "text-violet-600", avatar: "bg-violet-100 text-violet-700" };

  const navItems = [
    { label: "Overview", icon: "grid" },
    { label: "Patients", icon: "users" },
    { label: "Doctors", icon: "stethoscope" },
    { label: "Appointments", icon: "calendar" },
  ];

  const confirmedToday = APPOINTMENTS.filter((a) => a.status === "Confirmed").length;
  const pending = APPOINTMENTS.filter((a) => a.status === "Pending").length;

  const pages = {
    Overview: (
      <div className="flex flex-col gap-5">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {[
            { label: "Total Patients", value: PATIENTS.length, change: "All registered", bg: "bg-emerald-50", ic: "stroke-emerald-500", icon: "users" },
            { label: "Active Doctors", value: DOCTORS.filter((d) => d.status === "Active").length, change: `${DOCTORS.filter((d) => d.status === "On Leave").length} on leave`, bg: "bg-blue-50", ic: "stroke-blue-500", icon: "stethoscope" },
            { label: "Appointments", value: APPOINTMENTS.length, change: `${confirmedToday} confirmed`, bg: "bg-violet-50", ic: "stroke-violet-500", icon: "calendar" },
            { label: "Pending Reviews", value: pending, change: "Needs attention", bg: "bg-amber-50", ic: "stroke-amber-500", icon: "activity" },
          ].map((s) => (
            <Card key={s.label} className="p-4">
              <div className={`w-9 h-9 rounded-xl ${s.bg} flex items-center justify-center mb-3`}>
                <Icon name={s.icon} cls={`w-4 h-4 ${s.ic}`} />
              </div>
              <p className="text-xs text-gray-400">{s.label}</p>
              <p className="text-2xl font-bold text-gray-800 mt-0.5">{s.value}</p>
              <p className="text-xs text-gray-400 mt-1">{s.change}</p>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
          <Card>
            <CardHeader title="All Patients" />
            <div className="overflow-x-auto">
              <table className="w-full min-w-[420px]">
                <thead><tr className="border-b border-gray-100">
                  {["Patient", "Condition", "Doctor", "Status"].map((h) => <th key={h} className="text-left text-xs text-gray-400 font-medium uppercase tracking-wider px-5 py-3">{h}</th>)}
                </tr></thead>
                <tbody>
                  {PATIENTS.map((p) => {
                    const doc = getDoctor(p.doctorId);
                    return (
                      <tr key={p.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors last:border-0">
                        <td className="px-5 py-3">
                          <div className="flex items-center gap-2">
                            <Avatar initials={p.initials} colorClass={p.avatar} size="sm" />
                            <div><div className="text-xs font-semibold text-gray-800 whitespace-nowrap">{p.name}</div><div className="text-xs text-gray-400">{p.id}</div></div>
                          </div>
                        </td>
                        <td className="px-5 py-3 text-xs text-gray-600 whitespace-nowrap">{p.condition}</td>
                        <td className="px-5 py-3 text-xs text-gray-600 whitespace-nowrap">{doc?.name}</td>
                        <td className="px-5 py-3"><StatusBadge status={p.status} /></td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </Card>

          <Card>
            <CardHeader title="All Doctors" />
            <div className="overflow-x-auto">
              <table className="w-full min-w-[420px]">
                <thead><tr className="border-b border-gray-100">
                  {["Doctor", "Specialty", "Patients", "Status"].map((h) => <th key={h} className="text-left text-xs text-gray-400 font-medium uppercase tracking-wider px-5 py-3">{h}</th>)}
                </tr></thead>
                <tbody>
                  {DOCTORS.map((d) => (
                    <tr key={d.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors last:border-0">
                      <td className="px-5 py-3">
                        <div className="flex items-center gap-2">
                          <Avatar initials={d.initials} colorClass={d.avatar} size="sm" />
                          <div><div className="text-xs font-semibold text-gray-800 whitespace-nowrap">{d.name}</div><div className="text-xs text-gray-400">{d.id}</div></div>
                        </div>
                      </td>
                      <td className="px-5 py-3 text-xs text-gray-600 whitespace-nowrap">{d.specialty}</td>
                      <td className="px-5 py-3 text-xs font-semibold text-gray-700">{d.patients}</td>
                      <td className="px-5 py-3"><StatusBadge status={d.status} /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>

        <Card>
          <CardHeader title="All Appointments" />
          <div className="overflow-x-auto">
            <table className="w-full min-w-[520px]">
              <thead><tr className="border-b border-gray-100">
                {["Patient", "Doctor", "Type", "Date & Time", "Status"].map((h) => <th key={h} className="text-left text-xs text-gray-400 font-medium uppercase tracking-wider px-5 py-3">{h}</th>)}
              </tr></thead>
              <tbody>
                {APPOINTMENTS.map((a) => {
                  const p = getPatient(a.patientId);
                  const d = getDoctor(a.doctorId);
                  return (
                    <tr key={a.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors last:border-0">
                      <td className="px-5 py-3">
                        <div className="flex items-center gap-2">
                          <Avatar initials={p.initials} colorClass={p.avatar} size="sm" />
                          <span className="text-xs font-medium text-gray-800 whitespace-nowrap">{p.name}</span>
                        </div>
                      </td>
                      <td className="px-5 py-3 text-xs text-gray-600 whitespace-nowrap">{d?.name}</td>
                      <td className="px-5 py-3 text-xs text-gray-600 whitespace-nowrap">{a.type}</td>
                      <td className="px-5 py-3 text-xs text-gray-600 whitespace-nowrap">{a.date} · {a.time}</td>
                      <td className="px-5 py-3"><StatusBadge status={a.status} /></td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    ),

    Patients: (
      <div className="flex flex-col gap-5">
        <h2 className="text-base font-semibold text-gray-800">Patient Management</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {PATIENTS.map((p) => {
            const doc = getDoctor(p.doctorId);
            const appts = getApptsByPatient(p.id);
            return (
              <Card key={p.id} className="p-5 hover:shadow-sm transition-shadow">
                <div className="flex items-start gap-3 mb-4">
                  <Avatar initials={p.initials} colorClass={p.avatar} size="lg" />
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-gray-800 text-sm truncate">{p.name}</div>
                    <div className="text-xs text-gray-400">{p.id} · Age {p.age}</div>
                    <div className="mt-1"><StatusBadge status={p.status} /></div>
                  </div>
                </div>
                <div className="space-y-2 text-xs mb-4">
                  <div className="flex justify-between"><span className="text-gray-400">Condition</span><span className="font-medium text-gray-700">{p.condition}</span></div>
                  <div className="flex justify-between"><span className="text-gray-400">Blood Group</span><span className="font-medium text-gray-700">{p.blood}</span></div>
                  <div className="flex justify-between"><span className="text-gray-400">Doctor</span><span className="font-medium text-gray-700">{doc?.name}</span></div>
                  <div className="flex justify-between"><span className="text-gray-400">Appointments</span><span className="font-medium text-gray-700">{appts.length}</span></div>
                  <div className="flex justify-between"><span className="text-gray-400">Last Visit</span><span className="font-medium text-gray-700">{p.lastVisit}</span></div>
                </div>
                <div className="flex gap-2 pt-3 border-t border-gray-100">
                  <div className="text-xs text-gray-400 truncate">{p.email}</div>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    ),

    Doctors: (
      <div className="flex flex-col gap-5">
        <h2 className="text-base font-semibold text-gray-800">Doctor Management</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {DOCTORS.map((d) => {
            const myPatients = PATIENTS.filter((p) => p.doctorId === d.id);
            const myAppts = getApptsByDoctor(d.id);
            return (
              <Card key={d.id} className="p-5 hover:shadow-sm transition-shadow">
                <div className="flex items-start gap-3 mb-4">
                  <Avatar initials={d.initials} colorClass={d.avatar} size="lg" />
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-gray-800 text-sm truncate">{d.name}</div>
                    <div className="text-xs text-gray-400">{d.specialty} · {d.experience}</div>
                    <div className="mt-1"><StatusBadge status={d.status} /></div>
                  </div>
                </div>
                <div className="space-y-2 text-xs mb-4">
                  <div className="flex justify-between"><span className="text-gray-400">Total Patients</span><span className="font-medium text-gray-700">{myPatients.length} assigned</span></div>
                  <div className="flex justify-between"><span className="text-gray-400">Appointments</span><span className="font-medium text-gray-700">{myAppts.length} total</span></div>
                  <div className="flex justify-between"><span className="text-gray-400">Rating</span><span className="font-medium text-amber-600">★ {d.rating}</span></div>
                </div>
                <div className="text-xs text-gray-400 truncate pt-3 border-t border-gray-100">{d.email}</div>
              </Card>
            );
          })}
        </div>
      </div>
    ),

    Appointments: (
      <div className="flex flex-col gap-5">
        <h2 className="text-base font-semibold text-gray-800">Appointment Management</h2>
        <div className="grid grid-cols-3 gap-3 mb-2">
          {[
            { label: "Confirmed", count: APPOINTMENTS.filter((a) => a.status === "Confirmed").length, color: "text-emerald-600" },
            { label: "Pending", count: APPOINTMENTS.filter((a) => a.status === "Pending").length, color: "text-amber-600" },
            { label: "Completed", count: APPOINTMENTS.filter((a) => a.status === "Completed").length, color: "text-blue-600" },
          ].map((s) => (
            <Card key={s.label} className="p-4 text-center">
              <div className={`text-2xl font-bold ${s.color}`}>{s.count}</div>
              <div className="text-xs text-gray-400 mt-0.5">{s.label}</div>
            </Card>
          ))}
        </div>
        <Card>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[580px]">
              <thead><tr className="border-b border-gray-100">
                {["ID", "Patient", "Doctor", "Type", "Date & Time", "Status"].map((h) => <th key={h} className="text-left text-xs text-gray-400 font-medium uppercase tracking-wider px-5 py-3">{h}</th>)}
              </tr></thead>
              <tbody>
                {APPOINTMENTS.map((a) => {
                  const p = getPatient(a.patientId);
                  const d = getDoctor(a.doctorId);
                  return (
                    <tr key={a.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors last:border-0">
                      <td className="px-5 py-3 text-xs text-gray-400 font-mono">{a.id}</td>
                      <td className="px-5 py-3">
                        <div className="flex items-center gap-2">
                          <Avatar initials={p.initials} colorClass={p.avatar} size="sm" />
                          <span className="text-xs font-medium text-gray-800 whitespace-nowrap">{p.name}</span>
                        </div>
                      </td>
                      <td className="px-5 py-3 text-xs text-gray-600 whitespace-nowrap">{d?.name}</td>
                      <td className="px-5 py-3 text-xs text-gray-600 whitespace-nowrap">{a.type}</td>
                      <td className="px-5 py-3 text-xs text-gray-500 whitespace-nowrap">{a.date} · {a.time}</td>
                      <td className="px-5 py-3"><StatusBadge status={a.status} /></td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    ),
  };

  return (
    <DashboardShell navItems={navItems} active={active} setActive={setActive} accent={accent} logo="Admin Console"
      profile={{ name: "Admin", initials: "AD", sub: "System Administrator" }} onRoleSwitch={onRoleSwitch}>
      {pages[active]}
    </DashboardShell>
  );
}
