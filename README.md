# HealthCollect

**Online Lab Test Booking & Home Sample Collection Platform** — built by [Viabintech](https://github.com/viabintech) as a real-world React development course: BRD → Agile/Scrum → CI/CD → production, built with the help of AI-assisted development.

HealthCollect connects patients with diagnostic labs for booking lab tests and packages, arranging home sample collection, and receiving reports online — without labs needing to hire their own collection staff. A shared, platform-managed fleet of Collection Agents (similar in structure to on-demand delivery platforms) picks up samples and delivers them to the assigned lab.

## Who this is for

Four roles share one codebase:

| Role | What they do |
|---|---|
| **Patient** | Browses tests/packages, selects one or more tests, books a home sample collection, pays online, tracks status, and downloads reports |
| **Collection Agent** | Accepts nearby pickup requests, collects samples, and delivers them to the assigned lab |
| **Lab** | Manages its test catalog and pricing, confirms sample intake, and uploads completed reports |
| **Admin** | Approves Lab and Agent onboarding, standardizes the test catalog, and oversees platform-wide activity |

**Scope note**: Phase 1 supports **Home Sample Collection only** — there is no in-lab visit booking option.

## Tech Stack

- **Frontend**: React + Vite + TypeScript
- **Styling**: Tailwind CSS v4 (CSS-first config — see `src/styles/theme.css`)
- **Routing**: React Router, with lazy loading and role-based protected routes
- **State**: Zustand (client state) + TanStack Query (server state)
- **Forms**: React Hook Form + Zod
- **Animation**: Framer Motion
- **Backend**: Firebase (Authentication, Firestore, Storage)
- **Payments**: Razorpay (sandbox/test mode)
- **Testing**: Vitest + React Testing Library + MSW
- **CI/CD**: GitHub Actions + Vercel

## Project Structure

Organized by **role**, not by type:

```
src/
├── styles/theme.css       ← design tokens (source of truth)
├── components/ui/         ← cross-role components only: Button, Input, Card, Badge, Modal
├── features/
│   ├── patient/{pages,components}
│   ├── agent/{pages,components}
│   ├── lab/{pages,components}
│   └── admin/{pages,components}
├── routes/                ← AppRouter.tsx, ProtectedRoute.tsx
├── store/                 ← Zustand stores
├── lib/                   ← firebase.ts, queryClient.ts
├── hooks/
└── types/
```

See [`DESIGN_SYSTEM.md`](./DESIGN_SYSTEM.md) for component patterns and design tokens, and [`CLAUDE.md`](./CLAUDE.md) for the full set of project conventions used when developing with Claude Code.

## Getting Started

```bash
npm install
npm run dev
```

### Running Tests

```bash
npm run test
```

## Development Notes

This project uses Vite's React plugin with the **React Compiler** enabled — components are written without manual `useMemo`/`useCallback`/`React.memo`, and the compiler handles memoization automatically at build time. Note this does affect dev/build performance slightly.