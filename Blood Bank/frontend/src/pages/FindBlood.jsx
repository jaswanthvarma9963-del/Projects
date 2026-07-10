"import { useState } from \"react\";
import { motion } from \"framer-motion\";
import { toast } from \"sonner\";
import { Search, Phone, Mail, MapPin, Droplet, Loader2 } from \"lucide-react\";
import { api, BLOOD_GROUPS } from \"@/lib/api\";
import { Input } from \"@/components/ui/input\";
import { Label } from \"@/components/ui/label\";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from \"@/components/ui/select\";

export default function FindBlood() {
  const [bloodGroup, setBloodGroup] = useState(\"\");
  const [city, setCity] = useState(\"\");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  const search = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const params = {};
      if (bloodGroup) params.blood_group = bloodGroup;
      if (city) params.city = city;
      const r = await api.get(\"/donors\", { params });
      setResults(r.data);
      setSearched(true);
      if (r.data.length === 0) toast.info(\"No donors found. Try a different filter.\");
    } catch {
      toast.error(\"Search failed. Please try again.\");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className=\"max-w-7xl mx-auto px-6 md:px-12 py-16\" data-testid=\"find-page\">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className=\"max-w-2xl mb-10\">
        <span className=\"inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-soft text-brand text-sm font-semibold mb-6\">
          <Search className=\"h-4 w-4\" /> Find donors near you
        </span>
        <h1 className=\"font-heading text-4xl sm:text-5xl font-light tracking-tight text-stone-900\">
          Search <span className=\"font-bold text-brand\">available donors</span>
        </h1>
        <p className=\"mt-4 text-stone-600 text-lg\">Filter by blood group and city to find matching donors instantly.</p>
      </motion.div>

      <form onSubmit={search} data-testid=\"search-form\" className=\"bg-white rounded-2xl border border-border p-6 md:p-8 shadow-sm grid grid-cols-1 md:grid-cols-3 gap-5 items-end\">
        <div>
          <Label>Blood Group</Label>
          <Select value={bloodGroup} onValueChange={setBloodGroup}>
            <SelectTrigger data-testid=\"search-blood-group\" className=\"mt-1.5 bg-stone-100 border-border h-10\">
              <SelectValue placeholder=\"Any group\" />
            </SelectTrigger>
            <SelectContent>
              {BLOOD_GROUPS.map((g) => (
                <SelectItem key={g} value={g}>{g}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor=\"scity\">City</Label>
          <Input id=\"scity\" data-testid=\"search-city\" value={city} onChange={(e) => setCity(e.target.value)} placeholder=\"Enter city\" className=\"mt-1.5 bg-stone-100 border-border\" />
        </div>
        <button type=\"submit\" disabled={loading} data-testid=\"search-submit\" className=\"inline-flex items-center justify-center gap-2 px-6 py-2.5 h-10 rounded-full bg-brand text-white font-semibold transition-transform duration-300 hover:-translate-y-0.5 hover:bg-brand-hover disabled:opacity-60\">
          {loading ? <Loader2 className=\"h-5 w-5 animate-spin\" /> : <><Search className=\"h-4 w-4\" /> Search</>}
        </button>
      </form>

      <div className=\"mt-10\">
        {searched && (
          <p className=\"text-stone-600 mb-6\" data-testid=\"results-count\">
            {results.length} donor{results.length !== 1 ? \"s\" : \"\"} found
          </p>
        )}
        <div className=\"grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5\" data-testid=\"results-grid\">
          {results.map((d, i) => (
            <motion.div key={d.id} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: i * 0.05 }} className=\"bg-white rounded-2xl border border-border p-6 transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg\">
              <div className=\"flex items-start justify-between\">
                <div>
                  <h3 className=\"font-heading text-lg font-semibold text-stone-900\">{d.name}</h3>
                  <p className=\"text-sm text-stone-500 flex items-center gap-1 mt-1\"><MapPin className=\"h-3.5 w-3.5\" /> {d.city}</p>
                </div>
                <span className=\"inline-flex items-center gap-1 px-3 py-1 rounded-full bg-brand-soft text-brand font-bold text-sm\">
                  <Droplet className=\"h-3.5 w-3.5\" fill=\"currentColor\" /> {d.blood_group}
                </span>
              </div>
              <div className=\"mt-5 pt-4 border-t border-border space-y-2 text-sm\">
                <a href={`tel:${d.phone}`} className=\"flex items-center gap-2 text-stone-700 hover:text-brand transition-colors\"><Phone className=\"h-4 w-4\" /> {d.phone}</a>
                <a href={`mailto:${d.email}`} className=\"flex items-center gap-2 text-stone-700 hover:text-brand transition-colors\"><Mail className=\"h-4 w-4\" /> {d.email}</a>
              </div>
            </motion.div>
          ))}
        </div>
        {searched && results.length === 0 && (
          <div className=\"text-center py-16 text-stone-500\" data-testid=\"no-results\">
            <Droplet className=\"h-10 w-10 mx-auto mb-3 opacity-40\" />
            No matching donors found. Try broadening your search.
          </div>
        )}
      </div>
    </div>
  );
}
"