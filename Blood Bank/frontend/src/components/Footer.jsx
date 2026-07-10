"import { Link } from \"react-router-dom\";
import { Droplet, Heart } from \"lucide-react\";

export default function Footer() {
  return (
    <footer className=\"bg-stone-900 text-stone-300 mt-24\" data-testid=\"footer\">
      <div className=\"max-w-7xl mx-auto px-6 md:px-12 py-16 grid grid-cols-1 md:grid-cols-4 gap-10\">
        <div className=\"md:col-span-2\">
          <div className=\"flex items-center gap-2 mb-4\">
            <div className=\"h-9 w-9 rounded-full bg-brand flex items-center justify-center\">
              <Droplet className=\"h-5 w-5 text-white\" strokeWidth={1.5} fill=\"white\" />
            </div>
            <span className=\"font-heading font-bold text-xl text-white\">
              Life<span className=\"text-brand\">Stream</span>
            </span>
          </div>
          <p className=\"text-stone-400 max-w-md leading-relaxed\">
            Connecting voluntary blood donors with patients in need. Every drop
            counts, every donor is a hero.
          </p>
        </div>
        <div>
          <h4 className=\"text-white font-semibold mb-4\">Quick Links</h4>
          <ul className=\"space-y-2 text-sm\">
            <li><Link to=\"/find\" className=\"hover:text-brand transition-colors\">Find Blood</Link></li>
            <li><Link to=\"/request\" className=\"hover:text-brand transition-colors\">Request Blood</Link></li>
            <li><Link to=\"/register\" className=\"hover:text-brand transition-colors\">Become a Donor</Link></li>
            <li><Link to=\"/donors\" className=\"hover:text-brand transition-colors\">Donor Directory</Link></li>
          </ul>
        </div>
        <div>
          <h4 className=\"text-white font-semibold mb-4\">Contact</h4>
          <ul className=\"space-y-2 text-sm text-stone-400\">
            <li>help@lifestream.org</li>
            <li>+91 1800 000 000</li>
            <li>Available 24 / 7</li>
          </ul>
        </div>
      </div>
      <div className=\"border-t border-stone-800\">
        <div className=\"max-w-7xl mx-auto px-6 md:px-12 py-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-sm text-stone-500\">
          <p>© {new Date().getFullYear()} LifeStream Blood Bank. All rights reserved.</p>
          <p className=\"flex items-center gap-1\">
            Made with <Heart className=\"h-4 w-4 text-brand\" fill=\"currentColor\" /> to save lives
          </p>
        </div>
      </div>
    </footer>
  );
}
"