import {getDataFromFile, getTestFromFile} from "./utils";
import expect from "expect";


const firstStep = (data: string[]): number => {

    const commonStringLength = data[0].length;
    let gStr = "";
    let eStr = "";
    for (let i = 0; i < commonStringLength; i++) {
        const countStrong = data.filter(line => line[i] === "1");
        const countLow = data.filter(line => line[i] === "0");
        if(countStrong.length > countLow.length) {
            gStr += "1";
            eStr += "0";
        } else {
            gStr += "0";
            eStr += "1";
        }
    }
    return parseInt(gStr, 2) * parseInt(eStr, 2);
}


const secondStep = (data: string[]): number => {
    const commonStringLength = data[0].length;
    let oxygen = [...data];
    let scrubber = [...data];
    let i = 0;
    while(oxygen.length > 1 && i < commonStringLength) {
        const countStrong = oxygen.filter(line => line[i] === "1");
        const countLow = oxygen.filter(line => line[i] === "0");
        oxygen = oxygen.filter(line => {
            if (countStrong.length >= countLow.length) {
               return line[i] === "1";
            } else {
               return line[i] === "0";
            }
        });
        i++
    }

    let j = 0;
    while(scrubber.length > 1 && j < commonStringLength) {
        const countStrong = scrubber.filter(line => line[j] === "1");
        const countLow = scrubber.filter(line => line[j] === "0");
        scrubber = scrubber.filter(line => {
            if (countStrong.length >= countLow.length) {
                return line[j] === "0";
            } else {
                return line[j] === "1";
            }
        });
        j++
    }
    console.log(oxygen[0], scrubber[0])
    return parseInt(oxygen[0], 2) * parseInt(scrubber[0], 2);
}


// EXEC
const dataTest = getTestFromFile("day3");
expect(firstStep(dataTest)).toBe(198);
expect(secondStep(dataTest)).toBe(230);

const data = getDataFromFile("day3");
console.log(`First step : ${firstStep(data)}`);
console.log(`Second step : ${secondStep(data)}`);
