# salon

The Zero to Hired Sprint 9 starter: a booking app for Bisi's Salon, a hair salon in Surulere, Lagos. Customers book
a style at a free time. Mrs Bisi logs in to see the day's bookings. Bisi's Salon, Mrs Bisi, her email and her
password are made up for the course.

Story 2 of `SPEC.md` (a customer books a style at a free slot) is already built. You write its Playwright tests in
Lesson B9.3, and Claude adds story 5 (the Cancel button) in Lesson T9.1.

## Start

You need Node 22.17 or newer, and two free Neon projects: `salon` for the app, and `salon-test` for the tests.

```
git clone https://github.com/wilsonowilson/salon-starter.git
cd salon-starter
npm install
cp .env.example .env
```

Open `.env` and fill it in:

| Line | What to put there |
|---|---|
| `DATABASE_URL=` | The connection string of your `salon` Neon project |
| `TEST_DATABASE_URL=` | The connection string of your `salon-test` Neon project. Only the tests use it. |
| `ORIGIN=http://localhost:5173` | Leave it as it is on your computer |
| `BETTER_AUTH_SECRET=` | Run `npx auth secret` and put the line it prints here |
| `RESEND_API_KEY=` | Leave it empty |

`.env` holds secrets. It is in `.gitignore`, so Git never sends it to GitHub.

Then make the tables, add the four styles and Mrs Bisi's account, and start the app:

```
npm run db:push
npm run db:seed
npm run db:push:test
npm run dev
```

Open `http://localhost:5173` in Chrome. To see the day's bookings, log in as Mrs Bisi: `bisi@bisisalon.example`,
password `jollof123` (an example password, for this course only).

## Tests

| Command | What it runs |
|---|---|
| `npm run test:e2e` | The Playwright tests (files that end in `.e2e.js`). The first run downloads Chromium, about 330 MB: use Wi-Fi. |
| `npm test` | The Vitest test (`src/lib/moments.test.js`), then the Playwright tests. It can take 3 minutes. |

Before the Playwright tests, `tests/empty-test-database.js` empties the bookings in the test database and puts back
the four styles. Your own bookings in `salon` are never touched.

## What is inside

| File | What it does |
|---|---|
| `SPEC.md` | The five user stories, and the checks for story 2 |
| `TASKS.md` | Story 2's tasks, and task 7 for Claude |
| `CLAUDE.md` | The rules Claude reads every time it starts |
| `src/lib/moments.js` | The slots, and `showMoment`, `showDay` and `showTime`: a moment as a clock in Lagos shows it |
| `src/routes/book/` | The booking page and its action |
| `src/routes/booked/[id]/` | The Booked page |
| `src/routes/day/` | Mrs Bisi's day view (log in first) |
| `src/routes/demo/playwright/` | The demo page and the demo test that Playwright's setup made |

## Which lessons use it

Sprint 9: "A test that clicks for you" (B9.3), "Give Claude a task list" (T9.1), "Review a change before you keep
it" (T9.2), "Build your flagship" (B9.4) and the Sprint 9 check. The Sprint 11 check clones the branches `check-bug` and `check-bug-2`.
