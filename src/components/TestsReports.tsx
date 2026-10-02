import { useState } from "react";
import {
  FileText,
  Search,
  Plus,
  Download,
  Eye,
  X,
  FlaskConical,
} from "lucide-react";

type Report = {
  id: number;
  patient: string;
  test: string;
  doctor: string;
  date: string;
  status: "Completed" | "Pending" | "Processing";
};

const initialReports: Report[] = [
  {
    id: 1,
    patient: "Amit Kumar",
    test: "Complete Blood Count",
    doctor: "Dr. Ananya Sharma",
    date: "02 Oct 2026",
    status: "Completed",
  },
  {
    id: 2,
    patient: "Sneha Das",
    test: "Blood Sugar",
    doctor: "Dr. Rahul Mehta",
    date: "02 Oct 2026",
    status: "Pending",
  },
  {
    id: 3,
    patient: "Rohit Sen",
    test: "X-Ray Chest",
    doctor: "Dr. Arjun Roy",
    date: "01 Oct 2026",
    status: "Processing",
  },
  {
    id: 4,
    patient: "Priya Roy",
    test: "Thyroid Profile",
    doctor: "Dr. Priya Sen",
    date: "30 Sep 2026",
    status: "Completed",
  },
];

const TestsReports = () => {
  const [reports, setReports] = useState(initialReports);
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);

  const [form, setForm] = useState({
    patient: "",
    test: "",
    doctor: "",
    date: "",
  });

  const filteredReports = reports.filter((report) =>
    `${report.patient} ${report.test} ${report.doctor}`
      .toLowerCase()
      .includes(search.toLowerCase()),
  );

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!form.patient || !form.test || !form.doctor || !form.date) {
      return;
    }

    console.log("Test & Report form values:", form);

    setReports((current) => [
      ...current,
      {
        id: Date.now(),
        ...form,
        status: "Pending",
      },
    ]);

    setForm({
      patient: "",
      test: "",
      doctor: "",
      date: "",
    });

    setShowForm(false);
  };

  return (
    <section className="space-y-6">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            Tests & Reports
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Manage diagnostic tests and patient reports.
          </p>
        </div>

        <button
          onClick={() => setShowForm(true)}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-teal-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-teal-700"
        >
          <Plus size={18} />
          Add Test
        </button>
      </div>

      {/* Summary */}
      <div className="grid gap-4 sm:grid-cols-3">
        {[
          ["Total Tests", "248"],
          ["Completed", "192"],
          ["Pending", "18"],
        ].map(([label, value]) => (
          <div
            key={label}
            className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
          >
            <p className="text-sm text-slate-500">{label}</p>
            <p className="mt-2 text-2xl font-bold text-slate-900">
              {value}
            </p>
          </div>
        ))}
      </div>

      {/* Search */}
      <div className="flex items-center rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
        <Search size={18} className="text-slate-400" />

        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search patient, test or doctor..."
          className="ml-3 w-full bg-transparent text-sm outline-none placeholder:text-slate-400"
        />
      </div>

      {/* Reports */}
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[850px] text-left">
            <thead className="border-b border-slate-100 bg-slate-50">
              <tr className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                <th className="px-6 py-4">Patient</th>
                <th className="px-6 py-4">Test</th>
                <th className="px-6 py-4">Doctor</th>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {filteredReports.map((report) => (
                <tr key={report.id} className="hover:bg-slate-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-teal-50 text-teal-600">
                        <FileText size={17} />
                      </div>

                      <span className="font-semibold text-slate-800">
                        {report.patient}
                      </span>
                    </div>
                  </td>

                  <td className="px-6 py-4 text-sm text-slate-600">
                    {report.test}
                  </td>

                  <td className="px-6 py-4 text-sm text-slate-500">
                    {report.doctor}
                  </td>

                  <td className="px-6 py-4 text-sm text-slate-500">
                    {report.date}
                  </td>

                  <td className="px-6 py-4">
                    <span
                      className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                        report.status === "Completed"
                          ? "bg-emerald-50 text-emerald-600"
                          : report.status === "Pending"
                            ? "bg-amber-50 text-amber-600"
                            : "bg-blue-50 text-blue-600"
                      }`}
                    >
                      {report.status}
                    </span>
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1">
                      <button className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-teal-600">
                        <Eye size={17} />
                      </button>

                      <button className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-teal-600">
                        <Download size={17} />
                      </button>
                    </div>
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
              <div>
                <h2 className="text-lg font-bold text-slate-900">
                  Add Test
                </h2>
                <p className="text-sm text-slate-500">
                  Add a new diagnostic test.
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
              <div className="flex items-center rounded-xl border border-slate-200 px-4">
                <FlaskConical size={17} className="text-slate-400" />
                <input
                  required
                  placeholder="Patient name"
                  value={form.patient}
                  onChange={(e) =>
                    setForm({ ...form, patient: e.target.value })
                  }
                  className="w-full px-3 py-3 text-sm outline-none"
                />
              </div>

              <input
                required
                placeholder="Test name"
                value={form.test}
                onChange={(e) => setForm({ ...form, test: e.target.value })}
                className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-teal-500"
              />

              <input
                required
                placeholder="Doctor name"
                value={form.doctor}
                onChange={(e) => setForm({ ...form, doctor: e.target.value })}
                className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-teal-500"
              />

              <input
                required
                type="date"
                value={form.date}
                onChange={(e) => setForm({ ...form, date: e.target.value })}
                className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-teal-500"
              />
            </div>

            <button
              type="submit"
              className="mt-6 w-full rounded-xl bg-teal-600 py-3 text-sm font-semibold text-white hover:bg-teal-700"
            >
              Add Test
            </button>
          </form>
        </div>
      )}
    </section>
  );
};

export default TestsReports;