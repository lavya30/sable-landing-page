<!-- BEGIN:nextjs-agent-rules -->
# Next.js 16 Guidelines

This project uses Next.js 16.2.1 with breaking changes from earlier versions.

## Key Conventions

- **App Router**: Uses `app/` directory with file-based routing
- **Components**: Server components by default; use `"use client"` for interactivity
- **Fonts**: Use `next/font/google` with CSS variables
- **Styling**: Tailwind CSS 4.x with `@import "tailwindcss"`

## Critical Differences from Next.js 13/14

- API routes use standard Request/Response objects
- Font optimization uses CSS variables: `var(--font-name)`
- Image component uses standard props without `layout` prop
- CSS imports are processed differently - check `node_modules/next/dist/docs/` for specifics

## Before Writing Code

1. Check existing patterns in `app/page.tsx` and `app/globals.css`
2. Follow the design system (Warm Luxury Editorial aesthetic)
3. Use Framer Motion for animations with custom easing: `[0.16, 1, 0.3, 1]`
4. Heed deprecation notices in Next.js documentation
<!-- END:nextjs-agent-rules -->

---

@CLAUDE.md
