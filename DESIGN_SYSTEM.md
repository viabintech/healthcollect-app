# Design System Reference
### HealthCollect / Viabintech — use this file (and src/styles/theme.css) in EVERY Claude Code session that generates a screen.

**Rule: never use arbitrary hex codes or inline styles for color, font, or spacing. Always use the theme tokens below via Tailwind classes.**

**Source of truth note:** This project uses **Tailwind CSS v4**, which configures design tokens directly in CSS (not `tailwind.config.js`). The actual token definitions live in `src/styles/theme.css` using an `@theme` block. If this file and `theme.css` ever disagree, **`theme.css` wins** — it's the file Tailwind actually compiles against. This file exists so a human (or Claude, when reasoning about *why* something looks a certain way) can understand the system without reading raw CSS.

---

## Components at a Glance

| Component | Purpose |
|---|---|
| **Button** | Primary and secondary (outline) actions, used on every screen |
| **Input** | Text entry fields — email, address, search, etc. — with label and focus state |
| **Card** | The one base container style for any bordered content block |
| **Badge** | Two modes: **Chip** (active/inactive selections, e.g. filters) and **Status** (pending/completed/cancelled booking states) |
| **Modal** | Base dialog wrapper for popups — confirmations, selected-item lists, comparisons |

---

## Colors (use these Tailwind classes only)

| Purpose | Class | Hex (defined in theme.css) |
|---|---|---|
| Primary actions, active nav, links | `bg-primary` / `text-primary` | #0D6E5F |
| Primary hover/pressed | `bg-primary-dark` | #08453B |
| Light selected/chip background | `bg-primary-tint` | #E4F2EE |
| Pending / in-progress status | `bg-amber` / `text-amber` | #DA9A3D |
| Pending tint background | `bg-amber-tint` | #FBEFDC |
| Completed / success status | `bg-success` / `text-success` | #2F8F68 |
| Success tint background | `bg-success-tint` | #E4F5EC |
| Error / cancelled status | `bg-danger` / `text-danger` | #C0402F |
| Error tint background | `bg-danger-tint` | #FBEAE7 |
| Primary text | `text-ink` | #12211D |
| Secondary/muted text | `text-ink-soft` | #4B615A |
| Borders/dividers | `border-border` | #DCE7E2 |
| Page background | `bg-paper` | #F6FAF8 |

## Typography

- **Headings (h1, h2, h3, section titles)** — always `font-display` (Fraunces). This applies on every screen, every role — Patient, Agent, Lab, Admin. No exceptions.
- **Body text, labels, buttons, nav** — `font-sans` (Inter)
- **IDs, timestamps, prices, booking numbers, anything tabular/data-like** — `font-mono` (IBM Plex Mono)

## Component Patterns

### Buttons
- Primary: `bg-primary text-white rounded-lg px-5 py-3 font-semibold` (hover: `bg-primary-dark`)
- Outline: `bg-white border border-border text-ink rounded-lg px-5 py-3 font-semibold`
- Always `rounded-lg`, never mix radius sizes across buttons on the same screen.

### Cards
- `bg-white border border-border rounded-card p-4` — this is the ONE card style used everywhere (test cards, booking cards, job cards, report rows). Don't invent a new card style per screen.

### Chips / Badges — two modes

**Chip mode** (active/inactive — filters, selections):
- Active/selected chip: `bg-primary text-white rounded-pill px-4 py-2 text-sm font-semibold`
- Inactive chip: `bg-primary-tint text-primary rounded-pill px-4 py-2 text-sm font-semibold`

**Status mode** (pending/completed/cancelled — booking states):
- Pending: `bg-amber-tint text-amber rounded-pill px-3 py-1 text-xs font-bold`
- Completed: `bg-success-tint text-success rounded-pill px-3 py-1 text-xs font-bold`
- Cancelled: `bg-danger-tint text-danger rounded-pill px-3 py-1 text-xs font-bold`

### Inputs
- Label: `text-xs font-semibold text-ink-soft mb-1 block`
- Field: `border border-border rounded-lg px-4 py-3 text-ink placeholder:text-ink-soft`, focus state adds `ring-2 ring-primary-tint border-primary`
- **Props**: `label: string`, `value: string`, `onChange: (value: string) => void`, `placeholder?: string`

### Modal
- Backdrop: `fixed inset-0 bg-ink/50 flex items-center justify-center z-50`
- Dialog box: `bg-white rounded-card shadow-xl p-6 max-w-md w-full`
- Close button: `absolute top-4 right-4 text-ink-soft hover:text-ink text-lg`
- Content goes directly inside the dialog box — no extra wrapper needed beyond the box's own padding.
- **Props**: `isOpen: boolean`, `onClose: () => void`, `children: React.ReactNode`

### Spacing
- Page padding: `px-10 py-8` on desktop, `px-4 py-4` on mobile
- Gap between cards in a list: `gap-3`
- Gap between form fields: `gap-4`

---

## Project File Structure

Components are organized by **role**, not by type — this mirrors how the course is built (Patient sprints only touch `features/patient/`, Agent sprints only touch `features/agent/`, etc.).

```
src/
├── styles/theme.css          ← design tokens (source of truth, see note above)
├── components/ui/            ← ONLY the 5 foundational, cross-role components
│   ├── Button.tsx
│   ├── Input.tsx
│   ├── Card.tsx
│   ├── Badge.tsx
│   └── Modal.tsx
├── features/
│   ├── patient/{pages,components}
│   ├── agent/{pages,components}
│   ├── lab/{pages,components}
│   └── admin/{pages,components}
├── routes/                   ← AppRouter.tsx, ProtectedRoute.tsx
├── store/                    ← Zustand stores
├── lib/                      ← firebase.ts, queryClient.ts
├── hooks/
└── types/
```

**Rule:** a component only belongs in `components/ui/` if two or more roles genuinely need it. Everything else — even if it looks reusable — stays inside its own role's `features/<role>/components/` folder.