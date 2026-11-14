# Stand-in API (testing aid, not part of the product)
Follows `backend/docs/API.md` (public endpoints only) and reads the same MySQL/MariaDB database, so the frontend can be
tested end to end on a machine that cannot build the Spring Boot project. It does not replace the real backend.
```
cd tools/mock-api && npm install && DB_USER=root DB_PASSWORD=... node server.mjs      # port 8080
```
Settings: `PORT`, `DB_HOST`, `DB_USER`, `DB_PASSWORD`, `DB_NAME`, `CORS_ORIGINS`.
