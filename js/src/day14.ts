import {getDataFromFile, getTestFromFile} from "./utils";
import expect from "expect";


class PolymerGame {
    polymerTemplate: string;

    pairInssertion: Map<string, string> = new Map<string, string>();


    constructor(data: string[]) {
        this.polymerTemplate = data[0];
        this.pairInssertion = data.slice(1).map(line => line.split(" -> ")).reduce((acc, [a, b]) => {
            acc.set(a, b);
            return acc;
        }, new Map<string, string>());
    }

    run(steps: number = 10): number {


        // Init map
        let map = new Map<string, number>();
        for (let i = 0; i < this.polymerTemplate.length - 1; i++) {
            const key = this.polymerTemplate[i] + this.polymerTemplate[i + 1];
            map.set(key, (map.get(key)??0) + 1);
        }

        for (let i = 0; i < steps; i++) {
            map = this.process(map);
        }

        const countChars = new Map<string, number>();
        countChars.set(this.polymerTemplate[this.polymerTemplate.length - 1], 1);
        map.forEach((value, key) => {
            countChars.set(key[0], (countChars.get(key[0]) ?? 0) + value);
        });

        return Math.max(...countChars.values()) - Math.min(...countChars.values());
    }

    process(map: Map<string, number>): Map<string, number> {

        let newMap = new Map<string, number>(map);
        map.forEach((value, key) => {
            if (value > 0) {
                const pair = this.pairInssertion.get(key);
                newMap.set(key, newMap.get(key) - value);
                if (pair) {
                    newMap.set(key[0] + pair, (newMap.get(key[0] + pair) ?? 0) + value);
                    newMap.set(pair + key[1], (newMap.get(pair + key[1]) ?? 0) + value);
                } else {
                    console.error(pair);
                }
            }
        });

        return newMap;
    }
}

const dataTest = getTestFromFile("day14");
const gameTest = new PolymerGame(dataTest);
expect(gameTest.run(10)).toBe(1588);
expect(gameTest.run(40)).toBe(2188189693529);

const data = getDataFromFile("day14");
const game = new PolymerGame(data);
console.log(`Step 1 ${game.run(10)}`);  // 3406
console.log(`Step 2 ${game.run(40)}`);
