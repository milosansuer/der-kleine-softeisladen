import React, { useEffect, useState } from 'react';
import { MapPin, Clock, Phone, ExternalLink } from 'lucide-react';
import client from '../api/client';

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  type: string;
  is_available: number;
}

const Home: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await client.get('/products');
        setProducts(response.data);
      } catch (error) {
        console.error('Failed to fetch products', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const iceCreams = products.filter(p => p.type === 'icecream' && p.is_available);
  const waffles = products.filter(p => p.type === 'waffle' && p.is_available);
  const toppings = products.filter(p => p.type === 'topping' && p.is_available);

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center justify-center bg-blue-500 overflow-hidden">
        {/* Abstract background elements */}
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
          <div className="absolute top-10 left-10 w-64 h-64 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        </div>
        
        <div className="container mx-auto px-6 text-center z-10">
          <h1 className="font-serif text-5xl md:text-7xl font-bold text-white mb-6 drop-shadow-md">
            Das beste Softeis <br /> 
            <span className="text-yellow-200">der Stadt.</span>
          </h1>
          <p className="text-white text-xl md:text-2xl mb-10 max-w-2xl mx-auto opacity-90">
            Klassisch, cremig und immer frisch für dich gezapft. Entdecke unsere Sorten und lass dich verwöhnen.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="#menu" 
              className="bg-white text-blue-600 hover:bg-yellow-100 px-8 py-4 rounded-full font-bold text-lg transition-all shadow-lg hover:scale-105 active:scale-95"
            >
              Menü entdecken
            </a>
            <a 
              href="#contact" 
              className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4 rounded-full font-bold text-lg transition-all"
            >
              Besuch uns
            </a>
          </div>
        </div>
        
        {/* Decorative wave at bottom */}
        <div className="absolute bottom-0 left-0 w-full leading-[0]">
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-[60px] fill-[#fffaf5]">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C57.34,103.49,203.43,78.29,321.39,56.44Z"></path>
          </svg>
        </div>
      </section>

      {/* Menu Section */}
      <section id="menu" className="py-24 bg-[#fffaf5]">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="font-serif text-4xl font-bold text-slate-800 mb-4 italic">Unser Angebot</h2>
            <div className="w-24 h-1 bg-blue-500 mx-auto rounded-full"></div>
          </div>

          {loading ? (
            <div className="flex justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          ) : (
            <div className="grid md:grid-cols-3 gap-12 max-w-6xl mx-auto">
              {/* Ice Cream */}
              <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
                <h3 className="font-serif text-2xl font-bold text-blue-600 mb-6 flex items-center gap-2">
                  <span className="w-8 h-8 bg-blue-50 rounded-full flex items-center justify-center">🍦</span>
                  Eissorten
                </h3>
                <ul className="space-y-4">
                  {iceCreams.map(item => (
                    <li key={item.id} className="flex justify-between items-start border-b border-dashed border-slate-200 pb-3">
                      <div>
                        <span className="font-bold block">{item.name}</span>
                        <span className="text-sm text-slate-500">{item.description}</span>
                      </div>
                      <span className="font-serif font-bold text-slate-700">{item.price.toFixed(2)}€</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Waffles */}
              <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
                <h3 className="font-serif text-2xl font-bold text-orange-500 mb-6 flex items-center gap-2">
                  <span className="w-8 h-8 bg-orange-50 rounded-full flex items-center justify-center">🧇</span>
                  Waffeln
                </h3>
                <ul className="space-y-4">
                  {waffles.map(item => (
                    <li key={item.id} className="flex justify-between items-start border-b border-dashed border-slate-200 pb-3">
                      <div>
                        <span className="font-bold block">{item.name}</span>
                        <span className="text-sm text-slate-500">{item.description}</span>
                      </div>
                      <span className="font-serif font-bold text-slate-700">{item.price.toFixed(2)}€</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Toppings */}
              <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
                <h3 className="font-serif text-2xl font-bold text-pink-500 mb-6 flex items-center gap-2">
                  <span className="w-8 h-8 bg-pink-50 rounded-full flex items-center justify-center">✨</span>
                  Toppings
                </h3>
                <ul className="space-y-4">
                  {toppings.map(item => (
                    <li key={item.id} className="flex justify-between items-start border-b border-dashed border-slate-200 pb-3">
                      <div>
                        <span className="font-bold block">{item.name}</span>
                        <span className="text-sm text-slate-500">{item.description}</span>
                      </div>
                      <span className="font-serif font-bold text-slate-700">{item.price.toFixed(2)}€</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 bg-white relative overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="md:w-1/2">
              <div className="relative">
                <div className="absolute -top-4 -left-4 w-24 h-24 bg-blue-100 rounded-full -z-10"></div>
                <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-yellow-100 rounded-full -z-10"></div>
                <img 
                  src="https://images.unsplash.com/photo-1572312673420-4320986fa887?auto=format&fit=crop&q=80&w=800" 
                  alt="Unser Laden" 
                  className="rounded-3xl shadow-xl border-4 border-white"
                />
              </div>
            </div>
            <div className="md:w-1/2">
              <span className="text-blue-500 font-bold tracking-widest uppercase text-sm mb-2 block">Tradition & Leidenschaft</span>
              <h2 className="font-serif text-4xl font-bold text-slate-800 mb-6 italic">Eis mit Herz seit Generationen</h2>
              <p className="text-slate-600 text-lg leading-relaxed mb-6">
                Mitten im Herzen von Berlin-Adlershof erwartet dich "Der kleine Softeis-Laden". Wir glauben an die einfachen Dinge im Leben: frische Zutaten, ein Lächeln und das perfekte, cremig gezapfte Softeis.
              </p>
              <p className="text-slate-600 text-lg leading-relaxed mb-8">
                Unser Laden ist ein Treffpunkt für Jung und Alt. Ob nach der Schule, in der Mittagspause oder beim Sonntagsspaziergang – wir laden dich ein, einen Moment innezuhalten und den süßen Geschmack der Kindheit zu genießen.
              </p>
              <a 
                href="https://www.google.com/maps/place/Der+kleine+Softeis-Laden/@52.4158385,13.5783147,17z" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-blue-600 font-bold hover:underline"
              >
                Auf Google Maps ansehen <ExternalLink size={18} />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 bg-slate-50">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden flex flex-col md:flex-row">
            <div className="md:w-1/2 bg-blue-600 p-12 text-white">
              <h2 className="font-serif text-3xl font-bold mb-8 italic">Komm vorbei!</h2>
              <ul className="space-y-8">
                <li className="flex gap-4">
                  <MapPin className="text-yellow-200 shrink-0" size={24} />
                  <div>
                    <span className="block font-bold mb-1">Adresse</span>
                    <span className="opacity-90">Dörpfeldstraße 34, <br />12489 Berlin</span>
                  </div>
                </li>
                <li className="flex gap-4">
                  <Clock className="text-yellow-200 shrink-0" size={24} />
                  <div>
                    <span className="block font-bold mb-1">Öffnungszeiten</span>
                    <span className="opacity-90">Mo - So: 12:00 - 18:00 <br />(Bei schönem Wetter auch länger)</span>
                  </div>
                </li>
                <li className="flex gap-4">
                  <Phone className="text-yellow-200 shrink-0" size={24} />
                  <div>
                    <span className="block font-bold mb-1">Kontakt</span>
                    <span className="opacity-90">+49 30 12345678</span>
                  </div>
                </li>
              </ul>
            </div>
            <div className="md:w-1/2 p-12">
              <h3 className="font-serif text-2xl font-bold text-slate-800 mb-6 italic">Hast du Fragen?</h3>
              <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Dein Name</label>
                  <input type="text" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="Max Mustermann" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Deine E-Mail</label>
                  <input type="email" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="max@beispiel.de" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Nachricht</label>
                  <textarea className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent h-32" placeholder="Was können wir für dich tun?"></textarea>
                </div>
                <button className="w-full bg-blue-600 text-white font-bold py-3 rounded-xl hover:bg-blue-700 transition-colors">
                  Nachricht senden
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
