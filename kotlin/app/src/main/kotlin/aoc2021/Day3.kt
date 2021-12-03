package aoc2021;

import java.lang.Integer.parseInt


class Day3() {
    fun firstStep(input: List<String>): Int {

        var lineSize = input[0].length;

        var gamma = ""
        var epsilon = ""
        for (i in 0 until lineSize) {
            val countStrong = input.filter { it[i].equals('1') }.count()
            val countLower = input.filter { it[i].equals('0') }.count()
            if (countStrong > countLower) {
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
        val lineSize = input[0].length;
        var oxygen = input.toMutableList();
        var scrubber = input.toMutableList();

        var i = 0
        while (i < lineSize) {


            if (oxygen.size > 1) {
                val countStrong = oxygen.filter { it[i].equals('1') }.count()
                val countLower = oxygen.filter { it[i].equals('0') }.count()
                oxygen = oxygen.filter {
                    if (countStrong >= countLower) {
                        it[i].equals('1')
                    } else {
                        it[i].equals('0')
                    }
                } as MutableList<String>
            }
            if (scrubber.size > 1) {
                val countStrong = scrubber.filter { it[i].equals('1') }.count()
                val countLower = scrubber.filter { it[i].equals('0') }.count()
                scrubber = scrubber.filter {
                    if (countStrong >= countLower) {
                        it[i].equals('0')
                    } else {
                        it[i].equals('1')
                    }
                } as MutableList<String>
            }
            i++
        }

        return parseInt(oxygen[0], 2) * parseInt(scrubber[0], 2)
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
