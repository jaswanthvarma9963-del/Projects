"import { Users, TrendingDown, TrendingUp, AlertTriangle, DollarSign } from \"lucide-react\";

const cards = [
  {
    key: \"total_customers\",
    label: \"Total Customers\",
    icon: Users,
    tone: \"text-slate-500\",
    format: (v) => v.toLocaleString(),
  },
  {
    key: \"churn_rate\",
    label: \"Churn Rate\",
    icon: TrendingDown,
    tone: \"text-rose-500\",
    format: (v) => `${v}%`,
  },
  {
    key: \"retention_rate\",
    label: \"Retention Rate\",
    icon: TrendingUp,
    tone: \"text-emerald-500\",
    format: (v) => `${v}%`,
  },
  {
    key: \"at_risk\",
    label: \"At-Risk Customers\",
    icon: AlertTriangle,
    tone: \"text-amber-500\",
    format: (v) => v.toLocaleString(),
  },
];

export default function KPICards({ kpis }) {
  return (
    <div
      className=\"grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4\"
      data-testid=\"kpi-cards\"
    >
      {cards.map(({ key, label, icon: Icon, tone, format }) => (
        <div
          key={key}
          data-testid={`kpi-${key}`}
          className=\"group bg-white border border-slate-200 rounded-xl p-5 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-[transform,box-shadow] duration-200 ease-out\"
        >
          <div className=\"flex items-center justify-between mb-4\">
            <span className=\"text-[11px] uppercase tracking-[0.05em] text-slate-500 font-medium\">
              {label}
            </span>
            <Icon size={18} className={tone} />
          </div>
          <div className=\"flex items-end justify-between\">
            <div className=\"text-3xl font-semibold text-slate-900 font-display tabular-nums\">
              {format(kpis[key])}
            </div>
          </div>
          {key === \"total_customers\" && (
            <div className=\"mt-2 text-xs text-slate-500 flex items-center gap-1\">
              <DollarSign size={12} className=\"text-emerald-500\" />
              <span className=\"tabular-nums\">${kpis.mrr?.toLocaleString?.() ?? kpis.mrr} MRR</span>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
"