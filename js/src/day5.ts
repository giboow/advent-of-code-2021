import {getDataFromFile, getTestFromFile} from "./utils";
import expect from "expect";

class Point {
    x: number;
    y: number;

    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

class Instruction {
    public start: Point;
    public end: Point;

    constructor(startPoint: Point, endPoint: Point) {
        this.start = startPoint;
        this.end = endPoint;
    }
}

class Process {
    instructions: Instruction[];
    private grid: number[][];

    constructor(data: string[]) {
        this.loadInstructions(data);
    }

    private loadInstructions(lines: string[]) {
        this.instructions = lines.map(line => {
            const [startPoint, endPoint] = line.split(" -> ").map(d => {
                const [x, y] = d.split(",").map(Number);
                return new Point(x, y);
            });

            return new Instruction(startPoint, endPoint);
        })
    }

    private resetGrid() {
        const max = this.instructions.reduce((acc: number, curr: Instruction) => {
            return Math.max(acc, curr.start.x, curr.start.y, curr.end.x, curr.end.y);
        }, 0);

        this.grid = new Array(max + 1).fill(0).map(() => new Array(max + 1).fill(0));
    }

    runInstructions(instructions: Instruction[]) {
        for (let instruction of instructions) {

            const {start, end} = instruction;
            let x = start.x;
            let y = start.y;
            this.grid[y][x] += 1;
            while (x!= end.x || y!= end.y) {
                if(x !== end.x) {
                    x += (end.x > start.x) ? 1 : -1;
                }
                if(y !== end.y) {
                    y += (end.y > start.y) ? 1 : -1;
                }
                this.grid[y][x] += 1;
            }
        }
    }

    getResult() {
        return  this.grid.reduce((acc, curr) => {
            return acc + curr.reduce((acc2, curr2) => {
                if (curr2 > 1) {
                    return acc2 + 1
                }
                return acc2;
            }, 0);
        }, 0);
    }
    
    step1() {
        this.resetGrid();
        const filteredInstruction = this.instructions.filter(instruction => {
            return instruction.start.x === instruction.end.x || instruction.start.y === instruction.end.y;
        });
        this.runInstructions(filteredInstruction);
        return this.getResult();
    }

    step2() {
        this.resetGrid();
        this.runInstructions(this.instructions);
        return this.getResult();
    }
}



// EXEC
const dataTest = getTestFromFile("day5");
const processTest = new Process(dataTest);
expect(processTest.step1()).toBe(5);
expect(processTest.step2()).toBe(12);

const data = getDataFromFile("day5");
const process = new Process(data);
console.log(`First step : ${process.step1()}`);
console.log(`Second step : ${process.step2()}`);
