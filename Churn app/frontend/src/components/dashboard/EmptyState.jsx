"import { Sparkles, UploadCloud, FileDown } from \"lucide-react\";
import UploadZone from \"@/components/dashboard/UploadZone\";
import { downloadSampleCsv } from \"@/lib/sampleCsv\";

export default function EmptyState({ onLoadSample, onUpload, loading }) {
  return (
    <div className=\"pt-10 sm:pt-16\" data-testid=\"empty-state\">
      <div className=\"max-w-3xl mx-auto text-center\">
        <div className=\"inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3 py-1 text-xs text-slate-600 shadow-sm\">
          <span className=\"h-1.5 w-1.5 rounded-full bg-indigo-500\" />
          Resume-ready churn dashboard
        </div>
        <h2 className=\"mt-5 text-3xl sm:text-4xl font-semibold text-slate-900 font-display tracking-tight\">
          Turn a customer CSV into a churn story.
        </h2>
        <p className=\"mt-3 text-slate-600 text-sm sm:text-base max-w-xl mx-auto\">
          Upload your customer data or load a sample to see churn rate, retention,
          at-risk accounts and monthly trend — instantly.
        </p>

        <div className=\"mt-6 flex flex-col sm:flex-row items-center justify-center gap-3\">
          <button
            data-testid=\"empty-load-sample-btn\"
            onClick={onLoadSample}
            disabled={loading}
            className=\"inline-flex items-center gap-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2.5 text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-1 disabled:opacity-50\"
          >
            <Sparkles size={16} /> Load Sample Data
          </button>
          <button
            data-testid=\"download-sample-csv\"
            onClick={downloadSampleCsv}
            className=\"inline-flex items-center gap-2 rounded-lg bg-white border border-slate-200 hover:bg-slate-50 hover:border-slate-300 text-slate-700 px-4 py-2.5 text-sm font-medium transition-colors\"
          >
            <FileDown size={16} /> Download CSV Template
          </button>
        </div>
      </div>

      <div className=\"max-w-3xl mx-auto mt-10\">
        <UploadZone onUpload={onUpload} loading={loading} />
      </div>

      <div className=\"max-w-3xl mx-auto mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 text-left\">
        {[
          { t: \"KPI overview\", d: \"Churn rate, retention rate, MRR & at-risk count.\" },
          { t: \"6-month trend\", d: \"Visualize monthly retained vs churned customers.\" },
          { t: \"Risk scoring\", d: \"Rule-based Low/Medium/High per customer.\" },
        ].map((f) => (
          <div key={f.t} className=\"rounded-xl border border-slate-200 bg-white p-4 shadow-sm\">
            <div className=\"text-sm font-medium text-slate-900 font-display\">{f.t}</div>
            <div className=\"text-xs text-slate-500 mt-1\">{f.d}</div>
          </div>
        ))}
      </div>

      <div className=\"max-w-3xl mx-auto mt-10 rounded-xl border border-slate-200 bg-white p-5 text-left\">
        <div className=\"flex items-center gap-2 text-slate-800 font-medium text-sm\">
          <UploadCloud size={16} className=\"text-indigo-500\" /> CSV format
        </div>
        <p className=\"text-xs text-slate-500 mt-1 mb-3\">
          Required columns (case-insensitive):
        </p>
        <div className=\"rounded-lg bg-slate-50 border border-slate-200 p-3 text-xs font-mono text-slate-700 overflow-x-auto\">
          customer_id, name, signup_date, last_active, mrr, status
        </div>
      </div>
    </div>
  );
}
"