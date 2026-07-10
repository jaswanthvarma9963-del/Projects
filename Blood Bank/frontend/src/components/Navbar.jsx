"import { useState } from \"react\";
import { Link, NavLink, useLocation } from \"react-router-dom\";
import { Droplet, Menu, X } from \"lucide-react\";

const links = [
  { to: \"/\", label: \"Home\" },
  { to: \"/find\", label: \"Find Blood\" },
  { to: \"/request\", label: \"Request Blood\" },
  { to: \"/register\", label: \"Become Donor\" },
  { to: \"/donors\", label: \"Donors\" },
  { to: \"/contact\", label: \"Contact\" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  return (
    <header
      className=\"sticky top-0 z-50 backdrop-blur-xl bg-white/80 border-b border-border/60\"
      data-testid=\"navbar\"
    >
      <nav className=\"max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between h-16\">
        <Link to=\"/\" className=\"flex items-center gap-2\" data-testid=\"logo-link\">
          <div className=\"h-9 w-9 rounded-full bg-brand flex items-center justify-center\">
            <Droplet className=\"h-5 w-5 text-white\" strokeWidth={1.5} fill=\"white\" />
          </div>
          <span className=\"font-heading font-bold text-xl tracking-tight text-stone-900\">
            Life<span className=\"text-brand\">Stream</span>
          </span>
        </Link>

        <div className=\"hidden md:flex items-center gap-1\">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              data-testid={`nav-${l.label.toLowerCase().replace(/\s/g, \"-\")}`}
              className={({ isActive }) =>
                `px-4 py-2 text-sm font-medium rounded-full transition-colors duration-300 ${
                  isActive
                    ? \"text-brand bg-brand-soft\"
                    : \"text-stone-600 hover:text-stone-900\"
                }`
              }
            >
              {l.label}
            </NavLink>
          ))}
        </div>

        <Link
          to=\"/request\"
          data-testid=\"navbar-cta\"
          className=\"hidden md:inline-flex items-center px-5 py-2 rounded-full bg-brand text-white text-sm font-semibold transition-transform duration-300 hover:-translate-y-0.5 hover:bg-brand-hover\"
        >
          Need Blood?
        </Link>

        <button
          className=\"md:hidden p-2 text-stone-800\"
          onClick={() => setOpen(!open)}
          data-testid=\"mobile-menu-toggle\"
          aria-label=\"Toggle menu\"
        >
          {open ? <X className=\"h-6 w-6\" /> : <Menu className=\"h-6 w-6\" />}
        </button>
      </nav>

      {open && (
        <div className=\"md:hidden border-t border-border bg-white px-6 py-4 space-y-1\" data-testid=\"mobile-menu\">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              onClick={() => setOpen(false)}
              className={`block px-4 py-3 rounded-lg text-sm font-medium ${
                location.pathname === l.to ? \"text-brand bg-brand-soft\" : \"text-stone-700\"
              }`}
            >
              {l.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
"