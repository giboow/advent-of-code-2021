package aoc2021;


class Day2() {
    fun firstStep(input: List<Pair<String, Int>>): Int {
        var horizontal = 0;
        var depth = 0;

        input.forEach() {
            if (it.first.equals("forward")) {
                horizontal += it.second;
            } else if(it.first.equals("up")) {
                depth -= it.second;
            } else if(it.first.equals("down")) {
                depth += it.second;
            }
        }

        return horizontal * depth;
    }

    fun secondStep(input: List<Pair<String, Int>>): Int {
        var horizontal = 0;
        var depth = 0;
        var aim = 0;

        input.forEach() {
            if (it.first.equals("forward")) {
                horizontal += it.second;
                depth += it.second  * aim;
            } else if(it.first.equals("up")) {
                aim -= it.second;
            } else if(it.first.equals("down")) {
                aim += it.second;
            }
        }

        return horizontal * depth;
    }
}


fun main() {

    val day2 = Day2();

    val testInput = Utils().readTest("day2")
            .map {
                val (key, map) = it.split(" ", limit = 2);
                Pair(key, map.toInt())
            }
    assert(day2.firstStep(testInput) == 150)
    assert(day2.secondStep(testInput) == 900)

    val input = Utils().readInput("day2").map {
        val (key, map) = it.split(" ", limit = 2);
        Pair(key, map.toInt())
    }
    println(day2.firstStep(input))
    println(day2.secondStep(input))
}
