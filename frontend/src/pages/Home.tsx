import React, { useEffect, useState } from 'react';
import { MapPin, Clock, Phone, ExternalLink, ArrowDown } from 'lucide-react';
import { motion } from 'framer-motion';
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

  const fadeIn = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.8, ease: "easeOut" as const }
  };

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://lh3.googleusercontent.com/gps-cs-s/APNQkAG-exECJ1GgIkpnhrDV_aOX0QLJr5PUc16vosCMs1pg1B3Dl8MQwOlKe7kRxvHUDOzUujRdx92NcuPxsaUgxR65sEkEQawdY_OhEQF_Th_B7srJ3oRU488RAWqYBi9UTgp_2Oy2lQ=w2000" 
            className="w-full h-full object-cover brightness-75"
            alt="Der kleine Softeis-Laden"
          />
          <div className="absolute inset-0 bg-black/10"></div>
        </div>
        
        <div className="container mx-auto px-6 text-center z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
          >
            <h1 className="font-serif text-6xl md:text-8xl font-bold text-white mb-6 italic tracking-tight text-shadow">
              Der kleine <br /> 
              <span className="text-white not-italic">Softeis-Laden</span>
            </h1>
            <div className="w-24 h-1 bg-brand-green mx-auto mb-8"></div>
            <p className="text-white text-xl md:text-2xl mb-12 max-w-2xl mx-auto font-medium tracking-wide text-shadow">
              Handgezapftes Glück in Berlin-Adlershof. <br />
              Cremig, frisch und immer ein Lächeln inklusive.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <a 
                href="#menu" 
                className="bg-brand-green text-slate-800 hover:bg-white px-10 py-5 rounded-none font-bold text-lg transition-all shadow-xl uppercase tracking-widest"
              >
                Menü ansehen
              </a>
            </div>
          </motion.div>
        </div>

        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white cursor-pointer"
          onClick={() => document.getElementById('menu')?.scrollIntoView({ behavior: 'smooth' })}
        >
          <ArrowDown size={32} />
        </motion.div>
      </section>

      {/* Intro Quote */}
      <section className="py-20 bg-white bg-stripes">
        <div className="container mx-auto px-6 text-center">
          <motion.div {...fadeIn}>
            <p className="font-serif text-3xl md:text-4xl italic text-brand-green max-w-4xl mx-auto leading-relaxed bg-slate-800/5 py-8 rounded-full px-12">
              "Ein Tag ohne Softeis ist möglich, aber sinnlos. Wir servieren Kindheitserinnerungen in der Waffel."
            </p>
          </motion.div>
        </div>
      </section>

      {/* Menu Section */}
      <section id="menu" className="py-24 bg-brand-cream relative">
        <div className="container mx-auto px-6 max-w-5xl">
          <motion.div {...fadeIn} className="text-center mb-20">
            <span className="text-brand-green font-bold tracking-[0.2em] uppercase text-sm mb-4 block bg-slate-800 text-white inline-block px-4 py-1">Hausgemacht</span>
            <h2 className="font-serif text-5xl md:text-6xl font-bold text-slate-800 italic mt-4">Unsere Speisekarte</h2>
            <div className="w-20 h-0.5 bg-brand-green mx-auto mt-6"></div>
          </motion.div>

          {loading ? (
            <div className="flex justify-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand-green"></div>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-x-20 gap-y-16">
              {/* Ice Cream & Waffles */}
              <motion.div {...fadeIn}>
                <h3 className="font-serif text-3xl font-bold text-slate-800 mb-10 border-b border-brand-green pb-4 italic">Eis & Waffeln</h3>
                <div className="space-y-8">
                  {[...iceCreams, ...waffles].map(item => (
                    <div key={item.id} className="group">
                      <div className="flex justify-between items-end mb-1">
                        <span className="font-serif text-xl font-bold group-hover:text-brand-green transition-colors">{item.name}</span>
                        <div className="flex-grow border-b border-dotted border-slate-300 mx-4 mb-1.5"></div>
                        <span className="font-serif font-bold text-lg">{item.price > 0 ? `${item.price.toFixed(2)}€` : 'Inkl.'}</span>
                      </div>
                      <p className="text-slate-500 italic text-sm">{item.description}</p>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Toppings & Extras */}
              <motion.div {...fadeIn} transition={{ delay: 0.2 }}>
                <h3 className="font-serif text-3xl font-bold text-slate-800 mb-10 border-b border-brand-green pb-4 italic">Toppings & Extras</h3>
                <div className="space-y-8">
                  {toppings.map(item => (
                    <div key={item.id} className="group">
                      <div className="flex justify-between items-end mb-1">
                        <span className="font-serif text-xl font-bold group-hover:text-brand-green transition-colors">{item.name}</span>
                        <div className="flex-grow border-b border-dotted border-slate-300 mx-4 mb-1.5"></div>
                        <span className="font-serif font-bold text-lg">{item.price.toFixed(2)}€</span>
                      </div>
                      <p className="text-slate-500 italic text-sm">{item.description}</p>
                    </div>
                  ))}
                </div>
                
                {/* Visual Accent */}
                <div className="mt-16 p-8 bg-white border border-brand-green shadow-sm relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-brand-green/10 -mr-12 -mt-12 rounded-full"></div>
                  <p className="font-serif italic text-lg text-slate-700 relative z-10">
                    "Kombiniere deine Favoriten! Unsere Mitarbeiter beraten dich gerne für die perfekte Mischung."
                  </p>
                </div>
              </motion.div>
            </div>
          )}
        </div>
      </section>

      {/* About Section - Visual Storytelling */}
      <section id="about" className="py-24 bg-white overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center gap-16">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="md:w-1/2 relative"
            >
              <div className="relative z-10">
                <img 
                  src="https://lh3.googleusercontent.com/gps-cs-s/APNQkAGb-lVQiXIqvzaCvc7_I6yiV1JpDfQBjNUEwQwOQX-3EskMvDvEi8-tXHjp0mriCfH5nBegpC0mb9KJMy140ADgfDdthBSXblxMOa1RaxOdz2NlgUgAnWRJsxVB1M9Tyf8YgZ3H=w1000" 
                  alt="Unser Laden in Adlershof" 
                  className="rounded-none shadow-2xl border-[15px] border-brand-green"
                />
              </div>
              <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-brand-green/20 -z-0"></div>
              <div className="absolute -top-10 -left-10 w-40 h-40 bg-stripes -z-0"></div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="md:w-1/2"
            >
              <span className="text-brand-green font-bold tracking-[0.2em] uppercase text-sm mb-4 block underline decoration-brand-green/30 underline-offset-8 bg-slate-800 inline-block px-3">Unsere Geschichte</span>
              <h2 className="font-serif text-5xl font-bold text-slate-800 mb-8 italic">Tradition in <br /> Grün & Weiß</h2>
              <p className="text-slate-600 text-lg leading-relaxed mb-6 font-medium">
                Seit Jahren ist unser kleiner Laden in der Dörpfeldstraße eine feste Instanz für alle, die das Besondere suchen. Wir verzichten auf Schnickschnack und konzentrieren uns auf das Wesentliche: den perfekten Swirl.
              </p>
              <p className="text-slate-600 text-lg leading-relaxed mb-10">
                Unsere helle, grüne Fassade lädt dich ein, einen Moment innezuhalten. Bei uns ist jeder Gast willkommen – vom kleinen Entdecker bis zum lebenslangen Genießer.
              </p>
              <a 
                href="https://www.google.com/maps/place/Der+kleine+Softeis-Laden/@52.4158385,13.5783147,17z" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 bg-brand-green text-slate-800 px-8 py-4 hover:bg-slate-800 hover:text-white transition-all uppercase tracking-widest text-sm font-bold"
              >
                Google Maps <ExternalLink size={18} />
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Gallery/Social Section */}
      <section className="py-24 bg-brand-cream bg-stripes">
        <div className="container mx-auto px-6">
          <motion.div {...fadeIn} className="text-center mb-16">
            <h2 className="font-serif text-4xl font-bold italic">Impressionen</h2>
          </motion.div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
            <motion.div whileHover={{ scale: 1.05 }} className="bg-white shadow-lg p-3 border border-brand-green">
              <img src="https://lh3.googleusercontent.com/gps-cs-s/APNQkAGEip6uarkedeYfMivBKCh5GzpOPEAzcHI6U5W6G2uJ3qdnKw0oiQjTieIUcRvNagSfdhHPQ5zeOBLK20SwwnObaM0sCt9aTfEoiKTTzdKVubqrPLEqT0xFb0zTjHCw0L8pkTNYqxnUvjRX=w1000" className="w-full h-[400px] object-cover" alt="Softeis" />
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} className="bg-white shadow-lg p-3 border border-brand-green">
              <img src="https://lh3.googleusercontent.com/gps-cs-s/APNQkAFMm_Ia-czTgZbHc2D2xNg6opCPwlBJEMvXZegCn0VtNGYY2Gad2nnMatat002BtqVgDV5TL_t43FQdOOwUohOlwClWSP97RnqaP7_VU7IrAHy4cVJLE5Bi_tYzw4G99lYaQyRFXg=w1000" className="w-full h-[400px] object-cover" alt="Waffel" />
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} className="bg-white shadow-lg p-3 border border-brand-green">
              <img src="https://lh3.googleusercontent.com/gps-cs-s/APNQkAGb-lVQiXIqvzaCvc7_I6yiV1JpDfQBjNUEwQwOQX-3EskMvDvEi8-tXHjp0mriCfH5nBegpC0mb9KJMy140ADgfDdthBSXblxMOa1RaxOdz2NlgUgAnWRJsxVB1M9Tyf8YgZ3H=w1000" className="w-full h-[400px] object-cover" alt="Terasse" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 bg-slate-900 text-white">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-20">
            <motion.div {...fadeIn} className="md:w-1/2">
              <h2 className="font-serif text-5xl font-bold mb-10 italic">Besuch uns</h2>
              <div className="space-y-10">
                <div className="flex gap-6">
                  <div className="w-12 h-12 bg-brand-green text-slate-800 flex items-center justify-center shrink-0">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <span className="block font-bold text-xl mb-2 italic">Anfahrt</span>
                    <span className="text-slate-400 text-lg leading-relaxed">Dörpfeldstraße 34, <br />12489 Berlin-Adlershof</span>
                  </div>
                </div>
                <div className="flex gap-6">
                  <div className="w-12 h-12 bg-brand-green text-slate-800 flex items-center justify-center shrink-0">
                    <Clock size={24} />
                  </div>
                  <div>
                    <span className="block font-bold text-xl mb-2 italic">Öffnungszeiten</span>
                    <span className="text-slate-400 text-lg leading-relaxed">Mo - So: 12:00 - 18:00 <br />(Variiert je nach Wetterlage)</span>
                  </div>
                </div>
                <div className="flex gap-6">
                  <div className="w-12 h-12 bg-brand-green text-slate-800 flex items-center justify-center shrink-0">
                    <Phone size={24} />
                  </div>
                  <div>
                    <span className="block font-bold text-xl mb-2 italic">Kontakt</span>
                    <span className="text-slate-400 text-lg leading-relaxed">+49 30 12345678 <br />hallo@softeis-laden.de</span>
                  </div>
                </div>
              </div>
            </motion.div>
            
            <motion.div {...fadeIn} transition={{ delay: 0.2 }} className="md:w-1/2 bg-white p-12 text-slate-800">
              <h3 className="font-serif text-3xl font-bold mb-8 italic">Schreib uns</h3>
              <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                <div className="border-b border-slate-200 py-2">
                  <label className="block text-xs font-bold text-brand-green uppercase tracking-widest mb-1">Name</label>
                  <input type="text" className="w-full bg-transparent focus:outline-none font-medium" placeholder="Deine Nachricht an uns" />
                </div>
                <div className="border-b border-slate-200 py-2">
                  <label className="block text-xs font-bold text-brand-green uppercase tracking-widest mb-1">E-Mail</label>
                  <input type="email" className="w-full bg-transparent focus:outline-none font-medium" placeholder="email@beispiel.de" />
                </div>
                <div className="border-b border-slate-200 py-2">
                  <label className="block text-xs font-bold text-brand-green uppercase tracking-widest mb-1">Nachricht</label>
                  <textarea className="w-full bg-transparent focus:outline-none font-medium h-24" placeholder="Wie können wir dir helfen?"></textarea>
                </div>
                <button className="w-full bg-slate-800 text-white font-bold py-4 hover:bg-brand-green hover:text-slate-800 transition-all uppercase tracking-widest mt-4">
                  Nachricht senden
                </button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
