import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useApp, UserRole } from '../../context/AppContext';
import { Leaf, ShoppingCart, Menu, X, Instagram, Twitter, Facebook } from 'lucide-react';
import { useState } from 'react';

export default function MarketingLayout() {
  const { logout, cart, role } = useApp();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const navItems = [
    { name: 'Home', path: '/marketing' },
    { name: 'Products', path: '/marketing/products' },
    { name: 'Process', path: '/marketing/process' },
    { name: 'Impact', path: '/marketing/impact' },
    { name: 'About', path: '/marketing/about' },
    { name: 'Contact', path: '/marketing/contact' },
  ];

  if (role === UserRole.MARKETING_SALES) {
    navItems.push({ name: 'Sales Dashboard', path: '/marketing/sales' });
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Navbar */}
      <nav className="bg-white/80 backdrop-blur-md border-b border-stone-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20 items-center">
            <Link to="/marketing" className="flex items-center gap-2">
              <div className="p-2 bg-emerald-600 rounded-xl">
                <Leaf className="text-white" size={24} />
              </div>
              <span className="font-bold text-2xl text-stone-800 tracking-tight">Waste2Wellness</span>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-8">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`text-sm font-bold transition-colors ${
                    location.pathname === item.path ? 'text-emerald-600' : 'text-stone-500 hover:text-emerald-600'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
              <Link
                to="/marketing/buy"
                className="p-2 text-stone-500 hover:text-emerald-600 transition-colors relative"
              >
                <ShoppingCart size={20} />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-emerald-600 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                    {cartCount}
                  </span>
                )}
              </Link>
              <button
                onClick={handleLogout}
                className="bg-stone-800 text-white px-6 py-2.5 rounded-full text-sm font-bold hover:bg-stone-700 transition-all"
              >
                Logout
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center gap-4">
              <Link to="/marketing/buy" className="p-2 text-stone-500">
                <ShoppingCart size={20} />
              </Link>
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2 text-stone-800">
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Nav */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-b border-stone-100 p-4 space-y-4">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsMenuOpen(false)}
                className="block text-lg font-bold text-stone-800"
              >
                {item.name}
              </Link>
            ))}
            <button
              onClick={handleLogout}
              className="w-full bg-stone-800 text-white py-3 rounded-xl font-bold"
            >
              Logout
            </button>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-stone-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-12">
            <div className="space-y-6">
              <div className="flex items-center gap-2">
                <Leaf className="text-emerald-400" size={24} />
                <span className="font-bold text-xl tracking-tight">Waste2Wellness</span>
              </div>
              <p className="text-stone-400 text-sm leading-relaxed">
                Turning agricultural surplus into sustainable wellness solutions. 
                We empower farmers and heal the planet.
              </p>
              <div className="flex gap-4">
                <Instagram size={20} className="text-stone-500 hover:text-white cursor-pointer" />
                <Twitter size={20} className="text-stone-500 hover:text-white cursor-pointer" />
                <Facebook size={20} className="text-stone-500 hover:text-white cursor-pointer" />
              </div>
            </div>

            <div>
              <h3 className="font-bold text-lg mb-6">Quick Links</h3>
              <ul className="space-y-4 text-stone-400 text-sm">
                <li><Link to="/marketing/products" className="hover:text-white transition-colors">Onion Powder</Link></li>
                <li><Link to="/marketing/products" className="hover:text-white transition-colors">Onion Paste</Link></li>
                <li><Link to="/marketing/products" className="hover:text-white transition-colors">Onion Seed Tea</Link></li>
                <li><Link to="/marketing/products" className="hover:text-white transition-colors">Onion Oil</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-lg mb-6">Company</h3>
              <ul className="space-y-4 text-stone-400 text-sm">
                <li><Link to="/marketing/about" className="hover:text-white transition-colors">Our Story</Link></li>
                <li><Link to="/marketing/impact" className="hover:text-white transition-colors">Our Impact</Link></li>
                <li><Link to="/marketing/contact" className="hover:text-white transition-colors">Contact Us</Link></li>
                <li><Link to="/marketing/buy" className="hover:text-white transition-colors">Store</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-lg mb-6">Newsletter</h3>
              <p className="text-stone-400 text-sm mb-4">Get the latest updates on sustainable wellness.</p>
              <div className="flex gap-2">
                <input 
                  type="email" 
                  placeholder="Email address" 
                  className="bg-stone-800 border border-stone-700 rounded-lg px-4 py-2 text-sm flex-1 focus:outline-none focus:border-emerald-500"
                />
                <button className="bg-emerald-600 text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-emerald-700 transition-colors">
                  Join
                </button>
              </div>
            </div>
          </div>
          <div className="mt-16 pt-8 border-t border-stone-800 text-center text-stone-500 text-xs">
            © 2024 Waste2Wellness. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
