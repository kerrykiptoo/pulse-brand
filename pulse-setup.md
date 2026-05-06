## STEP 1: Create the Next.js project

Run this command in the terminal:
npx create-next-app@latest pulse-website --typescript --tailwind --app --src-dir --eslint --no-turbopack

text

When prompted:
- Would you like to use the `src/` directory? → Yes (already specified)
- Would you like to customize the import alias? → No (default @/*)

Then enter the project directory:
cd pulse-website

text

---

## STEP 2: Install dependencies
npm install framer-motion three @types/three @react-three/fiber @react-three/drei

text

Wait for installation to complete. Verify node_modules contains all five packages.

---

## STEP 3: Create folder structure
mkdir -p src/components/ui
mkdir -p src/components/animations
mkdir -p src/components/three
mkdir -p src/components/chat

text

These directories are currently empty. The user will add component files later.

---

## STEP 4: Configure Tailwind with Pulse brand colors

OVERWRITE the file `tailwind.config.ts` with exactly this content:

```typescript
import type { Config } from "tailwindcss"

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: '#0a0a08',
        surface: '#111110',
        'surface-2': '#1a1a18',
        border: '#2a2a28',
        accent: '#c8f55a',
        'accent-2': '#f5a623',
        text: '#f0ede8',
        muted: '#888880',
        success: '#4ade80',
        danger: '#ff6b4a',
        mpesa: '#43b02a',
      },
      fontFamily: {
        heading: ['var(--font-syne)', 'sans-serif'],
        mono: ['var(--font-dm-mono)', 'monospace'],
      },
    },
  },
  plugins: [],
}
export default config
STEP 5: Configure fonts and metadata
OVERWRITE the file src/app/layout.tsx with exactly this content:

tsx
import type { Metadata } from "next"
import { Syne, DM_Mono } from "next/font/google"
import "./globals.css"

const syne = Syne({
  subsets: ["latin"],
  weight: ["700", "800"],
  variable: "--font-syne",
  display: "swap",
})

const dmMono = DM_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-dm-mono",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Pulse — Remember everyone.",
  description: "The infrastructure of being remembered. Every payment becomes a relationship.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${syne.variable} ${dmMono.variable} bg-bg text-text antialiased`}>
        {children}
      </body>
    </html>
  )
}
STEP 6: Configure global CSS
OVERWRITE the file src/app/globals.css with exactly this content:

css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  * {
    scroll-behavior: smooth;
  }

  body {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
}

@layer utilities {
  .font-heading {
    font-family: var(--font-syne), sans-serif;
  }
  .font-mono {
    font-family: var(--font-dm-mono), monospace;
  }
}
STEP 7: Set up the marketing route group
Create the marketing route group directory:

text
mkdir -p src/app/\(marketing\)
MOVE the default page into the marketing route group:

text
mv src/app/page.tsx src/app/\(marketing\)/page.tsx
Then OVERWRITE src/app/(marketing)/page.tsx with a placeholder that confirms setup worked:

tsx
export default function HomePage() {
  return (
    <main className="min-h-screen bg-bg text-text flex items-center justify-center">
      <div className="text-center">
        <h1 className="font-heading text-4xl text-accent mb-4">Pulse</h1>
        <p className="font-mono text-muted">Setup complete. Add components next.</p>
      </div>
    </main>
  )
}
STEP 8: Verify build
text
npm run build
If the build succeeds: report "BUILD SUCCESSFUL — Pulse project scaffolded. Ready for components."

If the build fails: report the exact error and stop. Do not proceed.

STEP 9: Final report
After successful build, report:

All created directories

All modified files

Installed packages and versions

The command to start dev server: npm run dev

Confirmation that the project is waiting for the user to add component files to:

src/components/ui/

src/components/animations/

src/components/three/

src/components/chat/