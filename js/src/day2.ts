import {getDataFromFile, getTestFromFile} from "./utils";
import {exec} from "child_process";
import expect from "expect";



const firstStep = (data: string[]): number => {
    let horizontalCounter = 0;
    let depthCounter = 0;
    data.forEach((line, index, array) => {
        const [operator, valueStr] = line.split(" ");
        const value = parseInt(valueStr, 10);
        if (operator === 'forward') {
            horizontalCounter += value;
        } else if (operator === "up") {
            depthCounter -= value;
        } else if (operator === "down") {
            depthCounter += value;
        }
    });
    const result = depthCounter * horizontalCounter;

    return result;
}


const secondStep = (data: string[]): number => {
    let horizontalCounter = 0;
    let depthCounter = 0;
    let aim = 0;
    data.forEach((line, index, array) => {
        const [operator, valueStr] = line.split(" ");
        const value = parseInt(valueStr, 10);
        if (operator === 'forward') {
            horizontalCounter += value;
            depthCounter += aim * value
        } else if (operator === "up") {
            aim -= value;
        } else if (operator === "down") {
            aim += value;
        }
    });
    const result = depthCounter * horizontalCounter;

    return result;
}


// EXEC
const dataTest = getTestFromFile("day2");
expect(firstStep(dataTest)).toBe(150);
expect(secondStep(dataTest)).toBe(900);

const data = getDataFromFile("day2");
console.log(`First step : ${firstStep(data)}`);
console.log(`Second step : ${secondStep(data)}`);
