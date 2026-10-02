import { useState } from "react";
import {
  BookOpen,
  ChevronDown,
  Mail,
  MessageCircle,
  Search,
  Send,
} from "lucide-react";

const faqs = [
  {
    question: "How do I add a new patient?",
    answer:
      "Open Patients from the sidebar and select Add Patient. Enter the patient's basic information and submit the form.",
  },
  {
    question: "How do I schedule an appointment?",
    answer:
      "Open Appointments, select New Appointment, choose the patient and doctor, then select the appointment date and time.",
  },
  {
    question: "Where can I find test reports?",
    answer:
      "Open Tests & Reports from the sidebar. You can search reports and view their current status.",
  },
  {
    question: "How do I add a doctor?",
    answer:
      "Open Doctors and select Add Doctor. Enter the doctor's professional and contact information.",
  },
];

const HelpCenter = () => {
  const [search, setSearch] = useState("");
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const [message, setMessage] = useState({
    name: "",
    email: "",
    message: "",
  });

  const filteredFaqs = faqs.filter((faq) =>
    `${faq.question} ${faq.answer}`
      .toLowerCase()
      .includes(search.toLowerCase()),
  );

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!message.name || !message.email || !message.message) return;

    console.log("Help Center form values:", message);

    setMessage({
      name: "",
      email: "",
      message: "",
    });
  };

  return (
    <section className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900">
          Help Center
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          Find answers or contact the ClinicOS support team.
        </p>
      </div>

      {/* Search */}
      <div className="rounded-2xl bg-teal-600 p-6 sm:p-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-xl font-bold text-white">
            How can we help?
          </h2>

          <p className="mt-2 text-sm text-teal-100">
            Search our help articles and frequently asked questions.
          </p>

          <div className="mt-5 flex items-center rounded-xl bg-white px-4 py-3 shadow-sm">
            <Search size={18} className="text-slate-400" />

            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search for help..."
              className="ml-3 w-full text-sm outline-none placeholder:text-slate-400"
            />
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* FAQs */}
        <div className="lg:col-span-2 rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-100 p-5">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-50 text-teal-600">
                <BookOpen size={19} />
              </div>

              <div>
                <h2 className="font-bold text-slate-900">
                  Frequently Asked Questions
                </h2>
                <p className="text-xs text-slate-400">
                  Common ClinicOS questions
                </p>
              </div>
            </div>
          </div>

          <div className="divide-y divide-slate-100">
            {filteredFaqs.map((faq, index) => {
              const isOpen = openFaq === index;

              return (
                <div key={faq.question}>
                  <button
                    type="button"
                    onClick={() =>
                      setOpenFaq(isOpen ? null : index)
                    }
                    className="flex w-full items-center justify-between gap-4 p-5 text-left hover:bg-slate-50"
                  >
                    <span className="text-sm font-semibold text-slate-800">
                      {faq.question}
                    </span>

                    <ChevronDown
                      size={18}
                      className={`shrink-0 text-slate-400 transition-transform ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 text-sm leading-6 text-slate-500">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Contact */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-50 text-teal-600">
              <MessageCircle size={19} />
            </div>

            <div>
              <h2 className="font-bold text-slate-900">
                Contact Support
              </h2>
              <p className="text-xs text-slate-400">
                We'll get back to you soon.
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="mt-5 space-y-3">
            <input
              required
              placeholder="Your name"
              value={message.name}
              onChange={(e) =>
                setMessage({ ...message, name: e.target.value })
              }
              className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-teal-500"
            />

            <input
              required
              type="email"
              placeholder="Email address"
              value={message.email}
              onChange={(e) =>
                setMessage({ ...message, email: e.target.value })
              }
              className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-teal-500"
            />

            <textarea
              required
              rows={4}
              placeholder="How can we help?"
              value={message.message}
              onChange={(e) =>
                setMessage({ ...message, message: e.target.value })
              }
              className="w-full resize-none rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-teal-500"
            />

            <button
              type="submit"
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-teal-600 py-3 text-sm font-semibold text-white hover:bg-teal-700"
            >
              <Send size={16} />
              Send Message
            </button>
          </form>

          <div className="mt-5 flex items-center gap-2 border-t border-slate-100 pt-5 text-xs text-slate-400">
            <Mail size={14} />
            support@clinicos.com
          </div>
        </div>
      </div>
    </section>
  );
};

export default HelpCenter;