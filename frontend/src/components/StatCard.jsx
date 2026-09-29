const StatCard = ({
  title,
  value,
  description,
  icon,
}) => {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 transition hover:-translate-y-0.5 hover:shadow-sm">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-medium text-slate-400">
            {title}
          </p>

          <p className="mt-2 text-3xl font-bold tracking-tight text-slate-950">
            {value}
          </p>
        </div>

        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-lg">
          {icon}
        </div>
      </div>

      <p className="mt-4 text-xs text-slate-500">
        {description}
      </p>
    </div>
  );
};

export default StatCard;