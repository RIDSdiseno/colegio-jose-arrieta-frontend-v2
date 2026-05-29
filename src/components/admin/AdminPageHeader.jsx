import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function AdminPageHeader({ title, subtitle, backTo = "/" }) {
  const navigate = useNavigate();
  return (
    <div className="mb-6 flex items-center gap-3">
      <button
        type="button"
        onClick={() => navigate(backTo)}
        className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 text-slate-500 transition hover:border-primary hover:text-primary"
      >
        <ArrowLeft className="h-4 w-4" />
      </button>
      <div>
        <h1 className="font-heading text-2xl font-bold text-primary">{title}</h1>
        {subtitle ? <p className="text-sm text-slate-400">{subtitle}</p> : null}
      </div>
    </div>
  );
}
