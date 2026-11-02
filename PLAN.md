BookStation — Frontend Build Plan

NOTE

This plan is for the frontend only. The backend API already exists and will be called via NEXT_PUBLIC_API_URL.

1. Existing Project State

The Next.js 16.4 project at D:\b14\m8_backend_Starts\a8\front already has:

Next.js 16.4, React 19, TypeScript, Tailwind v4
shadcn/ui (base-nova style — Base UI primitives, NOT Radix)
next-themes for dark/light toggle
Pre-installed shadcn components: button, card, dialog, field, input, label, separator
Prettier (no semicolons, double quotes) and ESLint configured
Path alias @/* → repo root
Existing .env with MONGOURL, BETTER_AUTH_SECRET, BASE_URL, BETTER_AUTH_URL

The home page is a stub — everything will be built from scratch.

2. UI Library Choice

shadcn/ui (already installed). No need for HeroUI.

3. Design Direction
Aspect	Choice
Primary color	Indigo-600 (#4F46E5) — trustworthy, clean library feel
Accent	Amber-500 (#F59E0B) — warm highlights for CTAs and badges
Neutral	Slate tones (already in shadcn neutral)
Fonts	Geist Sans (already set up) for body; Geist Mono for code/dates
Headings	Bold, Indigo-700 in light / Indigo-300 in dark, consistent sizing per level
Button style	Rounded-lg, indigo bg, white text, hover darken — one style everywhere
Cards	White bg (dark: slate-900), subtle border, rounded-xl, shadow-sm, fixed height with image aspect-ratio
Dark mode	Slate-950 bg, inverted text, muted borders — via next-themes (already configured)
Animations	Framer Motion fade-in/slide-up on sections (Phase 6 bonus)
4. Folder Structure
front/
├── app/
│   ├── globals.css
│   ├── layout.tsx              # Root layout (Navbar + Footer + Toaster)
│   ├── page.tsx                # Home page
│   ├── login/
│   │   └── page.tsx            # Login page
│   ├── register/
│   │   └── page.tsx            # Register page
│   ├── books/
│   │   ├── page.tsx            # All Books (grid)
│   │   └── [id]/
│   │       └── page.tsx        # Book Details + Borrow
│   ├── add-book/
│   │   └── page.tsx            # Add Book form (private)
│   ├── my-books/
│   │   └── page.tsx            # Books added by user (private)
│   ├── my-borrows/
│   │   └── page.tsx            # User's borrows (private)
│   ├── profile/
│   │   └── page.tsx            # My Profile (private)
│   └── api/
│       └── auth/
│           └── [...all]/
│               └── route.ts    # BetterAuth catch-all route handler
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx          # Navigation bar
│   │   └── Footer.tsx          # Footer
│   ├── home/
│   │   ├── HeroSlider.tsx      # Swiper hero slider
│   │   ├── NewArrivals.tsx     # Latest 6 books section
│   │   ├── HowItWorks.tsx      # Static "How Borrowing Works"
│   │   └── TopCategories.tsx   # Static "Top Categories"
│   ├── books/
│   │   ├── BookCard.tsx        # Reusable book card
│   │   ├── BookGrid.tsx        # Grid wrapper with loading/empty states
│   │   └── BorrowSection.tsx   # Day picker + Borrow button
│   ├── borrows/
│   │   └── BorrowCard.tsx      # Borrow item with status & return button
│   ├── auth/
│   │   ├── LoginForm.tsx       # Login form
│   │   ├── RegisterForm.tsx    # Register form
│   │   ├── GoogleButton.tsx    # "Continue with Google" button
│   │   └── AuthGuard.tsx       # Client wrapper for private pages
│   ├── shared/
│   │   ├── SectionHeading.tsx  # Consistent heading component
│   │   ├── Spinner.tsx         # Loading spinner
│   │   └── BookCardSkeleton.tsx # Skeleton loader for book cards
│   ├── theme-provider.tsx      # Already exists
│   └── ui/                     # shadcn components (existing + new)
├── lib/
│   ├── utils.ts                # cn re-export (already exists)
│   ├── api.ts                  # ALL backend API calls in one file
│   ├── auth.ts                 # BetterAuth server config
│   └── auth-client.ts          # BetterAuth client instance
├── hooks/
│   └── useSession.ts           # Hook to access auth session
├── proxy.ts                    # Route protection (Next.js 16 proxy, replaces middleware)
├── .env                        # Already exists (will add missing vars)
├── .env.example                # Template with all variable names
└── ...config files (existing)
5. Page Routes
Route	Page	Access	Description
/	Home	Public	Hero slider, New Arrivals, How It Works, Top Categories
/books	All Books	Public	Grid of all books
/books/[id]	Book Details	Public (borrow is protected)	Full info + borrow controls
/add-book	Add Book	Private	Form to add a new book
/my-books	My Books	Private	Books added by the logged-in user
/my-borrows	My Borrows	Private	User's borrowed books + return
/profile	My Profile	Private	Name, email, photo
/login	Login	Public	Email/password + Google
/register	Register	Public	Name, email, photo URL, password + Google
/api/auth/[...all]	—	—	BetterAuth route handler (catch-all)
6. Libraries
Already installed (no changes)
next 16.4, react 19, react-dom 19
@base-ui/react, class-variance-authority, cn, lucide-react
next-themes, shadcn, tw-animate-css
tailwindcss v4, @tailwindcss/postcss, prettier, eslint
To install (all pre-approved)
Package	Purpose
better-auth	Authentication (config + route handler)
mongodb	MongoDB adapter for BetterAuth only
swiper	Hero slider on home page
sonner	Toast notifications
framer-motion	Animations (Phase 6 bonus — optional)
shadcn components to add
Component	Usage
avatar	User photo in navbar dropdown
dropdown-menu	User menu in navbar
select	Day picker for borrowing
badge	Status badges (Borrowed/Returned)
skeleton	Loading placeholders
sheet	Mobile hamburger menu
sonner	Toast integration via shadcn
tabs	Optional, for book details
tooltip	Optional, for icon buttons

IMPORTANT

No extra libraries beyond the pre-approved list. Everything above is either already installed or pre-approved.

7. Environment Variables
env
# .env.example
MONGOURL=mongodb+srv://...         # MongoDB connection (BetterAuth adapter only)
BETTER_AUTH_SECRET=your-secret     # BetterAuth signing secret
BETTER_AUTH_URL=http://localhost:3000  # BetterAuth base URL
NEXT_PUBLIC_API_URL=http://localhost:5000  # Backend API base URL
GOOGLE_CLIENT_ID=your-google-id   # Google OAuth client ID
GOOGLE_CLIENT_SECRET=your-secret  # Google OAuth client secret

The existing .env has MONGOURL, BETTER_AUTH_SECRET, BASE_URL, BETTER_AUTH_URL. I will:

Add NEXT_PUBLIC_API_URL, GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET
Rename BASE_URL to BETTER_AUTH_URL if they overlap (will confirm with current values)
8. Build Phases
Phase 1 — Foundation & Auth
Install packages: better-auth, mongodb, swiper, sonner
Add shadcn components: avatar, dropdown-menu, select, badge, skeleton, sheet, sonner
Create .env.example
Set up BetterAuth config (lib/auth.ts) with MongoDB adapter, Google social login, and JWT plugin
Set up BetterAuth client (lib/auth-client.ts)
Create the BetterAuth catch-all route handler (app/api/auth/[...all]/route.ts)
Create hooks/useSession.ts
Build Login page (email/password + Google + redirects)
Build Register page (with password validation + Google)
Create proxy.ts to protect private routes (redirects to /login?redirect=<path>)

How to test: Register a user, log in, verify Google login works, try accessing /add-book while logged out (should redirect to login), log in and get redirected back.

Phase 2 — Layout (Navbar + Footer)
Build Navbar.tsx — logo, links, conditional private links, login/register buttons, user avatar dropdown, mobile hamburger (Sheet)
Build Footer.tsx — logo, tagline, contact, social icons (with X logo), copyright
Build SectionHeading.tsx — consistent heading style
Wire Navbar + Footer into app/layout.tsx
Add Toaster (sonner) to root layout

How to test: Navigate between pages, verify links show/hide based on auth state, test mobile menu, verify toasts work, check dark/light toggle.

Phase 3 — Home Page
Build HeroSlider.tsx — 3 Swiper slides with titles, text, and "Browse Books" CTA
Create lib/api.ts — start with getLatestBooks() function
Build BookCard.tsx — image, title, author, category, "View Details" link
Build BookCardSkeleton.tsx — skeleton loader
Build NewArrivals.tsx — fetch latest 6 books, display in grid, "See All Books" link
Build HowItWorks.tsx — static 3-step section
Build TopCategories.tsx — static grid of category cards
Assemble home page (app/page.tsx)

How to test: Start the backend, run npm run dev, verify slider works, latest books load, empty state shows when no books exist, all sections render.

Phase 4 — Books (All Books + Details + Add Book)
Add API functions: getAllBooks(), getBookById(), addBook() to lib/api.ts
Build BookGrid.tsx — grid wrapper with loading/empty states
Build All Books page (app/books/page.tsx) — grid of all books
Build Book Details page (app/books/[id]/page.tsx) — full book info
Build BorrowSection.tsx — day picker (3/7/14), borrow button, availability display
Add borrowBook() to lib/api.ts
Build Add Book page (app/add-book/page.tsx) — form with validation, addBook() call
Wire up AuthGuard.tsx for private pages

How to test: Browse all books, view details, add a book (must be logged in), borrow a book with different day selections, verify "Not Available" state, verify error toasts.

Phase 5 — My Books, My Borrows, Profile
Add API functions: getMyBooks(), getMyBorrows(), returnBook() to lib/api.ts
Build My Books page (app/my-books/page.tsx) — same grid, filtered to user's books
Build BorrowCard.tsx — borrow info with due date, status badge, return button
Build My Borrows page (app/my-borrows/page.tsx) — list of borrows
Build Profile page (app/profile/page.tsx) — user info display

How to test: Add books, verify they appear on My Books. Borrow books, check My Borrows shows due dates and statuses. Return a book, verify status updates. Check profile page shows correct user info.

Phase 6 — Polish & Bonus
Install framer-motion
Add fade-in/slide-up animations to sections on scroll
Polish dark mode colors and transitions
Final responsive pass — test on mobile/tablet/desktop widths
Run npm run typecheck and npm run lint, fix issues
Final visual review for consistent spacing, headings, buttons

How to test: Full walkthrough of every page and flow, check animations, dark/light mode, mobile responsiveness, verify no alert() calls anywhere, all messages are toasts.

9. Key Technical Decisions
Decision	Approach
Route protection	proxy.ts (Next.js 16 replacement for middleware) checks BetterAuth session cookie and redirects to /login?redirect=<path>
Auth token for API	BetterAuth JWT plugin provides a bearer token; stored client-side and sent in Authorization: Bearer <JWT> header
API calls	All in lib/api.ts; each function takes an optional token param for protected endpoints
Client vs Server components	Pages with forms/interactivity are "use client"; static pages and layouts are server components where possible
shadcn composition	Uses render={<Button ... />} pattern (Base UI), NOT asChild
Image handling	Book image URLs are external; use <img> tag (or Next.js <Image> with remotePatterns: [{ protocol: "https", hostname: "**" }] in next.config.ts)
Revalidation	After add/borrow/return, use router.refresh() or React state updates to reflect changes instantly
10. What I Will NOT Build
❌ The books API or borrows API (backend already exists)
❌ Database queries for books or borrows
❌ Forgot password or email verification (link shows "Coming soon" toast)
❌ Any backend logic beyond BetterAuth config + route handler


Plan approved with these changes:
1. Don't store the JWT. Get a fresh token with authClient.token() before each protected API call.
2. Set autoSignIn: false on email/password signup so Register redirects to Login as required.
3. Only accept ?redirect= values that start with "/". Use the same redirect for the Google callback URL.
4. BorrowSection must redirect logged-out users to /login?redirect=/books/<id> and return them after login.
5. Restrict image remotePatterns to covers.openlibrary.org instead of "**".
6. Skip the tabs and tooltip components.