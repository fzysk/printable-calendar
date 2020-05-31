import moment, { Moment } from "moment";

interface ABCoefficients {
    startYear: number;
    endYear: number;
    A: number;
    B: number;
};

export class EasterFinder {
    static coefficients: ABCoefficients[] = [
        { startYear: 1900, endYear: 2099, A: 24, B: 5 },
        { startYear: 2100, endYear: 2199, A: 24, B: 6 },
        { startYear: 2200, endYear: 2299, A: 25, B: 0 },
        { startYear: 2300, endYear: 2399, A: 26, B: 1 },
        { startYear: 2400, endYear: 2499, A: 25, B: 1 },
        { startYear: 2500, endYear: 2599, A: 26, B: 2 },
        { startYear: 2600, endYear: 2699, A: 27, B: 3 },
        { startYear: 2700, endYear: 2899, A: 27, B: 4 },
        { startYear: 2900, endYear: 2999, A: 28, B: 5 },
    ];

    public static GetDate(year: number): Moment {
        const easter: Moment = moment().year(year).month(3).day(22);
        const coeff = this.coefficients.find((c) => c.startYear >= year && c.endYear <= year);

        if (!coeff) {
            throw new Error("Sorry, this year is not supported");
        }

        const a = year % 19;
        const b = year % 4;
        const c = year % 7;
        const d = (a * 19 + coeff.A) % 30;
        const e = (2 * b + 4 * c + 6 * d + coeff.B) % 7;

        let days = d + e;

        if ((d == 29 || d == 28) && e == 6) {
            days -= 7; // 1st and 2nd exception
        }

        return easter.add(days, 'days');
    }
}