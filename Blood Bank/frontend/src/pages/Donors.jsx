"import { useEffect, useState } from \"react\";
import { motion } from \"framer-motion\";
import { Users, Droplet, Loader2 } from \"lucide-react\";
import { api, BLOOD_GROUPS } from \"@/lib/api\";
import { Input } from \"@/components/ui/input\";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from \"@/components/ui/table\";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from \"@/components/ui/select\";

export default function Donors() {
  const [donors, setDonors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [group, setGroup] = useState(\"all\");
  const [q, setQ] = useState(\"\");

  useEffect(() => {
    api.get(\"/donors\").then((r) => setDonors(r.data)).catch(() => {}).finally(() => setLoading(false));
  }, []);

  const filtered = donors.filter((d) => {
    const gOk = group === \"all\" || d.blood_group === group;
    const qOk = !q || d.name.toLowerCase().includes(q.toLowerCase()) || d.city.toLowerCase().includes(q.toLowerCase());
    return gOk && qOk;
  });

  return (
    <div className=\"max-w-7xl mx-auto px-6 md:px-12 py-16\" data-testid=\"donors-page\">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className=\"mb-10\">
        <span className=\"inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-soft text-brand text-sm font-semibold mb-6\">
          <Users className=\"h-4 w-4\" /> Donor directory
        </span>
        <h1 className=\"font-heading text-4xl sm:text-5xl font-light tracking-tight text-stone-900\">
          Registered <span className=\"font-bold text-brand\">donors</span>
        </h1>
        <p className=\"mt-4 text-stone-600 text-lg\">A live directory of everyone ready to donate. {donors.length} total.</p>
      </motion.div>

      <div className=\"flex flex-col sm:flex-row gap-4 mb-6\">
        <Input data-testid=\"donor-search\" value={q} onChange={(e) => setQ(e.target.value)} placeholder=\"Search by name or city\" className=\"bg-stone-100 border-border sm:max-w-xs\" />
        <Select value={group} onValueChange={setGroup}>
          <SelectTrigger data-testid=\"donor-filter-group\" className=\"bg-stone-100 border-border sm:max-w-[180px] h-10\"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value=\"all\">All blood groups</SelectItem>
            {BLOOD_GROUPS.map((g) => <SelectItem key={g} value={g}>{g}</SelectItem>)}
          </SelectContent>
        </Select>
      </div>

      <div className=\"bg-white rounded-2xl border border-border overflow-hidden shadow-sm\">
        {loading ? (
          <div className=\"py-20 flex justify-center text-stone-400\"><Loader2 className=\"h-6 w-6 animate-spin\" /></div>
        ) : (
          <Table data-testid=\"donors-table\">
            <TableHeader>
              <TableRow className=\"bg-stone-50\">
                <TableHead className=\"pl-6 py-4 text-stone-700 font-semibold\">Name</TableHead>
                <TableHead className=\"text-stone-700 font-semibold\">Blood Group</TableHead>
                <TableHead className=\"text-stone-700 font-semibold\">City</TableHead>
                <TableHead className=\"text-stone-700 font-semibold\">Phone</TableHead>
                <TableHead className=\"pr-6 text-stone-700 font-semibold\">Email</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((d) => (
                <TableRow key={d.id} data-testid={`donor-row-${d.id}`} className=\"border-border\">
                  <TableCell className=\"pl-6 py-4 font-medium text-stone-900\">{d.name}</TableCell>
                  <TableCell>
                    <span className=\"inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-brand-soft text-brand font-bold text-xs\">
                      <Droplet className=\"h-3 w-3\" fill=\"currentColor\" /> {d.blood_group}
                    </span>
                  </TableCell>
                  <TableCell className=\"text-stone-700\">{d.city}</TableCell>
                  <TableCell className=\"text-stone-700\">{d.phone}</TableCell>
                  <TableCell className=\"pr-6 text-stone-700\">{d.email}</TableCell>
                </TableRow>
              ))}
              {filtered.length === 0 && (
                <TableRow>
                  <TableCell colSpan={5} className=\"text-center py-12 text-stone-500\">No donors match your filters.</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        )}
      </div>
    </div>
  );
}
"