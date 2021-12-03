use aoc_runner_derive::{aoc, aoc_generator};


#[aoc_generator(day3)]
pub fn input_generator(input: &str) -> Vec<String> {
    input
        .lines().map(|line| line.trim().to_string()).collect()
}

#[aoc(day3, part1)]
pub fn solve_part1(_input: &[String]) -> i32 {
    let (gamma, epsilon) = _input[0].chars()
        .enumerate().fold((0, 0), |(gamma, epsilon), (id, _)|
        {
            let cnt = how_many(_input, id);
            if cnt.0 > cnt.1 { (gamma << 1 | 1, epsilon << 1) } else { (gamma << 1, epsilon << 1 | 1) }
        });
    gamma * epsilon
}

#[aoc(day3, part2)]
pub fn solve_part2(_input: &[String]) -> i32 {
    let oxygen = get_value(_input, 0, false);
    let co2 = get_value(_input, 0, true);
    oxygen * co2
}

fn how_many(data: &[String], x: usize) -> (i32, i32)
{
    data.iter()
        .fold((0, 0),
              |(zero, one), d|
                  if d.chars().nth(x).unwrap() == '0' { (zero + 1, one) } else { (zero, one + 1) })
}

fn get_value(data: &[String], counter: usize, oxygen: bool) -> i32
{
    if data.len() == 1
    {
        return i32::from_str_radix(&data[0][..], 2).unwrap();
    }

    let cnt = how_many(data, counter);
    let c = if oxygen { if cnt.0 > cnt.1 { '0' } else { '1' } } else { if cnt.0 > cnt.1 { '1' } else { '0' } };

    get_value(&data.iter()
        .filter(|s| s.chars().nth(counter).unwrap() == c)
        .map(|s| s.clone())
        .collect::<Vec<String>>(),
              counter + 1,
              oxygen)
}


