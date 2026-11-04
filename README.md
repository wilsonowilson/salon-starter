# salon

An example flagship for Zero to Hired: a booking app for Bisi's Salon, a hair salon in Surulere, Lagos. Customers book
a style at a free time. Mrs Bisi logs in to see the day's bookings and to cancel one. Bisi's Salon, Mrs Bisi, her
email and her password are made up for the course.

This branch, `end-of-sprint-9`, is the salon app as a finished flagship looks at the end of Sprint 9: every story in
`SPEC.md` is built, and its tests pass.

## You are starting at Sprint 10

Use this copy if you start the course at Sprint 10, 11 or 12 and you do not have your own flagship from Sprint 9. In
Sprint 10 you make it look right, fast on a cheap phone, usable by everyone, installable, and able to take payment.
Do those lessons on this app, or on your own flagship when you have one.

### What this copy contains

- `SPEC.md`: the five user stories, and the four checks for story 2.
- `TASKS.md`: every task done and ticked, with who did it (me or Claude), including the review of Claude's task.
- Stories 1, 2 and 4: a customer opens a day, sees only the free slots, and books a style. A booked slot is no longer
  free. The Booked page shows the time as a clock in Lagos shows it (`showMoment` in `src/lib/moments.js`).
- Story 3: Mrs Bisi logs in (Better Auth) and sees the day's bookings in time order at `/day`.
- Story 5: a Cancel button on each booking (a named action, `?/cancel`, with `use:enhance`). The action checks
  `locals.user` first, as the review in Lesson T9.2 asks.
- Tests: the Vitest test for `showMoment`, and Playwright tests for the four checks of story 2
  (`src/routes/book/book.e2e.js`) and for stories 3 and 5 (`src/routes/day/day.e2e.js`). They run against their own
  test database.
- `CLAUDE.md`: the rules Claude reads every time it starts (one task, then stop; a new branch; never change the
  `.e2e.js` files; never `npm run db:push`; run `npm test` before it says it is done). `.claude/settings.json` asks
  you before every change.

### Start

You need Node 22.17 or newer, and two free Neon projects: `salon` for the app, and `salon-test` for the tests.

```
git clone --branch end-of-sprint-9 https://github.com/wilsonowilson/salon-starter.git salon
cd salon
npm install
cp .env.example .env
```

Open `.env` and fill it in:

| Line | What to put there |
|---|---|
| `DATABASE_URL=` | The connection string of your `salon` Neon project |
| `TEST_DATABASE_URL=` | The connection string of your `salon-test` Neon project. Only the tests use it. |
| `ORIGIN=http://localhost:5173` | Leave it as it is on your computer. On Netlify: your site's address. |
| `BETTER_AUTH_SECRET=` | Run `npx auth secret` and put the value it prints here |
| `RESEND_API_KEY=` | Leave it empty |

`.env` holds secrets. It is in `.gitignore`, so Git never sends it to GitHub.

Then make the tables in both databases, add the four styles and Mrs Bisi's account, and start the app:

```
npm run db:push
npm run db:seed
npm run db:push:test
npm run dev
```

`npm run db:push` asks a question: press the down arrow once to choose "Yes, I want to execute all statements", then
press Enter. Open `http://localhost:5173` in Chrome and book a style. To see the day's bookings, log in as Mrs Bisi:
`bisi@bisisalon.example`, password `jollof123` (an example password, for this course only).

`npm test` runs every test: `1 passed` for Vitest, then `7 passed` for Playwright. It can take 3 minutes. The first run
downloads Chromium, about 330 MB: use Wi-Fi.

Then open **Lesson 10.1, "Make it look right"**, in the course.

### Make it your own copy

1. On GitHub, make a new empty repository, for example `salon`.
2. In the `salon` folder, run these three commands. Put your own address in the second one.

   ```
   git branch -m main
   git remote set-url origin https://github.com/your-name/salon.git
   git push -u origin main
   ```
3. On Netlify, add the repository as a new project. Before the first deploy, add `DATABASE_URL`, `ORIGIN`,
   `BETTER_AUTH_SECRET` and `RESEND_API_KEY` in the site's environment variables.

Lesson 12.1 starts paid work from a flagship repository with **Use this template**. To use this app for that, open
your own copy's **Settings** on GitHub and tick **Template repository**.

## What is inside

| File | What it does |
|---|---|
| `SPEC.md` | The five user stories, and the checks for story 2 |
| `TASKS.md` | The tasks, all done |
| `CLAUDE.md` | The rules Claude reads every time it starts |
| `src/lib/moments.js` | The slots, and `showMoment`, `showDay` and `showTime`: a moment as a clock in Lagos shows it |
| `src/routes/book/` | The booking page, its action, and `book.e2e.js` (the tests for story 2) |
| `src/routes/booked/[id]/` | The Booked page |
| `src/routes/day/` | Mrs Bisi's day view (log in first), the `cancel` action, and `day.e2e.js` |
| `tests/empty-test-database.js` | Runs before the Playwright tests: empties the bookings, puts back the four styles and Mrs Bisi's account |
| `src/routes/demo/playwright/` | The demo page and the demo test that Playwright's setup made |
