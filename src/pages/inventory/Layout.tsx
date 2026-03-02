import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { Home, LayoutDashboard, UserPlus, Cog, Package, LogOut, Leaf } from 'lucide-react';

export default function InventoryLayout() {
  const { logout, user } = useApp();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const menuItems = [
    { name: 'Home', path: '/inventory', icon: Home },
    { name: 'Dashboard', path: '/inventory/dashboard', icon: LayoutDashboard },
    { name: 'Farmer Input', path: '/inventory/farmer-input', icon: UserPlus },
    { name: 'Processing', path: '/inventory/processing', icon: Cog },
    { name: 'Inventory', path: '/inventory/stock', icon: Package },
  ];

  return (
    <div className="flex min-h-screen bg-stone-50">
      {/* Sidebar */}
      <aside className="w-64 bg-emerald-900 text-white flex flex-col fixed h-full">
        <div className="p-6 flex items-center gap-3 border-b border-emerald-800">
          <Leaf className="text-amber-400" size={32} />
          <span className="font-bold text-xl tracking-tight">W2W Portal</span>
        </div>
        
        <nav className="flex-1 p-4 space-y-2 mt-4">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 p-3 rounded-xl transition-all ${
                  isActive 
                    ? 'bg-emerald-700 text-white shadow-lg' 
                    : 'text-emerald-100 hover:bg-emerald-800'
                }`}
              >
                <Icon size={20} />
                <span className="font-medium">{item.name}</span>
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-emerald-800">
          {user && (
            <div className="px-3 py-4 mb-2 bg-emerald-800/50 rounded-xl border border-emerald-700/50">
              <p className="text-sm font-bold text-white truncate">{user.name}</p>
              <p className="text-[10px] text-emerald-300 truncate">{user.email}</p>
            </div>
          )}
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 p-3 w-full rounded-xl text-emerald-100 hover:bg-emerald-800 transition-all"
          >
            <LogOut size={20} />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-64 p-8">
        <Outlet />
      </main>
    </div>
  );
}
