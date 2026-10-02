import { useState } from "react";
import {
  Activity,
  Bot,
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  FileBarChart,
  HelpCircle,
  LayoutDashboard,
  Menu,
  Settings,
  Stethoscope,
  Users,
  UsersRound,
  X,
} from "lucide-react";
import "animate.css";

import Logo from "./components/Logo";
import Dashboard from "./components/Dashboard";
import Doctors from "./components/Doctors";
import Patients from "./components/Patients";
import Appointments from "./components/Appointments";
import TestsReports from "./components/TestsReports";
import Staff from "./components/Staff";
import AIAssistant from "./components/AIAssistant";
import HelpCenter from "./components/HelpCenter";
import SettingsPage from "./components/Settings";

type NavItem = {
  label: string;
  icon: React.ElementType;
};

const navItems: NavItem[] = [
  {
    label: "Dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "Doctors",
    icon: Stethoscope,
  },
  {
    label: "Patients",
    icon: UsersRound,
  },
  {
    label: "Appointments",
    icon: CalendarDays,
  },
  {
    label: "Tests & Reports",
    icon: FileBarChart,
  },
  {
    label: "Staff",
    icon: Users,
  },
  {
    label: "AI Assistant",
    icon: Bot,
  },
  {
    label: "Help Center",
    icon: HelpCircle,
  },
  {
    label: "Settings",
    icon: Settings,
  },
];

const App = () => {
  const [activeItem, setActiveItem] = useState("Dashboard");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavigation = (label: string) => {
    setActiveItem(label);
    setMobileMenuOpen(false);
  };

  const renderPage = () => {
    switch (activeItem) {
      case "Dashboard":
        return <Dashboard />;

      case "Doctors":
        return <Doctors />;

      case "Patients":
        return <Patients />;

      case "Appointments":
        return <Appointments />;

      case "Tests & Reports":
        return <TestsReports />;

      case "Staff":
        return <Staff />;

      case "AI Assistant":
        return <AIAssistant />;

      case "Help Center":
        return <HelpCenter />;

      case "Settings":
        return <SettingsPage />;

      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      {/* Mobile Header */}
      <header className="fixed inset-x-0 top-0 z-40 flex h-16 items-center justify-between border-b border-slate-200 bg-white px-4 lg:hidden">
        <Logo showTagline={false} />

        <button
          type="button"
          onClick={() => setMobileMenuOpen((prev) => !prev)}
          className="flex h-10 w-10 items-center justify-center rounded-lg text-slate-600 transition hover:bg-slate-100"
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
        >
          {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </header>

      {/* Mobile Overlay */}
      {mobileMenuOpen && (
        <button
          type="button"
          aria-label="Close sidebar"
          onClick={() => setMobileMenuOpen(false)}
          className="fixed inset-0 z-40 bg-slate-900/30 lg:hidden"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed inset-y-0 left-0 z-50 flex flex-col border-r border-slate-200
          bg-white transition-all duration-300
          ${sidebarCollapsed ? "w-20" : "w-64"}
          ${
            mobileMenuOpen
              ? "translate-x-0"
              : "-translate-x-full lg:translate-x-0"
          }
        `}
      >
        {/* Logo */}
        <div
          className={`flex h-20 items-center border-b border-slate-100 px-4 ${
            sidebarCollapsed ? "justify-center" : ""
          }`}
        >
          <Logo collapsed={sidebarCollapsed} />
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-1 overflow-y-auto p-3">
          <p
            className={`mb-3 px-3 text-[10px] font-bold uppercase tracking-widest text-slate-400 ${
              sidebarCollapsed ? "hidden" : "block"
            }`}
          >
            Main Menu
          </p>

          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeItem === item.label;

            return (
              <button
                key={item.label}
                type="button"
                onClick={() => handleNavigation(item.label)}
                title={sidebarCollapsed ? item.label : undefined}
                className={`
                  group flex w-full items-center gap-3 rounded-xl px-3 py-3
                  text-sm font-medium transition-all duration-200
                  ${
                    isActive
                      ? "bg-teal-50 text-teal-700 shadow-sm"
                      : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                  }
                  ${sidebarCollapsed ? "justify-center" : ""}
                `}
              >
                <Icon
                  size={19}
                  strokeWidth={isActive ? 2.4 : 2}
                  className={`shrink-0 ${
                    isActive
                      ? "text-teal-600"
                      : "text-slate-400 group-hover:text-slate-600"
                  }`}
                />

                {!sidebarCollapsed && (
                  <span className="truncate">{item.label}</span>
                )}

                {!sidebarCollapsed && isActive && (
                  <span className="ml-auto h-2 w-2 rounded-full bg-teal-500" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Sidebar Bottom */}
        <div className="border-t border-slate-100 p-3">
          <div
            className={`mb-3 flex items-center rounded-xl bg-slate-50 p-3 ${
              sidebarCollapsed ? "justify-center" : "gap-3"
            }`}
          >
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-teal-100 text-sm font-bold text-teal-700">
              CK
            </div>

            {!sidebarCollapsed && (
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-slate-800">
                  Clinic Admin
                </p>

                <p className="truncate text-xs text-slate-400">
                  Administrator
                </p>
              </div>
            )}
          </div>

          {/* Collapse Button */}
          <button
            type="button"
            onClick={() => setSidebarCollapsed((prev) => !prev)}
            className="hidden w-full items-center justify-center gap-2 rounded-lg py-2 text-xs font-medium text-slate-400 transition hover:bg-slate-50 hover:text-slate-700 lg:flex"
          >
            {sidebarCollapsed ? (
              <ChevronRight size={16} />
            ) : (
              <>
                <ChevronLeft size={16} />
                Collapse Menu
              </>
            )}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main
        className={`
          min-h-screen pt-16 transition-all duration-300 lg:pt-0
          ${sidebarCollapsed ? "lg:pl-20" : "lg:pl-64"}
        `}
      >
        {/* Desktop Topbar */}
        <header className="hidden h-20 items-center justify-between border-b border-slate-200 bg-white px-8 lg:flex">
          <div>
            <h2 className="text-xl font-bold text-slate-900">
              {activeItem}
            </h2>

            <p className="mt-0.5 text-sm text-slate-400">
              Manage your clinic efficiently
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden items-center gap-2 rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-600 sm:flex">
              <Activity size={14} />
              System Online
            </div>

            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-teal-100 text-sm font-bold text-teal-700">
              CK
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="p-4 sm:p-6 lg:p-8">
          <div
            key={activeItem}
            className="animate__animated animate__fadeIn"
          >
            {renderPage()}
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;