import { displayWeather } from "../src/client/js/displayWeather";

describe("Testing the displayWeather function", () => {
    test("Test should carry on when duration is a number between 0 and 7", () => {
        const duration = 4;
        expect(displayWeather(duration)).toBeTruthy();
    })

    test("Test should carry on when duration is a number between 7 and 16", () => {
        const duration = 10;
        expect(displayWeather(duration)).toBeTruthy();
    })
});