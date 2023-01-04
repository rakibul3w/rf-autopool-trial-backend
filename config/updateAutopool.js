const updateAutopool = async(autopoolNumber, userId) =>{
    const value = {
        2: "autopool-two",
        3: "autopool-three",
        4: "autopool-four",
        5: "autopool-five",
        6: "autopool-six",
        7: "autopool-seven",
        8: "autopool-eight",
        9: "autopool-nine",
        10: "autopool-ten",
        11: "autopool-eleven",
        12: "autopool-twelve",
        13: "autopool-thirteen",
        14: "autopool-fourteen",
        15: "autopool-fifteen",
        16: "autopool-sixteen",
    }

    const upgradeAmount = {
        "autopool-two": 100,
        "autopool-three": 150,
        "autopool-four": 200,
        "autopool-five": 290,
        "autopool-six": 540,
        "autopool-seven": 1030,
        "autopool-eight": 2000,
        "autopool-nine": 3930,
        "autopool-ten": 7680,
        "autopool-eleven": 15470,
        "autopool-twelve": 30840,
        "autopool-thirteen": 61570,
        "autopool-fourteen": 123020,
        "autopool-fifteen": 245910,
    }
}

module.exports = updateAutopool;