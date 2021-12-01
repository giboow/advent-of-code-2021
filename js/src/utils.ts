import {resolve} from "path";
import dirname from "es-dirname";
import fs from "fs";

export const getDataFromFile = (day: string): string[] => {
    const filePath =   resolve(dirname(), `../../inputs/${day}/input.txt`);
    const fileInput: string = fs.readFileSync(filePath, 'utf-8');
    return fileInput.split("\n").filter(value => value.length > 0);
}
