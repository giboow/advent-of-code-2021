import {getDataFromFile, getTestFromFile} from "./utils";
import expect from "expect";

class Map {
    map: number[][] = [];

    constructor(lines: string[]) {
        for (let line of lines) {
            let row = line.split("").map(Number);
            this.map.push(row);
        }
    }

    isMinimumLocal(row: number, col: number, array: number[][]) {
        const value: number = array[row][col];
        if (array[row][col + 1]  != undefined && value >= array[row][col + 1]) {
            return false;
        } else if (array[row][col - 1] != undefined && value >= array[row][col - 1]) {
            return false;
        } else if (array[row + 1] != undefined && value >= array[row + 1][col]) {
            return false;
        } else if (array[row - 1] != undefined && value >= array[row - 1][col]) {
            return false;
        }
        return true;
    }

    searchLower() {
        const map = [...this.map];
        const minimals = [];
        for (let row in map) {
            for (let col in map[row]) {
                if (this.isMinimumLocal(parseInt(row), parseInt(col), map)) {
                    minimals.push(map[row][col]);
                }
            }
        }
        return minimals.reduce((a, b) => a + (b + 1), 0);
    }
}


const dataTest = getTestFromFile("day9");
const mapTest = new Map(dataTest);
expect(mapTest.searchLower()).toBe(15);
// expect(step2(dataTest)).toBe(61229);
// expect(run(dataTest, true)).toBe(168);
//
const data = getDataFromFile("day9");
const map = new Map(data);
console.log(`First step : ${map.searchLower()}`);
// console.log(`Second step : ${step2(data)}`);
