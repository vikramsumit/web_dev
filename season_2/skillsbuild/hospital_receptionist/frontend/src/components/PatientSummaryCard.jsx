import WardBadge from "./WardBadge";

function SummaryRow({ label, value }) {
  return (
    <div className="rounded-2xl border border-line/70 bg-white/70 p-4">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
        {label}
      </p>
      <p className="mt-2 text-sm leading-6 text-ink">
        {value || "Waiting for input"}
      </p>
    </div>
  );
}

export default function PatientSummaryCard({ summary, stage, isComplete }) {
  const statusCopy = isComplete
    ? "Intake complete"
    : stage === "awaiting_name"
      ? "Collecting patient name"
      : stage === "awaiting_age"
        ? "Collecting patient age"
        : "Collecting primary concern";

  return (
    <aside className="glass-panel rounded-[28px] border border-white/70 p-6 shadow-card">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="font-display text-sm font-semibold uppercase tracking-[0.25em] text-calm">
            Reception Summary
          </p>
          <h2 className="mt-3 font-display text-3xl font-semibold text-ink">
            Patient Intake
          </h2>
        </div>
        <WardBadge ward={summary.ward} />
      </div>

      <div className="mt-6 rounded-3xl bg-gradient-to-br from-calm to-teal-900 p-5 text-white">
        <p className="text-xs uppercase tracking-[0.25em] text-white/75">
          Current status
        </p>
        <p className="mt-3 text-2xl font-semibold">{statusCopy}</p>
        <p className="mt-2 text-sm leading-6 text-white/80">
          The assistant asks one question at a time and prepares the patient for the
          right hospital ward.
        </p>
      </div>

      <div className="mt-6 space-y-3">
        <SummaryRow label="Patient Name" value={summary.name} />
        <SummaryRow label="Age" value={summary.age ? `${summary.age} years` : ""} />
        <SummaryRow label="Main Concern" value={summary.query} />
      </div>
    </aside>
  );
}

