# RoadWise API

Base URL `http://localhost:8080`. JSON everywhere. Dates are ISO (`2027-01-11`, `2026-11-08T10:15:00`).
Category words are case-insensitive and accept spaces or hyphens: `traffic rules`, `TRAFFIC_RULES`, `traffic-rules`.

**Enums** — Sign category: `MANDATORY CAUTIONARY INFORMATORY` · Quiz category: `BASICS TRAFFIC_RULES HELMET_SEATBELT PEDESTRIAN_SAFETY SIGNALS_SIGNS EMERGENCY CONDITIONS INCLUSIVE_SAFETY` · Difficulty: `EASY MEDIUM HARD` · Tip category: `HELMET SEATBELT PEDESTRIAN CYCLING DRIVING GENERAL` · Campaign category: `ROAD_SAFETY_MONTH HELMET PEDESTRIAN SCHOOL COMPETITION COMMUNITY`.

## Errors
Every error has the same shape. `fieldErrors` appears only for validation problems.
```json
{ "timestamp": "2026-11-08T10:00:00Z", "status": 400, "error": "Bad Request", "message": "Validation failed",
  "path": "/api/admin/signs", "fieldErrors": { "name": "must not be blank" } }
```
`400` bad input · `401` login needed · `403` not allowed · `404` not found · `405` wrong method · `409` conflict (duplicate name etc.) · `500` server problem (details only in the server log).

## Public endpoints (no login)
| Method | Path | Notes |
|---|---|---|
| GET | `/api/signs` | Optional `?category=` and `?search=` (name contains). Sorted by name. |
| GET | `/api/signs/{id}` | |
| GET | `/api/signs/category/{category}` | |
| GET | `/api/quizzes` | Optional `?category=&difficulty=&limit=` (limit 1–50 returns a random sample). **No answers or explanations.** |
| GET | `/api/quizzes/{id}` | |
| GET | `/api/quizzes/category/{category}` | Also accepts `difficulty` and `limit`. |
| POST | `/api/quizzes/submit` | Marks answers on the server. |
| GET | `/api/tips` | Optional `?category=` |
| GET | `/api/tips/random` | 404 if there are no tips. |
| GET | `/api/tips/category/{category}` | |
| GET | `/api/campaigns` | Newest start date first. `status` is `UPCOMING`, `ONGOING` or `COMPLETED`, worked out from today's date. |
| GET | `/api/campaigns/upcoming` | Campaigns starting today or later, soonest first. |
| POST | `/api/pledges` | Body optional. Returns `201` for a new pledge, `200` if that `visitorId` already pledged. |
| GET | `/api/pledges/count` | `{ "total": 12 }` |

### Sign
```json
{ "id": 1, "name": "Stop", "category": "MANDATORY", "description": "You must stop completely at this point.",
  "imagePath": "/assets/signs/stop.svg", "safetyInstruction": "Halt at the stop line. Go only when the way is clear." }
```
### Quiz question (public) — note there is no `correctOption`
```json
{ "id": 2, "question": "Who should wear a seatbelt in a car?", "category": "HELMET_SEATBELT", "difficulty": "EASY",
  "options": ["Only the driver", "Everyone in the car", "Only the front passenger", "Only adults on highways"] }
```
### Submit quiz
Request (1–50 answers; each question once; `selectedOption` is the 0-based position in `options`):
```json
{ "answers": [ { "questionId": 2, "selectedOption": 1 }, { "questionId": 5, "selectedOption": 0 } ] }
```
Response:
```json
{ "total": 2, "correct": 1, "incorrect": 1, "percentage": 50, "message": "Good start. Review the lessons and try again.",
  "details": [ { "questionId": 2, "selectedOption": 1, "correct": true, "correctOption": 1, "explanation": "Rear passengers can be thrown forward without a belt." } ] }
```
Unknown question ids, repeated ids or an option position that does not exist give `400`.
### Pledge
Request (optional; if `visitorId` is missing the server creates a UUID and returns it, so the browser can keep it):
```json
{ "visitorId": "3f2b8c1e-5a4d-4c2e-9d57-0a1b2c3d4e5f" }
```
Response: `{ "visitorId": "...", "pledgedAt": "2026-11-08T10:15:00", "alreadyPledged": false, "totalPledges": 1 }`.
Only the random id and the time are stored. No name, email or IP address.

## Admin endpoints (HTTP Basic, role ADMIN)
Send `Authorization: Basic base64(username:password)`, for example `curl -u admin:PASSWORD ...`.
| Method | Path | Body |
|---|---|---|
| GET | `/api/admin/me` | Checks the login. |
| GET | `/api/admin/stats` | Counts of signs, quiz questions, tips, campaigns and pledges. |
| POST / PUT / DELETE | `/api/admin/signs[/{id}]` | `{ name, category, description, imagePath, safetyInstruction }` |
| GET / POST / PUT / DELETE | `/api/admin/quizzes[/{id}]` | `{ question, category, difficulty, options[2..6], correctOption, explanation }` — GET here **includes** `correctOption` and `explanation`. |
| POST / PUT / DELETE | `/api/admin/tips[/{id}]` | `{ title, description, category, imagePath? }` |
| POST / PUT / DELETE | `/api/admin/campaigns[/{id}]` | `{ title, description, startDate, endDate, category, posterPath? }` |

POST returns `201` and the saved item. PUT replaces the item. DELETE returns `204`. `endDate` cannot be before `startDate`, and `correctOption` must point at one of the options.
