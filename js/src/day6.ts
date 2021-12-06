import {getDataFromFile, getTestFromFile} from "./utils";
import expect from "expect";

class LanternFishGame {
    states: number[] = []

    constructor(initial: number[]) {
        this.states = initial;
    }

    run(nbDays) {

        // Represent each lanternfish by a counter by age
        const days = new Array(9).fill(0);

        // Fill initial state
        this.states.forEach((state, index) => {
            days[state]++ ;
        });

        // Each day  shift the counter age, if the age of fish is 0 then reser his age to 6 and add a new fish with age 8
        for (let i = 0; i < nbDays; i++) {
            let newFish = 0;
            for (let day = 0; day < days.length; day++) {
                let count = days[day];
                if (day === 0) {
                   newFish = count
                } else {
                    days[day-1] = count;
                }
            }
            days[6] += newFish;
            days[8] = newFish;
        }

        // Count the number of all fishes
        return days.reduce((a, b) => a + b, 0);
    }
}


// EXEC
const dataTest = getTestFromFile("day6")[0].split(",").map(Number);

const gameTest = new LanternFishGame(dataTest);
expect(gameTest.run(80)).toBe(5934);
expect(gameTest.run(256)).toBe(26984457539);

const data = getDataFromFile("day6")[0].split(",").map(Number);
const game= new LanternFishGame(data);
console.log(`First step : ${game.run(80)}`);
console.log(`Second step : ${game.run(256)}`);
