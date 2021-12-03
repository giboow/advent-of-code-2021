package aoc2021;

import java.lang.Integer.parseInt


class Day3() {
    fun firstStep(input: List<String>): Int {

        var lineSize = input[0].length;

        var gamma = ""
        var epsilon = ""
        for (i in 0 until lineSize) {
            var howMany = howMany(input, i);
            if (howMany.first > howMany.second) {
                gamma += "1"
                epsilon += "0"
            } else {
                gamma += "0"
                epsilon += "1"
            }
        }
        return parseInt(gamma, 2) * parseInt(epsilon, 2)
    }

    fun secondStep(input: List<String>): Int {
        return filterValue(input, 0, true) * filterValue(input, 0, false)
    }

    private fun howMany(data: List<String>, i: Int): Pair<Int, Int> {
        return Pair(data.filter { it[i].equals('1') }.count(), data.filter { it[i].equals('0') }.count());
    }

    private fun filterValue(data: List<String>, counter: Int, isOxygen: Boolean): Int {
        if (data.size.equals(1)) {
            return parseInt(data[0], 2);
        }


        var howMany = howMany(data, counter);
        return filterValue(data.filter {
            if (howMany.first >= howMany.second) {
                if(isOxygen) it[counter].equals('0') else it[counter].equals('1')
            } else {
                if(isOxygen) it[counter].equals('1') else it[counter].equals('0')
            }
        }, counter+1, isOxygen)
    }

}



fun main() {

    val day3 = Day3();

    val testInput = Utils().readTest("day3");
    assert(day3.firstStep(testInput).equals(198))
    assert(day3.secondStep(testInput).equals(230))

    val input = Utils().readInput("day3")
    println(day3.firstStep(input))
    println(day3.secondStep(input))
}
