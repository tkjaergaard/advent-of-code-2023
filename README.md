# Advent of Code 2023 🎄

This repositry serves as my collection of answers written in typescript.

The project uses [Bun](https://bun.sh) as runtime.

## Structure

The solvings are placed in the `/days` folder where each day has it's own folder. Each day has it's own test, and utils file to abstract logic.

## Tests

All of the examples for each day has written test case in the respective `index.test.ts` file for the day.

When the day is solved, a test for the correct result is added.

| Day | Name           | Stars | Notes                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| --- | -------------- | ----- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 01  | Trebuchet      | ⭐⭐  | Part two was difficult to solve, due to the fact, that the first number should be found left-to-right but the last number right-to-left. E.g. `eightwoeightwo` is equal to `82`. I started by replacing by it's occurance index, wich gave me `8wo8wo`, but it should have been `8weeigh2`. So on the last number, the last occurence wins vs. the first occurance where the first character. <br><br>The way i ended up solving it, was to pre-/sufix the number with the word to make sure not to break a words. that gave me: `eight8eightow2twoeight8eightwo2two`. Then a simple regex `/[^\d]/ig` to only get the numbers worked like a charm `8282` => `82`. |
| 02  | Cube Conundrum | ⭐⭐  | I found these parts to fairly easy compared to day 1. I quickly created a parser to make the game data into an object format which helped me a lot in the 2nd part.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| 03  | Gear Ratios    | ⭐⭐  | What a mess! I really struggled with this. I spent hours on what I now think was overcomplicating it. I struggled mostly with the second part. For some reason, I just couldn't wrap my head around it. Seeing on the leaderboard that people had solved it in 15 minutes was definitely demotivating 😅. What I ended up struggling the most with was numbers on the same line like `422.729`. Since the adjacency could be diagonal, it ended up becoming one large number instead of two separate ones. I solved it a bit messily. I think I would have used a regular expression to test if it was a line with two numbers if I were to refactor it.           |
