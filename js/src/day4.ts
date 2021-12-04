import {getDataFromFile, getTestFromFile} from "./utils";
import expect from "expect";

class Value {
    value: number;

    check = false;

    constructor(public val: number) {
        this.value = val;
    }
}

class Grid {
    lines: Value[][] = [];
    hasWin = false;

    constructor(input: string[]) {
        input.forEach(line => {
            const values: Value[] = line.split(" ").filter(v => v.length > 0).map(v => new Value(parseInt(v, 10)));
            this.lines.push(values);
        })
    }

    /**
     * Return valid row or null
     * @param value
     */
    public checkRowsAndCheckValid(value: number): Grid {

        this.lines.forEach(line => line.filter(v => v.value === value).forEach(v => {
            v.check = true
        }));

        // check Row
        for (let line of this.lines) {
            if (line.filter(v => v.check).length == line.length) {
                this.hasWin = true;
                return this;
            }
        }

        // check cols
        for (let i = 0; i < this.lines[0].length; i++) {
            const col = this.lines.map(line => line[i]);
            if (col.filter(v => v.check).length == col.length) {
                this.hasWin = true;
                return this;
            }
        }
    }

    public sumUncheck(): number {
        // return this.lines.reduce((acc, line) => acc + line.map(v => ), 0);
        return this.lines.reduce((acc, line) => acc + line.filter(v => !v.check).reduce((acc, v) => acc + v.val, 0), 0);
    }
}

const firstStep = (data: string[]): number => {

    // get firstLine
    const drawing: number[] = data.slice(0, 1)[0].split(",").map(v => parseInt(v, 10));

    const grids: Grid[] = [];
    let i = 1;
    while (i < data.length) {
        grids.push(new Grid(data.slice(i, i + 5)));
        i += 5;
    }

    let gridResult: Grid = null;
    let lastValue = 0;
    mainloop:
        for (let d of drawing) {
            lastValue = d;
            for (let g of grids) {
                gridResult = g.checkRowsAndCheckValid(d);
                if (gridResult) {
                    break mainloop;
                }
            }
        }


    return lastValue * gridResult?.sumUncheck();
}


const secondStep = (data: string[]): number => {
    // get firstLine
    const drawing: number[] = data.slice(0, 1)[0].split(",").map(v => parseInt(v, 10));

    const grids: Grid[] = [];
    let i = 1;
    while (i < data.length) {
        grids.push(new Grid(data.slice(i, i + 5)));
        i += 5;
    }

    let lastWinGrid: Grid = null;
    let lastValue = 0;
    mainloop:
        for (let d of drawing) {
            lastValue = d;
            for (let g of grids) {
                if (g.hasWin) {
                    continue;
                }
                lastWinGrid = g.checkRowsAndCheckValid(d);
            }
            const countWin = grids.filter(g => g.hasWin).length;
            if (countWin === grids.length) {
                grids.find(g => !g.hasWin);
                break mainloop;
            }
        }
    return lastValue * lastWinGrid?.sumUncheck();

}


// EXEC
const dataTest = getTestFromFile("day4");
expect(firstStep(dataTest)).toBe(4512)
expect(secondStep(dataTest)).toBe(1924);

const data = getDataFromFile("day4");
console.log(`First step : ${firstStep(data)}`);
console.log(`Second step : ${secondStep(data)}`);
