import {getDataFromFile, getTestFromFile} from "./utils";
import expect from "expect";

class TrickShot {
    readonly MAX_Y = 10000

    targetXMin: number;
    targetXMax: number;
    targetYMin: number;
    targetYMax: number;

    constructor(data: string) {
        const [targetXMin, targetXMax, targetYMin, targetYMax] = data.match(
            /target area: x=(-?\d+)..(-?\d+), y=(-?\d+)..(-?\d+)/,
        ).slice(1)
            .map(x => parseInt(x));
        this.targetXMin = targetXMin;
        this.targetXMax = targetXMax;
        this.targetYMin = targetYMin;
        this.targetYMax = targetYMax;

    }

    step1() {

        const initialMinX = Math.ceil((Math.sqrt(8 * this.targetXMin + 1) - 1) / 2);
        const initialMaxX = Math.floor((Math.sqrt(8 * this.targetXMax + 1) - 1) / 2);

        let maxY = 0;
        for (let initialY = 0; initialY < this.MAX_Y; initialY++) {
            for (let initialX = initialMinX; initialX <= initialMaxX; initialX++) {
                let y = initialY * initialX - (initialX * (initialX - 1)) / 2,
                    dy = initialY - initialX;
                while (y >= this.targetYMin) {
                    y += dy--;
                    if (y >= this.targetYMin && y <= this.targetYMax) {
                        const localMaxY =
                            initialY * initialY - (initialY * (initialY - 1)) / 2;
                        if (localMaxY > maxY) {
                            maxY = localMaxY;
                        }
                        break;
                    }
                }
            }
        }
        return maxY;
    }

    step2() {
        let count = 0;

        for (let initialY = this.targetYMin; initialY < this.MAX_Y; initialY++) {
            for (let initialX = 0; initialX <= this.targetXMax; initialX++) {
                let x = 0,
                    y = 0,
                    dy = initialY,
                    dx = initialX;
                while (y >= this.targetYMin) {
                    y += dy--;
                    x += dx;

                    if (dx > 0) {
                        dx--;
                    }

                    if (
                        x >= this.targetXMin &&
                        x <= this.targetXMax &&
                        y >= this.targetYMin &&
                        y <= this.targetYMax
                    ) {
                        count++;
                        break;
                    }
                }
            }
        }
        return count;
    }

}

expect(new TrickShot(getTestFromFile("day17")[0]).step1()).toBe(45)
expect(new TrickShot(getTestFromFile("day17")[0]).step2()).toBe(112)

console.log(`Step 1 : ${new TrickShot(getDataFromFile("day17")[0]).step1()}`);
console.log(`Step 1 : ${new TrickShot(getDataFromFile("day17")[0]).step2()}`);
