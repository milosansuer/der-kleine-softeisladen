import React from 'react';
import { IceCream, Instagram, Facebook, Twitter } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-slate-100 py-12 px-6 md:px-12">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-8">
          <div className="flex items-center gap-2">
            <div className="bg-blue-500 p-1.5 rounded-full text-white">
              <IceCream size={18} />
            </div>
            <span className="font-serif text-xl font-bold text-slate-800">
              Softeis<span className="text-blue-500">Laden</span>
            </span>
          </div>

          <div className="flex gap-8 text-sm font-medium text-slate-500">
            <a href="/#menu" className="hover:text-blue-500 transition-colors">Menü</a>
            <a href="/#about" className="hover:text-blue-500 transition-colors">Über uns</a>
            <a href="/#contact" className="hover:text-blue-500 transition-colors">Kontakt</a>
            <a href="/login" className="hover:text-blue-500 transition-colors">Admin</a>
          </div>

          <div className="flex gap-4">
            <a href="#" className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 hover:bg-blue-50 hover:text-blue-500 transition-all">
              <Instagram size={20} />
            </a>
            <a href="#" className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 hover:bg-blue-50 hover:text-blue-500 transition-all">
              <Facebook size={20} />
            </a>
            <a href="#" className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 hover:bg-blue-50 hover:text-blue-500 transition-all">
              <Twitter size={20} />
            </a>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-50 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-400">
          <p>© {new Date().getFullYear()} Der kleine Softeis-Laden. Alle Rechte vorbehalten.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-blue-500 transition-colors">Impressum</a>
            <a href="#" className="hover:text-blue-500 transition-colors">Datenschutz</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
