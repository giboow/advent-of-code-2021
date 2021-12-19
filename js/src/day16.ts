import {getDataFromFile, getTestFromFile} from "./utils";
import * as _ from "lodash";
import expect from "expect";


class PacketDecoder {

    data: string;

    expressionFuncs = [
        (a, b) => a + b, // sum
        (a, b) => a * b, // product
        (a, b) => Math.min(a, b), // minimum
        (a, b) => Math.max(a, b), // maximum
        null, // id 4 is value packet
        (a, b) => (a < 0 ? b : a > b ? 1 : 0), // greater
        (a, b) => (a < 0 ? b : a < b ? 1 : 0), // less
        (a, b) => (a < 0 ? b : a === b ? 1 : 0), // equal
    ];

    initValues = [0, 1, Infinity, -Infinity, null, -1, -1, -1];

    constructor(data: string) {
        this.data = data;
    }

    sumVersionNumber() {
        return this.readPacket(this.hex2bin(this.data)).sumVersion;
    }

    calc() {
        return this.readPacket(this.hex2bin(this.data)).result;
    }



    getHeader(binary, idx) {
        return [binary.slice(idx, idx + 3), binary.slice(idx + 3, idx + 6)]
            .map(v => parseInt(v, 2));
    }

    getValueChunks (binary, idx) {
        const chunks = [];
        for (; ; idx += 5) {
            const chunk = binary.slice(idx, idx + 5);
            chunks.push(chunk);
            if (chunk[0] === '0') break;
        }
        return chunks;
    }

    readPacket(binary): {sumVersion, result} {
        const stack = [];
        const parts = {sumVersion: 0, result: null};
        let idx = 0;

        while (idx < binary.length) {
            const top = stack[stack.length - 1];

            if (!top || idx < top.end || top.subpacketCount > 0) {
                const [version, id] = this.getHeader(binary, idx);
                idx += 6;
                parts.sumVersion += version;
                if (top) --top.subpacketCount;

                if (id === 4) {
                    const chunks = this.getValueChunks(binary, idx);
                    const value = parseInt(chunks.map(chunk => chunk.slice(1)).join(''), 2);
                    idx += chunks.length * 5;
                    top.accumulator = this.expressionFuncs[top.id](top.accumulator, value);
                } else {
                    const lengthTypeId = binary[idx++];
                    const offset = lengthTypeId === '0' ? 15 : 11;
                    const lengthValue = parseInt(binary.slice(idx, idx + offset), 2);
                    const subpacketsLength = lengthTypeId === '0' ? lengthValue : 0;
                    const subpacketCount = lengthTypeId === '1' ? lengthValue : 0;
                    idx += offset;
                    stack.push({
                        end: idx + subpacketsLength,
                        subpacketCount: subpacketCount,
                        id: id,
                        accumulator: this.initValues[id],
                    });
                }
            } else {
                const poppedAccumulator = stack.pop().accumulator;
                if (stack.length) {
                    const newTop = stack[stack.length - 1];
                    newTop.accumulator = this.expressionFuncs[newTop.id](newTop.accumulator, poppedAccumulator);
                } else {
                    parts.result = poppedAccumulator;
                    break;
                }
            }
        }

        if (parts.result === null) parts.result = stack[0].accumulator;
        return parts;
    }


    hex2bin(n): string {
        return [...n].map(c => parseInt(c, 16).toString(2).padStart(4, '0')).join("")
    }
}


// Part 1
expect(new PacketDecoder("8A004A801A8002F478").sumVersionNumber()).toEqual(16);
expect(new PacketDecoder("620080001611562C8802118E34").sumVersionNumber()).toEqual(12);
expect(new PacketDecoder("C0015000016115A2E0802F182340").sumVersionNumber()).toEqual(23);
expect(new PacketDecoder("A0016C880162017C3686B18A3D4780").sumVersionNumber()).toEqual(31);

// Part2
expect(new PacketDecoder("C200B40A82").calc()).toEqual(3);
expect(new PacketDecoder("04005AC33890").calc()).toEqual(54);
expect(new PacketDecoder("880086C3E88112").calc()).toEqual(7);
expect(new PacketDecoder("CE00C43D881120").calc()).toEqual(9);
expect(new PacketDecoder("D8005AC2A8F0").calc()).toEqual(1);
expect(new PacketDecoder("F600BC2D8F").calc()).toEqual(0);
expect(new PacketDecoder("9C005AC2F8F0").calc()).toEqual(0);
expect(new PacketDecoder("9C0141080250320F1802104A08").calc()).toEqual(1);


console.log("test done");

const data = getDataFromFile("day16")[0];
console.log(`Step 1 : ${new PacketDecoder(data).sumVersionNumber()}`);
console.log(`Step 2 : ${new PacketDecoder(data).calc()}`);
