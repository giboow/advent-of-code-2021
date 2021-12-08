import {getDataFromFile, getTestFromFile} from "./utils";
import expect from "expect";
import _ from 'lodash';

class Item {
    constructor(data: string) {
        const [input, output] = data.split(" | ");
        this.inputs = input.split(" ");
        this.outputs = output.split(" ");
    }

    inputs: string[];
    outputs: string[];
}


const step1 = (items: Item[]) => {
    let counter = 0;
    for (let item of items) {
        let itemCounter = 0;
        const outputs = item.outputs;
        for (let output of outputs) {
            const length = output.length;
            if ([2, 4, 3, 7].includes(length)) {
                itemCounter++;
            }
        }
        counter += itemCounter;
    }
    return counter;
}


const compare = (str1, str2): boolean => {
    return _.isEqual(str1.split("").sort(), str2.split("").sort());
}

//       a
//   *********
//   *       *
// b *       * c
//   *   d   *
//   *********
//   *       *
// e *       * f
//   *       *
//   *********
//       g

const buildMapping = (inputs: string[]) => {

    const mapping = {};


    const one = inputs.find(input => input.length === 2);
    const four = inputs.find(input => input.length === 4);
    const seven = inputs.find(input => input.length === 3);
    const eight = inputs.find(input => input.length === 7);

    const occurences = {};
    for (let input of inputs) {
        for (let char of input) {
            occurences[char] = occurences[char] ? occurences[char] + 1 : 1;
        }
    }

    for (const [key, value] of Object.entries(occurences)) {
        if (value === 9) {
            mapping["f"] = key ;
        } else if (value === 4) {
            mapping["e"] = key;
        } else if (value === 6) {
            mapping["b"] = key;
        } else if (value === 8) {
            if (one.includes(key) && seven.includes(key)) {
                mapping["c"] = key;
            } else {
                mapping["a"] = key;
            }
        } else if (value === 7) {
            if (four.includes(key)) {
                mapping["d"] = key;
            } else {
                mapping["g"] = key;
            }
        }
    }

    return {
        0: [mapping['a'], mapping['b'], mapping['c'], mapping['e'], mapping['f'], mapping['g']].join(''),
        1: one,
        2: [mapping['a'], mapping['c'], mapping['d'], mapping['e'], mapping['g']].join(''),
        3: [mapping['a'], mapping['c'], mapping['d'], mapping['f'], mapping['g']].join(''),
        4: four,
        5: [mapping['a'], mapping['b'], mapping['d'], mapping['f'], mapping['g']].join(''),
        6: [mapping['a'], mapping['b'], mapping['d'], mapping['e'], mapping['f'], mapping['g']].join(''),
        7: seven,
        8: eight,
        9: [mapping['a'], mapping['b'], mapping['c'], mapping['d'], mapping['f'], mapping['g']].join(''),
    }


}


const step2 = (items: Item[]): number => {
    let counter = 0;
    for (let item of items) {
        const mapping = buildMapping(item.inputs);

        let itemValue = '';
        for (let output of item.outputs) {
            for(const [key, value] of Object.entries(mapping)) {
                if (compare(output, value)) {
                    itemValue += ""+key;
                    break;
                }
            }
        }
        counter += parseInt(itemValue);
    }

    return counter;
}


const dataTest = getTestFromFile("day8").map(v => new Item(v));


expect(step1(dataTest)).toBe(26);
expect(step2(dataTest)).toBe(61229);
// expect(run(dataTest, true)).toBe(168);
//
const data = getDataFromFile("day8").map(d => new Item(d));
console.log(`First step : ${step1(data)}`);
console.log(`Second step : ${step2(data)}`);
