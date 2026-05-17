import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { IceCream, LogOut, User, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${isScrolled ? 'bg-white shadow-md py-3' : 'bg-transparent py-6'}`}>
      <div className="container mx-auto px-6 md:px-12 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 group">
          <div className={`p-2 rounded-full transition-colors ${isScrolled ? 'bg-brand-blue text-white' : 'bg-white text-brand-blue'}`}>
            <IceCream size={24} />
          </div>
          <span className={`font-serif text-2xl font-bold tracking-tight transition-colors ${isScrolled ? 'text-slate-800' : 'text-white'}`}>
            Softeis<span className={isScrolled ? 'text-brand-blue' : 'text-white/80'}>Laden</span>
          </span>
        </Link>

        {/* Desktop Menu */}
        <div className={`hidden md:flex items-center gap-10 font-bold uppercase tracking-[0.2em] text-xs transition-colors ${isScrolled ? 'text-slate-600' : 'text-white'}`}>
          <a href="/#menu" className="hover:text-brand-blue transition-colors relative group">
            Menü
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-brand-blue transition-all group-hover:w-full"></span>
          </a>
          <a href="/#about" className="hover:text-brand-blue transition-colors relative group">
            Über uns
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-brand-blue transition-all group-hover:w-full"></span>
          </a>
          <a href="/#contact" className="hover:text-brand-blue transition-colors relative group">
            Kontakt
          </a>
        </div>

        <div className="flex items-center gap-6">
          {user ? (
            <div className="flex items-center gap-4">
              <Link to="/admin" className={`flex items-center gap-2 transition-colors ${isScrolled ? 'text-slate-600' : 'text-white'}`}>
                <User size={20} />
              </Link>
              <button 
                onClick={handleLogout}
                className={`p-2 rounded-full transition-colors ${isScrolled ? 'bg-slate-100 text-slate-600' : 'bg-white/10 text-white'}`}
              >
                <LogOut size={20} />
              </button>
            </div>
          ) : (
            <Link 
              to="/login" 
              className={`text-xs font-bold uppercase tracking-widest hover:text-brand-blue transition-colors ${isScrolled ? 'text-slate-400' : 'text-white/60'}`}
            >
              Login
            </Link>
          )}
          
          {/* Mobile Toggle */}
          <button 
            className={`md:hidden p-2 transition-colors ${isScrolled ? 'text-slate-800' : 'text-white'}`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t border-slate-100 overflow-hidden"
          >
            <div className="flex flex-col p-6 gap-6 font-bold uppercase tracking-widest text-sm text-slate-800">
              <a href="/#menu" onClick={() => setIsMobileMenuOpen(false)}>Menü</a>
              <a href="/#about" onClick={() => setIsMobileMenuOpen(false)}>Über uns</a>
              <a href="/#contact" onClick={() => setIsMobileMenuOpen(false)}>Kontakt</a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
