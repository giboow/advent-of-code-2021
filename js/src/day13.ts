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

interface Instruction{
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

    run(instructions: Instruction[]) : number{
        for (const {axe, value} of instructions) {
            for (const point of this.points) {
                if (axe === 'x' && point.x > value) {
                    point.x = value - Math.abs(point.x - value);
                } else if (axe === 'y' && point.y > value) {
                    point.y = value - Math.abs(point.y - value);
                }
            }
        }

        const uniqu = new Set<string>();
        for (const point of this.points) {
            uniqu.add(point.toString());
        }

        return uniqu.size;
    }


    step1() {
        return this.run([...this.instruction.slice(0,1)]);
    }
}


const test = getTestFromFile("day13");
const gameTest = new CalcGame(test)
expect(gameTest.step1()).toEqual(17);


const data = getDataFromFile("day13");
console.log(`Step1 ${new CalcGame(data).step1()}`);
