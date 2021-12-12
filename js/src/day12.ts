import {getDataFromFile, getTestFromFile} from "./utils";
import expect from "expect";
import {start} from "repl";

// class Cave {
//     name: string;
//     isBig: boolean;
//
//     isStart(): boolean {
//         return this.name === "start";
//     }
//
//     isEnd(): boolean {
//         return this.name === "end";
//     }
// }

class Graph {
    edges: string[][] = [];

    constructor(data: string[]) {
        data.forEach(line => {
            const [from, to] = line.split("-");
            this.addEdges(from, to);
            this.addEdges(to, from);
        });
    }

    addEdges(from: string, to: string) {
        if (!this.edges[from]) {
            this.edges[from] = [];
        }
        this.edges[from].push(to);
    }

    step1() {
        return this.visitPath("start");
    }

    /**
     * Count all possible paths from start to end using edges
     */
    visitPath(cave, visited = new Set()) {
        if (cave === 'end') {
            return 1;
        }

        if (visited.has(cave) && this.isSmallCave(cave)) {
            return 0;
        }

        if (!this.edges[cave]) {
            return 0;
        }

        let result = 0;
        for (const nextCave of this.edges[cave]) {
            result += this.visitPath(nextCave, new Set([...visited, cave]));
        }

        return result;
    }

    private isSmallCave(cave) {
        return /[a-z]/.test(cave);
        ;
    }

    step2() {
        return this.visitPath2("start");
    }

    /**
     * Count all possible paths from start to end using edges
     */
    visitPath2(cave, visited = new Set(), doucleSmallCave = false) {
        if (cave === 'end') {
            return 1;
        }

        if (visited.has(cave) && this.isSmallCave(cave)) {
            if (doucleSmallCave) {
                return 0;
            } else {
                doucleSmallCave = true;
            }
        }

        if (!this.edges[cave]) {
            return 0;
        }

        let result = 0;
        for (const nextCave of this.edges[cave]) {
            if (nextCave !== 'start') {
                result += this.visitPath2(nextCave, new Set([...visited, cave]), doucleSmallCave);
            }
        }

        return result;
    }
}


const test = getTestFromFile("day12");
const graphTest = new Graph(test);
expect(graphTest.step1()).toEqual(226);
expect(graphTest.step2()).toEqual(3509);


const data = getDataFromFile("day12");
const graph = new Graph(data);
console.log(`Step 1 : ${graph.step1()}`);
console.log(`Step 2 : ${graph.step2()}`);
