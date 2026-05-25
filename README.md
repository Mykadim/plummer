# Crystal Drain & Plumbing — Full-Stack Booking Website

Professional booking website for **Crystal Drain & Plumbing** with services, weekly hours, reviews, photo gallery, and secure online appointments.

## Features

- **Overview** — Business hours for all 7 days, contact info, trust badges (SSL, verified, background check)
- **Services** — All 10 plumbing services with images; click to book
- **Reviews** — 4.9★ rating, filter tags, sort options, customer testimonials
- **Photos** — Gallery from client images
- **Booking** — Select service → calendar (month picker) → time slots → contact form
- **API** — REST endpoints for availability and bookings (persisted to `data/db.json`)

## Quick Start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## API Endpoints

| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/services` | List all services |
| GET | `/api/availability?date=YYYY-MM-DD` | Available time slots for a date |
| GET | `/api/availability?year=2026&month=4` | Calendar day statuses for a month |
| POST | `/api/bookings` | Create a new booking |
| GET | `/api/bookings` | List all bookings (admin) |

## Tech Stack

- Next.js 15 (App Router)
- TypeScript
- Tailwind CSS
- JSON file database for bookings

## Production

```bash
npm run build
npm start
```

Deploy to Vercel, Netlify, or any Node.js host with HTTPS enabled for the secured booking experience.
