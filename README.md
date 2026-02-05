# Rick & Morty Squad Maker

A small Next.js app that consumes the public Rick & Morty API and lets users build their own squad of characters.

## Features
- **SSR-first list (App Router):** initial characters are rendered from the server for better SEO.
- **Search by name:** filter characters using the API.
- **Pagination:** navigate through results.
- **Squad management (Zustand):** add/remove characters from a global store.
- **Persistence:** squad survives page reloads (F5) via persisted state.
- **Character details routing:** `/character/[id]` shows detailed info (status, species, origin, etc.).
- **Responsive UI:** Tailwind grid layout for mobile and desktop.

## Tech Stack
- Next.js (App Router)
- React
- TypeScript (strict mode, no `any`)
- Tailwind CSS
- Zustand

## Requirements
- **Node.js:** `v24.11.0` (recommended)
- **npm:** `v11.6.1`

## Getting Started

### 1) Clone the repository
```bash
git clone https://github.com/CastriDani/try_rick_and_morty_squad_maker.git
cd rick-morty-squad-maker
```

### 2) Install dependencies
```bash
npm install
```

### 3) Run the development server
```bash
npm run dev
```

### 4) Open your browser
Navigate to [http://localhost:3000](http://localhost:3000) to see the application.


## Project Structure

```
rick-morty-squad-maker/
├── src/
│   ├── app/
│   │   ├── components/        # React components
│   │   │   ├── character.tsx
│   │   │   ├── characterList.tsx
│   │   │   ├── NavPage.tsx
│   │   │   ├── SearchInput.tsx
│   │   │   └── Squad.tsx
│   │   ├── store/            # Zustand state management
│   │   │   └── favoriteStore.ts
│   │   ├── types/            # TypeScript interfaces
│   │   │   └── character.ts
│   │   ├── character/[id]/   # Dynamic route for character details
│   │   │   └── page.tsx
│   │   ├── App.tsx           # Main app component
│   │   ├── layout.tsx        # Root layout
│   │   ├── page.tsx          # Home page
│   │   └── globals.css       # Global styles
│   └── public/               # Static assets
├── next.config.ts            # Next.js configuration
├── tsconfig.json             # TypeScript configuration
├── tailwind.config.ts        # Tailwind CSS configuration
└── package.json              # Project dependencies



