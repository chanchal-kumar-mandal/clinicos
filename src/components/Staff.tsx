import { useState } from "react";
import {
  Search,
  Plus,
  MoreVertical,
  Mail,
  Phone,
  ShieldCheck,
  X,
} from "lucide-react";

type StaffMember = {
  id: number;
  name: string;
  role: string;
  department: string;
  email: string;
  phone: string;
  status: "Active" | "On Leave";
};

const initialStaff: StaffMember[] = [
  {
    id: 1,
    name: "Neha Sharma",
    role: "Receptionist",
    department: "Front Desk",
    email: "neha@clinicos.com",
    phone: "+91 98765 10001",
    status: "Active",
  },
  {
    id: 2,
    name: "Vikram Das",
    role: "Lab Technician",
    department: "Laboratory",
    email: "vikram@clinicos.com",
    phone: "+91 98765 10002",
    status: "Active",
  },
  {
    id: 3,
    name: "Riya Sen",
    role: "Nurse",
    department: "Nursing",
    email: "riya@clinicos.com",
    phone: "+91 98765 10003",
    status: "On Leave",
  },
  {
    id: 4,
    name: "Arindam Roy",
    role: "Pharmacist",
    department: "Pharmacy",
    email: "arindam@clinicos.com",
    phone: "+91 98765 10004",
    status: "Active",
  },
];

const Staff = () => {
  const [staff, setStaff] = useState(initialStaff);
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);

  const [form, setForm] = useState({
    name: "",
    role: "",
    department: "",
    email: "",
    phone: "",
  });

  const filteredStaff = staff.filter((member) =>
    `${member.name} ${member.role} ${member.department}`
      .toLowerCase()
      .includes(search.toLowerCase()),
  );

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (
      !form.name ||
      !form.role ||
      !form.department ||
      !form.email ||
      !form.phone
    ) {
      return;
    }

    console.log("Staff form values:", form);

    setStaff((current) => [
      ...current,
      {
        id: Date.now(),
        ...form,
        status: "Active",
      },
    ]);

    setForm({
      name: "",
      role: "",
      department: "",
      email: "",
      phone: "",
    });

    setShowForm(false);
  };

  return (
    <section className="space-y-6">
      {/* Header */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Staff</h1>
          <p className="mt-1 text-sm text-slate-500">
            Manage your clinic staff and team members.
          </p>
        </div>

        <button
          onClick={() => setShowForm(true)}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-teal-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-teal-700"
        >
          <Plus size={18} />
          Add Staff
        </button>
      </div>

      {/* Search */}
      <div className="flex items-center rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
        <Search size={18} className="text-slate-400" />

        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search staff..."
          className="ml-3 w-full bg-transparent text-sm outline-none placeholder:text-slate-400"
        />
      </div>

      {/* Staff Grid */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {filteredStaff.map((member) => (
          <div
            key={member.id}
            className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
          >
            <div className="flex items-start justify-between">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-teal-50 font-bold text-teal-700">
                {member.name
                  .split(" ")
                  .map((name) => name[0])
                  .join("")}
              </div>

              <button className="rounded-lg p-2 text-slate-400 hover:bg-slate-50">
                <MoreVertical size={18} />
              </button>
            </div>

            <div className="mt-4">
              <h3 className="font-bold text-slate-900">
                {member.name}
              </h3>

              <p className="mt-1 text-sm font-medium text-teal-600">
                {member.role}
              </p>

              <p className="mt-1 text-xs text-slate-400">
                {member.department}
              </p>
            </div>

            <div className="mt-4 space-y-2 border-t border-slate-100 pt-4 text-sm text-slate-500">
              <div className="flex items-center gap-2">
                <Mail size={15} />
                <span className="truncate">{member.email}</span>
              </div>

              <div className="flex items-center gap-2">
                <Phone size={15} />
                {member.phone}
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between">
              <span
                className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                  member.status === "Active"
                    ? "bg-emerald-50 text-emerald-600"
                    : "bg-amber-50 text-amber-600"
                }`}
              >
                {member.status}
              </span>

              <div className="flex items-center gap-1 text-xs font-medium text-slate-400">
                <ShieldCheck size={14} />
                Staff
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Staff Modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4">
          <form
            onSubmit={handleSubmit}
            className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl"
          >
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold text-slate-900">
                  Add Staff Member
                </h2>

                <p className="text-sm text-slate-500">
                  Enter staff member information.
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
                placeholder="Full name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-teal-500"
              />

              <div className="grid gap-4 sm:grid-cols-2">
                <input
                  required
                  placeholder="Role"
                  value={form.role}
                  onChange={(e) =>
                    setForm({ ...form, role: e.target.value })
                  }
                  className="rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-teal-500"
                />

                <input
                  required
                  placeholder="Department"
                  value={form.department}
                  onChange={(e) =>
                    setForm({ ...form, department: e.target.value })
                  }
                  className="rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-teal-500"
                />
              </div>

              <input
                required
                type="email"
                placeholder="Email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-teal-500"
              />

              <input
                required
                placeholder="Phone"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-teal-500"
              />
            </div>

            <button
              type="submit"
              className="mt-6 w-full rounded-xl bg-teal-600 py-3 text-sm font-semibold text-white hover:bg-teal-700"
            >
              Add Staff Member
            </button>
          </form>
        </div>
      )}
    </section>
  );
};

export default Staff;