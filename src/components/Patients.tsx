import { useState } from "react";
import {
  Search,
  Plus,
  MoreVertical,
  CalendarDays,
  Phone,
  X,
} from "lucide-react";

type Patient = {
  id: number;
  name: string;
  age: number;
  gender: "Male" | "Female";
  phone: string;
  lastVisit: string;
  condition: string;
};

const initialPatients: Patient[] = [
  {
    id: 1,
    name: "Amit Kumar",
    age: 34,
    gender: "Male",
    phone: "+91 98765 11111",
    lastVisit: "28 Sep 2026",
    condition: "Hypertension",
  },
  {
    id: 2,
    name: "Sneha Das",
    age: 29,
    gender: "Female",
    phone: "+91 98765 22222",
    lastVisit: "30 Sep 2026",
    condition: "Migraine",
  },
  {
    id: 3,
    name: "Rohit Sen",
    age: 46,
    gender: "Male",
    phone: "+91 98765 33333",
    lastVisit: "25 Sep 2026",
    condition: "Diabetes",
  },
  {
    id: 4,
    name: "Priya Roy",
    age: 38,
    gender: "Female",
    phone: "+91 98765 44444",
    lastVisit: "01 Oct 2026",
    condition: "Asthma",
  },
];

const Patients = () => {
  const [patients, setPatients] = useState(initialPatients);
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);

  const [form, setForm] = useState({
    name: "",
    age: "",
    gender: "Male",
    phone: "",
    condition: "",
  });

  const filteredPatients = patients.filter((patient) =>
    `${patient.name} ${patient.phone} ${patient.condition}`
      .toLowerCase()
      .includes(search.toLowerCase()),
  );

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (
      !form.name ||
      !form.age ||
      !form.phone ||
      !form.condition
    ) {
      return;
    }

    console.log("Patient form values:", form);

    setPatients((current) => [
      ...current,
      {
        id: Date.now(),
        name: form.name,
        age: Number(form.age),
        gender: form.gender as Patient["gender"],
        phone: form.phone,
        condition: form.condition,
        lastVisit: "Today",
      },
    ]);

    setForm({
      name: "",
      age: "",
      gender: "Male",
      phone: "",
      condition: "",
    });

    setShowForm(false);
  };

  return (
    <section className="space-y-6">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Patients</h1>
          <p className="mt-1 text-sm text-slate-500">
            Manage patient records and visit history.
          </p>
        </div>

        <button
          onClick={() => setShowForm(true)}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-teal-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-teal-700"
        >
          <Plus size={18} />
          Add Patient
        </button>
      </div>

      <div className="flex items-center rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
        <Search size={18} className="text-slate-400" />

        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search patients..."
          className="ml-3 w-full bg-transparent text-sm outline-none placeholder:text-slate-400"
        />
      </div>

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[800px] text-left">
            <thead className="border-b border-slate-100 bg-slate-50">
              <tr className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                <th className="px-6 py-4">Patient</th>
                <th className="px-6 py-4">Age / Gender</th>
                <th className="px-6 py-4">Phone</th>
                <th className="px-6 py-4">Condition</th>
                <th className="px-6 py-4">Last Visit</th>
                <th className="px-6 py-4"></th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {filteredPatients.map((patient) => (
                <tr key={patient.id} className="hover:bg-slate-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-teal-50 font-semibold text-teal-700">
                        {patient.name
                          .split(" ")
                          .map((name) => name[0])
                          .join("")}
                      </div>

                      <span className="font-semibold text-slate-800">
                        {patient.name}
                      </span>
                    </div>
                  </td>

                  <td className="px-6 py-4 text-sm text-slate-500">
                    {patient.age} / {patient.gender}
                  </td>

                  <td className="px-6 py-4 text-sm text-slate-500">
                    {patient.phone}
                  </td>

                  <td className="px-6 py-4">
                    <span className="rounded-full bg-blue-50 px-2.5 py-1 text-xs font-semibold text-blue-600">
                      {patient.condition}
                    </span>
                  </td>

                  <td className="px-6 py-4 text-sm text-slate-500">
                    <span className="flex items-center gap-2">
                      <CalendarDays size={15} />
                      {patient.lastVisit}
                    </span>
                  </td>

                  <td className="px-6 py-4">
                    <button className="rounded-lg p-2 text-slate-400 hover:bg-slate-100">
                      <MoreVertical size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4">
          <form
            onSubmit={handleSubmit}
            className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl"
          >
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-lg font-bold text-slate-900">
                Add Patient
              </h2>

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
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-teal-500"
              />

              <div className="grid gap-4 sm:grid-cols-2">
                <input
                  required
                  type="number"
                  min="1"
                  placeholder="Age"
                  value={form.age}
                  onChange={(e) => setForm({ ...form, age: e.target.value })}
                  className="rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-teal-500"
                />

                <select
                  value={form.gender}
                  onChange={(e) =>
                    setForm({ ...form, gender: e.target.value })
                  }
                  className="rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-teal-500"
                >
                  <option>Male</option>
                  <option>Female</option>
                </select>
              </div>

              <div className="flex items-center rounded-xl border border-slate-200 px-4">
                <Phone size={17} className="text-slate-400" />
                <input
                  required
                  placeholder="Phone number"
                  value={form.phone}
                  onChange={(e) =>
                    setForm({ ...form, phone: e.target.value })
                  }
                  className="w-full px-3 py-3 text-sm outline-none"
                />
              </div>

              <input
                required
                placeholder="Condition"
                value={form.condition}
                onChange={(e) =>
                  setForm({ ...form, condition: e.target.value })
                }
                className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-teal-500"
              />
            </div>

            <button
              type="submit"
              className="mt-6 w-full rounded-xl bg-teal-600 py-3 text-sm font-semibold text-white hover:bg-teal-700"
            >
              Add Patient
            </button>
          </form>
        </div>
      )}
    </section>
  );
};

export default Patients;