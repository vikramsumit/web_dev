const wardStyles = {
  Pending: "bg-slate-200 text-slate-700 border-slate-300",
  General: "bg-teal-100 text-teal-800 border-teal-200",
  Emergency: "bg-rose-100 text-rose-800 border-rose-200",
  "Mental Health": "bg-violet-100 text-violet-800 border-violet-200",
};

export default function WardBadge({ ward }) {
  const label = ward || "Pending";
  const style = wardStyles[label] || wardStyles.Pending;

  return (
    <span
      className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] ${style}`}
    >
      {label}
    </span>
  );
}

