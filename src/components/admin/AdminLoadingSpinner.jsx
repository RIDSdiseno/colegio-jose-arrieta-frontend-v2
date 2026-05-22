import { Loader2 } from "lucide-react";

export default function AdminLoadingSpinner() {
  return (
    <div className="flex h-40 items-center justify-center text-slate-400">
      <Loader2 className="h-6 w-6 animate-spin" />
    </div>
  );
}
