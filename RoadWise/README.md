# RoadWise: Road Safety Awareness Platform

> **Every Road. Every Life. Every Choice Matters.**

RoadWise is an interactive road safety website for Indian roads. Instead of long paragraphs, visitors learn through cartoon illustrations, short lessons, games, quizzes and a road safety pledge. It was built as a **Youth Red Cross / Social Service awareness project**.

---

## Table of contents

1. [What is RoadWise?](#1-what-is-roadwise)
2. [Who is it for?](#2-who-is-it-for)
3. [Features at a glance](#3-features-at-a-glance)
4. [Technology stack](#4-technology-stack)
5. [Project structure](#5-project-structure)
6. [Run the project from the ZIP, step by step](#6-run-the-project-from-the-zip-step-by-step)
7. [Configuration (passwords and environment variables)](#7-configuration-passwords-and-environment-variables)
8. [Application workflow: what a visitor can do](#8-application-workflow-what-a-visitor-can-do)
9. [Application workflow: what an admin can do](#9-application-workflow-what-an-admin-can-do)
10. [How the pieces talk to each other](#10-how-the-pieces-talk-to-each-other)
11. [Pages and routes](#11-pages-and-routes)
12. [REST API summary](#12-rest-api-summary)
13. [Database](#13-database)
14. [Running the tests](#14-running-the-tests)
15. [Troubleshooting](#15-troubleshooting)
16. [Putting the project on GitHub safely](#16-putting-the-project-on-github-safely)
17. [Known limits and honest notes](#17-known-limits-and-honest-notes)
18. [Sources and credits](#18-sources-and-credits)

---

## 1. What is RoadWise?

RoadWise teaches road safety in a friendly, visual way. Four recurring cartoon characters guide visitors through the site:

| Character | Role |
|---|---|
| **Safety Sam** | The RoadWise mascot. Gives tips and guidance. |
| **Riya** | A student who teaches pedestrian safety. |
| **Arjun** | A cyclist who explains cycling and two-wheeler safety. |
| **Officer Ravi** | A friendly traffic police officer who explains signs and rules. |

**Main objectives**

1. Create awareness about road safety.
2. Teach Indian traffic signs and traffic rules.
3. Teach safe habits for pedestrians, cyclists, two-wheeler riders and car drivers.
4. Explain why helmets and seatbelts matter.
5. Teach accident prevention.
6. Show what to do when you witness a road accident.
7. Make learning fun with games and quizzes.
8. Encourage people to join campaigns and take a road safety pledge.

**Design:** cute cartoon illustrations, a soft pastel palette (sky blue, cream, soft yellow, mint, coral, lavender, dark navy), rounded cards, smooth and subtle animations, and simple English. Red, yellow and green are used only where they carry safety meaning, such as traffic signals.

---

## 2. Who is it for?

School students, college students, parents, teachers, Youth Red Cross volunteers and anyone who uses the road as a pedestrian, cyclist, two-wheeler rider or car passenger or driver.

---

## 3. Features at a glance

| Area | What you get |
|---|---|
| **Home** | Hero section, "why road safety matters" cards, explore cards, daily safety tip, game previews, sourced statistics, pledge and quiz call to action |
| **Learn dashboard** | Eight illustrated lessons with Do's and Don'ts, real-life scenarios, a short knowledge check, Back and Next buttons, and recommendations for what to learn next |
| **Traffic Signs Centre** | 22 Indian traffic signs in three categories. Search, filter, detail view, flashcard mode and random sign challenge |
| **Safety Games** | Guess the Sign (3 levels), Traffic Signal Challenge, Spot the Mistake, What Would You Do?, Road Safety Quiz |
| **Myths vs Facts** | Myth and Fact cards plus a small quiz |
| **Emergency Help** | Big **Call 112** button (click to call on phones) and the steps to follow if you witness an accident |
| **Awareness Campaigns** | National Road Safety Month, helmet and pedestrian campaigns, school programmes, poster and slogan competitions, downloadable posters, **Road Safety Pledge** with certificate and a total pledge count |
| **Achievements** | Badges and progress such as Traffic Sign Explorer, Pedestrian Pro, Helmet Hero, Signal Master and Road Safety Champion |
| **About** | What RoadWise is, why it exists, the Youth Red Cross link and references |
| **Admin screen** (`/admin`) | Log in to add, edit or delete signs, quiz questions, tips and campaigns, and see counts including total pledges |

Also included: responsive layout (mobile, tablet, desktop), hamburger menu, breadcrumbs, scroll-to-top button, loading, error and empty states, and reduced-motion support.

---

## 4. Technology stack

| Layer | Technology |
|---|---|
| Frontend | React, Vite, JavaScript, Tailwind CSS, React Router DOM, Axios, Framer Motion, Lucide React icons |
| Backend | Java 17, Spring Boot 3, Spring Web, Spring Data JPA, Spring Security |
| Database | MySQL 8 (MariaDB 10.5+ also works) |

The frontend and backend are **separate projects** and talk through REST APIs. There are no microservices and no cloud services. It is a college-level full-stack project.

---

## 5. Project structure

```
RoadWise/
├── frontend/                  React + Vite website
│   ├── src/
│   │   ├── components/        Reusable parts (navbar, footer, cards, cartoon scenes)
│   │   ├── pages/             One file per page (Home, Signs, Emergency, Admin, ...)
│   │   ├── data/              Lessons, myths, games and content written in the code
│   │   ├── services/          Axios API calls (api.js, adminApi.js)
│   │   ├── context/           Saved progress and badges (browser storage)
│   │   └── App.jsx            All routes
│   ├── public/assets/         Sign drawings, posters
│   └── package.json
│
├── backend/                   Spring Boot REST API
│   ├── src/main/java/com/roadwise/
│   │   ├── controller/        REST endpoints
│   │   ├── service/           Business logic (such as quiz scoring)
│   │   ├── repository/        Database access
│   │   ├── entity/            Database table mappings
│   │   ├── dto/               Request and response shapes
│   │   ├── config/            Security, CORS, first-run seeding
│   │   └── exception/         Error handling
│   ├── src/main/resources/    application.properties and db/schema.sql, seed.sql
│   ├── docs/API.md            Full API documentation
│   └── scripts/smoke-test.sh  Automatic API check
│
├── database/                  schema.sql and seed.sql (copies, for loading by hand)
├── tools/                     Quiz bank, test helpers, mock API (optional)
└── README.md                  This file
```

---

## 6. Run the project from the ZIP, step by step

### Step 0. Install the required software

| Tool | Version | Check with |
|---|---|---|
| Node.js | 18 or newer | `node -v` |
| Java JDK | 17 or newer | `java -version` |
| Maven | 3.9 or newer | `mvn -v` |
| MySQL Server | 8.0.16 or newer | `mysql --version` |

### Step 1. Unzip

1. Unzip `RoadWise-final.zip` into a folder, for example `C:\Projects\RoadWise` or `~/Projects/RoadWise`.
2. If you received update ZIPs (for example `RoadWise-changes.zip` and `RoadWise-changes2.zip`), unzip them **over** the same folder and choose to replace files with the same name.
3. Open the folder and make sure you can see `frontend`, `backend` and `database`.

### Step 2. Start MySQL

Make sure the MySQL server is running.

- **Windows:** press `Win + R`, type `services.msc`, find **MySQL80** (or similar) and click Start. Or in an Administrator PowerShell run `net start MySQL80`.
- **Mac:** `brew services start mysql`
- **Linux:** `sudo systemctl start mysql`

Test it:

```bash
mysql -u root -p
```

If you get a `mysql>` prompt, it works. Type `exit`.

### Step 3. Create the database (usually automatic)

The backend creates the `roadwise` database by itself if your MySQL user is allowed to. If it is not, run this once in the `mysql>` prompt:

```sql
CREATE DATABASE roadwise CHARACTER SET utf8mb4;
```

Tables and sample data (signs, 59 quiz questions, tips, campaigns) are created automatically the **first time** the backend starts. To load them by hand instead:

```bash
mysql -u root -p roadwise < database/schema.sql
mysql -u root -p roadwise < database/seed.sql
```

### Step 4. Start the backend (terminal 1)

Environment variables only exist in the terminal window where you set them, so set them and start the backend **in the same window**.

**Windows PowerShell**
```powershell
cd backend
$env:DB_USERNAME="root"
$env:DB_PASSWORD="your_mysql_password"
$env:ADMIN_PASSWORD="choose-a-strong-password"
mvn spring-boot:run
```

**Windows Command Prompt (cmd)**
```cmd
cd backend
set DB_USERNAME=root
set DB_PASSWORD=your_mysql_password
set ADMIN_PASSWORD=choose-a-strong-password
mvn spring-boot:run
```

**Mac / Linux**
```bash
cd backend
export DB_USERNAME=root
export DB_PASSWORD='your_mysql_password'
export ADMIN_PASSWORD='choose-a-strong-password'
mvn spring-boot:run
```

When it works, the log shows `Started RoadWiseApplication` and this address returns JSON:

```
http://localhost:8080/api/signs
```

> If you do not set `ADMIN_PASSWORD`, a random one is printed **once** in the log on first start. Copy it from there.

### Step 5. Start the frontend (terminal 2)

```bash
cd frontend
cp .env.example .env        # Windows cmd: copy .env.example .env
npm install
npm run dev
```

Open **http://localhost:5173**.

The `.env` file contains `VITE_API_BASE_URL=http://localhost:8080`. If you change it, stop and restart `npm run dev`.

### Step 6. Check that everything works

1. The Home page loads with the hero cartoon.
2. Go to **Traffic Signs**. Signs should appear without a "Server offline" note.
3. Open **Safety Games**, then **Road Safety Quiz**. Questions should load.
4. Open **Awareness Campaigns**. Campaign cards should load.
5. Open `http://localhost:5173/admin` and log in as `admin` with your admin password.

Optional automatic check of the whole API (Mac/Linux/Git Bash):

```bash
ADMIN_PASSWORD='choose-a-strong-password' backend/scripts/smoke-test.sh
```

### Frontend-only mode (no backend, no database)

If you only run `npm run dev` without the backend, the site still opens. Lessons, the signal game, Spot the Mistake, What Would You Do?, Myths vs Facts, Emergency, About and achievements all work. Signs and the daily tip show built-in copies marked "Server offline". The quiz, campaigns, pledge and admin need the backend.

### Run order every time

1. Start MySQL.
2. Start the backend and wait for `Started RoadWiseApplication`.
3. Start the frontend.

---

## 7. Configuration (passwords and environment variables)

### Backend

| Name | Default | Purpose |
|---|---|---|
| `DB_URL` | local MySQL on port 3306, database `roadwise` | Database address |
| `DB_USERNAME` | `root` | Database user |
| `DB_PASSWORD` | empty | Database password |
| `ADMIN_USERNAME` | `admin` | Admin account name (created on first start) |
| `ADMIN_PASSWORD` | random, printed once | Admin password (8+ characters) |
| `CORS_ORIGINS` | `http://localhost:5173,http://127.0.0.1:5173,http://localhost:4173` | Websites allowed to call the API |
| `SEED_ENABLED` | `true` | Load sample data on first start |
| `SERVER_PORT` | `8080` | Backend port |

If your MySQL runs on another port (for example 3307), set `DB_URL` to match.

### Frontend

| Name | Default | Purpose |
|---|---|---|
| `VITE_API_BASE_URL` | `http://localhost:8080` | Backend address, with no trailing slash |

### Do I have to set the password every time I open a terminal?

Not if you use one of these:

**Option A: a config file (simplest).** Copy `backend/application.properties.example` to `backend/application.properties` (next to `pom.xml`) and fill in:

```properties
spring.datasource.username=root
spring.datasource.password=your_mysql_password
roadwise.admin.password=choose-a-strong-password
```

Start from the `backend` folder as usual. **Never commit this file** (see [section 16](#16-putting-the-project-on-github-safely)).

**Option B: save permanent environment variables.**
- Windows (run once, then open a new terminal): `setx DB_USERNAME "root"`, `setx DB_PASSWORD "your_password"`, `setx ADMIN_PASSWORD "your_admin_password"`
- Mac/Linux: add `export ...` lines to `~/.zshrc` or `~/.bashrc`.

> The admin password is only used on the **first** start, when the admin account is created. Changing it later does not change the existing account. To reset, drop the `roadwise` database (`DROP DATABASE roadwise;`) and start the backend again, which also reloads the sample data.

---

## 8. Application workflow: what a visitor can do

This is the intended journey. Every step is a real page.

### Step 1. Arrive on Home (`/`)

The hero says **"Be Road Smart. Be Life Smart."** with **Start Learning** and **Play Safety Games** buttons. On Home you can also:

- Read why road safety matters.
- Open one of the eight explore cards (signs, rules, pedestrian safety, helmet and seatbelt, signals, accident prevention, emergency, myths).
- See a **daily safety tip** and press **Next Tip** for another.
- Preview the sign quiz, Spot the Mistake and the signal game.
- Read road accident statistics shown with their year and source.
- Use the call to action: **Take the Road Safety Pledge** or **Start the Road Safety Quiz**.

### Step 2. Learn (`/learn`)

The dashboard shows eight lesson cards:

1. Road Safety Fundamentals
2. Traffic Rules (pedestrian, cyclist, two-wheeler, car)
3. Helmet and Seatbelt Awareness
4. Pedestrian and Child Safety
5. Traffic Signals and Road Markings
6. Accident Prevention
7. Road Safety in Different Conditions (night, rain, fog, highway, school zones, railway crossings, parking)
8. Senior Citizen and Disability Safety

Each lesson has illustrations, simple explanations, Do's and Don'ts, right-versus-wrong cartoons, safety tips, a real-life scenario and a short **knowledge check**. Use the **Back** and **Next** buttons to move between lessons. The dashboard remembers which lessons you opened and suggests what to learn next.

### Step 3. Explore Traffic Signs (`/traffic-signs`)

There are 22 signs in three categories (Mandatory and Regulatory, Cautionary, Informatory). You can:

- **Search** by name.
- **Filter** by category.
- **Click a sign** to see its meaning and what the road user should do.
- Switch to **flashcard mode**.
- Try the **random sign challenge**.

### Step 4. Practise with Safety Games (`/games`)

| Game | How it works |
|---|---|
| **Guess the Sign** | See a sign, pick one of four answers, get the explanation and score. Beginner, Intermediate and Advanced levels. |
| **Traffic Signal Challenge** | An interactive junction with lights, cars, pedestrians, a zebra crossing and a traffic police officer. Choose the right action for each signal. |
| **Spot the Mistake** | A busy road scene. Tap the unsafe things (no helmet, no seatbelt, phone use, crossing in the wrong place, jumping a signal) and see why each is unsafe. Works with the keyboard too. |
| **What Would You Do?** | Real situations such as a school bus stopping, a railway crossing barrier or witnessing an accident. Pick a response and see the safest choice. |
| **Road Safety Quiz** | Questions across all lessons. See below. |

### Step 5. Test your knowledge with the Quiz (`/games/quiz`)

1. Choose a topic and level.
2. Answer the questions. A progress bar shows where you are.
3. Submit. **The server marks the answers**, so correct answers are never sent to your browser before you submit.
4. See your results: **total questions, correct, incorrect, percentage** and an achievement message, plus an explanation for each question.
5. Press **Retake** to try again.

### Step 6. Check Myths vs Facts (`/myths-vs-facts`)

Myth and Fact cards (for example "Helmets are only needed for long journeys" versus the fact that helmets should be worn on every ride), plus a small myth-or-fact quiz.

### Step 7. Know what to do in an emergency (`/emergency-help`)

- A large **112** card with a **Call 112** button (click to call on phones; on a computer, dial 112 on your mobile).
- The steps to follow if you witness a road accident: stay calm, keep yourself safe, avoid stopping in a dangerous place, call 112, give the exact location, explain clearly, follow responders' instructions, do not move seriously injured people unless there is immediate danger, and do not crowd around.
- Good Samaritan information with a link to the official source.

### Step 8. Take part in Campaigns (`/campaigns`)

- See campaigns from the database: National Road Safety Month, helmet awareness, pedestrian safety, school programmes, and poster and slogan competitions.
- Download **posters and slogans**.
- Take the **Road Safety Pledge**: *"I promise to follow traffic rules, respect other road users, wear protective equipment, avoid distractions and encourage others to practise safe road behaviour."*
  - Press **Take the Road Safety Pledge**.
  - The pledge is saved and a success message appears.
  - Download a simple **digital certificate**. It is made in your browser, so your name is never sent to the server.
  - The **total number of pledges** updates. Only a random anonymous ID is stored, and taking the pledge twice from the same browser does not count twice.

> The poster and slogan competitions are **activity ideas for Youth Red Cross units, schools or colleges to run offline**. The site has no entry form or judging. The dates in the sample data are placeholders, so replace them with real dates in the admin screen.

### Step 9. See your Achievements (`/achievements`)

Badges and progress for quizzes completed, games completed, quiz scores, the pledge and badges earned: Traffic Sign Explorer, Pedestrian Pro, Helmet Hero, Signal Master and Road Safety Champion. Progress is saved **in your browser**, so clearing browser data or switching device resets it.

### Step 10. Keep learning

The Learn dashboard and Achievements page recommend lessons you have not finished, based on what you completed.

### Always available

Navbar (logo returns Home, **Learn Road Safety** dropdown, **Take the Quiz** button), mobile hamburger menu, breadcrumbs on deeper pages, scroll-to-top button, and a footer with quick links, the Call 112 button and official resources.

---

## 9. Application workflow: what an admin can do

1. Open `http://localhost:5173/admin`. It is not shown in the public menu.
2. Log in with `admin` and your admin password. A wrong password shows an error.
3. See counts of **signs, quiz questions, tips, campaigns and pledges**.
4. Use the four tabs to **add, edit or delete**:

   | Tab | Fields |
   |---|---|
   | Traffic signs | name, category, meaning, image path, what the road user should do |
   | Quiz questions | question, topic, level, options (one per line, 2 to 6), number of the correct option, explanation |
   | Safety tips | title, category, tip text, optional image |
   | Campaigns | title, category, description, start and end dates, optional poster |

5. Log out when done. The password is kept **in memory only**, so refreshing the page also logs you out.

Changes are saved in MySQL and appear on the public pages. Only logged-in admins can change content. A public visitor cannot.

**Not editable in the admin screen:** lesson text, myths and game scenarios. They live in `frontend/src/data/`.

> A new sign only shows a proper drawing if its image path matches a drawing the frontend already has. Otherwise it shows a "?" placeholder.

---

## 10. How the pieces talk to each other

```
 Visitor's browser                    Spring Boot API                MySQL
 ┌──────────────────────┐            ┌─────────────────┐         ┌──────────┐
 │ React + Vite         │  Axios     │ Controllers     │  JPA    │ roadwise │
 │ (localhost:5173)     │ ─────────▶ │ Services        │ ──────▶ │ database │
 │                      │  JSON/REST │ Security (admin)│         │          │
 │ localStorage:        │ ◀───────── │ (localhost:8080)│ ◀────── │          │
 │ progress and badges  │            └─────────────────┘         └──────────┘
 └──────────────────────┘
```

| Screen | Data source | If the server is down |
|---|---|---|
| Traffic Signs, Sign Challenge | `GET /api/signs` | Built-in signs with a "Server offline" note |
| Daily tip on Home | `GET /api/tips/random` | Built-in tip with a "Server offline" note |
| Quiz | `GET /api/quizzes`, `POST /api/quizzes/submit` | Clear error with **Try again** |
| Campaigns | `GET /api/campaigns` | Clear error with **Try again** |
| Pledge and total count | `POST /api/pledges`, `GET /api/pledges/count` | Pledge is not recorded; error with **Try again** |
| Lessons, other games, myths, emergency, about, achievements | Frontend only | Work normally |

---

## 11. Pages and routes

| Page | Route |
|---|---|
| Home | `/` |
| Learn dashboard | `/learn` |
| Road Safety Fundamentals | `/fundamentals` |
| Traffic Rules | `/traffic-rules` |
| Traffic Signs | `/traffic-signs` |
| Helmet and Seatbelt Awareness | `/helmet-seatbelt` |
| Pedestrian Safety | `/pedestrian-safety` |
| Traffic Signals | `/traffic-signals` |
| Accident Prevention | `/accident-prevention` |
| Road Safety in Different Conditions | `/road-conditions` |
| Senior Citizen and Disability Safety | `/inclusive-safety` |
| Emergency Help | `/emergency-help` |
| Myths vs Facts | `/myths-vs-facts` |
| Awareness Campaigns | `/campaigns` |
| Safety Games hub | `/games` |
| Guess the Sign | `/games/sign-challenge` |
| Traffic Signal Challenge | `/games/signal` |
| Spot the Mistake | `/games/spot-mistake` |
| What Would You Do? | `/games/what-would-you-do` |
| Road Safety Quiz | `/games/quiz` |
| Achievements | `/achievements` |
| About RoadWise | `/about` |
| Admin (not in the menu) | `/admin` |
| Not found | any other address |

---

## 12. REST API summary

Full details, request and response examples, and error format are in `backend/docs/API.md`.

**Public**

| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/api/signs` | All signs |
| GET | `/api/signs/{id}` | One sign |
| GET | `/api/signs/category/{category}` | Signs in a category |
| GET | `/api/quizzes` | Quiz questions (no correct answers included) |
| GET | `/api/quizzes/{id}` | One question |
| GET | `/api/quizzes/category/{category}` | Questions in a topic |
| POST | `/api/quizzes/submit` | Submit answers, get score and explanations |
| GET | `/api/tips` | All tips |
| GET | `/api/tips/random` | One random tip |
| GET | `/api/tips/category/{category}` | Tips in a category |
| GET | `/api/campaigns` | All campaigns |
| GET | `/api/campaigns/upcoming` | Upcoming campaigns |
| POST | `/api/pledges` | Record a pledge (anonymous) |
| GET | `/api/pledges/count` | Total pledges |

**Admin (HTTP Basic login required)**

| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/api/admin/me` | Check login |
| GET | `/api/admin/stats` | Counts for the dashboard |
| POST, PUT, DELETE | `/api/admin/signs`, `/api/admin/signs/{id}` | Manage signs |
| GET, POST, PUT, DELETE | `/api/admin/quizzes`, `/api/admin/quizzes/{id}` | Manage quiz questions |
| POST, PUT, DELETE | `/api/admin/tips`, `/api/admin/tips/{id}` | Manage tips |
| POST, PUT, DELETE | `/api/admin/campaigns`, `/api/admin/campaigns/{id}` | Manage campaigns |

---

## 13. Database

MySQL database name: `roadwise`. The schema is in `database/schema.sql` (a copy of `backend/src/main/resources/db/schema.sql`) and the sample data is in `database/seed.sql`. Tables cover traffic signs, quiz questions and their options, safety tips, awareness campaigns, pledges and the admin user, with primary keys, foreign keys and constraints.

To change or add quiz questions in bulk, edit `tools/seed/quiz-bank.json`, run `node tools/seed/generate-seed.mjs`, then recreate the database.

---

## 14. Running the tests

```bash
cd frontend
npm test                                              # component tests (API mocked)
API_URL=http://localhost:8080 npm run test:contract   # tests against a running API

cd ../backend
mvn test                                              # scoring unit tests

ADMIN_PASSWORD='your_password' backend/scripts/smoke-test.sh   # checks every API endpoint
```

Optional real-browser check: `python3 tools/e2e/e2e.py http://localhost:8080` (needs `pip install playwright` and `playwright install chromium`).

---

## 15. Troubleshooting

| Problem | Likely cause and fix |
|---|---|
| `Connection refused` when starting the backend | MySQL is not running or is on another port. Start it (see Step 2). Check the port with `SHOW VARIABLES LIKE 'port';` and set `DB_URL` if needed. |
| `Access denied for user 'root'@'localhost' (using password: NO)` | `DB_PASSWORD` was not set in this terminal window. Set it and run `mvn spring-boot:run` in the **same** window. Note that PowerShell uses `$env:`, cmd uses `set`, and Mac/Linux use `export`. |
| `Access denied ... (using password: YES)` | The password is wrong. Test with `mysql -u root -p`. |
| `Unknown database 'roadwise'` | Run `CREATE DATABASE roadwise CHARACTER SET utf8mb4;`. |
| `Port 8080 was already in use` | Set `SERVER_PORT=8081` and update `VITE_API_BASE_URL` in `frontend/.env`, then restart `npm run dev`. |
| Site says it cannot reach the server | The backend is not running, or `VITE_API_BASE_URL` is wrong. Restart `npm run dev` after editing `.env`. |
| Browser blocks requests (CORS error) | The frontend is on a port other than 5173 or 4173. Add it to `CORS_ORIGINS`. |
| Admin login always fails | Wrong password. Check the backend log for the generated one, or reset (see the note in section 7). |
| Sample data is missing or old | It loads only on first start. Run `DROP DATABASE roadwise;` and start the backend again. |
| `npm install` fails | Check `node -v` is 18 or newer and that you are inside the `frontend` folder. |

When asking for help, send the **first** `Caused by:` line from the log. It is usually the most useful part.

---

## 16. Putting the project on GitHub safely

Never commit passwords, `.env` files or personal information. Put this `.gitignore` in the `RoadWise` folder:

```gitignore
# Secrets and personal config
.env
.env.*
!.env.example
/backend/application.properties
application-local.properties
application-*.properties
!src/main/resources/application.properties
*.pem
*.key

# Dependencies and build output
node_modules/
dist/
target/

# Editors, OS, logs
.idea/
.vscode/
*.iml
.DS_Store
Thumbs.db
*.log

# Zips and exports
*.zip
```

The `.env.example` files and `src/main/resources/application.properties` are safe to commit, because they contain only placeholders.

**Adding RoadWise to an existing repository** (do not run `git init` again):

```bash
git add RoadWise/
git status                    # read the list: no .env, no application.properties, no node_modules, no .zip
git ls-files RoadWise | grep -E "(^|/)\.env$|backend/application\.properties$|\.zip$|\.pem$|\.key$"   # should print nothing
git commit -m "Add RoadWise road safety awareness platform"
git push
```

If a password was ever committed, **change it immediately**. Deleting the file later does not remove it from the history.

---

## 17. Known limits and honest notes

- **Test coverage:** the frontend is covered by component tests. The Spring Boot backend has a small number of unit tests (scoring) and an API smoke-test script. Run `mvn spring-boot:run` and the smoke test on your own machine to confirm your setup.
- **Progress is stored in the browser only.** There are no visitor accounts or progress sync across devices. Clearing browser data resets badges and progress.
- **Quiz has no instant feedback.** Answers are marked by the server only after you submit, so correct answers never reach the browser early.
- **Content must be checked before a public launch.** The Home statistics, Good Samaritan summary, police hand-signal descriptions, Road Safety Month text, quiz and lesson wording, and campaign dates in the sample data should be verified against official sources. Never publish statistics you have not checked.
- **Emergency number:** the Emergency page shows only **112**. 1033 (the national highway helpline) is still mentioned in one lesson tip and one quiz question. Remove it there if you prefer.
- **Signs are simplified drawings.** The screens draw signs from code. A sign added by an admin without a matching drawing shows a "?" placeholder.
- **Illustrations are drawn in code** in a consistent cartoon style. They are not hand-made artwork.
- **Admin login uses HTTP Basic.** Serve the API over HTTPS if you ever deploy it publicly.
- **Admin screen scope:** it manages signs, quiz questions, tips and campaigns. Lessons, myths and game scenarios are edited in the code.
- **No full accessibility audit** (screen reader, contrast checker) has been done. Keyboard use, labels, focus and reduced-motion support are included.

---

## 18. Sources and credits

Content is written for Indian roads. Check and credit official sources wherever facts or statistics are used, such as:

- Ministry of Road Transport and Highways (MoRTH): https://morth.nic.in
- 112 India, Emergency Response Support System: https://112.gov.in
- Press Information Bureau (PIB): https://pib.gov.in
- Official Good Samaritan guidelines published by the Government of India

Created as a Youth Red Cross / Social Service awareness project.

*Drive carefully. Walk carefully. Every choice matters.*