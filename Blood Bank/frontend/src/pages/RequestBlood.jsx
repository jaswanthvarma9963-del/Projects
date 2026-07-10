"import { useState } from \"react\";
import { motion } from \"framer-motion\";
import { toast } from \"sonner\";
import { Droplet, Loader2 } from \"lucide-react\";
import { api, BLOOD_GROUPS } from \"@/lib/api\";
import { Input } from \"@/components/ui/input\";
import { Label } from \"@/components/ui/label\";
import { Textarea } from \"@/components/ui/textarea\";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from \"@/components/ui/select\";

const empty = { patient_name: \"\", blood_group: \"\", city: \"\", hospital: \"\", units: 1, contact: \"\", urgency: \"normal\", note: \"\" };

export default function RequestBlood() {
  const [form, setForm] = useState(empty);
  const [loading, setLoading] = useState(false);
  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const submit = async (e) => {
    e.preventDefault();
    if (!form.patient_name || !form.blood_group || !form.city || !form.hospital || !form.contact) {
      toast.error(\"Please fill all required fields\");
      return;
    }
    setLoading(true);
    try {
      await api.post(\"/requests\", { ...form, units: Number(form.units) || 1 });
      toast.success(\"Request submitted! Our donor network has been notified.\");
      setForm(empty);
    } catch {
      toast.error(\"Could not submit request. Please try again.\");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className=\"max-w-3xl mx-auto px-6 md:px-12 py-16\" data-testid=\"request-page\">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className=\"mb-10\">
        <span className=\"inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-soft text-brand text-sm font-semibold mb-6\">
          <Droplet className=\"h-4 w-4\" fill=\"currentColor\" /> Urgent or planned need
        </span>
        <h1 className=\"font-heading text-4xl sm:text-5xl font-light tracking-tight text-stone-900\">
          Request <span className=\"font-bold text-brand\">blood</span>
        </h1>
        <p className=\"mt-4 text-stone-600 text-lg\">Submit the patient's requirement and we'll connect you with matching donors.</p>
      </motion.div>

      <motion.form onSubmit={submit} data-testid=\"request-form\" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }} className=\"bg-white rounded-2xl border border-border p-8 shadow-sm grid grid-cols-1 sm:grid-cols-2 gap-5\">
        <div className=\"sm:col-span-2\">
          <Label htmlFor=\"pname\">Patient Name *</Label>
          <Input id=\"pname\" data-testid=\"req-patient\" value={form.patient_name} onChange={(e) => set(\"patient_name\", e.target.value)} placeholder=\"Patient full name\" className=\"mt-1.5 bg-stone-100 border-border\" />
        </div>
        <div>
          <Label>Blood Group *</Label>
          <Select value={form.blood_group} onValueChange={(v) => set(\"blood_group\", v)}>
            <SelectTrigger data-testid=\"req-blood-group\" className=\"mt-1.5 bg-stone-100 border-border h-10\"><SelectValue placeholder=\"Select group\" /></SelectTrigger>
            <SelectContent>
              {BLOOD_GROUPS.map((g) => <SelectItem key={g} value={g}>{g}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor=\"units\">Units Required *</Label>
          <Input id=\"units\" type=\"number\" min=\"1\" data-testid=\"req-units\" value={form.units} onChange={(e) => set(\"units\", e.target.value)} className=\"mt-1.5 bg-stone-100 border-border\" />
        </div>
        <div>
          <Label htmlFor=\"rcity\">City *</Label>
          <Input id=\"rcity\" data-testid=\"req-city\" value={form.city} onChange={(e) => set(\"city\", e.target.value)} placeholder=\"City\" className=\"mt-1.5 bg-stone-100 border-border\" />
        </div>
        <div>
          <Label htmlFor=\"hospital\">Hospital *</Label>
          <Input id=\"hospital\" data-testid=\"req-hospital\" value={form.hospital} onChange={(e) => set(\"hospital\", e.target.value)} placeholder=\"Hospital name\" className=\"mt-1.5 bg-stone-100 border-border\" />
        </div>
        <div>
          <Label htmlFor=\"contact\">Contact Number *</Label>
          <Input id=\"contact\" data-testid=\"req-contact\" value={form.contact} onChange={(e) => set(\"contact\", e.target.value)} placeholder=\"+91 98xxx xxxxx\" className=\"mt-1.5 bg-stone-100 border-border\" />
        </div>
        <div>
          <Label>Urgency</Label>
          <Select value={form.urgency} onValueChange={(v) => set(\"urgency\", v)}>
            <SelectTrigger data-testid=\"req-urgency\" className=\"mt-1.5 bg-stone-100 border-border h-10\"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value=\"normal\">Normal</SelectItem>
              <SelectItem value=\"urgent\">Urgent</SelectItem>
              <SelectItem value=\"critical\">Critical</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className=\"sm:col-span-2\">
          <Label htmlFor=\"note\">Additional Note</Label>
          <Textarea id=\"note\" data-testid=\"req-note\" value={form.note} onChange={(e) => set(\"note\", e.target.value)} placeholder=\"Any extra details...\" className=\"mt-1.5 bg-stone-100 border-border\" />
        </div>
        <button type=\"submit\" disabled={loading} data-testid=\"request-submit\" className=\"sm:col-span-2 mt-2 w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-brand text-white font-semibold transition-transform duration-300 hover:-translate-y-0.5 hover:bg-brand-hover disabled:opacity-60\">
          {loading ? <Loader2 className=\"h-5 w-5 animate-spin\" /> : \"Submit Request\"}
        </button>
      </motion.form>
    </div>
  );
}
"