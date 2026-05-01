import { useState } from "react";
import {
  PATIENTS,
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

export default function PatientDashboard({ onRoleSwitch }) {
  const [active, setActive] = useState("Overview");
  const me = PATIENTS[0];
  const myDoctor = getDoctor(me.doctorId);
  const myAppts = getApptsByPatient(me.id);
  const myRx = getRxByPatient(me.id);
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
        </div>

        <Card>
          <CardHeader title="Recent Appointments" />
          {myAppts.map((a, i) => (
            <div
              key={a.id}
              className={`flex items-center gap-4 px-5 py-3.5 hover:bg-gray-50 transition-colors ${i < myAppts.length - 1 ? "border-b border-gray-100" : ""}`}
            >
              <div className="w-9 h-9 rounded-xl bg-blue-50 flex items-center justify-center flex-shrink-0">
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
        <h2 className="text-base font-semibold text-gray-800">
          My Appointments
        </h2>
        <Card>
          {myAppts.map((a, i) => {
            const d = getDoctor(a.doctorId);
            return (
              <div
                key={a.id}
                className={`flex flex-col sm:flex-row sm:items-center gap-3 px-5 py-4 hover:bg-gray-50 transition-colors ${i < myAppts.length - 1 ? "border-b border-gray-100" : ""}`}
              >
                <div className="flex items-center gap-4 flex-1 min-w-0">
                  <div className="w-12 h-12 rounded-xl bg-emerald-50 flex flex-col items-center justify-center flex-shrink-0 border border-emerald-100">
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

  return (
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
  );
}
