"import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from \"recharts\";

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className=\"rounded-xl border border-slate-200 bg-white shadow-md px-3 py-2 text-xs\">
      <div className=\"font-medium text-slate-900 mb-1\">{label}</div>
      {payload.map((p) => (
        <div key={p.dataKey} className=\"flex items-center gap-2\">
          <span
            className=\"inline-block h-2 w-2 rounded-full\"
            style={{ background: p.color }}
          />
          <span className=\"text-slate-600 capitalize\">{p.name}:</span>
          <span className=\"text-slate-900 font-medium tabular-nums\">{p.value}</span>
        </div>
      ))}
    </div>
  );
};

export default function ChurnChart({ trend }) {
  return (
    <section
      className=\"bg-white border border-slate-200 rounded-xl p-5 shadow-sm h-full\"
      data-testid=\"churn-chart\"
      aria-label=\"Monthly churn and retention trend\"
    >
      <div className=\"flex items-start justify-between mb-4\">
        <div>
          <h2 className=\"text-base sm:text-lg font-medium text-slate-800 font-display\">
            Churn vs Retained — Last 6 Months
          </h2>
          <p className=\"text-xs text-slate-500 mt-0.5\">
            Monthly count of active vs churned customers based on last activity.
          </p>
        </div>
      </div>

      <div className=\"h-72\" data-testid=\"churn-chart-canvas\">
        <ResponsiveContainer width=\"100%\" height=\"100%\">
          <AreaChart data={trend} margin={{ top: 8, right: 12, left: -12, bottom: 0 }}>
            <defs>
              <linearGradient id=\"gRetain\" x1=\"0\" y1=\"0\" x2=\"0\" y2=\"1\">
                <stop offset=\"0%\" stopColor=\"#6366f1\" stopOpacity={0.35} />
                <stop offset=\"100%\" stopColor=\"#6366f1\" stopOpacity={0} />
              </linearGradient>
              <linearGradient id=\"gChurn\" x1=\"0\" y1=\"0\" x2=\"0\" y2=\"1\">
                <stop offset=\"0%\" stopColor=\"#f43f5e\" stopOpacity={0.3} />
                <stop offset=\"100%\" stopColor=\"#f43f5e\" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid stroke=\"#f1f5f9\" vertical={false} />
            <XAxis
              dataKey=\"month\"
              stroke=\"#94a3b8\"
              tick={{ fontSize: 12 }}
              tickLine={false}
              axisLine={{ stroke: \"#e2e8f0\" }}
            />
            <YAxis
              stroke=\"#94a3b8\"
              tick={{ fontSize: 12 }}
              tickLine={false}
              axisLine={false}
              allowDecimals={false}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend
              iconType=\"circle\"
              wrapperStyle={{ fontSize: 12, color: \"#475569\", paddingTop: 8 }}
            />
            <Area
              type=\"monotone\"
              dataKey=\"active\"
              name=\"Retained\"
              stroke=\"#6366f1\"
              strokeWidth={2}
              fill=\"url(#gRetain)\"
            />
            <Area
              type=\"monotone\"
              dataKey=\"churned\"
              name=\"Churned\"
              stroke=\"#f43f5e\"
              strokeWidth={2}
              fill=\"url(#gChurn)\"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}
"