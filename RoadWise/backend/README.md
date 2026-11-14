# RoadWise backend (Spring Boot 3 + MySQL)

Java 17+, Maven 3.9+, MySQL 8.0.16+ (MariaDB 10.5+ also works).

## Run
```bash
# 1. Start MySQL. The database "roadwise" is created automatically if your MySQL user may create databases.
#    Otherwise run:  CREATE DATABASE roadwise CHARACTER SET utf8mb4;
# 2. Set your settings (all optional except the DB password if you have one)
export DB_USERNAME=root
export DB_PASSWORD=your_mysql_password
export ADMIN_PASSWORD='choose-a-strong-password'   # 8+ characters. If omitted, a random one is printed once in the log.
# 3. Start
mvn spring-boot:run
```
The API is at http://localhost:8080 (the React app on :5173 is already allowed by CORS).

On the **first start only** the app loads the sample data from `db/seed.sql` and creates the admin user (`admin` by default).
Tables come from `db/schema.sql`, which runs on every start and is safe to repeat.

## Check it works
```bash
curl http://localhost:8080/api/signs/1
curl http://localhost:8080/api/pledges/count
ADMIN_PASSWORD='choose-a-strong-password' ./scripts/smoke-test.sh     # 29 automatic checks
```
`mvn test` runs the unit tests. Use `mvn package` to build `target/roadwise-backend-0.1.0.jar`, then `java -jar target/roadwise-backend-0.1.0.jar`.

## Settings
| Variable | Default | Meaning |
|---|---|---|
| `DB_URL` | `jdbc:mysql://localhost:3306/roadwise?...` | JDBC URL |
| `DB_USERNAME` / `DB_PASSWORD` | `root` / empty | MySQL login |
| `ADMIN_USERNAME` / `ADMIN_PASSWORD` | `admin` / random | First-run admin account |
| `CORS_ORIGINS` | `http://localhost:5173,http://127.0.0.1:5173,http://localhost:4173` | Allowed frontend origins |
| `SEED_ENABLED` | `true` | Load sample data on first run |
| `SERVER_PORT` | `8080` | |

`application.properties.example` is a copy of the settings file. Never commit real passwords.

## Structure
```
backend/
├── pom.xml, application.properties.example
├── scripts/smoke-test.sh
├── docs/API.md              full endpoint reference
└── src/main/
    ├── java/com/roadwise/
    │   ├── controller/      REST endpoints (public + /api/admin)
    │   ├── service/         business rules, marking quizzes
    │   ├── repository/      Spring Data JPA
    │   ├── entity/          JPA entities and enums
    │   ├── dto/             request/response records with validation
    │   ├── config/          security, CORS, first-run setup
    │   ├── exception/       error handling
    │   └── util/            enum parsing, scoring
    └── resources/db/        schema.sql, seed.sql
```
Seed data is generated from `tools/seed` (59 quiz questions in 8 topics). It loads only on the very first start, so after changing the seed file recreate the database.

Tables: `traffic_signs`, `quiz_questions`, `quiz_options` (child of questions), `safety_tips`, `awareness_campaigns`, `pledges`, `users` (admins only). A `user_progress` table was left out on purpose: progress still lives in the browser, and visitor accounts were not part of this stage.

## Notes
- Public GET endpoints never return the answer key. Marking happens only in `POST /api/quizzes/submit`.
- Admin uses HTTP Basic over a stateless API with BCrypt passwords. Use HTTPS when deploying.
- Seed campaign dates are sample dates for the demo. Replace them with real event dates in the admin API.
- `database/` at the project root holds copies of `schema.sql` and `seed.sql` for loading by hand: `mysql roadwise < database/schema.sql && mysql roadwise < database/seed.sql`.
