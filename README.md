# Der kleine Softeis-Laden

Eine moderne Website für einen Berliner Softeis-Laden mit integriertem Admin-Bereich zur Verwaltung des Menüs.

## Features
- **Modernes Design:** Einzigartiges, verspieltes Design, angepasst an das Thema Softeis.
- **Öffentliches Menü:** Dynamische Anzeige von Eissorten, Waffeln und Toppings.
- **Admin-Dashboard:** Geschützter Bereich zur Verwaltung von Produkten und Preisen.
- **Nutzer-Management:** Admins können weitere Admins einladen.
- **Responsive:** Optimiert für Mobile und Desktop.

## Tech Stack
- **Frontend:** React, TypeScript, Vite, Tailwind CSS, Lucide Icons.
- **Backend:** Node.js, Express, TypeScript, SQLite.
- **Authentifizierung:** JWT & bcrypt.

## Installation & Start

### 1. Backend starten
```bash
cd backend
npm install
npm run dev
```
Der Server läuft standardmäßig auf [http://localhost:3001](http://localhost:3001).
Standard-Login: `admin` / `admin123`

### 2. Frontend starten
```bash
cd frontend
npm install
npm run dev
```
Das Frontend läuft standardmäßig auf [http://localhost:5173](http://localhost:5173).

## Bereitstellung auf GitHub
1. Erstelle ein neues Repository auf GitHub.
2. Initialisiere Git im Hauptverzeichnis: `git init`.
3. Füge Dateien hinzu: `git add .`.
4. Commit: `git commit -m "Initial commit"`.
5. Push zu GitHub.
6. Für das Hosting des Frontends kannst du **GitHub Pages** oder **Vercel** nutzen.
7. Für das Backend benötigst du einen Node.js Hoster (z.B. **Render**, **Railway** oder einen eigenen Server).
