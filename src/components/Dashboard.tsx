import {
  Activity,
  ArrowUpRight,
  CalendarDays,
  CheckCircle2,
  Clock3,
  FileText,
  Stethoscope,
  Users,
  UserRound,
} from "lucide-react";

const stats = [
  {
    title: "Total Patients",
    value: "1,284",
    change: "+12.5%",
    icon: Users,
  },
  {
    title: "Total Doctors",
    value: "48",
    change: "+4.2%",
    icon: Stethoscope,
  },
  {
    title: "Appointments",
    value: "126",
    change: "+8.4%",
    icon: CalendarDays,
  },
  {
    title: "Pending Reports",
    value: "18",
    change: "-3.1%",
    icon: FileText,
  },
];

const appointments = [
  {
    patient: "Amit Kumar",
    doctor: "Dr. Ananya Sharma",
    time: "10:00 AM",
    type: "Cardiology",
    status: "Confirmed",
  },
  {
    patient: "Sneha Das",
    doctor: "Dr. Rahul Mehta",
    time: "11:30 AM",
    type: "General Physician",
    status: "Pending",
  },
  {
    patient: "Rohit Sen",
    doctor: "Dr. Arjun Roy",
    time: "02:00 PM",
    type: "Orthopedic",
    status: "Confirmed",
  },
  {
    patient: "Priya Roy",
    doctor: "Dr. Priya Sen",
    time: "04:30 PM",
    type: "Dermatology",
    status: "Completed",
  },
];

const activities = [
  {
    title: "New patient registered",
    description: "Rahul Das was added to the patient list.",
    time: "10 min ago",
    icon: UserRound,
  },
  {
    title: "Test report uploaded",
    description: "CBC report uploaded for Amit Kumar.",
    time: "32 min ago",
    icon: FileText,
  },
  {
    title: "Appointment completed",
    description: "Dr. Ananya Sharma completed an appointment.",
    time: "1 hour ago",
    icon: CheckCircle2,
  },
];

const Dashboard = () => {
  return (
    <section className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900">
          Good morning, Admin 👋
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          Here's what's happening in your clinic today.
        </p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <div
              key={stat.title}
              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
            >
              <div className="flex items-start justify-between">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-teal-50 text-teal-600">
                  <Icon size={21} />
                </div>

                <ArrowUpRight size={17} className="text-slate-300" />
              </div>

              <p className="mt-5 text-sm font-medium text-slate-500">
                {stat.title}
              </p>

              <div className="mt-1 flex items-end justify-between gap-3">
                <h2 className="text-2xl font-bold text-slate-900">
                  {stat.value}
                </h2>

                <span className="rounded-full bg-emerald-50 px-2 py-1 text-xs font-semibold text-emerald-600">
                  {stat.change}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Main Grid */}
      <div className="grid gap-6 xl:grid-cols-3">
        {/* Appointments */}
        <div className="xl:col-span-2">
          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="flex items-center justify-between border-b border-slate-100 p-5">
              <div>
                <h2 className="font-bold text-slate-900">
                  Today's Appointments
                </h2>
                <p className="mt-1 text-xs text-slate-400">
                  {appointments.length} appointments scheduled today
                </p>
              </div>

              <button className="text-sm font-semibold text-teal-600 hover:text-teal-700">
                View all
              </button>
            </div>

            <div className="divide-y divide-slate-100">
              {appointments.map((appointment) => (
                <div
                  key={`${appointment.patient}-${appointment.time}`}
                  className="flex flex-col gap-4 p-5 transition hover:bg-slate-50 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-teal-50 font-semibold text-teal-700">
                      {appointment.patient
                        .split(" ")
                        .map((name) => name[0])
                        .join("")}
                    </div>

                    <div>
                      <p className="font-semibold text-slate-800">
                        {appointment.patient}
                      </p>
                      <p className="text-xs text-slate-400">
                        {appointment.doctor} · {appointment.type}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1.5 text-sm font-medium text-slate-500">
                      <Clock3 size={15} />
                      {appointment.time}
                    </div>

                    <span
                      className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                        appointment.status === "Confirmed"
                          ? "bg-emerald-50 text-emerald-600"
                          : appointment.status === "Pending"
                            ? "bg-amber-50 text-amber-600"
                            : "bg-blue-50 text-blue-600"
                      }`}
                    >
                      {appointment.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Clinic Overview */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-bold text-slate-900">
                Clinic Overview
              </h2>
              <p className="mt-1 text-xs text-slate-400">
                Today's activity
              </p>
            </div>

            <Activity size={20} className="text-teal-600" />
          </div>

          <div className="mt-6 space-y-5">
            <div>
              <div className="mb-2 flex justify-between text-sm">
                <span className="text-slate-500">Appointments</span>
                <span className="font-semibold text-slate-800">
                  82%
                </span>
              </div>

              <div className="h-2 rounded-full bg-slate-100">
                <div className="h-2 w-[82%] rounded-full bg-teal-500" />
              </div>
            </div>

            <div>
              <div className="mb-2 flex justify-between text-sm">
                <span className="text-slate-500">Doctor Availability</span>
                <span className="font-semibold text-slate-800">
                  76%
                </span>
              </div>

              <div className="h-2 rounded-full bg-slate-100">
                <div className="h-2 w-[76%] rounded-full bg-blue-500" />
              </div>
            </div>

            <div>
              <div className="mb-2 flex justify-between text-sm">
                <span className="text-slate-500">Reports Completed</span>
                <span className="font-semibold text-slate-800">
                  91%
                </span>
              </div>

              <div className="h-2 rounded-full bg-slate-100">
                <div className="h-2 w-[91%] rounded-full bg-emerald-500" />
              </div>
            </div>
          </div>

          <div className="mt-7 rounded-xl bg-slate-50 p-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
              System Status
            </p>

            <div className="mt-2 flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
              <span className="text-sm font-semibold text-slate-700">
                All systems operational
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-100 p-5">
          <h2 className="font-bold text-slate-900">Recent Activity</h2>
        </div>

        <div className="grid divide-y divide-slate-100 md:grid-cols-3 md:divide-x md:divide-y-0">
          {activities.map((activity) => {
            const Icon = activity.icon;

            return (
              <div key={activity.title} className="flex gap-3 p-5">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-teal-50 text-teal-600">
                  <Icon size={18} />
                </div>

                <div>
                  <p className="text-sm font-semibold text-slate-800">
                    {activity.title}
                  </p>
                  <p className="mt-1 text-xs leading-5 text-slate-400">
                    {activity.description}
                  </p>
                  <p className="mt-2 text-[11px] font-medium text-slate-400">
                    {activity.time}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Dashboard;