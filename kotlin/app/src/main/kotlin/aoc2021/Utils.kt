package aoc2021

import java.io.File
import java.nio.file.Paths

class Utils {
    /**
     * Read puzzle data
     */
    fun readInput(directory: String): List<String> = readFile(directory, "input")


    /**
     * Read test data
     */
    fun readTest(directory: String): List<String> = readFile(directory, "test")

    /**
     * Read file
     * @private
     */
    private fun readFile(directory: String, type: String): List<String> = File(Paths.get("inputs/$directory").toAbsolutePath().toString(), "$type.txt").readLines()
}





