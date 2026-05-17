import React from 'react';

const Impressum: React.FC = () => {
  return (
    <div className="container mx-auto px-6 pt-32 pb-24 max-w-4xl">
      <h1 className="font-serif text-5xl font-bold text-slate-800 mb-12 italic">Impressum</h1>
      
      <div className="bg-white p-10 rounded-3xl shadow-sm border border-slate-100 prose prose-slate max-w-none">
        <h2 className="text-2xl font-bold text-slate-800 mb-4">Angaben gemäß § 5 TMG</h2>
        <p className="text-slate-600 mb-8">
          Der kleine Softeis-Laden<br />
          Dörpfeldstraße 34<br />
          12489 Berlin
        </p>

        <h2 className="text-2xl font-bold text-slate-800 mb-4">Kontakt</h2>
        <p className="text-slate-600 mb-8">
          Telefon: +49 30 12345678<br />
          E-Mail: hallo@softeis-laden.de
        </p>

        <h2 className="text-2xl font-bold text-slate-800 mb-4">Redaktionell verantwortlich</h2>
        <p className="text-slate-600 mb-8">
          Milo Sansuer<br />
          Dörpfeldstraße 34<br />
          12489 Berlin
        </p>

        <h2 className="text-2xl font-bold text-slate-800 mb-4">EU-Streitschlichtung</h2>
        <p className="text-slate-600 mb-8">
          Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit: 
          <a href="https://ec.europa.eu/consumers/odr/" target="_blank" rel="noopener noreferrer" className="text-brand-green hover:underline ml-1">https://ec.europa.eu/consumers/odr/</a>.
          Unsere E-Mail-Adresse finden Sie oben im Impressum.
        </p>

        <h2 className="text-2xl font-bold text-slate-800 mb-4">Verbraucherstreitbeilegung/Universalschlichtungsstelle</h2>
        <p className="text-slate-600">
          Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.
        </p>
      </div>
    </div>
  );
};

export default Impressum;
