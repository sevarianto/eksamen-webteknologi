# BookDragons - Nettbutikk for bøker

En nettbutikk for bøker bygget med Next.js og Payload CMS. BookDragons lar kunder utforske bøker, filtrere etter sjanger, legge varer i handlekurv og sende inn bestillinger. Ansatte kan administrere alt innholdet gjennom Payload CMS admin-panel.

Dette er en skoleoppgave i webteknologi.

## Teknologistack

### Frontend
- **Next.js 15.4.8** - React-rammeverk med App Router for routing og server-side rendering
- **React 19.2.1** - UI-bibliotek for komponenter
- **TypeScript 5.7.3** - Type-sikkerhet og bedre utvikleropplevelse
- **Tailwind CSS 3.4.18** - Utility-first CSS for styling

### Backend
- **Payload CMS 3.67.0** - Headless CMS som håndterer både backend API og admin-panel
- **SQLite** - Database via `@payloadcms/db-sqlite` (enkel filbasert database, perfekt for utvikling)
- **Sharp 0.34.2** - Bildebehandling for opplastede bilder

### Utvikling
- **Vitest** - Enhetstester
- **Playwright** - E2E-tester
- **ESLint** - Linting for kodekvalitet

## Prosjektstruktur

Prosjektet er organisert med Next.js App Router og Payload CMS:

```
eksamen-webteknologi/
├── src/
│   ├── app/                       # Next.js App Router
│   │   ├── (frontend)/            # Frontend-ruter (gruppe for layout)
│   │   │   ├── boker/             # Bokliste og detaljsider
│   │   │   │   ├── page.tsx       # Liste over alle bøker
│   │   │   │   └── [slug]/        # Dynamisk rute for bokdetaljer
│   │   │   ├── forfattere/        # Forfatterliste og detaljsider
│   │   │   ├── sjangere/          # Sjangerliste og filtrering
│   │   │   ├── handlekurv/        # Handlekurv-side (client component)
│   │   │   ├── bestilling/        # Bestillingsskjema
│   │   │   ├── preview/           # Forhåndsvisning av hjemmeside
│   │   │   └── page.tsx           # Forside med dynamiske seksjoner
│   │   └── (payload)/             # Payload CMS admin (gruppe for layout)
│   │       └── admin/             # Admin-panel ruter
│   ├── collections/               # Payload collections (database-modeller)
│   │   ├── Books.ts               # Bøker med felter som tittel, pris, lager
│   │   ├── Authors.ts             # Forfattere med biografi og foto
│   │   ├── Genres.ts              # Sjangere med beskrivelser
│   │   ├── Orders.ts              # Bestillinger fra kunder
│   │   ├── Users.ts               # Admin-brukere
│   │   └── Media.ts               # Media-opplastinger (bilder)
│   ├── components/                # Gjenbrukbare React-komponenter
│   │   ├── BookCard.tsx           # Viser en bok i liste/grid
│   │   ├── AuthorCard.tsx         # Viser en forfatter
│   │   ├── AddToCartButton.tsx    # Client component for handlekurv
│   │   ├── Header.tsx             # Header med navigasjon
│   │   └── Footer.tsx             # Footer med kontaktinfo
│   ├── lib/                       # Hjelpefunksjoner
│   │   └── cart.ts                # Handlekurv-logikk (localStorage)
│   ├── globals/                   # Payload globals (singleton data)
│   │   └── SiteSettings.ts        # Nettsted-innstillinger (header, footer, hjemmeside)
│   ├── payload.config.ts          # Payload CMS konfigurasjon
│   └── payload-types.ts           # Genererte TypeScript-typer (auto-generert)
├── tests/                         # Tester
│   ├── e2e/                       # E2E-tester med Playwright
│   └── int/                       # Integrasjonstester med Vitest
└── package.json
```

### Frontend vs Backend

- **Frontend**: Next.js App Router i `src/app/(frontend)/` - server components som fetcher data og renderer HTML
- **Backend**: Payload CMS håndterer API-endepunkter automatisk (`/api/books`, `/api/authors`, etc.) og admin-panel (`/admin`)
- **Database**: SQLite-fil lagres lokalt, opprettes automatisk ved første kjøring

## Installasjon og oppsett

### Forutsetninger
- **Node.js** 18.20.2 eller høyere (eller >=20.9.0)
- **npm** (kommer med Node.js)

### Steg-for-steg installasjon

1. **Klon repositoriet**
   ```bash
   git clone <https://github.com/sevarianto/eksamen-webteknologi.git>
   cd eksamen-webteknologi
   ```

2. **Installer avhengigheter**
   ```bash
   npm install
   ```
   Dette installerer alle dependencies definert i `package.json` (Next.js, Payload CMS, React, Tailwind, etc.)

3. **Opprett miljøvariabler**
   
   Opprett en `.env`-fil i rotmappen med følgende innhold:
   ```env
   # Payload CMS secret key (brukes for kryptering)
   PAYLOAD_SECRET=din-hemmelige-nøkkel-her
   
   # SQLite database path (standard hvis ikke satt)
   DATABASE_URI=file:./eksamen-webteknologi.db
   
   # Base URL for API-kall (standard hvis ikke satt)
   NEXT_PUBLIC_SERVER_URL=http://localhost:3000
   ```
   
   **Viktig:** Bytt ut `PAYLOAD_SECRET` med en tilfeldig streng. Du kan generere en med:
   ```bash
   # Windows PowerShell
   [Convert]::ToBase64String([System.Security.Cryptography.RandomNumberGenerator]::GetBytes(32))
   
   # Linux/Mac
   openssl rand -base64 32
   ```

4. **Start utviklingsserveren**
   ```bash
   npm run dev
   ```
   Serveren starter på http://localhost:3000

5. **Åpne nettleseren**
   - **Frontend**: http://localhost:3000
   - **Admin-panel**: http://localhost:3000/admin

6. **Logg inn i admin-panel**
   
   Ved første oppstart må du opprette en admin-bruker. Du kan også bruke denne forhåndsdefinerte brukeren:
   - **E-post**: `admin@bookdragons.no`
   - **Passord**: `Admin123`
   
   Hvis du oppretter en ny bruker, husk at den må ha admin-rettigheter.

7. **Legg inn eksempeldata (valgfritt)**
   ```bash
   npm run seed
   ```
   Dette legger inn eksempeldata (bøker, forfattere, sjangere) i databasen. Alle data kan redigeres og slettes i admin-panelet etterpå.

## Kjøre og bygge prosjektet

### Utvikling
```bash
npm run dev
```
Starter Next.js utviklingsserver med hot-reload. Endringer i koden reflekteres automatisk i nettleseren.

### Produksjonsbygge
```bash
npm run build
```
Bygger prosjektet for produksjon. Genererer optimalisert JavaScript og HTML i `.next/`-mappen.

### Starte produksjonsserver
```bash
npm run start
```
Starter produksjonsserveren (krever at `npm run build` er kjørt først).

### Andre nyttige kommandoer
```bash
# Generer TypeScript-typer etter å ha endret Payload collections
npm run generate:types

# Kjør linting
npm run lint

# Kjør tester
npm test
```

## Database

Prosjektet bruker **SQLite** som database, som er en filbasert database. Dette betyr at all data lagres i én fil (`eksamen-webteknologi.db`) lokalt i prosjektmappen.

### Database-oppsett
- Database-filen opprettes automatisk ved første kjøring av serveren
- Ingen ekstra konfigurasjon eller installasjon nødvendig
- Database-filen er ekskludert fra git via `.gitignore`
- For produksjon, vurder å bytte til PostgreSQL eller MongoDB (Payload støtter begge)

### Se data i databasen
Du kan se innholdet i SQLite-databasen ved å bruke et verktøy som [DB Browser for SQLite](https://sqlitebrowser.org/) eller lignende. Database-filen ligger i rotmappen av prosjektet.

## Miljøvariabler og konfigurasjon

| Variabel | Beskrivelse | Påkrevd | Standard |
|----------|-------------|---------|----------|
| `PAYLOAD_SECRET` | Hemmelig nøkkel for Payload CMS (brukes for kryptering av sessions) | Ja | - |
| `DATABASE_URI` | SQLite database path | Nei | `file:./eksamen-webteknologi.db` |
| `NEXT_PUBLIC_SERVER_URL` | Base URL for API-kall fra frontend | Nei | `http://localhost:3000` |

### Hvor konfigureres dette?
- Miljøvariabler leses fra `.env`-filen i rotmappen
- Payload CMS konfigureres i `src/payload.config.ts`
- Next.js konfigureres i `next.config.mjs`
- Tailwind CSS konfigureres i `tailwind.config.ts`

## Funksjonalitet

### For kunder (frontend)
- Se alle bøker på `/boker`
- Se bokdetaljer med beskrivelse, pris og lagerstatus
- Filtrere bøker etter sjanger
- Se forfattere og deres bøker
- Legge bøker i handlekurv (lagres i localStorage)
- Se handlekurv med antall og totalpris
- Sende inn bestilling med kontaktinformasjon
- Se bestillingsbekreftelse med ordrenummer

### For ansatte (admin-panel på `/admin`)
- Legge inn bøker med alle detaljer (tittel, beskrivelse, pris, lagerstatus, aldersmerking)
- Administrere forfattere med biografi og foto
- Administrere sjangere med beskrivelser
- Se oversikt over alle bestillinger
- Last opp bilder (forsidebilder, forfatterfoto)
- Konfigurere nettsted-innstillinger:
  - Header og footer (farger, tekst)
  - Hjemmeside-seksjoner (hero banner, fremhevede bøker, kategorier, tekstseksjoner)
  - Styling for alle elementer (farger, fontstørrelser, padding, etc.)

## Testing

### Kjøre tester
```bash
# Alle tester (integrasjon + E2E)
npm test

# Kun integrasjonstester
npm run test:int

# Kun E2E-tester
npm run test:e2e
```

### E2E-tester
E2E-tester krever at utviklingsserveren kjører:
```bash
# Terminal 1: Start server
npm run dev

# Terminal 2: Kjør tester
npm run test:e2e
```

## Utvikling

### Generere TypeScript-typer
Når du endrer Payload collections eller globals, må du regenerere TypeScript-typene:
```bash
npm run generate:types
```
Dette oppdaterer `src/payload-types.ts` med nye typer basert på din Payload-konfigurasjon.

### Linting
```bash
npm run lint
```
Sjekker koden for feil og stilproblemer.

## Feilsøking

### Database-filer
Hvis du får problemer med database, kan du slette database-filen og la den opprettes på nytt:
```bash
# Windows
del eksamen-webteknologi.db

# Linux/Mac
rm eksamen-webteknologi.db
```
Deretter start serveren på nytt - en ny tom database opprettes automatisk.

### Port allerede i bruk
Hvis port 3000 allerede er i bruk, kan du endre porten ved å legge til i `.env`:
```env
PORT=3001
```

### TypeScript-feil
Hvis du får TypeScript-feil etter å ha endret collections eller globals:
```bash
npm run generate:types
```

### Bildeopplastinger fungerer ikke
Sjekk at `sharp` er installert korrekt:
```bash
npm install sharp
```

## Tekniske detaljer

### Hvordan fungerer det?
1. **Next.js App Router** håndterer routing og server-side rendering
2. **Payload CMS** eksponerer automatisk REST API-endepunkter (`/api/books`, `/api/authors`, etc.)
3. **Server components** i Next.js fetcher data direkte fra Payload API
4. **Client components** brukes for interaktivitet (handlekurv, forms)
5. **SQLite** lagrer all data lokalt i en fil

### Hvor lagres data?
- **Database**: SQLite-fil (`eksamen-webteknologi.db`) i rotmappen
- **Media**: Opplastede bilder lagres i `media/`-mappen (opprettes automatisk)
- **Handlekurv**: Lagres i nettleserens localStorage (kun frontend)

### Hvordan endre styling?
Styling håndteres på to måter:
1. **Admin-panel**: Gå til Site Settings i admin-panelet for å endre farger, fontstørrelser, etc.
2. **Kode**: Endre Tailwind CSS-klasser i komponentene eller legg til custom CSS

## Videre utvikling

Dette prosjektet er bygget som en skoleoppgave, men kan utvides med:
- Autentisering for kunder (innlogging/registrering)
- Betalingsintegrasjon (Stripe, Vipps, etc.)
- E-postbekreftelser for bestillinger
- Søkefunksjonalitet
- Anbefalingssystem
- Produksjonsdatabase (PostgreSQL/MongoDB)
- Docker-containerisering
- CI/CD pipeline

## Notater

- Dette er en skoleoppgave, ikke et produksjonsklart system
- SQLite er valgt for enkelhet i utvikling, men bør byttes ut i produksjon
- Alle bilder lagres lokalt - vurder cloud storage (AWS S3, Cloudinary) for produksjon
- Handlekurv bruker localStorage, så den forsvinner hvis nettleserdata slettes
