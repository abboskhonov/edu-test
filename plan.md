# Teacher Writing Academy — Build Plan

## Project Overview
A professional writing pedagogy hub for educators. Teachers read research-backed articles, take knowledge assessments across six domains, download classroom resources, and track professional growth through a personalized dashboard.

**Stack:** React 19 + TanStack Router/Start (full-stack) + Tailwind CSS v4 + shadcn/ui + Drizzle ORM + PostgreSQL (Neon) + Better Auth

**Status:** Foundation scaffolded. Routes, database schema, auth, and marketing shell exist. All pages currently render static placeholder data. Backend API routes and data fetching are not yet wired.

---

## Already Built

| Area | Status | Notes |
|------|--------|-------|
| Project scaffolding | ✅ | Vite + TanStack Start, Tailwind v4, shadcn/ui |
| Auth (Better Auth) | ✅ | Login, register, logout, session, role field on user |
| Database schema | ✅ | users, articles, quizzes, questions, quizAttempts, resources |
| Marketing shell | ✅ | Navbar, Hero, Footer |
| Route tree | ✅ | `/`, `/articles`, `/quizzes`, `/resources`, `/research`, `/about`, `/contact`, `/login`, `/register`, `/dashboard`, `/privacy`, `/terms` |
| Dashboard shell | ✅ | Layout with stat cards and quiz result list (static data) |
| Home page | ✅ | Hero + use cases + featured articles + quiz CTA + resources preview + testimonials + final CTA |
| Articles list page | ✅ | Static article cards |
| Quizzes list page | ✅ | Static quiz cards with difficulty badges |
| Resources list page | ✅ | Static resource category cards |
| Research page | ✅ | Static publication cards |

---

## What We Have to Build

### 1. DATA LAYER & SEEDING

**Database tables to extend:**
- `savedArticles` — many-to-many user <> articles (for bookmarks)
- `resourceDownloads` — track who downloaded what (for dashboard history)
- `certificates` — generated certificates after quiz attempts (tier, date, quizId)
- `recommendations` — smart recommendations based on quiz scores (article/resource refs)
- `newsletters` — email subscribers (for newsletter feature)
- `contacts` — contact form submissions
- `monthlyChallenges` — leaderboard-style monthly quiz events

**Seeding:**
- Seed 20–30 real articles with categories, tags, authors, content
- Seed 6 quizzes with 15–25 questions each (matching the 6 categories)
- Seed 8 resource categories with sample metadata (fileUrl can point to placeholders)
- Seed 5–8 research/publication entries
- Seed 6 teacher testimonials

### 2. BACKEND API ROUTES

| Endpoint | Purpose |
|----------|---------|
| `GET /api/articles` | List articles with filters (category, search, featured) |
| `GET /api/articles/:slug` | Single article with full content |
| `GET /api/quizzes` | List active quizzes |
| `GET /api/quizzes/:id` | Quiz with questions |
| `POST /api/quizzes/:id/attempt` | Submit quiz answers, calculate score, store attempt |
| `GET /api/quizzes/attempts` | User's attempt history |
| `GET /api/resources` | List resources with filters |
| `POST /api/resources/:id/download` | Track download + return file |
| `GET /api/research` | List publications |
| `POST /api/contact` | Contact form submission |
| `POST /api/newsletter` | Subscribe to newsletter |
| `GET /api/dashboard` | Aggregated dashboard data (stats, recent attempts, saved articles, downloads) |
| `GET /api/recommendations` | Smart recommendations based on weakest quiz category |
| `POST /api/articles/:id/save` | Toggle save/unsave article |

### 3. PAGES TO IMPLEMENT (Frontend)

#### Public Pages
| Page | Current State | Work Needed |
|------|---------------|-------------|
| **Home** | ✅ Static shell complete | Wire "Latest Articles" to API; wire "Quiz Categories" to API; add language switcher UI |
| **About** | ❌ Stub (`Hello "/about"!`) | Build full page: mission, vision, goals, founder message, focus areas |
| **Contact** | ❌ Stub (`Hello "/contact"!`) | Build contact form + newsletter subscription + social links |
| **Articles list** | ✅ Static layout | Wire to API; add search, category filters, tags, pagination |
| **Article detail** | ❌ Missing route | Create `/articles/$slug` route; full article rendering with share buttons, author profile, comments UI, related articles |
| **Quizzes list** | ✅ Static layout | Wire to API; add search/filter by category/difficulty |
| **Quiz taking** | ❌ Missing route | Create `/quizzes/$id` — question renderer (multiple choice), timer, progress bar, submit flow |
| **Quiz results** | ❌ Missing route | Create `/quizzes/$id/results` — score breakdown, per-question feedback, certificate badge, smart recommendations |
| **Resources list** | ✅ Static layout | Wire to API; add category filters, search, download tracking |
| **Research** | ✅ Static layout | Wire to API; add conference announcements, optional submission CTA |
| **Privacy / Terms** | ✅ Exist | Verify content completeness |

#### Auth-Required Pages (`/_authed/*`)
| Page | Current State | Work Needed |
|------|---------------|-------------|
| **Dashboard** | ✅ Shell with static stats | Wire all stats to real data; add charts/graphs for progress over time; add "Strongest/Weakest Area"; add saved articles list; add certificate gallery |
| **Profile settings** | ❌ Missing | Create `/dashboard/profile` — edit name, email, password, preferences |
| **Saved articles** | ❌ Missing | Create `/dashboard/saved` — list + remove bookmarks |
| **Quiz history** | ❌ Missing | Create `/dashboard/quizzes` — full attempt history with retake option |
| **Certificates** | ❌ Missing | Create `/dashboard/certificates` — view/download certificate badges |
| **Downloads** | ❌ Missing | Create `/dashboard/downloads` — download history with re-download links |

#### Admin Pages (role-gated)
| Page | Purpose |
|------|---------|
| **Admin layout** | Sidebar nav with admin sections |
| **Articles admin** | CRUD articles (title, slug, excerpt, content, category, featured, status, publish date) |
| **Quizzes admin** | CRUD quizzes + manage questions (add/edit/delete questions, set correct answers, explanations, ordering) |
| **Resources admin** | Upload/edit resources (title, description, category, file) |
| **Users admin** | User list, roles, activity overview |
| **Analytics** | Quiz attempts over time, popular articles, download counts, user registrations |
| **Contact submissions** | View/manage contact form entries |
| **Newsletter subscribers** | Subscriber list, export |

### 4. FEATURES TO BUILD

#### Quiz System (Core Feature)
- **Quiz taking flow:** Timer (optional per quiz), question navigation (prev/next or jump), flag questions for review
- **Instant results:** Percentage score, pass/fail, certificate tier
- **Detailed feedback:** Per-question correct/incorrect with explanation text
- **Progress tracking:** Store every attempt; show improvement over time in dashboard
- **Retry option:** Allow retakes (track retry count)
- **Difficulty levels:** Beginner / Intermediate / Advanced (filterable)
- **Certificate tiers:**
  - 80–100% → "Expert" 🏆
  - 60–79% → "Proficient" ✅
  - 40–59% → "Developing" 📚 (show recommended articles)
  - 0–39% → "Beginner" 🔰 (show learning resources)
- **Smart recommendations:** After quiz completion, recommend articles and resources from the weakest category
- **Diagnostic test:** Special flag on quizzes (`isDiagnostic`). On first registration, prompt user to take diagnostic. Results seed initial recommendations.
- **Monthly challenge:** Optional leaderboard feature. Monthly quiz with public leaderboard of top scores.

#### Article System
- Full article rendering (rich text content — use markdown or HTML stored in DB)
- Categories: Writing Pedagogy, Academic Writing, ESL/EFL, Research Methods, AI & Writing, Grammar, Digital Literacy, Conference News
- Tags support
- Featured articles slider/carousel on home
- Author profiles (name, bio, avatar)
- Save/bookmark articles (auth required)
- Share buttons (copy link, social)
- Comments (optional — can be deferred)
- Related articles (same category)

#### Resource Library
- Downloadable resources: lesson plans, worksheets, rubrics, classroom activities, writing prompts, citation guides, assessment templates, grammar guides
- Download button with count tracking
- Category filters + search
- File type indicators (PDF, DOCX, etc.)

#### Research & Publications
- Publication cards: title, author, year, type (Journal Article, Research Paper, Conference), abstract
- Conference announcements with CTA
- Optional: Article submission form (simple file upload or external link)

#### Member Dashboard
- Stats: quizzes taken, average score, saved articles, downloads, certificates count
- Recent quiz results with tier badges
- Progress visualization (line chart or bar chart of scores over time)
- Strongest area & weakest area identification
- Certificate gallery
- Recommended content based on latest quiz attempts
- Download history
- Profile settings

#### Contact & Community
- Contact form: name, email, subject, message
- Newsletter subscription (email capture)
- Social media links
- Optional: Forum/community (deferred — can be external link or future phase)

#### Language Switcher
- UI for switching between languages (English + Uzbek at minimum, based on spec)
- Store preference in user profile or localStorage
- Content translation strategy: bilingual fields in DB or i18n keys

### 5. DESIGN & UI TASKS

- Complete **About page** with mission/vision/founder sections
- Complete **Contact page** with form + info
- **Quiz taking interface:** Clean, focused UI with large choice buttons, progress indicator, timer
- **Quiz results screen:** Celebration state for Expert/Proficient, encouraging state for lower tiers, clear recommendation cards
- **Admin sidebar navigation:** Collapsible nav for all admin sections
- **Toast notifications:** For save actions, quiz submission, form success, errors
- **Loading states:** Skeletons for article lists, quiz cards, dashboard stats
- **Empty states:** No saved articles, no quiz history, no certificates yet
- **Mobile responsiveness:** Verify all existing pages on mobile; quiz interface must be touch-friendly
- **SEO:** Meta tags per route, OpenGraph tags for articles, semantic HTML

### 6. TECHNICAL INFRASTRUCTURE

| Task | Priority |
|------|----------|
| Connect real Neon DB (verify `.env` credentials) | High |
| Run `db:push` to sync schema | High |
| Seed database with realistic content | High |
| Set up API route handlers in TanStack Start | High |
| Set up React Query hooks for data fetching | High |
| Configure `beforeLoad` auth guards on `/_authed` routes | High |
| Role-based access control (admin vs teacher) | Medium |
| File upload handling for resources (local or S3/R2) | Medium |
| Email service for contact form & newsletter (Resend/EmailJS) | Low |
| Analytics dashboard data aggregation queries | Medium |

---

## Build Phases

### Phase 1: Foundation & Data (Week 1)
1. Verify DB connection, run migrations, seed all tables
2. Build all API routes for articles, quizzes, resources, research
3. Wire public pages to real data (articles list, article detail, quizzes list, resources, research)
4. Complete About and Contact pages

### Phase 2: Quiz Engine (Week 2)
1. Build quiz taking page (`/quizzes/$id`)
2. Build quiz submission + scoring logic
3. Build quiz results page with feedback, tiers, certificates
4. Build retry logic and attempt storage
5. Wire dashboard quiz stats to real data

### Phase 3: Dashboard & Personalization (Week 3)
1. Complete dashboard with real data (stats, attempts, saved articles, downloads)
2. Build saved articles feature (save/unsave)
3. Build download tracking
4. Build certificate gallery
5. Build profile settings page
6. Implement smart recommendation engine

### Phase 4: Admin Panel (Week 4)
1. Build admin route layout with role guard
2. Articles CRUD
3. Quizzes + questions CRUD
4. Resources upload/management
5. User management
6. Analytics dashboard
7. Contact submissions viewer

### Phase 5: Polish & Launch (Week 5)
1. Language switcher + i18n setup
2. SEO meta tags, OpenGraph
3. Mobile responsiveness audit
4. Performance optimization (images, lazy loading)
5. Toast notifications, loading skeletons, empty states
6. Newsletter integration
7. Final testing & bug fixes

---

## File Map (Proposed Structure)

```
src/
  routes/
    __root.tsx                    ✅ exists
    index.tsx                     ✅ exists
    about.tsx                     ❌ needs build
    contact.tsx                   ❌ needs build
    login.tsx                     ✅ exists
    register.tsx                  ✅ exists
    privacy.tsx                   ✅ exists
    terms.tsx                     ✅ exists
    articles/
      index.tsx                   ✅ exists — wire to API
      $slug.tsx                   ❌ needs build
    quizzes/
      index.tsx                   ✅ exists — wire to API
      $id.tsx                     ❌ needs build (quiz taking)
      $id/
        results.tsx               ❌ needs build
    resources/
      index.tsx                   ✅ exists — wire to API
    research/
      index.tsx                   ✅ exists — wire to API
    _authed/
      route.tsx                   ✅ exists
      dashboard/
        index.tsx                 ✅ exists — wire to API
        profile.tsx               ❌ needs build
        saved.tsx                 ❌ needs build
        quizzes.tsx               ❌ needs build
        certificates.tsx          ❌ needs build
        downloads.tsx             ❌ needs build
    admin/
      route.tsx                   ❌ needs build (role guard)
      index.tsx                   ❌ redirect to /admin/articles
      articles/
        index.tsx                 ❌ list
        create.tsx                ❌ form
        $id.tsx                   ❌ edit
      quizzes/
        index.tsx                 ❌ list
        create.tsx                ❌ form
        $id.tsx                   ❌ edit + question manager
      resources/
        index.tsx                 ❌ list
        create.tsx                ❌ upload form
      users/
        index.tsx                 ❌ list
      analytics.tsx               ❌ dashboard
      contacts.tsx                ❌ list
    api/
      articles/
        index.ts                  ❌ list endpoint
        $slug.ts                  ❌ detail endpoint
      quizzes/
        index.ts                  ❌ list endpoint
        $id.ts                    ❌ detail endpoint
        $id/
          attempt.ts              ❌ submit endpoint
      resources/
        index.ts                  ❌ list endpoint
        $id/
          download.ts             ❌ track + serve
      research/
        index.ts                  ❌ list endpoint
      contact.ts                  ❌ form endpoint
      newsletter.ts               ❌ subscribe endpoint
      dashboard.ts                ❌ aggregated data
      recommendations.ts          ❌ smart recs
  features/
    marketing/
      navbar.tsx                  ✅ exists
      hero.tsx                    ✅ exists
      footer.tsx                  ✅ exists
    articles/
      article-card.tsx            ❌ component
      article-detail.tsx          ❌ component
      save-button.tsx             ❌ component
    quizzes/
      quiz-card.tsx               ❌ component
      quiz-player.tsx             ❌ component
      question-card.tsx           ❌ component
      quiz-timer.tsx              ❌ component
      quiz-results.tsx            ❌ component
      certificate-badge.tsx         ❌ component
    dashboard/
      stat-card.tsx               ✅ exists (static)
      attempt-list.tsx            ❌ component
      progress-chart.tsx          ❌ component
      certificate-gallery.tsx       ❌ component
    admin/
      admin-layout.tsx            ❌ component
      admin-sidebar.tsx           ❌ component
      data-table.tsx              ❌ component
      article-form.tsx            ❌ component
      quiz-form.tsx               ❌ component
      question-manager.tsx        ❌ component
  hooks/
    use-auth.ts                   ✅ exists
    use-articles.ts               ❌ hook
    use-quizzes.ts                ❌ hook
    use-dashboard.ts              ❌ hook
  lib/
    utils.ts                      ✅ exists
    db.ts                         ✅ exists
    auth.ts                       ✅ exists
    auth-client.ts                ✅ exists
  db/
    schema.ts                     ✅ exists — extend
    seed.ts                       ✅ exists — expand
  components/ui/                  ✅ shadcn components exist
```

---

## Critical Decisions Needed

1. **Rich text for articles:** Plain HTML string in DB, or Markdown with a renderer? (Recommended: Markdown + `react-markdown`)
2. **File storage for resources:** Local filesystem in `/public/uploads`, or cloud storage (Cloudflare R2 / AWS S3)?
3. **Email service:** Resend, SendGrid, or EmailJS for contact form and newsletter?
4. **Comments on articles:** Build simple internal comments, or defer entirely?
5. **Forum/community:** Defer to Phase 6 or integrate external (Discord/Slack link)?
6. **i18n library:** `react-i18next` or simple context-based with bilingual DB fields?
7. **Charts for dashboard:** `recharts` or lightweight custom SVG?
