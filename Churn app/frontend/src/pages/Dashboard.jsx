"import { useEffect, useState, useCallback } from \"react\";
import { toast } from \"sonner\";
import Header from \"@/components/dashboard/Header\";
import KPICards from \"@/components/dashboard/KPICards\";
import ChurnChart from \"@/components/dashboard/ChurnChart\";
import CustomerTable from \"@/components/dashboard/CustomerTable\";
import EmptyState from \"@/components/dashboard/EmptyState\";
import UploadZone from \"@/components/dashboard/UploadZone\";
import { fetchDashboard, loadSample, uploadCsv, resetData } from \"@/lib/api\";

export default function Dashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [initial, setInitial] = useState(true);

  const load = useCallback(async () => {
    try {
      const d = await fetchDashboard();
      setData(d);
    } catch (e) {
      console.error(e);
      toast.error(\"Could not load dashboard\");
    } finally {
      setInitial(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const handleLoadSample = async () => {
    setLoading(true);
    try {
      const d = await loadSample();
      setData(d);
      toast.success(\"Sample data loaded\");
    } catch (e) {
      toast.error(\"Failed to load sample data\");
    } finally {
      setLoading(false);
    }
  };

  const handleUpload = async (file) => {
    setLoading(true);
    try {
      const d = await uploadCsv(file);
      setData(d);
      toast.success(`Uploaded ${file.name}`);
    } catch (e) {
      const msg = e?.response?.data?.detail || \"Upload failed\";
      toast.error(typeof msg === \"string\" ? msg : \"Upload failed\");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = async () => {
    setLoading(true);
    try {
      const d = await resetData();
      setData(d);
      toast.success(\"Dashboard cleared\");
    } catch (e) {
      toast.error(\"Reset failed\");
    } finally {
      setLoading(false);
    }
  };

  const hasData = data?.has_data;

  return (
    <div className=\"min-h-screen bg-slate-50\" data-testid=\"dashboard-root\">
      <Header
        hasData={hasData}
        onLoadSample={handleLoadSample}
        onUpload={handleUpload}
        onReset={handleReset}
        loading={loading}
      />

      <main className=\"max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16\">
        {initial ? (
          <div className=\"py-24 text-center text-slate-400 text-sm\">Loading…</div>
        ) : !hasData ? (
          <EmptyState onLoadSample={handleLoadSample} onUpload={handleUpload} loading={loading} />
        ) : (
          <div className=\"space-y-6 pt-6\">
            <KPICards kpis={data.kpis} />

            <div className=\"grid grid-cols-1 lg:grid-cols-3 gap-6\">
              <div className=\"lg:col-span-2\">
                <ChurnChart trend={data.trend} />
              </div>
              <div className=\"lg:col-span-1\">
                <UploadZone onUpload={handleUpload} loading={loading} compact />
              </div>
            </div>

            <CustomerTable customers={data.customers} />
          </div>
        )}
      </main>

      <footer className=\"max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8 text-xs text-slate-400\">
        <div className=\"border-t border-slate-200 pt-4 flex flex-col sm:flex-row justify-between gap-2\">
          <span>Customer Churn & Retention Dashboard</span>
          <span>Rule-based risk scoring · Recharts · FastAPI · MongoDB</span>
        </div>
      </footer>
    </div>
  );
}
"