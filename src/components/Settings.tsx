import { useState } from "react";
import {
  Bell,
  Building2,
  Lock,
  Save,
  Shield,
  UserRound,
} from "lucide-react";

const Settings = () => {
  const [profile, setProfile] = useState({
    clinicName: "ClinicOS Medical Center",
    adminName: "Clinic Admin",
    email: "admin@clinicos.com",
    phone: "+91 98765 00000",
    address: "Bengaluru, India",
  });

  const [notifications, setNotifications] = useState({
    appointments: true,
    reports: true,
    reminders: true,
  });

  const [activeSection, setActiveSection] = useState("Clinic");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log("Settings form values:", {
      profile,
      notifications,
    });
  };

  const sections = [
    {
      label: "Clinic",
      icon: Building2,
    },
    {
      label: "Profile",
      icon: UserRound,
    },
    {
      label: "Notifications",
      icon: Bell,
    },
    {
      label: "Security",
      icon: Shield,
    },
  ];

  return (
    <section className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900">
          Settings
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          Manage your ClinicOS preferences and configuration.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[220px_1fr]">
        {/* Settings Navigation */}
        <div className="h-fit rounded-2xl border border-slate-200 bg-white p-2 shadow-sm">
          {sections.map((section) => {
            const Icon = section.icon;
            const isActive = activeSection === section.label;

            return (
              <button
                key={section.label}
                type="button"
                onClick={() => setActiveSection(section.label)}
                className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition ${
                  isActive
                    ? "bg-teal-50 text-teal-700"
                    : "text-slate-500 hover:bg-slate-50 hover:text-slate-800"
                }`}
              >
                <Icon size={18} />
                {section.label}
              </button>
            );
          })}
        </div>

        {/* Settings Content */}
        <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
          <form onSubmit={handleSubmit}>
            {activeSection === "Clinic" && (
              <div className="p-5 sm:p-6">
                <div className="border-b border-slate-100 pb-5">
                  <h2 className="font-bold text-slate-900">
                    Clinic Information
                  </h2>
                  <p className="mt-1 text-sm text-slate-400">
                    Update your clinic's basic information.
                  </p>
                </div>

                <div className="mt-6 grid gap-5 sm:grid-cols-2">
                  <div className="sm:col-span-2">
                    <label className="mb-2 block text-sm font-medium text-slate-700">
                      Clinic Name
                    </label>

                    <input
                      required
                      value={profile.clinicName}
                      onChange={(e) =>
                        setProfile({
                          ...profile,
                          clinicName: e.target.value,
                        })
                      }
                      className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-teal-500"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-700">
                      Admin Name
                    </label>

                    <input
                      required
                      value={profile.adminName}
                      onChange={(e) =>
                        setProfile({
                          ...profile,
                          adminName: e.target.value,
                        })
                      }
                      className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-teal-500"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-700">
                      Phone
                    </label>

                    <input
                      required
                      value={profile.phone}
                      onChange={(e) =>
                        setProfile({
                          ...profile,
                          phone: e.target.value,
                        })
                      }
                      className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-teal-500"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-700">
                      Email
                    </label>

                    <input
                      required
                      type="email"
                      value={profile.email}
                      onChange={(e) =>
                        setProfile({
                          ...profile,
                          email: e.target.value,
                        })
                      }
                      className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-teal-500"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-700">
                      Location
                    </label>

                    <input
                      required
                      value={profile.address}
                      onChange={(e) =>
                        setProfile({
                          ...profile,
                          address: e.target.value,
                        })
                      }
                      className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-teal-500"
                    />
                  </div>
                </div>
              </div>
            )}

            {activeSection === "Profile" && (
              <div className="p-5 sm:p-6">
                <h2 className="font-bold text-slate-900">
                  Administrator Profile
                </h2>

                <p className="mt-1 text-sm text-slate-400">
                  Manage your administrator information.
                </p>

                <div className="mt-6 flex items-center gap-4 rounded-xl bg-slate-50 p-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-teal-100 font-bold text-teal-700">
                    CA
                  </div>

                  <div>
                    <p className="font-semibold text-slate-800">
                      {profile.adminName}
                    </p>
                    <p className="text-sm text-slate-400">
                      Clinic Administrator
                    </p>
                  </div>
                </div>

                <div className="mt-6 grid gap-5 sm:grid-cols-2">
                  <input
                    required
                    value={profile.adminName}
                    onChange={(e) =>
                      setProfile({
                        ...profile,
                        adminName: e.target.value,
                      })
                    }
                    className="rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-teal-500"
                  />

                  <input
                    required
                    type="email"
                    value={profile.email}
                    onChange={(e) =>
                      setProfile({
                        ...profile,
                        email: e.target.value,
                      })
                    }
                    className="rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-teal-500"
                  />
                </div>
              </div>
            )}

            {activeSection === "Notifications" && (
              <div className="p-5 sm:p-6">
                <h2 className="font-bold text-slate-900">
                  Notification Preferences
                </h2>

                <p className="mt-1 text-sm text-slate-400">
                  Choose which notifications you want to receive.
                </p>

                <div className="mt-6 divide-y divide-slate-100">
                  {[
                    {
                      key: "appointments" as const,
                      title: "Appointment Notifications",
                      description:
                        "Receive updates about upcoming appointments.",
                    },
                    {
                      key: "reports" as const,
                      title: "Report Notifications",
                      description:
                        "Get notified when test reports are ready.",
                    },
                    {
                      key: "reminders" as const,
                      title: "Appointment Reminders",
                      description:
                        "Receive reminders for scheduled appointments.",
                    },
                  ].map((item) => (
                    <div
                      key={item.key}
                      className="flex items-center justify-between gap-4 py-5"
                    >
                      <div>
                        <p className="text-sm font-semibold text-slate-800">
                          {item.title}
                        </p>
                        <p className="mt-1 text-xs text-slate-400">
                          {item.description}
                        </p>
                      </div>

                      <button
                        type="button"
                        onClick={() =>
                          setNotifications({
                            ...notifications,
                            [item.key]: !notifications[item.key],
                          })
                        }
                        className={`relative h-6 w-11 shrink-0 rounded-full transition ${
                          notifications[item.key]
                            ? "bg-teal-600"
                            : "bg-slate-200"
                        }`}
                      >
                        <span
                          className={`absolute top-1 h-4 w-4 rounded-full bg-white transition ${
                            notifications[item.key]
                              ? "left-6"
                              : "left-1"
                          }`}
                        />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeSection === "Security" && (
              <div className="p-5 sm:p-6">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-50 text-teal-600">
                    <Lock size={19} />
                  </div>

                  <div>
                    <h2 className="font-bold text-slate-900">
                      Security
                    </h2>
                    <p className="text-sm text-slate-400">
                      Manage account security settings.
                    </p>
                  </div>
                </div>

                <div className="mt-6 space-y-3">
                  {[
                    "Change Password",
                    "Two-Factor Authentication",
                    "Active Sessions",
                  ].map((item) => (
                    <button
                      key={item}
                      type="button"
                      className="flex w-full items-center justify-between rounded-xl border border-slate-200 p-4 text-left text-sm font-medium text-slate-700 hover:bg-slate-50"
                    >
                      {item}
                      <span className="text-slate-300">→</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="flex justify-end border-t border-slate-100 p-5 sm:p-6">
              <button
                type="submit"
                className="inline-flex items-center gap-2 rounded-xl bg-teal-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-teal-700"
              >
                <Save size={17} />
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Settings;