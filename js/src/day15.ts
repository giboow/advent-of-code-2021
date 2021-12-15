import {getDataFromFile, getTestFromFile} from "./utils";
import expect from "expect";


class ChitonGame {
    grid: number[][];

    constructor(data: string[]) {
        this.grid = data.map(line => line.split("").map(Number));
    }

    step1(): number {

        return this.process(this.grid);
    }

    step2(): number {
        const rows = this.grid.length;
        const cols = this.grid[0].length;
        const newRows = rows * 5;
        const newCols = cols * 5;

        // Calc new grid
        const grid = []
        for (let y = 0; y < newRows; y++) {
            grid[y] = [];
            for (let x = 0; x < newCols; x++) {
                let v = this.grid[y % rows][x % cols]+Math.floor(y/rows)+Math.floor(x/cols);
                while (v > 9) v -= 9;
                grid[y][x] = v;
            }
        }


        return this.process(grid);
    }

    calcInitRisk(grid) : number {
        return (grid[grid.length-1].reduce((acc, n) => acc+n, 0) + grid.reduce((acc, row) => acc+row[0], 0)) * 0.7;
    }


    process(grid): number {
        let lowestRisk = this.calcInitRisk(grid);

        const rows = grid.length, cols = grid[0].length;
        const risks = Array.from({length: rows}, v => Array(cols).fill(0));
        let paths = [{x: 0, y: 0, risk: - grid[0][0]}];

        while (paths.length > 0) {
            let p = paths.pop();
            p.risk += grid[p.y][p.x];
            if ((p.risk < lowestRisk) && (p.risk < risks[p.y][p.x] || risks[p.y][p.x] == 0)) {
                risks[p.y][p.x] = p.risk;
                if (p.x == cols - 1 && p.y == rows - 1) {
                    if (p.risk < lowestRisk) {
                        lowestRisk = p.risk;
                    }
                } else {
                    if (p.x < cols - 1) paths.push({x: p.x + 1, y: p.y, risk: p.risk})
                    if (p.y < rows - 1) paths.push({x: p.x, y: p.y + 1, risk: p.risk})
                    if (p.x > 0) paths.push({x: p.x - 1, y: p.y, risk: p.risk})
                    if (p.y > 0) paths.push({x: p.x, y: p.y - 1, risk: p.risk})
                }
            }
        }
        return lowestRisk;
    }
}


const dataTest = getTestFromFile("day15");
const gameTest = new ChitonGame(dataTest);
expect(gameTest.step1()).toBe(40);
expect(gameTest.step2()).toBe(315);

const data = getDataFromFile("day15");
const game = new ChitonGame(data);
console.log(`Step 1 ${game.step1()}`);
// Step 2 take time...
console.log(`Step 2 ${game.step2()}`);
