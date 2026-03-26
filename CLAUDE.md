# Sable Landing Page

A premium, editorial-style landing page for Sable — a local-first writing application.

## Project Overview

- **Framework**: Next.js 16.2.1 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4.x
- **Animations**: Framer Motion
- **Icons**: Lucide React

## Architecture

```
app/
├── page.tsx              # Main landing page component
├── layout.tsx            # Root layout with fonts (Cormorant Garamond, Space Grotesk, JetBrains Mono)
├── globals.css           # Design system, component styles, animations
├── components/
│   └── DownloadCounter.tsx  # Animated download count component
├── api/
│   └── downloads/
│       └── route.ts      # API endpoint for download tracking
public/
├── ss1.png - ss4.png     # App screenshot assets
└── favicon.ico, etc.     # Static assets
data/
└── downloads.json        # Local storage for download count
```

## Design System

### Aesthetic: "Warm Luxury Editorial"
- Dark, atmospheric backgrounds with warm amber accents
- Elegant serif typography (Cormorant Garamond) paired with geometric sans-serif (Space Grotesk)
- Multi-layered ambient glows and mesh gradients for depth
- Refined micro-interactions and smooth easing curves

### Color Palette
- **Surface**: Deep ink tones (`--ink-950` to `--ink-50`)
- **Accent**: Warm amber/gold (`--amber-300` to `--amber-600`)
- **Text**: Primary (off-white), secondary (warm gray), tertiary (muted)

### Key CSS Variables
- `--font-display`: Cormorant Garamond (headlines)
- `--font-body`: Space Grotesk (body text)
- `--font-mono`: JetBrains Mono (labels, code)
- `--ease-out-expo`: `cubic-bezier(0.16, 1, 0.3, 1)` (primary easing)

## Development

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build
```

## Key Components

### Hero Section
- Animated ambient glows
- Typography-focused headline with italic accent treatment
- Preview card showing app interface mockup
- Trust badges (100% Offline, Zero Tracking, Open Source)

### Showcase Section
- 3D perspective coverflow carousel
- Auto-rotating screenshots
- Interactive tab navigation

### Features Section
- 6 feature cards with hover spotlight effect
- Editorial quote block

### CTA Section
- Primary download action
- GitHub source link
- Live download counter

## Download Counter

Stores download count in `data/downloads.json`. Incremented via POST to `/api/downloads`.

---

@AGENTS.md
