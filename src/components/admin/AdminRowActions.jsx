import { Link } from "react-router-dom";
import { Pencil, Trash2 } from "lucide-react";

export default function AdminRowActions({ editTo, onDelete }) {
  return (
    <div className="flex items-center justify-end gap-2">
      <Link
        to={editTo}
        className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-slate-500 transition hover:border-primary hover:text-primary"
      >
        <Pencil className="h-3.5 w-3.5" />
      </Link>
      <button
        type="button"
        onClick={onDelete}
        className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-slate-500 transition hover:border-red-400 hover:text-red-500"
      >
        <Trash2 className="h-3.5 w-3.5" />
      </button>
    </div>
  );
}
