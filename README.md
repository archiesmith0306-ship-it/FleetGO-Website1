# FleetGO - Fleet Management Services Website

A modern, minimalistic business website for FleetGO, a professional fleet management outsourcing company providing comprehensive maintenance, administrative reporting, and operational support services.

## Features

- **Modern Design**: Inspired by numeo.ai with deep blues, gradient headlines, and clean spacing
- **3D Elements**: Realistic 3D semi sleeper truck logo with isometric view
- **Dark/Light Mode**: Full theme switching functionality across all components
- **Responsive Layout**: Mobile-first design with smooth animations
- **Interactive Components**:
  - Hero section with gradient text effects
  - Before/After comparison slider
  - Services grid with glassmorphism effects
  - Trusted partners showcase
  - Pricing tiers (1-9 trucks, 10-25 trucks, 26-50 trucks, 50+ trucks)
  - Contact form with Google Maps integration
  - Responsive navigation

## Company Information

- **Phone**: 331-336-5707
- **Email**: info@myfleetgo.com
- **Address**: 1811 W Diehl Road Suite 200, Naperville, IL 60563
- **Founded**: 2026 — founder-led, built on 4+ years of hands-on industry experience

### Trusted Vendors
- Penske
- Ryder
- MHC Kenworth
- Samsara

### Valued Clients
- Dadakhon Trans Corp
- Primeweek

## Lead Notifications (Telegram)

Consultation form submissions POST to the serverless function at `api/lead.ts`,
which forwards each lead to a Telegram bot so you're notified instantly.

Set these environment variables in **Vercel → Settings → Environment Variables**
(never commit them to the repo):

- `TELEGRAM_BOT_TOKEN` — from [@BotFather](https://t.me/BotFather) after `/newbot`
- `TELEGRAM_CHAT_ID` — your personal or group chat id

To find your chat id: message your new bot once, then open
`https://api.telegram.org/bot<YOUR_TOKEN>/getUpdates` and copy `result[].message.chat.id`.

If the endpoint is unreachable, the form falls back to opening the visitor's
email client addressed to info@myfleetgo.com.

## Tech Stack

- **Framework**: React 18 with TypeScript
- **Styling**: Tailwind CSS 4
- **UI Components**: Radix UI primitives
- **Icons**: Lucide React
- **Animations**: Motion (Framer Motion)
- **Routing**: React Router
- **Build Tool**: Vite
- **Theme**: next-themes for dark/light mode

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- pnpm package manager

### Installation

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Build for production
pnpm build
```

## Project Structure

```
FleetGO-Website/
├── src/
│   ├── app/
│   │   ├── App.tsx           # Main application component
│   │   └── components/       # UI components
│   └── styles/               # CSS and theme files
├── guidelines/               # Design guidelines
└── package.json
```

## Design System

The website follows a modern SaaS aesthetic with:
- Deep blue color palette
- Gradient text effects
- Glassmorphism UI elements
- Card-based layouts
- Smooth transitions and animations

## License

Copyright © 2026 FleetGO. All rights reserved.
