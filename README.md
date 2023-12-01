# Advent of Code 2023 🎄

This repositry serves as my collection of answers written in typescript.

The project uses [Bun](https://bun.sh) as runtime.

## Structure

The main solving lays in the `/days` folder, but uses the `/utils` directory heavily to abstract complexity and to make it possible to easy share code between days. This my change as the advent progresses.

## Tests

All of the examples for each day has written test case in the respective `index.test.ts` file for the day.

When the day is solved, a test for the correct result is added.

| Day | Name      | Stars | Notes                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| --- | --------- | ----- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 01  | Trebuchet | ⭐⭐  | Part two was difficult to solve, due to the fact, that the first number should be found left-to-right but the last number right-to-left. E.g. `eightwoeightwo` is equal to `82`. I started by replacing by it's occurance index, wich gave me `8wo8wo`, but it should have been `8weeigh2`. So on the last number, the last occurence wins vs. the first occurance where the first character. <br><br>The way i ended up solving it, was to pre-/sufix the number with the word to make sure not to break a words. that gave me: `eight8eightow2twoeight8eightwo2two`. Then a simple regex `/[^\d]/ig` to only get the numbers worked like a charm `8282` => `82`. |
