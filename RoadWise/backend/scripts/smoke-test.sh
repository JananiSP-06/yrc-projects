#!/usr/bin/env bash
# Exercises the running API. Usage: ADMIN_PASSWORD=yourpass ./scripts/smoke-test.sh [http://localhost:8080]
BASE=${1:-http://localhost:8080}; ADMIN="admin:${ADMIN_PASSWORD:?set ADMIN_PASSWORD}"; fail=0
t() { # name expected_status method path [curl args...]
  local name=$1 want=$2 m=$3 p=$4; shift 4
  got=$(curl -s -o /tmp/rw_body -w '%{http_code}' -X "$m" "$BASE$p" "$@"); if [ "$got" = "$want" ]; then echo "PASS $name ($got)"; else echo "FAIL $name: wanted $want got $got"; cat /tmp/rw_body; echo; fail=1; fi; }
J='Content-Type: application/json'
t "signs list"            200 GET  /api/signs
t "signs by category"     200 GET  /api/signs/category/cautionary
t "sign by id"            200 GET  /api/signs/1
t "sign missing"          404 GET  /api/signs/99999
t "bad category"          400 GET  /api/signs/category/nonsense
t "quiz list"             200 GET  "/api/quizzes?category=emergency&limit=3"
t "quiz hides answers"    200 GET  /api/quizzes/2; grep -q correctOption /tmp/rw_body && { echo "FAIL answer key leaked"; fail=1; } || echo "PASS no answer key in public quiz"
t "quiz submit"           200 POST /api/quizzes/submit -H "$J" -d '{"answers":[{"questionId":2,"selectedOption":0}]}'
t "quiz submit empty"     400 POST /api/quizzes/submit -H "$J" -d '{"answers":[]}'
t "quiz submit unknown"   400 POST /api/quizzes/submit -H "$J" -d '{"answers":[{"questionId":99999,"selectedOption":0}]}'
t "tips random"           200 GET  /api/tips/random
t "tips by category"      200 GET  /api/tips/category/helmet
t "campaigns"             200 GET  /api/campaigns
t "campaigns upcoming"    200 GET  /api/campaigns/upcoming
t "pledge"                201 POST /api/pledges
t "pledge count"          200 GET  /api/pledges/count
t "admin needs login"     401 POST /api/admin/signs -H "$J" -d '{}'
t "admin wrong password"  401 GET  /api/admin/stats -u admin:wrong
t "admin stats"           200 GET  /api/admin/stats -u "$ADMIN"
t "admin validation"      400 POST /api/admin/signs -u "$ADMIN" -H "$J" -d '{"name":""}'
t "admin create sign"     201 POST /api/admin/signs -u "$ADMIN" -H "$J" -d '{"name":"Smoke Test Sign","category":"informatory","description":"Test","imagePath":"/assets/signs/test.svg","safetyInstruction":"Test"}'
id=$(sed -E 's/.*"id":([0-9]+).*/\1/' /tmp/rw_body)
t "admin duplicate sign"  409 POST /api/admin/signs -u "$ADMIN" -H "$J" -d '{"name":"smoke test sign","category":"informatory","description":"x","imagePath":"/a.svg","safetyInstruction":"x"}'
t "admin update sign"     200 PUT  /api/admin/signs/$id -u "$ADMIN" -H "$J" -d '{"name":"Smoke Test Sign 2","category":"mandatory","description":"Test","imagePath":"/assets/signs/test.svg","safetyInstruction":"Test"}'
t "admin delete sign"     204 DELETE /api/admin/signs/$id -u "$ADMIN"
t "admin quiz bad answer" 400 POST /api/admin/quizzes -u "$ADMIN" -H "$J" -d '{"question":"Q?","category":"basics","difficulty":"easy","options":["a","b"],"correctOption":5,"explanation":"e"}'
t "admin quiz create"     201 POST /api/admin/quizzes -u "$ADMIN" -H "$J" -d '{"question":"Smoke question?","category":"basics","difficulty":"easy","options":["a","b","c"],"correctOption":1,"explanation":"e"}'
qid=$(sed -E 's/.*"id":([0-9]+).*/\1/' /tmp/rw_body)
t "admin quiz shrink opts" 200 PUT /api/admin/quizzes/$qid -u "$ADMIN" -H "$J" -d '{"question":"Smoke question?","category":"basics","difficulty":"hard","options":["x","y"],"correctOption":0,"explanation":"e"}'
t "admin quiz delete"     204 DELETE /api/admin/quizzes/$qid -u "$ADMIN"
[ $fail = 0 ] && echo "ALL PASSED" || { echo "SOME FAILED"; exit 1; }
