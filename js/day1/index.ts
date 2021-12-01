import * as fs from "fs";
import {resolve} from "path";
import dirname from "es-dirname";

/**
 * Count all increases
 * @param data input dataset
 */
const countIncreases = (data: number[]): number => {
    // Count all increases in the data set
    return data.reduce((acc, curr, idx, array) => {
        if (idx > 0) {
            if (curr > array[idx - 1]) {
                return acc + 1;
            }
        }
        return acc;

    }, 0);
}


/**
 * Step 1 : Count increases in the data set
 */
const firstStep = (filepath: string): number => {
    // Parse file and store all lines into an array
    const fileInput = fs.readFileSync(filepath, 'utf-8');
    const data = fileInput.split("\n").filter(value => value.length > 0).map(value => parseInt(value, 10));

    return countIncreases(data);
}

/**
 * Step 2 : Count the number of times the sum of measurements in this sliding window increases from the previous sum. So,
 * compare A with B, then compare B with C, then C with D, and so on. Stop when there aren't enough measurements
 * left to create a new three-measurement sum.
 *
 * entry example :
 * 199  A
 * 200  A B
 * 208  A B C
 * 210    B C D
 * 200  E   C D
 * 207  E F   D
 * 240  E F G
 * 269    F G H
 * 260      G H
 * 263        H
 *
 * Then aggregate data by chars and count increases :
 * A: 607 (N/A - no previous sum)
 * B: 618 (increased)
 * C: 618 (no change)
 * D: 617 (decreased)
 * E: 647 (increased)
 * F: 716 (increased)
 * G: 769 (increased)
 * H: 792 (increased)
 *
 * Then the result id 5
 */
const secondStep = (filePath: string): number => {
    // Parse file and store all lines into an array
    const fileInput: string = fs.readFileSync(filePath, 'utf-8');
    const lines: number[] = fileInput.split("\n").filter(value => value.length > 0).map(value => parseInt(value, 10));

    const transformedArray : number[] = [];
    lines.forEach((value, idx, array) => {
        transformedArray.push(value + (array[idx + 1]??0) + (array[idx + 2]??0));
    });

    return countIncreases(transformedArray);
    // return countIncreases([...sortedMap.values()]);
}


// EXEC
const filePath = resolve(dirname(), 'input.txt');
console.log(`result first step : ${firstStep(filePath)}`);
console.log(`result second step : ${secondStep(filePath)}`);


