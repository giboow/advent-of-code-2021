import {getDataFromFile, getTestFromFile} from "./utils";
import expect from "expect";

class Cell {
    public value: number;
    public visited: boolean;
    public isWall: boolean;

    constructor(value: number) {
        this.value = value;
        this.visited = false;
        this.isWall = value === 9;
    }
}

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
        if (array[row][col + 1] != undefined && value >= array[row][col + 1]) {
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

    findLargestBassin() {
        const map = this.map.map(row => row.map(col => new Cell(col)));
        const bassins = [];
        for (let row in map) {
            for (let col in map[row]) {
                if (!map[row][col].visited) {
                    const size = this.checkBassin(parseInt(row), parseInt(col), map, 0);
                    if (size > 0) {
                        bassins.push(size);
                    }
                }
            }
        }
        return bassins.sort((a, b) => b - a).slice(0, 3)
            .reduce(
                (a, b) => a * b, 1
            );
    }

    private checkBassin(x: number, y: number, map: Cell[][], size): number {
        if (map[x] == undefined || map[x][y] == undefined) {
            return 0;
        }
        if (map[x][y].isWall || map[x][y].visited) {
            return 0;
        }
        map[x][y].visited = true;
        return size + 1
            + this.checkBassin(x + 1, y, map, 0)
            + this.checkBassin(x - 1, y, map, 0)
            + this.checkBassin(x, y + 1, map, 0)
            + this.checkBassin(x, y - 1, map, 0);

    }
}


const dataTest = getTestFromFile("day9");
const mapTest = new Map(dataTest);
expect(mapTest.searchLower()).toBe(15);
expect(mapTest.findLargestBassin()).toBe(1134);

const data = getDataFromFile("day9");
const map = new Map(data);
console.log(`First step : ${map.searchLower()}`);
console.log(`Second step : ${map.findLargestBassin()}`);
