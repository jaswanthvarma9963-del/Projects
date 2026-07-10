"import { useEffect, useState } from \"react\";
import { Link } from \"react-router-dom\";
import { motion } from \"framer-motion\";
import { Droplet, Search, HeartHandshake, ArrowRight, Users, MapPin, Activity, ShieldCheck } from \"lucide-react\";
import { api, BLOOD_GROUPS } from \"@/lib/api\";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.5, delay: i * 0.1 } }),
};

export default function Home() {
  const [stats, setStats] = useState({ total_donors: 0, cities_covered: 0, lives_impacted: 0, total_requests: 0 });

  useEffect(() => {
    api.get(\"/stats\").then((r) => setStats(r.data)).catch(() => {});
  }, []);

  const statCards = [
    { icon: Users, label: \"Registered Donors\", value: stats.total_donors },
    { icon: MapPin, label: \"Cities Covered\", value: stats.cities_covered },
    { icon: Activity, label: \"Lives Impacted\", value: stats.lives_impacted },
    { icon: Droplet, label: \"Requests Served\", value: stats.total_requests },
  ];

  const actions = [
    { to: \"/register\", icon: HeartHandshake, title: \"Become a Donor\", desc: \"Join our community of heroes and be someone's lifeline.\", cta: \"Register now\" },
    { to: \"/find\", icon: Search, title: \"Find Blood\", desc: \"Search verified donors by blood group and city instantly.\", cta: \"Search donors\" },
    { to: \"/request\", icon: Droplet, title: \"Request Blood\", desc: \"Raise an urgent request and reach thousands of donors.\", cta: \"Raise request\" },
  ];

  return (
    <div data-testid=\"home-page\">
      {/* Hero */}
      <section className=\"relative overflow-hidden bg-stone-50\">
        <div className=\"grain\" />
        <div className=\"max-w-7xl mx-auto px-6 md:px-12 py-20 md:py-28 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative\">
          <motion.div initial=\"hidden\" animate=\"show\" variants={fadeUp} className=\"lg:col-span-6\">
            <span className=\"inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-soft text-brand text-sm font-semibold mb-6\">
              <ShieldCheck className=\"h-4 w-4\" /> Trusted blood donation network
            </span>
            <h1 className=\"font-heading text-5xl sm:text-6xl md:text-7xl font-light tracking-tight text-stone-900 leading-[1.05]\">
              Donate blood, <span className=\"font-bold text-brand\">save a life</span> today.
            </h1>
            <p className=\"mt-6 text-lg text-stone-600 leading-relaxed max-w-xl\">
              LifeStream connects generous donors with patients in critical need.
              One donation can save up to three lives. Be the reason someone smiles again.
            </p>
            <div className=\"mt-8 flex flex-wrap gap-4\">
              <Link to=\"/register\" data-testid=\"hero-donor-btn\" className=\"inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-brand text-white font-semibold transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg hover:bg-brand-hover\">
                Become a Donor <ArrowRight className=\"h-4 w-4\" />
              </Link>
              <Link to=\"/find\" data-testid=\"hero-find-btn\" className=\"inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-white text-stone-900 font-semibold border border-border transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg\">
                Find Blood
              </Link>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6 }} className=\"lg:col-span-6 relative\">
            <div className=\"relative rounded-3xl overflow-hidden shadow-2xl\">
              <img
                src=\"https://images.unsplash.com/photo-1624727828489-a1e03b79bba8?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1MDZ8MHwxfHNlYXJjaHwyfHxoZWFsdGhjYXJlJTIwcHJvZmVzc2lvbmFsJTIwY2FyaW5nfGVufDB8fHx8MTc4MzY2NTMyN3ww&ixlib=rb-4.1.0&q=85\"
                alt=\"Healthcare professional holding a heart-shaped stethoscope\"
                className=\"w-full h-[440px] object-cover\"
              />
            </div>
            <div className=\"absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-xl p-5 border border-border hidden sm:flex items-center gap-3\">
              <div className=\"h-12 w-12 rounded-full bg-brand flex items-center justify-center\">
                <Droplet className=\"h-6 w-6 text-white\" fill=\"white\" />
              </div>
              <div>
                <p className=\"font-heading font-bold text-2xl text-stone-900\">{stats.total_donors}+</p>
                <p className=\"text-sm text-stone-500\">Active donors ready</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats banner */}
      <section className=\"bg-brand\" data-testid=\"stats-banner\">
        <div className=\"max-w-7xl mx-auto px-6 md:px-12 py-12 grid grid-cols-2 md:grid-cols-4 gap-8\">
          {statCards.map((s, i) => (
            <motion.div key={s.label} custom={i} initial=\"hidden\" whileInView=\"show\" viewport={{ once: true }} variants={fadeUp} className=\"text-white\">
              <s.icon className=\"h-7 w-7 mb-3 opacity-80\" strokeWidth={1.5} />
              <p className=\"font-heading text-3xl md:text-4xl font-bold\">{s.value}</p>
              <p className=\"text-white/80 text-sm mt-1\">{s.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Action bento */}
      <section className=\"max-w-7xl mx-auto px-6 md:px-12 py-20 md:py-24\">
        <div className=\"max-w-2xl mb-14\">
          <h2 className=\"font-heading text-4xl sm:text-5xl font-light tracking-tight text-stone-900\">
            How can we <span className=\"font-bold text-brand\">help</span> you?
          </h2>
          <p className=\"mt-4 text-stone-600 text-lg\">Three simple paths, one shared mission — saving lives together.</p>
        </div>
        <div className=\"grid grid-cols-1 md:grid-cols-3 gap-6\">
          {actions.map((a, i) => (
            <motion.div key={a.title} custom={i} initial=\"hidden\" whileInView=\"show\" viewport={{ once: true }} variants={fadeUp}>
              <Link to={a.to} data-testid={`action-card-${a.to.replace(\"/\", \"\")}`} className=\"group block h-full bg-white rounded-2xl border border-border p-8 transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg\">
                <div className=\"h-14 w-14 rounded-xl bg-brand-soft flex items-center justify-center mb-6\">
                  <a.icon className=\"h-7 w-7 text-brand\" strokeWidth={1.5} />
                </div>
                <h3 className=\"font-heading text-2xl font-semibold text-stone-900 mb-2\">{a.title}</h3>
                <p className=\"text-stone-600 leading-relaxed mb-6\">{a.desc}</p>
                <span className=\"inline-flex items-center gap-2 text-brand font-semibold group-hover:gap-3 transition-all duration-300\">
                  {a.cta} <ArrowRight className=\"h-4 w-4\" />
                </span>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Compatibility + Process */}
      <section className=\"bg-stone-50\" data-testid=\"info-section\">
        <div className=\"max-w-7xl mx-auto px-6 md:px-12 py-20 grid grid-cols-1 lg:grid-cols-2 gap-14 items-center\">
          <div>
            <h2 className=\"font-heading text-4xl font-light tracking-tight text-stone-900 mb-3\">
              Every <span className=\"font-bold text-brand\">blood group</span> matters
            </h2>
            <p className=\"text-stone-600 mb-8\">We maintain donors across all eight blood groups so help is never far away.</p>
            <div className=\"grid grid-cols-4 gap-3\">
              {BLOOD_GROUPS.map((g) => (
                <div key={g} className=\"aspect-square rounded-xl bg-white border border-border flex flex-col items-center justify-center transition-transform duration-300 hover:-translate-y-1 hover:border-brand\">
                  <span className=\"font-heading text-2xl font-bold text-brand\">{g}</span>
                </div>
              ))}
            </div>
          </div>
          <div className=\"rounded-3xl overflow-hidden shadow-xl\">
            <img
              src=\"https://images.pexels.com/photos/37553374/pexels-photo-37553374.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940\"
              alt=\"People donating blood\"
              className=\"w-full h-[420px] object-cover\"
            />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className=\"max-w-7xl mx-auto px-6 md:px-12 py-20\">
        <div className=\"rounded-3xl bg-stone-900 relative overflow-hidden px-8 md:px-16 py-16 text-center\">
          <div className=\"grain\" />
          <h2 className=\"font-heading text-4xl sm:text-5xl font-light text-white relative\">
            Ready to be someone's <span className=\"font-bold text-brand\">hero</span>?
          </h2>
          <p className=\"text-stone-300 mt-4 max-w-xl mx-auto relative\">Register in under a minute. It's free, safe, and profoundly meaningful.</p>
          <Link to=\"/register\" data-testid=\"cta-register-btn\" className=\"relative inline-flex items-center gap-2 mt-8 px-8 py-3.5 rounded-full bg-brand text-white font-semibold transition-transform duration-300 hover:-translate-y-1 hover:bg-brand-hover\">
            Join as Donor <ArrowRight className=\"h-4 w-4\" />
          </Link>
        </div>
      </section>
    </div>
  );
}
"