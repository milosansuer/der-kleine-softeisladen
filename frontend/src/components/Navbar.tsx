import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { IceCream, LogOut, User } from 'lucide-react';

const Navbar: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="bg-white border-b border-slate-100 py-4 px-6 md:px-12 flex items-center justify-between sticky top-0 z-50">
      <Link to="/" className="flex items-center gap-2 group">
        <div className="bg-blue-500 p-2 rounded-full text-white group-hover:scale-110 transition-transform">
          <IceCream size={24} />
        </div>
        <span className="font-serif text-2xl font-bold tracking-tight text-slate-800">
          Softeis<span className="text-blue-500">Laden</span>
        </span>
      </Link>

      <div className="hidden md:flex items-center gap-8 font-medium text-slate-600">
        <a href="/#menu" className="hover:text-blue-500 transition-colors">Menü</a>
        <a href="/#about" className="hover:text-blue-500 transition-colors">Über uns</a>
        <a href="/#contact" className="hover:text-blue-500 transition-colors">Kontakt</a>
      </div>

      <div className="flex items-center gap-4">
        {user ? (
          <div className="flex items-center gap-4">
            <Link to="/admin" className="flex items-center gap-2 text-slate-600 hover:text-blue-500 transition-colors">
              <User size={20} />
              <span className="hidden sm:inline">Admin</span>
            </Link>
            <button 
              onClick={handleLogout}
              className="flex items-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-600 px-4 py-2 rounded-full transition-colors"
            >
              <LogOut size={18} />
              <span className="hidden sm:inline">Abmelden</span>
            </button>
          </div>
        ) : (
          <Link 
            to="/login" 
            className="text-slate-500 hover:text-blue-500 transition-colors text-sm font-medium"
          >
            Admin-Login
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
