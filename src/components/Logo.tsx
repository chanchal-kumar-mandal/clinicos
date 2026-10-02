import { Activity } from "lucide-react";

interface LogoProps {
  collapsed?: boolean;
  showTagline?: boolean;
}

const Logo = ({ collapsed = false, showTagline = true }: LogoProps) => {
  if (collapsed) {
    return (
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-600 text-white shadow-sm">
        <Activity size={22} strokeWidth={2.5} />
      </div>
    );
  }

  return (
    <div className="flex items-center gap-3">
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-teal-600 text-white shadow-sm">
        <Activity size={24} strokeWidth={2.5} />
      </div>

      <div className="min-w-0">
        <h1 className="truncate text-lg font-bold tracking-tight text-slate-900">
          Clinic<span className="text-teal-600">OS</span>
        </h1>

        {showTagline && (
          <p className="text-[11px] font-medium tracking-wide text-slate-400">
            SMART CLINIC MANAGEMENT
          </p>
        )}
      </div>
    </div>
  );
};

export default Logo;