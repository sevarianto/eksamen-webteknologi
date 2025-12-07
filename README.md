# BookDragons - Nettbutikk for bøker

En moderne nettbutikk for bøker bygget med Next.js, Payload CMS og SQLite. BookDragons lar kunder utforske bøker, filtrere etter sjanger, legge varer i handlekurv og sende inn bestillinger. Ansatte kan administrere innholdet gjennom Payload CMS admin-panel.

## Teknologistack

### Frontend
- **Next.js 15.4.8** - React-rammeverk med App Router
- **React 19.2.1** - UI-bibliotek
- **TypeScript 5.7.3** - Type-sikkerhet
- **Tailwind CSS 3.4.18** - Styling

### Backend
- **Payload CMS 3.67.0** - Headless CMS
- **SQLite** - Database (via @payloadcms/db-sqlite)
- **Sharp 0.34.2** - Bildebehandling

### Utvikling
- **Vitest** - Enhetstester
- **Playwright** - E2E-tester
- **ESLint** - Linting

## Prosjektstruktur

```
eksamen-webteknologi/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── (frontend)/         # Frontend-ruter
│   │   │   ├── boker/          # Bokliste og detaljsider
│   │   │   ├── forfattere/     # Forfatterliste og detaljsider
│   │   │   ├── sjangere/       # Sjangerliste og filtrering
│   │   │   ├── handlekurv/     # Handlekurv-side
│   │   │   ├── bestilling/     # Bestillingsskjema
│   │   │   └── page.tsx       # Forside
│   │   └── (payload)/          # Payload CMS admin
│   │       └── admin/          # Admin-panel
│   ├── collections/            # Payload collections
│   │   ├── Books.ts            # Bøker
│   │   ├── Authors.ts         # Forfattere
│   │   ├── Genres.ts          # Sjangere
│   │   ├── Orders.ts          # Bestillinger
│   │   ├── Users.ts            # Brukere
│   │   └── Media.ts            # Media-opplastinger
│   ├── components/             # Gjenbrukbare React-komponenter
│   │   ├── BookCard.tsx        # Bokkort-komponent
│   │   ├── AuthorCard.tsx      # Forfatterkort-komponent
│   │   ├── AddToCartButton.tsx # Handlekurv-knapp
│   │   ├── Header.tsx          # Header-komponent
│   │   └── Footer.tsx          # Footer-komponent
│   ├── lib/                    # Hjelpefunksjoner
│   │   └── cart.ts             # Handlekurv-logikk
│   ├── globals/                # Payload globals
│   │   └── SiteSettings.ts     # Nettsted-innstillinger
│   ├── payload.config.ts       # Payload-konfigurasjon
│   └── payload-types.ts        # Genererte TypeScript-typer
├── tests/                      # Tester
│   ├── e2e/                    # E2E-tester
│   └── int/                    # Integrasjonstester
└── package.json
```

## Installasjon

### Forutsetninger
- Node.js 18.20.2 eller høyere (eller >=20.9.0)
- pnpm 9 eller høyere

### Steg-for-steg

1. **Klon repositoriet**
   ```bash
   git clone <repository-url>
   cd eksamen-webteknologi
   ```

2. **Installer avhengigheter**
   ```bash
   pnpm install
   ```

3. **Opprett miljøvariabler**
   
   Opprett en `.env`-fil i rotmappen:
   ```env
   # Payload
   PAYLOAD_SECRET=din-hemmelige-nøkkel-her
   
   # Database (SQLite)
   DATABASE_URI=file:./eksamen-webteknologi.db
   
   # Next.js
   NEXT_PUBLIC_SERVER_URL=http://localhost:3000
   ```

   **Viktig:** Bytt ut `PAYLOAD_SECRET` med en tilfeldig streng. Du kan generere en med:
   ```bash
   openssl rand -base64 32
   ```

4. **Start utviklingsserveren**
   ```bash
   pnpm dev
   ```

5. **Åpne nettleseren**
   - Frontend: http://localhost:3000
   - Admin-panel: http://localhost:3000/admin

6. **Opprett første admin-bruker**
   - Gå til http://localhost:3000/admin
   - Følg instruksjonene for å opprette din første admin-bruker

## Bygging for produksjon

1. **Bygg prosjektet**
   ```bash
   pnpm build
   ```

2. **Start produksjonsserveren**
   ```bash
   pnpm start
   ```

## Database

Prosjektet bruker SQLite som database. Database-filen (`eksamen-webteknologi.db`) lagres lokalt i prosjektmappen og er ekskludert fra git via `.gitignore`.

### Database-oppsett
- Database-filen opprettes automatisk ved første kjøring
- Ingen ekstra konfigurasjon nødvendig
- For produksjon, vurder å bruke PostgreSQL eller MongoDB

## Funksjonalitet

### For kunder
- ✅ Se alle bøker
- ✅ Se bokdetaljer (tittel, forfatter, beskrivelse, pris, lagerstatus)
- ✅ Filtrere bøker etter sjanger
- ✅ Se lagerstatus for hver bok
- ✅ Legge bøker i handlekurv
- ✅ Se handlekurv med antall og totalpris
- ✅ Sende inn bestilling med kontaktinformasjon
- ✅ Se bestillingsbekreftelse

### For ansatte (Admin-panel)
- ✅ Legge inn bøker med alle detaljer
- ✅ Administrere forfattere med biografi og foto
- ✅ Administrere sjangere med beskrivelser
- ✅ Sette lagerstatus (antall på lager)
- ✅ Legge til aldersmerking (barn, ungdom, voksen)
- ✅ Last opp bilder (forsidebilder, forfatterfoto)
- ✅ Se oversikt over alle bestillinger
- ✅ Konfigurere nettsted-innstillinger (header, footer, hjemmeside-seksjoner)

## Testing

### Kjøre tester
```bash
# Alle tester
pnpm test

# Kun integrasjonstester
pnpm test:int

# Kun E2E-tester
pnpm test:e2e
```

### E2E-tester
E2E-tester krever at utviklingsserveren kjører:
```bash
# Terminal 1: Start server
pnpm dev

# Terminal 2: Kjør tester
pnpm test:e2e
```

## Utvikling

### Generere TypeScript-typer
Når du endrer Payload collections, generer nye typer:
```bash
pnpm generate:types
```

### Linting
```bash
pnpm lint
```

## Miljøvariabler

| Variabel | Beskrivelse | Påkrevd |
|----------|-------------|---------|
| `PAYLOAD_SECRET` | Hemmelig nøkkel for Payload | Ja |
| `DATABASE_URI` | SQLite database path | Nei (standard: `file:./eksamen-webteknologi.db`) |
| `NEXT_PUBLIC_SERVER_URL` | Base URL for API-kall | Nei (standard: `http://localhost:3000`) |

## Feilsøking

### Database-filer
Hvis du får problemer med database, kan du slette database-filen og la den opprettes på nytt:
```bash
rm eksamen-webteknologi.db
pnpm dev
```

### Port allerede i bruk
Hvis port 3000 allerede er i bruk, endre porten i `package.json` eller miljøvariabler.

### TypeScript-feil
Hvis du får TypeScript-feil etter å ha endret collections:
```bash
pnpm generate:types
```

## Lisens

MIT

## Kontakt

For spørsmål eller problemer, opprett en issue i repositoriet.
