use aoc_runner_derive::{aoc, aoc_generator};

pub struct Item {
    direction: String,
    value: usize,
}

#[aoc_generator(day2)]
pub fn input_generator(input: &str) -> Vec<Item> {
    input
        .lines()
        .map(|line| {
            let mut array_split = line.split_whitespace();
            let direction: String = array_split.next().unwrap().to_string();
            let value = array_split.next().unwrap().parse::<usize>().unwrap();
            Item { direction: direction, value : value}
        })
        .collect()
}

#[aoc(day2, part1)]
pub fn solve_part1(_input: &[Item]) -> usize {
    let (h, d) = _input.iter().fold((0, 0), |(h, d), item | {
        let value = item.value;
        let direction = item.direction.as_str();
        match direction {
            "forward" => (h + value, d),
            "up" => (h, d - value),
            "down" => (h, d + value),
            _ => panic!("Unknown direction {}", direction),
        }
    });
    h * d
}

#[aoc(day2, part2)]
pub fn solve_part2(_input: &[Item]) -> usize {
    let (h, d, _) = _input.iter().fold((0, 0, 0), |(h, d, aim), item | {
        let value = item.value;
        let direction = item.direction.as_str();
        match direction {
            "forward" => (h + value, d + value * aim, aim),
            "up" => (h, d , aim - value),
            "down" => (h, d , aim + value),
            _ => panic!("Unknown direction {}", direction),
        }
    });
    h * d
}
