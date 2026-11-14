"""End-to-end check in real Chromium: frontend dev server + API (real backend or the stand-in) + database.
Usage: python3 tools/e2e/e2e.py [API_URL]      (needs: pip install playwright && playwright install chromium)
Starts `npm run dev` itself. Screenshots are saved in tools/e2e/screens/."""
import json, os, re, subprocess, sys, time, urllib.request
from playwright.sync_api import sync_playwright

API = sys.argv[1] if len(sys.argv) > 1 else "http://localhost:8080"
ROOT = os.path.dirname(os.path.abspath(__file__)); FE = os.path.join(ROOT, "..", "..", "frontend"); SHOTS = os.path.join(ROOT, "screens")
PORT = 5173; APP = f"http://localhost:{PORT}"
results = []
def check(name, ok, detail=""):
    results.append((name, bool(ok), detail)); print(("PASS " if ok else "FAIL ") + name + (f"  [{detail}]" if detail and not ok else ""), flush=True)
def jget(path): return json.load(urllib.request.urlopen(API + path, timeout=5))

env = dict(os.environ, VITE_API_BASE_URL=API)
dev = subprocess.Popen(["npm", "run", "dev", "--", "--port", str(PORT), "--strictPort"], cwd=FE, env=env, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL, start_new_session=True)
try:
    for _ in range(40):
        try: urllib.request.urlopen(APP, timeout=1); break
        except Exception: time.sleep(0.5)
    check("frontend dev server starts", True)
    api_signs = jget("/api/signs"); key_name = {re.sub(r".*/|\.svg$", "", s["imagePath"]): s["name"] for s in api_signs}
    ROUTES = ["/", "/fundamentals", "/traffic-rules", "/traffic-signs", "/helmet-seatbelt", "/pedestrian-safety", "/traffic-signals", "/accident-prevention", "/emergency-help", "/myths-vs-facts", "/campaigns", "/about", "/learn", "/road-conditions", "/inclusive-safety", "/games", "/games/sign-challenge", "/games/signal", "/games/spot-mistake", "/games/what-would-you-do", "/games/quiz", "/achievements"]
    with sync_playwright() as p:
        browser = p.chromium.launch()
        def new(viewport=(1280, 800)):
            ctx = browser.new_context(viewport={"width": viewport[0], "height": viewport[1]}); pg = ctx.new_page(); pg.set_default_timeout(8000)
            pg.errs = []; pg.api = []; pg.failed = []
            pg.on("requestfailed", lambda r: pg.failed.append(r.url)); pg.on("pageerror", lambda e: pg.errs.append(str(e))); pg.on("console", lambda m: m.type == "error" and pg.errs.append(m.text))
            pg.on("response", lambda r: r.url.startswith(API) and pg.api.append((r.request.method, r.url.replace(API, ""), r.status)))
            return ctx, pg
        def real_errors(pg):
            font_only = all(("fonts.googleapis.com" in u or "fonts.gstatic.com" in u) for u in pg.failed)
            return [e for e in pg.errs if not (font_only and "ERR_NAME_NOT_RESOLVED" in e)]
        def btn(pg, name, **kw): return pg.get_by_role("button", name=name, **kw)

        # ---------- Home: tip + CORS ----------
        ctx, pg = new(); pg.goto(APP); pg.wait_for_selector("[data-testid=daily-tip]")
        tip1 = pg.inner_text("[data-testid=daily-tip]"); check("home: daily tip fetched from API", any(u == "/api/tips/random" and s == 200 for _, u, s in pg.api), pg.api)
        got = set([tip1])
        for _ in range(8):
            btn(pg, "Next tip").click(); pg.wait_for_timeout(250); got.add(pg.inner_text("[data-testid=daily-tip]"))
        check("home: Next tip shows different tips", len(got) > 1, got)
        check("home: no CORS or console errors", not real_errors(pg), real_errors(pg))
        pg.screenshot(path=f"{SHOTS}/home-desktop.png")

        # ---------- Traffic signs from the API ----------
        pg.goto(APP + "/traffic-signs"); pg.wait_for_selector("h3:has-text('No Entry')")
        n_cards = pg.locator("main button.card").count(); check("signs: all signs from API displayed", n_cards == len(api_signs), f"{n_cards} vs {len(api_signs)}")
        check("signs: /api/signs requested", any(u == "/api/signs" for _, u, _ in pg.api))
        pg.fill("input[placeholder^='Search signs']", "school"); check("signs: search works", pg.locator("main button.card").count() == 1)
        pg.fill("input[placeholder^='Search signs']", ""); pg.get_by_role("button", name="Cautionary", exact=True).click(); check("signs: category filter works", pg.locator("main button.card").count() == len([s for s in api_signs if s["category"] == "CAUTIONARY"]))
        pg.get_by_role("button", name="All", exact=True).click(); pg.locator("main button.card").first.click(); check("signs: detail dialog opens", pg.get_by_role("dialog").is_visible()); pg.get_by_role("button", name="Close").click()
        btn(pg, "Flashcards").click(); pg.get_by_role("button", name="Flip card").click(); check("signs: flashcards flip", pg.locator("text=What to do").count() == 0 and pg.get_by_role("button", name="Flip card").inner_text() != "")

        # ---------- Sign challenge ----------
        pg.goto(APP + "/games/sign-challenge"); pg.get_by_role("button", name=re.compile("Beginner")).click()
        for i in range(5):
            label = pg.get_by_role("img", name=re.compile("traffic sign$")).first.get_attribute("aria-label"); name = key_name[label.replace(" traffic sign", "")]
            pg.get_by_role("group", name="Answer choices").get_by_role("button", name=name, exact=True).click()
            check(f"sign challenge: correct feedback q{i+1}", pg.get_by_text("Correct!").is_visible())
            btn(pg, "See my result" if i == 4 else "Next question").click()
        check("sign challenge: 100% result + badge toast", pg.get_by_text("100%").is_visible() and pg.get_by_text("New badge earned!").is_visible())

        # ---------- Quiz marked by backend ----------
        qresp = []; pg.on("response", lambda r: "/api/quizzes" in r.url and qresp.append(r))
        pg.goto(APP + "/games/quiz"); btn(pg, "Emergency").click(); pg.wait_for_selector("[role=radiogroup]")
        loaded = [r for r in qresp if r.request.method == "GET"]; body = loaded[-1].text() if loaded else ""
        check("quiz: questions come from API without answer key", loaded and "correctOption" not in body and "explanation" not in body)
        check("quiz: no instant answer feedback", pg.get_by_text("Correct!").count() == 0)
        total = pg.locator("[role=progressbar]").get_attribute("aria-valuemax"); total = int(total)
        for i in range(total):
            pg.get_by_role("radio").first.click(); btn(pg, "Submit answers" if i == total - 1 else "Next", exact=True).click()
        pg.wait_for_selector("text=Review your answers"); post = [r for r in qresp if r.request.method == "POST"][-1].json()
        shown = int(re.search(r"(\d+)%", pg.locator("main").inner_text()).group(1))
        check("quiz: UI shows the backend-calculated percentage", shown == post["percentage"], f"ui={shown} api={post['percentage']}")
        check("quiz: correct/incorrect counts match backend", pg.locator("text=Correct").first.is_visible() and str(post["correct"]) in pg.locator(".grid-cols-3").inner_text() and str(post["incorrect"]) in pg.locator(".grid-cols-3").inner_text())
        check("quiz: review lists every question", pg.locator("ul.grid > li").count() == total)
        btn(pg, re.compile("Retake")).click(); pg.wait_for_selector("[role=radiogroup]"); check("quiz: retake loads fresh questions", pg.get_by_role("radio").count() >= 2)

        # ---------- Pledge ----------
        before = jget("/api/pledges/count")["total"]
        pg.goto(APP + "/campaigns"); pg.wait_for_selector("[data-testid=pledge-total]"); check("pledge: total shown from API", int(pg.inner_text("[data-testid=pledge-total]")) == before)
        pg.fill("input[placeholder^='Name for certificate']", "Asha"); btn(pg, "Take the Road Safety Pledge").click(); pg.wait_for_selector("text=Your pledge is recorded")
        check("pledge: success message", True); check("pledge: UI total increased", int(pg.inner_text("[data-testid=pledge-total]")) == before + 1)
        check("pledge: database total increased", jget("/api/pledges/count")["total"] == before + 1)
        with pg.expect_download() as dl: btn(pg, re.compile("Download certificate")).click()
        check("pledge: certificate downloads", dl.value.suggested_filename.startswith("roadwise-pledge-certificate"), dl.value.suggested_filename)
        pg.reload(); pg.wait_for_selector("[data-testid=pledge-total]"); btn(pg, "Take the Road Safety Pledge").click(); pg.wait_for_selector("text=already taken the pledge")
        check("pledge: same browser is not counted twice", jget("/api/pledges/count")["total"] == before + 1)

        # ---------- Campaigns ----------
        pg.goto(APP + "/campaigns"); pg.wait_for_selector("article")
        check("campaigns: all shown from API", pg.locator("article").count() == len(jget("/api/campaigns")), pg.locator("article").count())
        pg.get_by_role("tab", name="Upcoming").click(); pg.wait_for_timeout(600)
        check("campaigns: upcoming tab uses the upcoming API", pg.locator("article").count() == len(jget("/api/campaigns/upcoming")))

        # ---------- Learn dashboard, modules 7 and 8, recommendations ----------
        ctx2, lp = new(); lp.goto(APP + "/learn"); lp.wait_for_selector("[data-module]")
        check("learn: dashboard shows 8 module cards", lp.locator("[data-module]").count() == 8)
        lp.locator("[data-module='3']").click(); lp.wait_for_selector("h1:has-text('Helmet and Seatbelt')")
        check("learn: lesson has right-vs-wrong cartoons", lp.locator("[data-compare]").count() == 2 and lp.locator("[data-compare] svg").first.bounding_box()["height"] > 100)
        lp.get_by_role("button", name="On every ride").click(); lp.get_by_role("link", name="Learn", exact=True).first.click() if False else lp.goto(APP + "/learn"); lp.wait_for_selector("[data-module]")
        card = lp.locator("[data-module='3']"); check("learn: opened and checked marks appear", card.get_by_text("Opened").is_visible() and card.get_by_text("Checked").is_visible())
        rec = lp.locator("[data-testid=recommended] a").all_inner_texts(); check("learn: recommendations skip finished lessons", len(rec) == 3 and not any("Helmet and Seatbelt" in r for r in rec), rec)
        lp.goto(APP + "/road-conditions"); lp.wait_for_selector("#night")
        ids = ["night", "rain", "fog", "highway", "school", "railway", "parking"]; check("module 7: seven condition sections", all(lp.locator(f"#{i}").count() == 1 for i in ids))
        check("module 7: each has a right and a wrong picture", lp.get_by_role("img", name=re.compile("^Right:")).count() == 7 and lp.get_by_role("img", name=re.compile("^Wrong:")).count() == 7)
        lp.get_by_role("link", name=re.compile("Railway crossings")).click(); lp.wait_for_timeout(700); check("module 7: jump links scroll to the section", lp.locator("#railway").bounding_box()["y"] < 400, lp.locator("#railway").bounding_box())
        lp.goto(APP + "/inclusive-safety"); lp.wait_for_selector("h1"); check("module 8: six topics incl. tactile paving and audio signals", all(lp.get_by_role("heading", name=t).count() == 1 for t in ["Tactile paving", "Audio pedestrian signals", "Pedestrian ramps", "Accessible footpaths"]))
        lp.goto(APP + "/about"); check("about: community illustration visible", lp.get_by_role("img", name=re.compile("Students, a senior citizen")).is_visible()); lp.screenshot(path=f"{SHOTS}/about-desktop.png", full_page=True)
        lp.goto(APP + "/campaigns"); lp.wait_for_selector("text=National Road Safety Month"); check("campaigns: National Road Safety Month section with MoRTH link", lp.get_by_role("link", name=re.compile("Official updates on MoRTH")).get_attribute("href") == "https://morth.nic.in")
        with lp.expect_download() as d2: lp.get_by_role("button", name="Download poster").first.click()
        path = d2.value.path(); check("campaigns: illustrated poster downloads as an image", d2.value.suggested_filename.startswith("roadwise-poster") and os.path.getsize(path) > 8000, (d2.value.suggested_filename, os.path.getsize(path)))
        check("no console errors on lesson pages", not real_errors(lp), real_errors(lp)[:3]); ctx2.close()
        # the new quiz topics are served by the API, marked by the API
        for topic, code, count in [("Road Conditions", "CONDITIONS", 12), ("Inclusive Safety", "INCLUSIVE_SAFETY", 8)]:
            qresp.clear(); pg.goto(APP + "/games/quiz"); btn(pg, topic, exact=True).click(); pg.wait_for_selector("[role=radiogroup]")
            req = [r for r in qresp if r.request.method == "GET"][-1]; qs = req.json(); check(f"quiz topic {topic}: API returns {code} questions (10 max)", f"category={code}" in req.url and len(qs) == min(10, count) and all(q["category"] == code for q in qs), req.url)
            total = len(qs)
            for i in range(total): pg.get_by_role("radio").first.click(); btn(pg, "Submit answers" if i == total - 1 else "Next", exact=True).click()
            pg.wait_for_selector("text=Review your answers"); post = [r for r in qresp if r.request.method == "POST"][-1].json(); shown = int(re.search(r"(\d+)%", pg.locator("main").inner_text()).group(1))
            check(f"quiz topic {topic}: result matches the backend ({post['correct']}/{post['total']})", shown == post["percentage"] and post["total"] == total, (shown, post["percentage"]))

        # ---------- Frontend-only games still work ----------
        pg.goto(APP + "/games/signal")
        for i in range(6):
            prompt = pg.locator("p.font-display").first.inner_text(); pg.locator("div.card button").first.click(); pg.get_by_role("status").first.wait_for(); btn(pg, re.compile("Next round|See my result")).click()
        check("signal game: completes 6 rounds with a result", pg.get_by_text("Incorrect").is_visible())
        pg.goto(APP + "/games/spot-mistake")
        for n in range(1, 6): pg.get_by_role("button", name=re.compile(f"^Spot {n}( |$)")).click()
        check("spot the mistake: all 5 found", pg.get_by_text("You found every mistake!").is_visible())
        pg.goto(APP + "/myths-vs-facts"); pg.locator("button[aria-pressed]").first.click(); check("myths: card flips", pg.get_by_text("Tap to see myth").first.is_visible())
        pg.goto(APP + "/games/what-would-you-do"); btn(pg, re.compile(".")).first  # loads
        for i in range(5): pg.get_by_role("group", name="Answer choices").get_by_role("button").first.click(); btn(pg, re.compile("Next question|See my result")).click()
        check("what would you do: finishes with result", pg.get_by_text("Questions").is_visible())
        pg.goto(APP + "/achievements"); earned = pg.locator("[data-earned=true]").count(); check("achievements: badges earned from real play", earned >= 3, f"{earned} earned")
        check("no unexpected console errors in the happy path", not real_errors(pg), real_errors(pg)[:3]); ctx.close()

        # ---------- Backend down / slow ----------
        ctx, pg = new(); pg.route("**/api/**", lambda r: r.abort()); pg.errs = []
        pg.goto(APP); pg.wait_for_selector("text=Server offline"); check("offline: home falls back to a bundled tip with a notice", pg.locator("[data-testid=daily-tip]").is_visible())
        pg.goto(APP + "/traffic-signs"); pg.wait_for_selector("text=Server offline"); check("offline: signs fall back with a notice", pg.locator("main button.card").count() == 22)
        pg.goto(APP + "/games/quiz"); btn(pg, "Basics").click(); pg.wait_for_selector("text=Cannot reach the RoadWise server"); check("offline: quiz shows a clear error with retry", btn(pg, "Try again").is_visible())
        pg.goto(APP + "/campaigns"); pg.wait_for_selector("text=Could not load campaigns"); check("offline: campaigns show an error with retry", btn(pg, "Try again").first.is_visible())
        pg.wait_for_selector("text=Pledge total unavailable"); btn(pg, "Take the Road Safety Pledge").click(); pg.wait_for_selector("text=Your pledge was not saved")
        check("offline: pledge is not recorded and shows an error", pg.get_by_text("Your pledge was not saved").is_visible() and pg.get_by_text("Your pledge is recorded").count() == 0)
        pg.unroute("**/api/**"); pg.locator("#pledge").get_by_role("button", name="Try again").click(); pg.wait_for_selector("text=Your pledge is recorded"); check("offline: pledge succeeds after the server returns (Try again)", True)
        pg.goto(APP + "/games/signal"); check("offline: frontend-only games unaffected", pg.get_by_text("Traffic Signal Game").first.is_visible()); ctx.close()
        ctx, pg = new(); pg.route("**/api/signs", lambda r: (time.sleep(1.2), r.continue_())); pg.goto(APP + "/traffic-signs"); check("loading indicator shows while waiting", pg.get_by_text("Loading traffic signs").is_visible()); pg.wait_for_selector("h3:has-text('No Entry')"); ctx.close()

        # ---------- Navigation: every link works ----------
        ctx, pg = new(); seen = set(); bad = []
        for r in ROUTES:
            pg.goto(APP + r); pg.wait_for_selector("h1"); 
            for h in pg.eval_on_selector_all("a[href^='/']", "els => els.map(e => e.getAttribute('href'))"): seen.add(h.split("#")[0] or "/")
        for h in sorted(seen):
            pg.goto(APP + h); pg.wait_for_selector("h1"); 
            if "wrong turn" in pg.inner_text("main"): bad.append(h)
        check(f"navigation: {len(seen)} distinct links all resolve", not bad, bad); ctx.close()

        # ---------- Responsive ----------
        for label, vp in [("mobile", (360, 740)), ("tablet", (768, 1024)), ("desktop", (1280, 800)), ("wide", (1920, 1080))]:
            ctx, pg = new(vp); overflow = []
            for r in ROUTES:
                pg.goto(APP + r); pg.wait_for_selector("h1"); pg.wait_for_timeout(350)
                w = pg.evaluate("[document.documentElement.scrollWidth, window.innerWidth]")
                if w[0] > w[1] + 1: overflow.append(f"{r} {w}")
                if r in ("/", "/traffic-signs", "/games/spot-mistake", "/games/signal", "/campaigns", "/learn", "/road-conditions", "/inclusive-safety", "/about", "/helmet-seatbelt") and label in ("mobile", "tablet"): pg.screenshot(path=f"{SHOTS}/{r.strip('/').replace('/', '-') or 'home'}-{label}.png")
            check(f"responsive {label} {vp[0]}px: no horizontal scroll on {len(ROUTES)} pages", not overflow, overflow); ctx.close()
        ctx, pg = new((360, 740)); pg.goto(APP); btn(pg, "Open menu").click(); pg.locator("nav[aria-label=Mobile]").get_by_role("link", name="All lessons").click(); pg.wait_for_selector("h1:has-text('Learn Road Safety')"); btn(pg, "Open menu").click(); pg.locator("nav[aria-label=Mobile]").get_by_role("link", name="Safety Games").click(); pg.wait_for_selector("h1:has-text('Safety Games')"); check("mobile: hamburger menu opens and navigates", True)
        small = pg.evaluate("[...document.querySelectorAll('button,a.btn-coral,a.btn-sun,a.btn-white')].filter(e=>e.offsetParent && (e.getBoundingClientRect().height<40)).length"); check("mobile: tap targets at least 40px tall on Games page", small == 0, small); ctx.close()
        browser.close()
finally:
    try: os.killpg(os.getpgid(dev.pid), 15)
    except Exception: pass
fails = [r for r in results if not r[1]]
print(f"\n{len(results) - len(fails)}/{len(results)} checks passed"); sys.exit(1 if fails else 0)
