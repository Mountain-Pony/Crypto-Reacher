/**
 * Crypto Reacher is a tool for analyzing bitcoin's market value
 * within a given date range.
 */

/**
 * This function executes the program when the 'Execute' button is clicked 
 * in index.html.
 *
 * First, clears the relevant HTML elements and inspects the user
 * input a little bit.
 *
 * Second, calculates the longest downward trend within a given date range
 * and shows it to the user.
 *
 * Third, finds the highest trading volume within the given date range.
 * Shows the date with the highest volume and the volume traded on that day in euros
 * to the user.
 *
 * Fourth, finds the best day to buy and sell cryptos within the given date range.
 * The best day to buy is when the price is lowest.
 * The best day to sell is when the price is highest.
 *
 * If the price of crypto is descending throughout the given date range,
 * advices the user not to buy and stop the function.
 *
 * If not, shows the best day to buy and sell with the corresponding prices
 * to the user.
 *
 * The /coins/{id}/market_chart/range endpoint of CoinGecko API is used to acquire
 * all crypto-related information.
 */
// eslint-disable-next-line no-unused-vars
function execute() {
    clearHTMLElements("outputElement");

    const startDate = getUsersDate("startDate");
    const endDate = getUsersDate("endDate");
    endDate.setHours(endDate.getHours() + 1); // Add one hour to end date.
    const crypto = getCurrency("crypto");
    const fiat = "eur";

    const isCorrect = checkUserInput(startDate, endDate);
    if (isCorrect == false) return;

    const startDateUnix = dateToUnix(startDate);
    const endDateUnix = dateToUnix(endDate);
    const url = createURL(crypto, fiat, startDateUnix, endDateUnix);

    fetch(url)
        .then(function(response) {
                const respStatus = response.status;
                if (respStatus !== 200) {
                    const errStatus = "CoinGecko data request failed. Status Code: " + response.status;
                    document.getElementById("executeError").innerHTML = errStatus;
                    return;
                }
                response.json().then(function(data) {
                        // fetched json in data variable

                        /* The longest bearish trend */
                        const midnightPrices = getMidnight(data.prices);
                        const longestBear = getLongestBearishTrend(midnightPrices);
                        document.getElementById("longestBear").innerHTML = longestBear + " days.";

                        if (longestBear == 1) {
                            document.getElementById("longestBear").innerHTML = longestBear + " day.";
                        }

                        /* The highest trading volume */
                        const midnightVolumes = getMidnight(data.total_volumes);
                        const results = getHighestValueAndDate(midnightVolumes);
                        const highestVolumeDate = formatDate(results[0]);
                        const highestVolume = formatSum("en-EN", fiat, results[1]);
                        document.getElementById("highestVolumeDate").innerHTML = highestVolumeDate;
                        document.getElementById("highestVolume").innerHTML = highestVolume;

                        /* The best days for buying and selling */
                        const isDescending = checkDescending(midnightPrices);

                        if (isDescending == true) {
                            document.getElementById("bestDayToBuy").innerHTML = 
                            "The price only decreases in the given date range. " + 
                            "It is not recommended to buy or sell on any of these dates.";
                            return;
                        }

                        const resultsLowest = getLowestValueAndDate(midnightPrices);
                        const bestDayToBuy = formatDate(resultsLowest[0]);
                        document.getElementById("bestDayToBuy").innerHTML = 
                        bestDayToBuy + " is the best day to buy " + crypto + ".";

                        const resultsHighest = getHighestValueAndDate(midnightPrices);
                        const bestDayToSell = formatDate(resultsHighest[0]);
                        document.getElementById("bestDayToSell").innerHTML = 
                        bestDayToSell + " is the best day to sell " + crypto + ".";
                    }
                );
            }
        ).catch(function(error) {
            const err = "CoinGecko data request failed. Error: " + error;
            document.getElementById("executeError").innerHTML = err;
        });
}

/**
 * Gets the date from user input.
 * @param {string} id ID of the field from which the data is fetched (either startDate or endDate).
 * @returns User input.
 */
function getUsersDate(id) {
    const date = new Date(document.getElementById(id).value);
    return date;
}

/**
 * Converts the given date to unix timestamp.
 * @param {date} date Given date.
 * @returns Given date in unix format.
 */
function dateToUnix(date) {
    const unixDate = date.valueOf();
    return unixDate / 1000;
}

/**
 * Gets the currency information from user input.
 * @param {string} id ID of the field from which the data is fetched.
 * @returns User input.
 */
function getCurrency(id) {
    const currency = document.getElementById(id).value;
    return currency;
}

/**
 * Creates a URL for the /coins/{id}/market_chart/range endpoint of the CoinGecko API
 * using given parameters.
 * @param {string} crypto Cryptocurrency.
 * @param {string} fiat Fiat currency.
 * @param {unix timestamp} startDateUnix Start date as an unix timestamp.
 * @param {unix timestamp} endDateUnix End date as an unix timestamp.
 * @returns Request URL.
 */
function createURL(crypto, fiat, startDateUnix, endDateUnix) {
    const url = "https://api.coingecko.com/api/v3/coins/" + crypto + "/market_chart/range?vs_currency=" + fiat + "&from=" + startDateUnix + "&to=" + endDateUnix;
    return url;
}

/**
 * Finds the timestamp that is closest to midnight for each day
 * within the date range that is contained in the given array
 * and deletes other timestamps and their information pairs from the array.
 * This function assumes that the first item in the array is the first
 * midnight timestamp of the start date.
 * @param {array} a Given array.
 * @returns Array that contains one timestamp for each day that is closest to
 * midnight and the value which is paired with each midnight timestamp,
 * such as crypto price or traded volume.
 */
function getMidnight(a) {
    const count = Object.keys(a).length;

    for (let i = count - 1; i >= 1; i--) {
        let time = new Date(a[i][0]);
        let previousTime = new Date(a[i - 1][0]);
        let day = time.getUTCDate();
        let previousDay = previousTime.getUTCDate();

        if (day == previousDay) {
            a.splice(i, 1);
        }
    }

    return a;
}

/**
 * Gets the number of longest sequence of decreasing numbers
 * in given array.
 * @param {array} a Given array.
 * @returns The number of longest sequence of decreasing numbers.
 * For example:
 * [3, 2, 1] returns 2
 * [3, 3, 1] returns 1
 * [3, 3, 3] returns 0
 */
function getLongestBearishTrend(a) {
    let longestBear = 0;
    let temp = 0;

    for (let i = 0; i < a.length - 1; i++) {
        let price = a[i][1];
        let nextPrice = a[i + 1][1];
        if (nextPrice < price) temp += 1;
        if (temp > longestBear) longestBear = temp;
        if (nextPrice >= price) temp = 0;
    }

    return longestBear;
}

/**
 * Finds the highest value and the corresponding date
 * in the given array.
 * @param {array} a Given array.
 * @returns The highest value and corresponding date in an array,
 * date in a[0] and the highest value in a[1].
 */
function getHighestValueAndDate(a) {
    let date = a[0][0];
    let highest = a[0][1];

    for (let i = 0; i < a.length; i++) {
        let time = a[i][0];
        let value = a[i][1];

        if (value > highest) {
            date = time;
            highest = value;
        }
    }

    const results = [date,
        highest
    ];
    return results;
}

/**
 * Finds the lowest value and corresponding date
 * in the given array.
 * @param {array} a Given array.
 * @returns The lowest value and corresponding date in an array.
 */
function getLowestValueAndDate(a) {
    let date = a[0][0];
    let lowest = a[0][1];

    for (let i = 0; i < a.length; i++) {
        let time = a[i][0];
        let value = a[i][1];

        if (value < lowest) {
            date = time;
            lowest = value;
        }
    }

    const results = [date,
        lowest
    ];
    return results;
}

/**
 * Checks if the given array is in descending order.
 * @param {array} a Given array.
 * @returns True if descending, false if not.
 */
function checkDescending(a) {
    for (let i = 0; i < a.length - 1; i++) {
        let value = a[i][1];
        let nextValue = a[i + 1][1];
        if (value <= nextValue) return false;
    }

    return true;
}

/**
 * Formats the given sum of money to a more readable form.
 * @param {string} locale Language and region settings.
 * @param {string} currency Given currency.
 * @param {number} sum Given sum.
 * @returns The formatted sum.
 */
function formatSum(locale, currency, sum) {
    const formatter = new Intl.NumberFormat(locale, {
            style: "currency",
            currency: currency,
        }

    );
    return formatter.format(sum);
}

/**
 * Converts given unix timestamp to ISO string.
 * @param {unix timestamp} unix Given date.
 * @returns Unix timestamp as formatted ISO string.
 */
function formatDate(unix) {
    const date = new Date(unix).toISOString().substring(0, 10).replaceAll("-", "/");
    return date;
}

/**
 * Clears all HTML elements that belong to given class.
 * Clears borders of date input elements in case they
 * were lit by an error.
 * @param {HTML class} c Given class.
 */
function clearHTMLElements(c) {
    document.getElementById("startDate").style.removeProperty("border");
    document.getElementById("endDate").style.removeProperty("border");
    const elements = document.getElementsByClassName(c);

    for (let i = 0; i < elements.length; i++) {
        let element = elements[i];
        element.innerHTML = "";
    }
}

/**
 * Checks if user has provided proper dates for the program.
 * Incorrect date causes an error message and the program will
 * shut down, incorrect dates are either NaN or future dates.
 * @param {date} startDate Start date.
 * @param {date} endDate End date.
 */
function checkUserInput(startDate, endDate) {
    const now = Date.now();
    const startID = "startDate";
    const startErrorID = "startDateError";
    const endID = "endDate";
    const endErrorID = "endDateError";
    const proper = "Please enter a date.";
    const future = "Can't search the future.";
    const color = "red";

    if (isNaN(startDate) && isNaN(endDate)) {
        document.getElementById(startID).style.borderColor = color;
        document.getElementById(endID).style.borderColor = color;
        document.getElementById(startErrorID).innerHTML = proper;
        document.getElementById(endErrorID).innerHTML = proper;
        return false;
    }

    if (startDate > now && endDate > now) {
        document.getElementById(startID).style.borderColor = color;
        document.getElementById(endID).style.borderColor = color;
        document.getElementById(startErrorID).innerHTML = future;
        document.getElementById(endErrorID).innerHTML = future;
        return false;
    }

    if (isNaN(startDate)) {
        document.getElementById(startID).style.borderColor = color;
        document.getElementById(startErrorID).innerHTML = proper;
        return false;
    }

    if (isNaN(endDate)) {
        document.getElementById(endID).style.borderColor = color;
        document.getElementById(endErrorID).innerHTML = proper;
        return false;
    }

    if (startDate > now) {
        document.getElementById(startID).style.borderColor = color;
        document.getElementById(startErrorID).innerHTML = future;
        return false;
    }

    if (endDate > now) {
        document.getElementById(endID).style.borderColor = color;
        document.getElementById(endErrorID).innerHTML = future;
        return false;
    }

    if (isNaN(startDate) && endDate > now) {
        document.getElementById(startID).style.borderColor = color;
        document.getElementById(endID).style.borderColor = color;
        document.getElementById(startErrorID).innerHTML = proper;
        document.getElementById(endErrorID).innerHTML = future;
        return false;
    }

    if (isNaN(endDate) && startDate > now) {
        document.getElementById(startID).style.borderColor = color;
        document.getElementById(endID).style.borderColor = color;
        document.getElementById(startErrorID).innerHTML = future;
        document.getElementById(endErrorID).innerHTML = future;
        return false;
    }

    return true;
}

/**
 * Creates options for crypto <select> element.
 */
// eslint-disable-next-line no-unused-vars
function createOptions() {
    const cryptos = ["bitcoin"];
    const selectCrypto = document.getElementById("crypto");

    for (let i = 0; i < cryptos.length; i++) {
        let option = document.createElement("option");
        let crypto = cryptos[i];
        option.value = crypto;
        option.innerHTML = capitalizeFirstLetter(crypto);
        selectCrypto.appendChild(option);
    }

    const firstCryptoOption = cryptos[0];
    firstCryptoOption.selected = true;
}

/**
 * Puts first letter of given word to upper case.
 * @param {string} word Given word.
 * @returns Given word with capitalized first letter.
 */
function capitalizeFirstLetter(word) {
    return word.charAt(0).toUpperCase() + word.slice(1);
}