package aoc2021;


class Day1() {
    fun firstStep(input: List<Int>): Int {
        return input.withIndex().filter { (i, v) -> input.getOrElse(i + 1) { 0 } > v }.count()
    }

    fun secondStep(input: List<Int>): Int {
        var tempList = input.mapIndexed { i, v -> v + input.getOrElse(i + 1) { 0 } + input.getOrElse(i + 2) { 0 } }
        return tempList.filterIndexed() { i, v -> tempList.getOrElse(i + 1) { 0 } > v }.count()
    }
}


fun main() {

    val day1 = Day1();

    val testInput = Utils().readTest("day1").map { it.toInt() }
    assert(day1.firstStep(testInput) == 7)
    assert(day1.secondStep(testInput) == 5)

    val input = Utils().readInput("day1").map { it.toInt() }
    println(day1.firstStep(input))
    println(day1.secondStep(input))
}
