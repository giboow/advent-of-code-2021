package aoc2021;


class Day1() {
    fun firstStep(input: List<Int>): Int {
        return input.withIndex().filter { (i, v) -> input.getOrElse(i + 1) { 0 } > v }.count()
    }

    fun secondStep(input: List<Int>): Int {
        var  tempList = input.mapIndexed { i, v -> v +  input.getOrElse(i + 1) { 0 } + input.getOrElse(i + 2) { 0 }}
        return tempList.filterIndexed() { i, v ->  tempList.getOrElse(i + 1) { 0 }  > v}.count()
    }
}


fun main() {
    val input = Utils().readInput("day1");
    val day1 = Day1();
    println(day1.firstStep(input.map { it.toInt() }))
    println(day1.secondStep(input.map { it.toInt() }))
}
