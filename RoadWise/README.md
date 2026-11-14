# RoadWise – Road Safety Awareness Platform
*Every Road. Every Life. Every Choice Matters.* A Youth Red Cross project: cartoon-style road safety lessons, games, quizzes and a pledge for Indian roads.

```
RoadWise/
├── frontend/   React + Vite + Tailwind + Axios + Framer Motion
├── backend/    Spring Boot 3 + Spring Data JPA + Spring Security + MySQL   (docs/API.md, scripts/smoke-test.sh)
├── database/   schema.sql and seed.sql (copies of backend/src/main/resources/db)
└── tools/      e2e/ (real-browser test), mock-api/ (stand-in API used for testing only)
```

## Run the whole app locally
**You need:** Node 18+, Java 17+, Maven 3.9+, MySQL 8.0.16+ (or MariaDB 10.5+).

**1. Database.** Start MySQL. The backend creates the `roadwise` database if your MySQL user may create databases. Otherwise run once:
```sql
CREATE DATABASE roadwise CHARACTER SET utf8mb4;
```
Tables and sample data are created automatically on first start. To load them by hand instead:
`mysql -u root -p roadwise < database/schema.sql && mysql -u root -p roadwise < database/seed.sql`

**2. Backend** (terminal 1)
```bash
cd backend
export DB_USERNAME=root DB_PASSWORD=your_mysql_password
export ADMIN_PASSWORD='choose-a-strong-password'     # optional; otherwise a random one is printed once in the log
mvn spring-boot:run                                   # http://localhost:8080
```
**3. Frontend** (terminal 2)
```bash
cd frontend
cp .env.example .env          # VITE_API_BASE_URL=http://localhost:8080
npm install
npm run dev                   # http://localhost:5173
```
Open http://localhost:5173. If the backend is not running the site tells you so (see "When the server is down").

### Environment variables
| Where | Name | Default | Purpose |
|---|---|---|---|
| frontend `.env` | `VITE_API_BASE_URL` | `http://localhost:8080` | Backend address. Rebuild or restart `npm run dev` after changing it. |
| backend | `DB_URL`, `DB_USERNAME`, `DB_PASSWORD` | local MySQL, `root`, empty | Database login |
| backend | `ADMIN_USERNAME`, `ADMIN_PASSWORD` | `admin`, random | First-run admin account |
| backend | `CORS_ORIGINS` | `http://localhost:5173,http://127.0.0.1:5173,http://localhost:4173` | Websites allowed to call the API |
| backend | `SEED_ENABLED`, `SERVER_PORT` | `true`, `8080` | Sample data on first run, port |

Examples: `frontend/.env.example`, `backend/.env.example`, `backend/application.properties.example`.

## What comes from the backend
| Screen | API calls | If the server is unreachable |
|---|---|---|
| Traffic Signs, Sign Challenge | `GET /api/signs` | Falls back to the built-in signs with an "offline" notice |
| Road Safety Quiz | `GET /api/quizzes?category&difficulty&limit`, `POST /api/quizzes/submit` | Clear error with Try again (answers are marked only by the server) |
| Home daily tip | `GET /api/tips/random` | Falls back to a built-in tip with an "offline" notice |
| Awareness Campaigns | `GET /api/campaigns`, `GET /api/campaigns/upcoming` | Clear error with Try again |
| Pledge (Campaigns page, total also on Home) | `POST /api/pledges`, `GET /api/pledges/count` | Pledge is **not** recorded; error with Try again |

Frontend-only (work without the server): Traffic Signal Game, Spot the Mistake, What Would You Do?, Myth or Fact, all eight lessons, achievements, recommendations.
Quiz answers are never sent to the browser before submission, so the quiz has no instant feedback: answer all questions, then submit and review.
Progress and badges are kept in the browser (`localStorage`). The pledge certificate is made in the browser; your name is never sent to the server.

## Lessons and what to learn next
`/learn` is the dashboard for the eight modules (fundamentals, rules, helmet and seatbelt, pedestrian and child safety, signals and markings, accident prevention, **different conditions**, **senior citizen and disability safety**). Most lessons carry cartoon right-versus-wrong pictures (14 scenes in `frontend/src/components/CompareScenes.jsx`). The dashboard marks lessons you opened and knowledge checks you answered, and suggests what to open next (weak quiz topics and games first, then lessons not yet opened). The same suggestions appear on the Achievements page. Everything is stored in the browser.

## Quiz questions
59 questions across 8 topics (including Road Conditions and Inclusive Safety) live in `tools/seed/quiz-bank.json`. To add or edit questions: change that file, run `node tools/seed/generate-seed.mjs`, then recreate the database (the seed loads only on the first start: `DROP DATABASE roadwise;` and start the backend again). Or add questions through the admin API without touching the database by hand.

## Tests
```bash
cd frontend
npm test                                              # 67 component tests (API mocked, includes failure and empty cases)
API_URL=http://localhost:8080 npm run test:contract   # 8 tests: real api.js + axios against a running API
cd .. && python3 tools/e2e/e2e.py http://localhost:8080   # 67 checks in real Chromium (pip install playwright; playwright install chromium)
cd backend && mvn test                                # scoring unit tests
ADMIN_PASSWORD=... backend/scripts/smoke-test.sh      # 29 checks of every backend endpoint incl. admin
```
`tools/e2e/e2e.py` starts `npm run dev` itself and saves screenshots to `tools/e2e/screens/`.

## When the server is down
Pages that need it show a loading indicator, then either a built-in copy marked "Server offline" (signs, tips) or a clear message with a **Try again** button (quiz, campaigns, pledge). Empty answers show friendly empty states.

## API
See `backend/docs/API.md` (endpoints, request/response examples, error format, admin routes).

## Verification checklist
Legend: ✅ checked here · ⚠️ not possible here, please run it yourself.

| Item | Status | How |
|---|---|---|
| Frontend starts (`npm run dev`) and builds | ✅ | e2e starts it; `vite build` passes |
| Database schema + seed on MySQL-compatible server, constraints, cascade | ✅ | MariaDB 10.11, loaded twice, 6 constraint violations rejected |
| Backend Java: syntax of all 55 files, scoring logic | ✅ | parsed with javac, logic run |
| **Spring Boot starts, connects to MySQL, JPA mappings, Spring Security rules, admin endpoints** | ⚠️ | Maven Central is blocked in this environment, so the project could not be built. Run `mvn spring-boot:run` then `backend/scripts/smoke-test.sh` |
| All public REST endpoints and quiz marking over HTTP | ✅ against the stand-in API on the real database; ⚠️ against Spring | contract tests (8) |
| Frontend ↔ API communication, CORS in a real browser | ✅ against the stand-in API; ⚠️ against Spring | e2e |
| Quiz score calculation (server marks, UI shows server numbers) | ✅ | e2e compares UI to API response; contract test checks 0%, partial, 100% |
| Traffic sign retrieval, search, filter, flashcards, challenge | ✅ | e2e + component tests |
| Pledge submit, total, no double count, certificate download | ✅ | e2e checks the database total before and after |
| Loading, error, empty and offline states | ✅ | e2e (blocked and slowed API) + component tests |
| All games and achievements | ✅ | e2e + component tests |
| Learn dashboard, modules 7 and 8, cartoons, recommendations, new quiz topics, posters, About scene | ✅ | e2e + component tests; screenshots reviewed |
| All navigation links (22 distinct) and buttons | ✅ | e2e crawl, mobile menu |
| Responsive: 360, 768, 1280, 1920 px, no horizontal scroll on all 22 pages | ✅ | e2e; screenshots reviewed |
| Accessibility basics (keyboard spot game, labels, focus, reduced motion) | partly ✅ | covered by design and tests; no full audit (screen reader, contrast tool) done |

## Not done / known limits
- **Spring Boot was never executed here** (see the table). Expect to fix small things if the first run shows a problem, and send me the log.
- **Simple admin screen at `/admin`** (not linked in the menu). Log in with the admin username and password to add, edit or delete signs, quiz questions, tips and campaigns and to see counts including pledges. The password is kept in memory only. Lessons, myths and games content is still edited in the frontend code. See `backend/docs/API.md`.
- **No visitor accounts and no progress sync.** Progress, badges, opened lessons and recommendations stay in each browser. There is no `user_progress` table.
- **Content still to be checked against official sources before a public launch:** the quiz, tip and lesson wording; the Home statistics (MoRTH 2022 figures typed in by hand); the Good Samaritan summary; the police hand-signal descriptions; and the National Road Safety Month text (it deliberately gives no dates). Campaign dates in the seed data are sample dates.
- Sign drawings are simplified. `imagePath` values in the database match real files in `frontend/public/assets`, but the screens draw signs from code; a sign added by an admin without a matching drawing shows a "?" placeholder.
- Cartoon scenes are simple illustrations drawn in code, not hand-made artwork, and the lesson pictures are not translated into other languages.
- No full accessibility audit (screen reader, contrast checker).
- Admin passwords use HTTP Basic: serve the API over HTTPS in production.