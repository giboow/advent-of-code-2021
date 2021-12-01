package aoc2021

import java.io.File
import java.nio.file.Paths

class Utils {
    /**
     * Reads lines from the given directory
     */
    fun readInput(directory: String): List<String> = File(Paths.get("inputs/$directory").toAbsolutePath().toString(), "input.txt").readLines()
}





