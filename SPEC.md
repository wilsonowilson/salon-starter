# Bisi's Salon: spec

Mrs Bisi owns a small hair salon in Surulere, Lagos. Her problem, in her own words: "Customers call me to book, I
write it in my notebook, and sometimes two people come for the same time."

A **slot** is a start time that Mrs Bisi offers: 09:00, 11:00, 13:00, 15:00 or 17:00. A **free slot** is one that
nobody has booked yet.

## User stories

1. As a customer, I want to see the free slots for a day, so that I can choose one that suits me.
2. As a customer, I want to book a style at a free slot, so that I do not have to call and wait.
3. As Mrs Bisi, I want to see the day's bookings in time order, so that I know who is coming and when.
4. As Mrs Bisi, I want a slot to disappear once it is booked, so that two people never come for the same time.
5. As Mrs Bisi, I want to cancel a booking, so that the slot is free again.

## Story 2: Done when

| Check | What I do | What I see |
|---|---|---|
| 1 | I choose a day and tap **Show free slots**. I choose a style and a free slot, type my name and phone number, and tap **Book**. | 'Booked', with the style, the date and the time, as a clock in Lagos shows it. |
| 2 | I leave my name empty and tap **Book**. | 'Enter your name.' under the name box. Nothing is saved. |
| 3 | I open a day where 11:00 is already booked. | 11:00 is not in the list of free slots. |
| 4 | I open today, choose a time that is already over, and tap **Book**. | 'That time is already over. Choose a later time.' Nothing is saved. |
