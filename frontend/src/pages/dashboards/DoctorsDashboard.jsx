import { useState } from "react";
import {
  DOCTORS,
  PATIENTS,
  Avatar,
  Card,
  CardHeader,
  DashboardShell,
  StatusBadge,
  getApptsByDoctor,
  getApptsByPatient,
  getPatient,
  getRxByDoctor,
  getRxByPatient,
} from "./MedPortalShared";

export default function DoctorDashboard({ onRoleSwitch }) {
  const [active, setActive] = useState("Overview");
  const me = DOCTORS[0];
  const myPatients = PATIENTS.filter((p) => p.doctorId === me.id);
  const myAppts = getApptsByDoctor(me.id);
  const myRx = getRxByDoctor(me.id);
  const accent = {
    bg: "bg-sky-500",
    chip: "bg-sky-50",
    text: "text-sky-600",
    avatar: "bg-sky-100 text-sky-700",
  };

  const navItems = [
    { label: "Overview", icon: "grid" },
    { label: "My Patients", icon: "users" },
    { label: "Appointments", icon: "calendar" },
    { label: "Prescriptions", icon: "pill" },
  ];

  const pages = {
    Overview: (
      <div className="flex flex-col gap-5">
        <div className="bg-sky-500 rounded-2xl p-5 md:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <p className="text-sky-100 text-sm">Welcome back 👋</p>
            <h2 className="text-xl md:text-2xl font-bold text-white mt-0.5">
              {me.name}
            </h2>
            <p className="text-sky-100 text-sm mt-1">
              {me.specialty} · {me.experience} experience
            </p>
          </div>
          <div className="flex gap-3">
            {[
              { val: myPatients.length, lbl: "Patients" },
              {
                val: myAppts.filter((a) => a.status === "Confirmed").length,
                lbl: "Today",
              },
              { val: `★ ${me.rating}`, lbl: "Rating" },
            ].map((s) => (
              <div
                key={s.lbl}
                className="bg-white/20 rounded-xl px-4 py-3 text-center"
              >
                <div className="text-white font-bold text-lg">{s.val}</div>
                <div className="text-sky-100 text-xs">{s.lbl}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
    "My Patients": (
      <div className="flex flex-col gap-5">
        <h2 className="text-base font-semibold text-gray-800">My Patients</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {myPatients.map((p) => {
            const appts = getApptsByPatient(p.id).filter(
              (a) => a.doctorId === me.id,
            );
            const rx = getRxByPatient(p.id).filter((r) => r.doctorId === me.id);
            return (
              <Card
                key={p.id}
                className="p-5 hover:shadow-sm transition-shadow"
              >
                <div className="flex items-start gap-3 mb-4">
                  <Avatar
                    initials={p.initials}
                    colorClass={p.avatar}
                    size="lg"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-gray-800 truncate">
                      {p.name}
                    </div>
                    <div className="text-xs text-gray-400">
                      {p.id} · Age {p.age} · {p.blood}
                    </div>
                    <div className="mt-1.5 flex gap-2 flex-wrap">
                      <StatusBadge status={p.status} />
                      <span className="inline-flex px-2 py-0.5 rounded-full text-xs bg-sky-50 text-sky-700">
                        {p.condition}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2 pt-3 border-t border-gray-100">
                  <div className="flex-1 text-center py-1.5 rounded-lg bg-sky-50 text-sky-600 text-xs font-medium">
                    {appts.length} Appointment{appts.length !== 1 ? "s" : ""}
                  </div>
                  <div className="flex-1 text-center py-1.5 rounded-lg bg-emerald-50 text-emerald-600 text-xs font-medium">
                    {rx.length} Prescription{rx.length !== 1 ? "s" : ""}
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    ),
    Appointments: (
      <div className="flex flex-col gap-5">
        <h2 className="text-base font-semibold text-gray-800">
          My Appointments
        </h2>
        <Card>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[480px]">
              <thead>
                <tr className="border-b border-gray-100">
                  {["Patient", "Type", "Date", "Time", "Status"].map((h) => (
                    <th
                      key={h}
                      className="text-left text-xs text-gray-400 font-medium uppercase tracking-wider px-5 py-3"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {myAppts.map((a) => {
                  const p = getPatient(a.patientId);
                  return (
                    <tr
                      key={a.id}
                      className="border-b border-gray-50 hover:bg-gray-50 transition-colors last:border-0"
                    >
                      <td className="px-5 py-3">
                        <div className="flex items-center gap-2">
                          <Avatar
                            initials={p.initials}
                            colorClass={p.avatar}
                            size="sm"
                          />
                          <div>
                            <div className="text-xs font-semibold text-gray-800 whitespace-nowrap">
                              {p.name}
                            </div>
                            <div className="text-xs text-gray-400">
                              {p.condition}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-3 text-xs text-gray-600 whitespace-nowrap">
                        {a.type}
                      </td>
                      <td className="px-5 py-3 text-xs text-gray-600 whitespace-nowrap">
                        {a.date}
                      </td>
                      <td className="px-5 py-3 text-xs text-gray-600">
                        {a.time}
                      </td>
                      <td className="px-5 py-3">
                        <StatusBadge status={a.status} />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    ),
    Prescriptions: (
      <div className="flex flex-col gap-5">
        <h2 className="text-base font-semibold text-gray-800">
          Prescriptions I Issued
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {myRx.map((rx) => {
            const p = getPatient(rx.patientId);
            return (
              <Card
                key={rx.id}
                className="p-5 hover:shadow-sm transition-shadow"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Avatar
                      initials={p.initials}
                      colorClass={p.avatar}
                      size="sm"
                    />
                    <div>
                      <div className="text-sm font-semibold text-gray-800">
                        {p.name}
                      </div>
                      <div className="text-xs text-gray-400">{p.id}</div>
                    </div>
                  </div>
                  <span className="text-xs text-gray-400">{rx.issued}</span>
                </div>
                <div className="bg-sky-50 rounded-xl p-3 mb-3">
                  <div className="text-sm font-bold text-sky-700">
                    {rx.name}
                  </div>
                  <div className="text-xs text-sky-500 mt-0.5">
                    {rx.dose} · {rx.freq}
                  </div>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-400">Refill by</span>
                  <span className="font-medium text-amber-600">
                    {rx.refill}
                  </span>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    ),
  };

  return (
    <DashboardShell
      navItems={navItems}
      active={active}
      setActive={setActive}
      accent={accent}
      logo="Doctor Portal"
      profile={{ name: me.name, initials: me.initials, sub: me.specialty }}
      onRoleSwitch={onRoleSwitch}
    >
      {pages[active]}
    </DashboardShell>
  );
}
