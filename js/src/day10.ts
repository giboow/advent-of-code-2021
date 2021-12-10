import {getDataFromFile, getTestFromFile} from "./utils";
import expect from "expect";


const pairs = {
    '{': '}',
    '[': ']',
    '(': ')',
    '<': '>',
}
const pointsCorrupted = {
    ')': 3,
    ']': 57,
    '}': 1197,
    '>': 25137,
}

const scoreCorrupted = (str, bufferArg = []): number => {
    const char = str.slice(0, 1)[0];
    const remainder = str.slice(1);
    const buffer = [...bufferArg];

    if (Object.keys(pairs).includes(char)) {
        buffer.push(char);

        if (remainder.length) return scoreCorrupted(remainder, buffer);
        else return 0;
    } else {
        const toCheck = buffer.pop();

        if (pairs[toCheck] === char) {
            if (remainder.length) return scoreCorrupted(remainder, buffer);
            else return 0;
        } else {
            return pointsCorrupted[char];
        }
    }
}
const firstStep = (data: string[][]): number => {
    return data.reduce((acc, line) => acc + scoreCorrupted(line), 0);
}


const dataTest = getTestFromFile("day10").map(d => d.split(""));
const data = getDataFromFile("day10").map(d => d.split(""));

expect(firstStep(dataTest)).toBe(26397);
console.log(`First step : ${firstStep(data)}`);

// ======= Second step =======

const pointsIncomplete = {
    ')': 1,
    ']': 2,
    '}': 3,
    '>': 4,
}

const calc = (buffer)  => buffer.reverse().reduce((acc, char) => acc * 5 + pointsIncomplete[pairs[char]], 0);


const scoreIncomplete = (str, bufferArg = []) => {
    const char = str.slice(0, 1)[0];
    const remainder = str.slice(1);
    const buffer = [...bufferArg];

    if (Object.keys(pairs).includes(char)) {
        buffer.push(char);

        if (remainder.length) return scoreIncomplete(remainder, buffer);
        else return calc(buffer);
    } else {
        const toCheck = buffer.pop();

        if (pairs[toCheck] === char) {
            if (remainder.length) return scoreIncomplete(remainder, buffer);
            else if (buffer.length) return calc(buffer);
        }
    }

    return 0;
}

const secondStep = (data: string[][]): number => {
    const scores = [];
    for(const line of data) {
        const result = scoreIncomplete(line);
        if (result) {
            scores.push(result);
        };
    }
    return scores.sort((a, b) => a - b)[Math.floor(scores.length / 2)];
}

expect(secondStep(dataTest)).toBe(288957);
console.log(`Second step : ${secondStep(data)}`);


