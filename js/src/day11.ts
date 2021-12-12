import {getDataFromFile, getTestFromFile} from "./utils";
import expect from "expect";

class Cell {
    x: number;
    y: number;
    value: number;

    neighborhood: Cell[] = [];

    hasFlashlight: boolean = false;

    constructor(x: number, y: number, value: number) {
        this.value = value;
        this.x = x;
        this.y = y;
    }

    inc(parent?): number {
        if (this.hasFlashlight) {
            return 0;
        }

        let flashCounter = 0
        if(this.value <= 9) {
            this.value++;
        }

        if (!this.hasFlashlight && this.value > 9) {
            this.hasFlashlight = true;
            flashCounter++;
            for(let cell of this.neighborhood) {
                flashCounter += cell.inc(this);
            }
        }
        return flashCounter;
    }
}

class Grid {
    cells: Cell[][];

    constructor(data: number[][]) {
        this.cells = [];
        for (let x = 0; x < data.length; x++) {
            this.cells[x] = [];
            for (let y = 0; y < data[x].length; y++) {
                this.cells[x][y] = new Cell(x, y, data[x][y]);
            }
        }
        for (let x = 0; x < data.length; x++) {
            for (let y = 0; y < data[x].length; y++) {
                this.cells[x][y].neighborhood = this.getNeighborhood(x, y);
            }
        }

    }

    private getNeighborhood(x: number, y: number) {
        let neighborhood = [];
        for (let xx = x - 1; xx <= x + 1; xx++) {
            for (let yy = y - 1; yy <= y + 1; yy++) {
                if (yy === y && xx === x) {
                    continue;
                }
                if (yy < 0 || xx < 0) {
                    continue;
                }
                if (xx >= this.cells.length || yy >= this.cells[xx].length) {
                    continue;
                }
                neighborhood.push(this.cells[xx][yy]);
            }
        }
        return neighborhood;
    }

    public run(steps: number) {

        let counter = 0;
        for (let i = 0; i < steps; i++) {
            counter += this.step();
        }

        return counter;
    }

    public step() {
        let stepCounter = 0
        for (let x = 0; x < this.cells.length; x++) {
            for (let y = 0; y < this.cells[x].length; y++) {
                stepCounter += this.cells[x][y].inc();
            }
        }

        for (let x = 0; x < this.cells.length; x++) {
            for (let y = 0; y < this.cells[x].length; y++) {
                if(this.cells[x][y].hasFlashlight) {
                    this.cells[x][y].value = 0;
                    this.cells[x][y].hasFlashlight = false;
                }
            }
        }

        return stepCounter;
    }
}




const dataTest = getTestFromFile("day11").map(line => line.split("").map(Number));
const gridTest = new Grid(dataTest);
expect(gridTest.run(100)).toBe(1656);


const data = getDataFromFile("day11").map(line => line.split("").map(Number));
const grid = new Grid(data);
console.log(`Step 1 ${grid.run(100)}`);
