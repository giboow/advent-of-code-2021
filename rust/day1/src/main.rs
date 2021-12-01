use expect_test::expect;

/**
 * Program launches all steps of the day 1 puzzle.
 */
fn main() {

    // Test data
    let test_data = include_str!("../../../inputs/day1/test.txt");
    expect![["7"]].assert_eq(&first_step(test_data.lines()
        .map(|line| line.parse::<usize>().unwrap()).collect::<Vec<usize>>()).to_string());
    expect![["5"]].assert_eq(&second_step(test_data.lines()
        .map(|line| line.parse::<usize>().unwrap()).collect::<Vec<usize>>()).to_string());

    // Real data
    let data = include_str!("../../../inputs/day1/input.txt");
    println!("First step {}", first_step(data.lines()
        .map(|line| line.parse::<usize>().unwrap()).collect::<Vec<usize>>()));
    println!("First step {}", second_step(data.lines()
        .map(|line| line.parse::<usize>().unwrap()).collect::<Vec<usize>>()));
}

/**
 * Step 1 : Count increases in the data set
 */
fn first_step(_data: Vec<usize>) -> i32 {
    let mut counter = 0;
    _data.iter().enumerate().for_each(|(i, x)| {
        let next = _data.get(i + 1);
        if next.is_some() && next.unwrap() > x {
            counter += 1;
        }
    });

    return counter;
}

/**
 * Step 2 : Count the number of times the sum of measurements in this sliding window increases from the previous sum. So,
 * compare A with B, then compare B with C, then C with D, and so on. Stop when there aren't enough measurements
 * left to create a new three-measurement sum.
 *
 * entry example :
 * 199  A
 * 200  A B
 * 208  A B C
 * 210    B C D
 * 200  E   C D
 * 207  E F   D
 * 240  E F G
 * 269    F G H
 * 260      G H
 * 263        H
 *
 * Then aggregate data by chars and count increases :
 * A: 607 (N/A - no previous sum)
 * B: 618 (increased)
 * C: 618 (no change)
 * D: 617 (decreased)
 * E: 647 (increased)
 * F: 716 (increased)
 * G: 769 (increased)
 * H: 792 (increased)
 *
 * Then the result id 5
 */
fn second_step(_data: Vec<usize>) -> i32 {
    let mut counter = 0;


    let mut tmp_values: Vec<usize> = Vec::new();
    _data.iter().enumerate().for_each(|(i, x)| {
        let sum = x + _data.get(i + 1).unwrap_or(&0) + _data.get(i + 2).unwrap_or(&0);
        tmp_values.push(sum);
    });

    tmp_values.iter().enumerate().for_each(|(i, x)| {
        let next = tmp_values.get(i + 1);
        if next.is_some() && next.unwrap() > x {
            counter += 1;
        }
    });
    return counter;
}
