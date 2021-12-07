import {getDataFromFile, getTestFromFile} from "./utils";
import expect from "expect";


// Brutforce solution not optimized
const run = (data: number[], withTurn = false): number => {


    const maxAll = Math.max(...data);


    const results = new Array(maxAll).fill(0);


    for (let i = 0; i < results.length; i++) {

        let groups = new Array(maxAll + 1).fill(0);
        groups.forEach((_, i) => {
            groups[i] = data.filter(d => d === i).length;
        });

        let turn = 1;
        let counter = 0;
        do {
            for(let j = i-1; j >= 0; j--) {
                if(groups[j] > 0) {
                    let val = groups[j];
                    groups[j + 1] += val;
                    groups[j] = 0;
                    counter += withTurn ? val * turn : val;
                }
            }
            for(let j = i+1; j <= maxAll; j++) {
                if(groups[j] > 0) {
                    let val = groups[j];
                    groups[j - 1] += val
                    groups[j] = 0;
                    counter += withTurn ? val * turn : val;
                }
            }
            turn++;

        } while (groups[i] !== data.length )

        results[i] = counter;
    }

    return Math.min(...results);
}


// EXEC
const dataTest = getTestFromFile("day7")[0].split(",").map(Number);

expect(run(dataTest)).toBe(37);
expect(run(dataTest, true)).toBe(168);

const data = getDataFromFile("day7")[0].split(",").map(Number);
console.log(`First step : ${run(data)}`);
console.log(`Second step : ${run(data, true)}`);
