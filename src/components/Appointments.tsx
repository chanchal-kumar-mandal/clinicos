import { useState } from "react";
import {
  CalendarDays,
  Clock,
  Plus,
  UserRound,
  Stethoscope,
  X,
} from "lucide-react";

type Appointment = {
  id: number;
  patient: string;
  doctor: string;
  specialty: string;
  date: string;
  time: string;
  status: "Confirmed" | "Pending" | "Completed" | "Cancelled";
};

const initialAppointments: Appointment[] = [
  {
    id: 1,
    patient: "Amit Kumar",
    doctor: "Dr. Ananya Sharma",
    specialty: "Cardiologist",
    date: "02 Oct 2026",
    time: "10:00 AM",
    status: "Confirmed",
  },
  {
    id: 2,
    patient: "Sneha Das",
    doctor: "Dr. Rahul Mehta",
    specialty: "General Physician",
    date: "02 Oct 2026",
    time: "11:30 AM",
    status: "Pending",
  },
  {
    id: 3,
    patient: "Rohit Sen",
    doctor: "Dr. Arjun Roy",
    specialty: "Orthopedic",
    date: "02 Oct 2026",
    time: "02:00 PM",
    status: "Confirmed",
  },
  {
    id: 4,
    patient: "Priya Roy",
    doctor: "Dr. Priya Sen",
    specialty: "Dermatologist",
    date: "03 Oct 2026",
    time: "09:30 AM",
    status: "Completed",
  },
];

const statusClasses: Record<Appointment["status"], string> = {
  Confirmed: "bg-emerald-50 text-emerald-600",
  Pending: "bg-amber-50 text-amber-600",
  Completed: "bg-blue-50 text-blue-600",
  Cancelled: "bg-red-50 text-red-600",
};

const Appointments = () => {
  const [appointments, setAppointments] =
    useState<Appointment[]>(initialAppointments);

  const [filter, setFilter] = useState("All");
  const [showForm, setShowForm] = useState(false);

  const [form, setForm] = useState({
    patient: "",
    doctor: "",
    specialty: "",
    date: "",
    time: "",
  });

  const filteredAppointments =
    filter === "All"
      ? appointments
      : appointments.filter(
          (appointment) => appointment.status === filter,
        );

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (
      !form.patient ||
      !form.doctor ||
      !form.specialty ||
      !form.date ||
      !form.time
    ) {
      return;
    }

    console.log("Appointment form values:", form);

    setAppointments((current) => [
      ...current,
      {
        id: Date.now(),
        ...form,
        status: "Pending",
      },
    ]);

    setForm({
      patient: "",
      doctor: "",
      specialty: "",
      date: "",
      time: "",
    });

    setShowForm(false);
  };

  return (
    <section className="space-y-6">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            Appointments
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Schedule and manage patient appointments.
          </p>
        </div>

        <button
          onClick={() => setShowForm(true)}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-teal-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-teal-700"
        >
          <Plus size={18} />
          New Appointment
        </button>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-1">
        {["All", "Confirmed", "Pending", "Completed", "Cancelled"].map(
          (item) => (
            <button
              key={item}
              onClick={() => setFilter(item)}
              className={`whitespace-nowrap rounded-lg px-4 py-2 text-sm font-medium transition ${
                filter === item
                  ? "bg-teal-600 text-white"
                  : "bg-white text-slate-500 ring-1 ring-slate-200 hover:bg-slate-50"
              }`}
            >
              {item}
            </button>
          ),
        )}
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        {filteredAppointments.map((appointment) => (
          <div
            key={appointment.id}
            className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-teal-50 text-teal-600">
                  <UserRound size={20} />
                </div>

                <div>
                  <h3 className="font-bold text-slate-900">
                    {appointment.patient}
                  </h3>
                  <p className="text-sm text-slate-500">
                    {appointment.specialty}
                  </p>
                </div>
              </div>

              <span
                className={`rounded-full px-2.5 py-1 text-xs font-semibold ${statusClasses[appointment.status]}`}
              >
                {appointment.status}
              </span>
            </div>

            <div className="mt-5 grid gap-3 border-t border-slate-100 pt-4 sm:grid-cols-2">
              <div className="flex items-center gap-2 text-sm text-slate-500">
                <Stethoscope size={16} className="text-teal-600" />
                {appointment.doctor}
              </div>

              <div className="flex items-center gap-2 text-sm text-slate-500">
                <CalendarDays size={16} className="text-teal-600" />
                {appointment.date}
              </div>

              <div className="flex items-center gap-2 text-sm text-slate-500">
                <Clock size={16} className="text-teal-600" />
                {appointment.time}
              </div>
            </div>
          </div>
        ))}
      </div>

      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4">
          <form
            onSubmit={handleSubmit}
            className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl"
          >
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold text-slate-900">
                  New Appointment
                </h2>
                <p className="text-sm text-slate-500">
                  Schedule a patient appointment.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="rounded-lg p-2 text-slate-400 hover:bg-slate-100"
              >
                <X size={20} />
              </button>
            </div>

            <div className="space-y-4">
              <input
                required
                placeholder="Patient name"
                value={form.patient}
                onChange={(e) =>
                  setForm({ ...form, patient: e.target.value })
                }
                className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-teal-500"
              />

              <input
                required
                placeholder="Doctor name"
                value={form.doctor}
                onChange={(e) =>
                  setForm({ ...form, doctor: e.target.value })
                }
                className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-teal-500"
              />

              <input
                required
                placeholder="Specialty"
                value={form.specialty}
                onChange={(e) =>
                  setForm({ ...form, specialty: e.target.value })
                }
                className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-teal-500"
              />

              <div className="grid gap-4 sm:grid-cols-2">
                <input
                  required
                  type="date"
                  value={form.date}
                  onChange={(e) => setForm({ ...form, date: e.target.value })}
                  className="rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-teal-500"
                />

                <input
                  required
                  type="time"
                  value={form.time}
                  onChange={(e) => setForm({ ...form, time: e.target.value })}
                  className="rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-teal-500"
                />
              </div>
            </div>

            <button
              type="submit"
              className="mt-6 w-full rounded-xl bg-teal-600 py-3 text-sm font-semibold text-white hover:bg-teal-700"
            >
              Create Appointment
            </button>
          </form>
        </div>
      )}
    </section>
  );
};

export default Appointments;