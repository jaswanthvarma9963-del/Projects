"import { useState } from \"react\";
import { motion } from \"framer-motion\";
import { toast } from \"sonner\";
import { HeartHandshake, Loader2 } from \"lucide-react\";
import { api, BLOOD_GROUPS } from \"@/lib/api\";
import { Input } from \"@/components/ui/input\";
import { Label } from \"@/components/ui/label\";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from \"@/components/ui/select\";

const empty = { name: \"\", blood_group: \"\", city: \"\", phone: \"\", email: \"\", last_donation: \"\" };

export default function Register() {
  const [form, setForm] = useState(empty);
  const [loading, setLoading] = useState(false);

  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const submit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.blood_group || !form.city || !form.phone || !form.email) {
      toast.error(\"Please fill all required fields\");
      return;
    }
    setLoading(true);
    try {
      await api.post(\"/donors\", form);
      toast.success(\"Thank you! You are now a registered donor.\");
      setForm(empty);
    } catch (err) {
      toast.error(\"Something went wrong. Please try again.\");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className=\"max-w-7xl mx-auto px-6 md:px-12 py-16\" data-testid=\"register-page\">
      <div className=\"grid grid-cols-1 lg:grid-cols-2 gap-14 items-start\">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <span className=\"inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-soft text-brand text-sm font-semibold mb-6\">
            <HeartHandshake className=\"h-4 w-4\" /> Become a life saver
          </span>
          <h1 className=\"font-heading text-4xl sm:text-5xl font-light tracking-tight text-stone-900\">
            Register as a <span className=\"font-bold text-brand\">blood donor</span>
          </h1>
          <p className=\"mt-4 text-stone-600 text-lg leading-relaxed\">
            Fill in your details and join thousands of donors ready to help. Your
            information is only shared with genuine patients in need.
          </p>
          <img
            src=\"https://images.pexels.com/photos/37553374/pexels-photo-37553374.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940\"
            alt=\"Blood donation\"
            className=\"mt-10 rounded-2xl w-full h-64 object-cover hidden lg:block\"
          />
        </motion.div>

        <motion.form
          onSubmit={submit}
          data-testid=\"register-form\"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className=\"bg-white rounded-2xl border border-border p-8 shadow-sm\"
        >
          <div className=\"grid grid-cols-1 sm:grid-cols-2 gap-5\">
            <div className=\"sm:col-span-2\">
              <Label htmlFor=\"name\">Full Name *</Label>
              <Input id=\"name\" data-testid=\"input-name\" value={form.name} onChange={(e) => set(\"name\", e.target.value)} placeholder=\"John Doe\" className=\"mt-1.5 bg-stone-100 border-border\" />
            </div>
            <div>
              <Label>Blood Group *</Label>
              <Select value={form.blood_group} onValueChange={(v) => set(\"blood_group\", v)}>
                <SelectTrigger data-testid=\"select-blood-group\" className=\"mt-1.5 bg-stone-100 border-border h-10\">
                  <SelectValue placeholder=\"Select group\" />
                </SelectTrigger>
                <SelectContent>
                  {BLOOD_GROUPS.map((g) => (
                    <SelectItem key={g} value={g} data-testid={`bg-option-${g}`}>{g}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor=\"city\">City *</Label>
              <Input id=\"city\" data-testid=\"input-city\" value={form.city} onChange={(e) => set(\"city\", e.target.value)} placeholder=\"Mumbai\" className=\"mt-1.5 bg-stone-100 border-border\" />
            </div>
            <div>
              <Label htmlFor=\"phone\">Phone *</Label>
              <Input id=\"phone\" data-testid=\"input-phone\" value={form.phone} onChange={(e) => set(\"phone\", e.target.value)} placeholder=\"+91 98xxx xxxxx\" className=\"mt-1.5 bg-stone-100 border-border\" />
            </div>
            <div>
              <Label htmlFor=\"email\">Email *</Label>
              <Input id=\"email\" type=\"email\" data-testid=\"input-email\" value={form.email} onChange={(e) => set(\"email\", e.target.value)} placeholder=\"you@email.com\" className=\"mt-1.5 bg-stone-100 border-border\" />
            </div>
            <div className=\"sm:col-span-2\">
              <Label htmlFor=\"last\">Last Donation Date (optional)</Label>
              <Input id=\"last\" type=\"date\" data-testid=\"input-last-donation\" value={form.last_donation} onChange={(e) => set(\"last_donation\", e.target.value)} className=\"mt-1.5 bg-stone-100 border-border\" />
            </div>
          </div>
          <button type=\"submit\" disabled={loading} data-testid=\"register-submit\" className=\"mt-7 w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-brand text-white font-semibold transition-transform duration-300 hover:-translate-y-0.5 hover:bg-brand-hover disabled:opacity-60\">
            {loading ? <Loader2 className=\"h-5 w-5 animate-spin\" /> : \"Register as Donor\"}
          </button>
        </motion.form>
      </div>
    </div>
  );
}
"