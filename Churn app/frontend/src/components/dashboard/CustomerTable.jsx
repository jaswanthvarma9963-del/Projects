"import { useMemo, useState } from \"react\";
import { Search } from \"lucide-react\";

const badgeStyles = {
  Low: \"bg-emerald-50 text-emerald-700 border-emerald-200\",
  Medium: \"bg-amber-50 text-amber-700 border-amber-200\",
  High: \"bg-rose-50 text-rose-700 border-rose-200\",
  Churned: \"bg-slate-100 text-slate-600 border-slate-200\",
};

const RiskBadge = ({ risk }) => (
  <span
    data-testid={`risk-badge-${risk.toLowerCase()}`}
    className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium border ${badgeStyles[risk] || badgeStyles.Low}`}
  >
    {risk}
  </span>
);

export default function CustomerTable({ customers }) {
  const [query, setQuery] = useState(\"\");
  const [filter, setFilter] = useState(\"all\");

  const rows = useMemo(() => {
    let out = customers;
    if (filter !== \"all\") {
      out = out.filter((c) => c.risk.toLowerCase() === filter);
    }
    if (query.trim()) {
      const q = query.toLowerCase();
      out = out.filter(
        (c) =>
          c.name.toLowerCase().includes(q) ||
          c.customer_id.toLowerCase().includes(q)
      );
    }
    return out;
  }, [customers, query, filter]);

  const filters = [
    { key: \"all\", label: \"All\" },
    { key: \"high\", label: \"High\" },
    { key: \"medium\", label: \"Medium\" },
    { key: \"low\", label: \"Low\" },
    { key: \"churned\", label: \"Churned\" },
  ];

  return (
    <section
      className=\"bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden\"
      data-testid=\"customer-table-section\"
    >
      <div className=\"p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-slate-200\">
        <div>
          <h2 className=\"text-base sm:text-lg font-medium text-slate-800 font-display\">
            Customers
          </h2>
          <p className=\"text-xs text-slate-500 mt-0.5\">
            {rows.length} of {customers.length} — sorted by risk & MRR
          </p>
        </div>
        <div className=\"flex items-center gap-2\">
          <div className=\"relative\">
            <Search size={14} className=\"absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400\" />
            <input
              data-testid=\"customer-search\"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder=\"Search…\"
              className=\"w-40 sm:w-56 rounded-lg border border-slate-200 pl-8 pr-3 py-1.5 text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-400\"
            />
          </div>
          <div className=\"hidden sm:flex items-center gap-1 bg-slate-100 rounded-lg p-0.5\">
            {filters.map((f) => (
              <button
                key={f.key}
                data-testid={`filter-${f.key}`}
                onClick={() => setFilter(f.key)}
                className={`text-xs px-2.5 py-1 rounded-md transition-colors ${
                  filter === f.key
                    ? \"bg-white text-slate-900 shadow-sm\"
                    : \"text-slate-500 hover:text-slate-700\"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className=\"overflow-x-auto\">
        <table className=\"w-full text-sm\" data-testid=\"customer-table\">
          <thead>
            <tr className=\"bg-slate-50 border-b border-slate-200 text-slate-500\">
              <th className=\"text-left uppercase tracking-wider text-xs font-medium py-3 px-4\">
                ID
              </th>
              <th className=\"text-left uppercase tracking-wider text-xs font-medium py-3 px-4\">
                Customer
              </th>
              <th className=\"text-left uppercase tracking-wider text-xs font-medium py-3 px-4\">
                Signed Up
              </th>
              <th className=\"text-left uppercase tracking-wider text-xs font-medium py-3 px-4\">
                Last Active
              </th>
              <th className=\"text-right uppercase tracking-wider text-xs font-medium py-3 px-4\">
                MRR
              </th>
              <th className=\"text-left uppercase tracking-wider text-xs font-medium py-3 px-4\">
                Status
              </th>
              <th className=\"text-left uppercase tracking-wider text-xs font-medium py-3 px-4\">
                Risk
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 ? (
              <tr>
                <td colSpan={7} className=\"py-10 text-center text-slate-400 text-sm\">
                  No customers match your filter.
                </td>
              </tr>
            ) : (
              rows.map((c) => (
                <tr
                  key={c.customer_id}
                  data-testid={`customer-row-${c.customer_id}`}
                  className=\"border-b border-slate-100 hover:bg-slate-50/60 transition-colors\"
                >
                  <td className=\"py-3 px-4 text-slate-500 tabular-nums\">{c.customer_id}</td>
                  <td className=\"py-3 px-4 text-slate-900 font-medium\">{c.name}</td>
                  <td className=\"py-3 px-4 text-slate-600 tabular-nums\">{c.signup_date}</td>
                  <td className=\"py-3 px-4 text-slate-600 tabular-nums\">
                    {c.last_active}
                    <span className=\"ml-1 text-xs text-slate-400\">
                      ({c.days_since_active}d ago)
                    </span>
                  </td>
                  <td className=\"py-3 px-4 text-right text-slate-900 font-medium tabular-nums\">
                    ${c.mrr.toFixed(2)}
                  </td>
                  <td className=\"py-3 px-4\">
                    <span
                      className={`text-xs capitalize ${
                        c.status === \"churned\" ? \"text-slate-500\" : \"text-emerald-600\"
                      }`}
                    >
                      {c.status}
                    </span>
                  </td>
                  <td className=\"py-3 px-4\">
                    <RiskBadge risk={c.risk} />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}
"