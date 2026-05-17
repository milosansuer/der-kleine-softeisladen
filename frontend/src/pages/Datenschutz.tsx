import React from 'react';

const Datenschutz: React.FC = () => {
  return (
    <div className="container mx-auto px-6 pt-32 pb-24 max-w-4xl">
      <h1 className="font-serif text-5xl font-bold text-slate-800 mb-12 italic">Datenschutzerklärung</h1>
      
      <div className="bg-white p-10 rounded-3xl shadow-sm border border-slate-100 prose prose-slate max-w-none">
        <h2 className="text-2xl font-bold text-slate-800 mb-4">1. Datenschutz auf einen Blick</h2>
        <h3 className="text-xl font-bold text-slate-700 mb-2">Allgemeine Hinweise</h3>
        <p className="text-slate-600 mb-6">
          Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren personenbezogenen Daten passiert, wenn Sie diese Website besuchen. Personenbezogene Daten sind alle Daten, mit denen Sie persönlich identifiziert werden können.
        </p>

        <h2 className="text-2xl font-bold text-slate-800 mb-4">2. Datenerfassung auf dieser Website</h2>
        <h3 className="text-xl font-bold text-slate-700 mb-2">Kontaktformular</h3>
        <p className="text-slate-600 mb-6">
          Wenn Sie uns per Kontaktformular Anfragen zukommen lassen, werden Ihre Angaben aus dem Anfrageformular inklusive der von Ihnen dort angegebenen Kontaktdaten zwecks Bearbeitung der Anfrage und für den Fall von Anschlussfragen bei uns gespeichert. Diese Daten geben wir nicht ohne Ihre Einwilligung weiter.
        </p>
        <p className="text-slate-600 mb-6">
          Die Verarbeitung dieser Daten erfolgt auf Grundlage von Art. 6 Abs. 1 lit. b DSGVO, sofern Ihre Anfrage mit der Erfüllung eines Vertrags zusammenhängt oder zur Durchführung vorvertraglicher Maßnahmen erforderlich ist. In allen übrigen Fällen beruht die Verarbeitung auf unserem berechtigten Interesse an der effektiven Bearbeitung der an uns gerichteten Anfragen (Art. 6 Abs. 1 lit. f DSGVO) oder auf Ihrer Einwilligung (Art. 6 Abs. 1 lit. a DSGVO) sofern diese abgefragt wurde.
        </p>

        <h2 className="text-2xl font-bold text-slate-800 mb-4">3. Hosting</h2>
        <p className="text-slate-600 mb-6">
          Wir hosten unsere Website bei GitHub Pages und unser Backend bei Render.com. Die Datenbank wird bei Supabase betrieben. Hierbei können Daten an Server in den USA übertragen werden. Wir haben mit den Anbietern entsprechende Verträge zur Auftragsverarbeitung abgeschlossen.
        </p>

        <h2 className="text-2xl font-bold text-slate-800 mb-4">4. Ihre Rechte</h2>
        <p className="text-slate-600 mb-6">
          Sie haben jederzeit das Recht, unentgeltlich Auskunft über Herkunft, Empfänger und Zweck Ihrer gespeicherten personenbezogenen Daten zu erhalten. Sie haben außerdem ein Recht, die Berichtigung oder Löschung dieser Daten zu verlangen.
        </p>
      </div>
    </div>
  );
};

export default Datenschutz;
