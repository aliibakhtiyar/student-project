const OpportunityCard = ({ opportunity }) => {
  const isInternship = opportunity.type === "Internship";

  return (
    <div className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white transition duration-200 hover:-translate-y-1 hover:border-slate-300 hover:shadow-lg">

      {/* Header */}
      <div className="border-b border-slate-100 bg-slate-950 p-5">
        <div className="flex items-start justify-between gap-3">

          <div className="min-w-0 flex-1">
            <h3 className="line-clamp-2 min-h-[48px] text-base font-bold leading-6 text-white">
              {opportunity.title}
            </h3>

            <p className="mt-2 truncate text-xs text-slate-400">
              {opportunity.company}
            </p>
          </div>

          <span
            className={`shrink-0 rounded-full px-2.5 py-1 text-[9px] font-bold uppercase tracking-wider ${
              isInternship
                ? "bg-emerald-400/10 text-emerald-300"
                : "bg-white/10 text-slate-300"
            }`}
          >
            {opportunity.type}
          </span>

        </div>
      </div>

      {/* Details */}
      <div className="flex flex-1 flex-col p-5">

        <div className="grid grid-cols-2 gap-3">

          {/* Location */}
          <div className="rounded-xl bg-slate-50 p-3">
            <p className="text-[9px] font-bold uppercase tracking-wider text-slate-400">
              Location
            </p>

            <p className="mt-1.5 truncate text-xs font-semibold text-slate-700">
              {opportunity.location || "Not specified"}
            </p>
          </div>

          {/* Salary */}
          <div className="rounded-xl bg-slate-50 p-3">
            <p className="text-[9px] font-bold uppercase tracking-wider text-slate-400">
              Salary
            </p>

            <p className="mt-1.5 truncate text-xs font-semibold text-slate-700">
              {opportunity.salary || "Not specified"}
            </p>
          </div>

          {/* Experience */}
          <div className="rounded-xl bg-slate-50 p-3">
            <p className="text-[9px] font-bold uppercase tracking-wider text-slate-400">
              Experience
            </p>

            <p className="mt-1.5 truncate text-xs font-semibold text-slate-700">
              {opportunity.experience || "Fresher"}
            </p>
          </div>

          {/* Work Type */}
          <div className="rounded-xl bg-slate-50 p-3">
            <p className="text-[9px] font-bold uppercase tracking-wider text-slate-400">
              Work Type
            </p>

            <p className="mt-1.5 truncate text-xs font-semibold text-slate-700">
              {opportunity.workType || "Not specified"}
            </p>
          </div>

        </div>

        {/* Description */}
        {opportunity.description && (
          <div className="mt-5">
            <p className="text-[9px] font-bold uppercase tracking-wider text-slate-400">
              About opportunity
            </p>

            <p className="mt-2 line-clamp-3 text-xs leading-5 text-slate-500">
              {opportunity.description}
            </p>
          </div>
        )}

        {/* Footer */}
        <div className="mt-auto border-t border-slate-100 pt-4">

          <div className="flex items-center justify-between gap-3">

            <span className="text-[10px] text-slate-400">
              Apply externally
            </span>

            <a
              href={opportunity.url}
              target="_blank"
              rel="noreferrer"
              className="shrink-0 rounded-xl bg-slate-950 px-4 py-2.5 text-xs font-semibold text-white transition hover:bg-slate-800"
            >
              View →
            </a>

          </div>

        </div>

      </div>
    </div>
  );
};

export default OpportunityCard;