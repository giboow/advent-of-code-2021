import {getDataFromFile, getTestFromFile} from "./utils";
import expect from "expect";

class Point {
    x: number;
    y: number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    toString() {
        return JSON.stringify({x: this.x, y: this.y});
    }

}

interface Instruction {
    axe: string;
    value: number;
}

class CalcGame {

    points = new Array<Point>();
    instruction = new Array<Instruction>()


    constructor(public lines: string[]) {
        for (const line of lines) {
            if (/,/.test(line)) {
                const [x, y] = line.split(',').map(Number);
                this.points.push(new Point(x, y));
            } else if (line.length > 0) {
                const [_, axe, value] = /(?<axe>[x|y])=(?<value>\d*)$/gm.exec(line);
                this.instruction.push({axe, value: parseInt(value)} as Instruction);
            }
        }
    }

    run(instructions: Instruction[]): Point[] {

        const points = [...this.points];
        for (const {axe, value} of instructions) {
            for (const point of points) {
                if (axe === 'x' && point.x > value) {
                    point.x = 2 * value - point.x;
                } else if (axe === 'y' && point.y > value) {
                    point.y = 2 * value - point.y;
                }
            }
        }

        return points;

    }


    step1() {
        const points = this.run([...this.instruction.slice(0, 1)]);
        const uniqu = new Set<string>();
        for (const point of points) {
            uniqu.add(point.toString());
        }

        return uniqu.size;
    }

    step2() {
        const points = this.run(this.instruction);
        const grid: string[][] = [];

        const maxX = points.reduce((acc, point) => point.x > acc ? point.x : acc, 0);

        for (const point of points) {
            if (!grid[point.y]) {
                grid[point.y] = new Array(maxX + 1).fill(' ');
            }
            grid[point.y][point.x] = '█';
        }
        console.log(grid.map(line => line.join('')).join('\n'));
    }
}


const test = getTestFromFile("day13");
const gameTest = new CalcGame(test)
expect(gameTest.step1()).toEqual(17);
console.log(`Test step2`);
gameTest.step2();


const data = getDataFromFile("day13");
const game = new CalcGame(data);
console.log(`Step1 ${game.step1()}`);

console.log(`Step2`);
game.step2();
