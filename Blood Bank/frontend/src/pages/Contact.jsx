"import { useState } from \"react\";
import { motion } from \"framer-motion\";
import { toast } from \"sonner\";
import { Mail, Phone, MapPin, Loader2, Send } from \"lucide-react\";
import { api } from \"@/lib/api\";
import { Input } from \"@/components/ui/input\";
import { Label } from \"@/components/ui/label\";
import { Textarea } from \"@/components/ui/textarea\";

const empty = { name: \"\", email: \"\", message: \"\" };

export default function Contact() {
  const [form, setForm] = useState(empty);
  const [loading, setLoading] = useState(false);
  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const submit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast.error(\"Please fill all fields\");
      return;
    }
    setLoading(true);
    try {
      await api.post(\"/contact\", form);
      toast.success(\"Message sent! We'll get back to you soon.\");
      setForm(empty);
    } catch {
      toast.error(\"Could not send message. Please try again.\");
    } finally {
      setLoading(false);
    }
  };

  const info = [
    { icon: Mail, label: \"Email\", value: \"help@lifestream.org\" },
    { icon: Phone, label: \"Phone\", value: \"+91 1800 9333 0000\" },
    { icon: MapPin, label: \"Address\", value: \"24/7 National Blood Helpline\" },
  ];

  return (
    <div className=\"max-w-7xl mx-auto px-6 md:px-12 py-16\" data-testid=\"contact-page\">
      <div className=\"grid grid-cols-1 lg:grid-cols-2 gap-14\">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <span className=\"inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-soft text-brand text-sm font-semibold mb-6\">
            <Send className=\"h-4 w-4\" /> Get in touch
          </span>
          <h1 className=\"font-heading text-4xl sm:text-5xl font-light tracking-tight text-stone-900\">
            We'd love to <span className=\"font-bold text-brand\">hear from you</span>
          </h1>
          <p className=\"mt-4 text-stone-600 text-lg leading-relaxed\">
            Questions, partnerships, or feedback — reach out any time. Our team responds within 24 hours.
          </p>
          <div className=\"mt-10 space-y-5\">
            {info.map((it) => (
              <div key={it.label} className=\"flex items-center gap-4\">
                <div className=\"h-12 w-12 rounded-xl bg-brand-soft flex items-center justify-center\">
                  <it.icon className=\"h-5 w-5 text-brand\" strokeWidth={1.5} />
                </div>
                <div>
                  <p className=\"text-sm text-stone-500\">{it.label}</p>
                  <p className=\"font-medium text-stone-900\">{it.value}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.form onSubmit={submit} data-testid=\"contact-form\" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }} className=\"bg-white rounded-2xl border border-border p-8 shadow-sm\">
          <div className=\"space-y-5\">
            <div>
              <Label htmlFor=\"cname\">Name</Label>
              <Input id=\"cname\" data-testid=\"contact-name\" value={form.name} onChange={(e) => set(\"name\", e.target.value)} placeholder=\"Your name\" className=\"mt-1.5 bg-stone-100 border-border\" />
            </div>
            <div>
              <Label htmlFor=\"cemail\">Email</Label>
              <Input id=\"cemail\" type=\"email\" data-testid=\"contact-email\" value={form.email} onChange={(e) => set(\"email\", e.target.value)} placeholder=\"you@email.com\" className=\"mt-1.5 bg-stone-100 border-border\" />
            </div>
            <div>
              <Label htmlFor=\"cmsg\">Message</Label>
              <Textarea id=\"cmsg\" data-testid=\"contact-message\" value={form.message} onChange={(e) => set(\"message\", e.target.value)} placeholder=\"How can we help?\" rows={5} className=\"mt-1.5 bg-stone-100 border-border\" />
            </div>
          </div>
          <button type=\"submit\" disabled={loading} data-testid=\"contact-submit\" className=\"mt-6 w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-brand text-white font-semibold transition-transform duration-300 hover:-translate-y-0.5 hover:bg-brand-hover disabled:opacity-60\">
            {loading ? <Loader2 className=\"h-5 w-5 animate-spin\" /> : <>Send Message <Send className=\"h-4 w-4\" /></>}
          </button>
        </motion.form>
      </div>
    </div>
  );
}
"