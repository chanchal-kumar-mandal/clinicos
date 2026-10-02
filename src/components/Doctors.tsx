import { useState } from "react";
import {
  Search,
  Plus,
  MoreVertical,
  Stethoscope,
  Mail,
  Phone,
  X,
} from "lucide-react";

type Doctor = {
  id: number;
  name: string;
  specialty: string;
  email: string;
  phone: string;
  experience: string;
  status: "Available" | "On Leave";
};

const initialDoctors: Doctor[] = [
  {
    id: 1,
    name: "Dr. Ananya Sharma",
    specialty: "Cardiologist",
    email: "ananya@clinicos.com",
    phone: "+91 98765 43210",
    experience: "12 years",
    status: "Available",
  },
  {
    id: 2,
    name: "Dr. Rahul Mehta",
    specialty: "General Physician",
    email: "rahul@clinicos.com",
    phone: "+91 98765 12345",
    experience: "9 years",
    status: "Available",
  },
  {
    id: 3,
    name: "Dr. Priya Sen",
    specialty: "Dermatologist",
    email: "priya@clinicos.com",
    phone: "+91 98765 67890",
    experience: "8 years",
    status: "On Leave",
  },
  {
    id: 4,
    name: "Dr. Arjun Roy",
    specialty: "Orthopedic",
    email: "arjun@clinicos.com",
    phone: "+91 98765 24680",
    experience: "15 years",
    status: "Available",
  },
];

const Doctors = () => {
  const [doctors, setDoctors] = useState(initialDoctors);
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);

  const [form, setForm] = useState({
    name: "",
    specialty: "",
    email: "",
    phone: "",
  });

  const filteredDoctors = doctors.filter((doctor) =>
    `${doctor.name} ${doctor.specialty}`
      .toLowerCase()
      .includes(search.toLowerCase()),
  );

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!form.name || !form.specialty || !form.email || !form.phone) {
      return;
    }

    console.log("Doctor form values:", form);

    setDoctors((current) => [
      ...current,
      {
        id: Date.now(),
        ...form,
        experience: "New",
        status: "Available",
      },
    ]);

    setForm({
      name: "",
      specialty: "",
      email: "",
      phone: "",
    });

    setShowForm(false);
  };

  return (
    <section className="space-y-6">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Doctors</h1>
          <p className="mt-1 text-sm text-slate-500">
            Manage doctors and their availability.
          </p>
        </div>

        <button
          onClick={() => setShowForm(true)}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-teal-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-teal-700"
        >
          <Plus size={18} />
          Add Doctor
        </button>
      </div>

      <div className="flex items-center rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
        <Search size={18} className="text-slate-400" />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search doctors..."
          className="ml-3 w-full bg-transparent text-sm outline-none placeholder:text-slate-400"
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {filteredDoctors.map((doctor) => (
          <div
            key={doctor.id}
            className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
          >
            <div className="flex items-start justify-between">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-teal-50 font-bold text-teal-700">
                {doctor.name
                  .replace("Dr. ", "")
                  .split(" ")
                  .map((name) => name[0])
                  .join("")}
              </div>

              <button className="rounded-lg p-2 text-slate-400 hover:bg-slate-50 hover:text-slate-700">
                <MoreVertical size={18} />
              </button>
            </div>

            <div className="mt-4">
              <h3 className="font-bold text-slate-900">{doctor.name}</h3>
              <p className="mt-1 text-sm font-medium text-teal-600">
                {doctor.specialty}
              </p>
            </div>

            <div className="mt-4 space-y-2 border-t border-slate-100 pt-4 text-sm text-slate-500">
              <div className="flex items-center gap-2">
                <Mail size={15} />
                <span className="truncate">{doctor.email}</span>
              </div>

              <div className="flex items-center gap-2">
                <Phone size={15} />
                {doctor.phone}
              </div>

              <div className="flex items-center gap-2">
                <Stethoscope size={15} />
                {doctor.experience} experience
              </div>
            </div>

            <div className="mt-4">
              <span
                className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                  doctor.status === "Available"
                    ? "bg-emerald-50 text-emerald-600"
                    : "bg-amber-50 text-amber-600"
                }`}
              >
                {doctor.status}
              </span>
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
                  Add Doctor
                </h2>
                <p className="text-sm text-slate-500">
                  Enter doctor information.
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

            <div className="grid gap-4 sm:grid-cols-2">
              <input
                required
                placeholder="Doctor name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-teal-500"
              />

              <input
                required
                placeholder="Specialty"
                value={form.specialty}
                onChange={(e) =>
                  setForm({ ...form, specialty: e.target.value })
                }
                className="rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-teal-500"
              />

              <input
                required
                type="email"
                placeholder="Email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-teal-500"
              />

              <input
                required
                placeholder="Phone"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                className="rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-teal-500"
              />
            </div>

            <button
              type="submit"
              className="mt-6 w-full rounded-xl bg-teal-600 py-3 text-sm font-semibold text-white hover:bg-teal-700"
            >
              Add Doctor
            </button>
          </form>
        </div>
      )}
    </section>
  );
};

export default Doctors;
