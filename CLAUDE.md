# CLAUDE.md

---

## Project Overview

**HealthCollect** (by Viabintech) — a platform connecting patients with diagnostic labs for booking lab tests, home sample collection, and online report delivery. Built as a course project following real Scrum/CI-CD practices.

**Four user roles, one codebase**: Patient, Lab, Collection Agent, Admin.

**Core scope rules (do not violate without being told the BRD changed):**
- **Home Sample Collection only.** There is no "Lab Visit" fulfillment option. Never build or suggest one.
- **One booking = one lab.** If a patient selects multiple tests, only labs able to fulfill the entire selection are bookable together. Never design a flow where one booking splits across multiple labs.
- **Collection Agents are platform-employed, not lab-employed** — a shared fleet model (like Swiggy/Zomato's delivery riders), not hired per-lab.
- **Admin has no public registration.** Admin accounts are provisioned manually in Firestore. Never create a public "sign up as Admin" route.
- **Payments are sandbox/test-mode only**, via Razorpay. Never wire up real payment credentials.
- **Email-based OTP only** — no SMS OTP integration, ever (deliberate free-tier decision).

---

## Tech Stack

- **Framework**: React + Vite + TypeScript
- **Styling**: Tailwind CSS **v4** — tokens live in `src/styles/theme.css` via an `@theme` block. **There is no `tailwind.config.js` in this project** — never create one.
- **Routing**: React Router, with lazy loading and role-based protected routes
- **State**: Zustand (client state), TanStack Query (server state / Firebase data fetching)
- **Forms**: React Hook Form + Zod (validation schemas)
- **Animation**: Framer Motion
- **File upload**: react-dropzone
- **Backend**: Firebase — Authentication (Google Sign-In + custom Email OTP), Firestore (database), Storage (files)
- **Payments**: Razorpay, test mode only
- **Testing**: Vitest + React Testing Library + MSW

---

## File Structure — organized by ROLE, not by type

```
src/
├── styles/theme.css          ← design tokens (source of truth for all colors/fonts/radius)
├── components/ui/            ← ONLY cross-role components: Button, Input, Card, Badge, Modal
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

**Rule**: a component belongs in `components/ui/` only if two or more roles genuinely need it. Everything else stays inside its own role's `features/<role>/components/` folder, even if it looks reusable.

---

## Design Consistency Rules — non-negotiable

1. **Before creating any component, check `src/components/ui/` and the relevant `features/<role>/components/` folder** for something that already does the job. Reuse it. Never create a near-duplicate.
2. **Follow `DESIGN_SYSTEM.md` exactly** for every component pattern (buttons, cards, badges, inputs, modals). If a pattern isn't documented there yet, stop and ask rather than inventing one silently.
3. **Never hardcode a hex color, font name, or arbitrary spacing value.** Only use the named tokens defined in `src/styles/theme.css` (e.g. `bg-primary`, `text-ink-soft`, `rounded-card`).
4. **Typography is fixed**: `font-display` (Fraunces) for all headings, on every screen, every role, no exceptions. `font-sans` (Inter) for body/UI text. `font-mono` (IBM Plex Mono) for IDs, timestamps, prices, and other data-like values.
5. **When you build a new reusable component that isn't already documented**, add its pattern to `DESIGN_SYSTEM.md` in the same session — don't leave it undocumented for a future session to rediscover or reinvent.

---

## Authentication & Roles

- Auth identity (Google Sign-In / Email OTP) is handled by Firebase Auth and only proves *who* someone is.
- A user's **role** (`patient` | `agent` | `lab` | `admin`) is a separate field stored in their Firestore document at `users/{uid}`, set at registration based on which entry point they signed up through.
- After every login, read that role field and route accordingly: `/patient/home`, `/agent/queue`, `/lab/dashboard`, `/admin/dashboard`.
- Enforce role-based access on protected routes client-side; note in comments where Firestore Security Rules would also need to enforce this server-side in a production system.

---

## Git & Workflow

- **Branch naming**: `feature/<jira_story_no>` off `develop` for every story (e.g. `feature/AUTH-1`).
- **Branch pipeline**: `feature/*` (PR preview, ephemeral) → `develop` (persistent UAT environment) → `staging` (persistent, demoed at Sprint Review) → `release` (production, updated once at launch — not every sprint).
- **Commit messages should reference the Jira story ID**, e.g. `AUTH-1: Google Sign-In registration`.
- **Write Vitest + React Testing Library tests for new logic before considering a story complete** — don't defer testing to a later pass.
- Open a PR into `develop` for every story; assume CodeRabbit will review it automatically.

---

## When Building a Screen from a Screenshot

- A screenshot shows *what it should look like* — it does not by itself mean "reuse existing components." Always explicitly reuse `src/components/ui/` and existing `features/<role>/components/` pieces wherever the screenshot shows something already covered.
- Reference the relevant Jira story's acceptance criteria (ask for them if not provided) and build against them explicitly, not just against visual appearance.