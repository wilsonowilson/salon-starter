# Tasks

Tick a task when its check passes: change `[ ]` to `[x]`.

| # | Task | Check | Who | Done |
|---|---|---|---|---|
| 1 | Add the `bookings` table; push it. | It is in Neon's Tables view. | me | [x] |
| 2 | In `load`, return the styles and the day's free slots. | Log them. | me | [x] |
| 3 | Draw the booking form with only free slots. | Only free slots show. | me | [x] |
| 4a | In the action, validate the form; if a box is wrong, return `fail`. | An empty name shows 'Enter your name.' | me | [x] |
| 4b | In the action, turn the date and the time into one value; insert the row. | One new row in Neon's Tables view. | me | [x] |
| 5 | The Booked page, with `showMoment`. | Check 1 passes. | me | [x] |
| 6 | A Playwright test for check 1. | It passes. | me | [x] |
| 7 | Story 5: a Cancel button on each booking in the day view (a form with `use:enhance`). | A cancelled booking disappears from the day view, and its slot is free again on the booking page. | Claude | [x] |
| 7r | Review of task 7: the `cancel` action checks `locals.user` first (`error(401)`). The Cancel form keeps the day in the address. | Nobody logged in cannot cancel. After a cancel, the same day is still shown. | me | [x] |
| 8 | Playwright tests for checks 2, 3 and 4 of story 2. | They pass. | me | [x] |
| 9 | A Playwright test for stories 3 and 5: the day in time order, then a cancel. | It passes. | me | [x] |
