/* eslint-disable no-undef */
let expect = chai.expect;

const array1 = [
    [1111, 1],
    [2222, 2],
    [3333, 3],
    [4444, 4],
    [5555, 5],
    [6666, 6],
    [7777, 7]
];
const array2 = [
    [1111, 5000.12342],
    [2222, 6],
    [3333, 5],
    [4444, 4],
    [5555, 3],
    [6666, 2],
    [7777, 1]
];
const array3 = [
    [1111, 213123.123676],
    [2222, 6],
    [3333, 5],
    [4444, 4],
    [5555, 3],
    [6666, 2],
    [7777, 2]
];
const array4 = [
    [1111, 700.916],
    [2222, 700.916],
    [3333, 512],
    [4444, 41],
    [5555, 30],
    [6666, 2.51],
    [7777, 1.9]
];
const array5 = [
    [1111, 700.916],
    [2222, 700.915],
    [3333, 512],
    [4444, 41],
    [5555, 41],
    [6666, 2.51],
    [7777, 1.9]
];
const array6 = [
    [1111, 700.920],
    [2222, 700.919],
    [3333, 700.918],
    [4444, 700.917],
    [5555, 700.916],
    [6666, 700.915],
    [7777, 700.910]
];
const array7 = [
    [1111, 100],
    [2222, 100],
    [3333, 100],
    [4444, 100]
];
const array8 = [
    [1111, 100],
    [2222, 100],
    [3333, 100.1],
    [4444, 0],
    [5555, 100],
    [6666, 100]
];

describe("Test checkDescending", function() {
    it("Should return true if array is descending, false if not", function() {
        let test = (checkDescending(array1));
        expect(test).to.be.false;
        test = (checkDescending(array2));
        expect(test).to.be.true;
        test = (checkDescending(array3));
        expect(test).to.be.false;
        test = (checkDescending(array4));
        expect(test).to.be.false;
        test = (checkDescending(array5));
        expect(test).to.be.false;
        test = (checkDescending(array6));
        expect(test).to.be.true;
        test = (checkDescending(array7));
        expect(test).to.be.false;
    });
});

describe("Test getLowestValueAndDate", function() {
    it("Should return the lowest value in array and the corresponding date", function() {
        let testLowest = (getLowestValueAndDate(array1));
        expect(testLowest[1]).to.equal(1);
        testLowest = (getLowestValueAndDate(array2));
        expect(testLowest[1]).to.equal(1);
        testLowest = (getLowestValueAndDate(array3));
        expect(testLowest[1]).to.equal(2);
        testLowest = (getLowestValueAndDate(array4));
        expect(testLowest[1]).to.equal(1.9);
        testLowest = (getLowestValueAndDate(array5));
        expect(testLowest[1]).to.equal(1.9);
        testLowest = (getLowestValueAndDate(array6));
        expect(testLowest[1]).to.equal(700.910);
        testLowest = (getLowestValueAndDate(array7));
        expect(testLowest[1]).to.equal(100);
        testLowest = (getLowestValueAndDate(array8));
        expect(testLowest[1]).to.equal(0);
    });
});

describe("Test getHighestValueAndDate", function() {
    it("Should return the highest value in array and the corresponding date", function() {
        let testHighest = (getHighestValueAndDate(array1));
        expect(testHighest[1]).to.equal(7);
        testHighest = (getHighestValueAndDate(array2));
        expect(testHighest[1]).to.equal(5000.12342);
        testHighest = (getHighestValueAndDate(array3));
        expect(testHighest[1]).to.equal(213123.123676);
        testHighest = (getHighestValueAndDate(array4));
        expect(testHighest[1]).to.equal(700.916);
        testHighest = (getHighestValueAndDate(array5));
        expect(testHighest[1]).to.equal(700.916);
        testHighest = (getHighestValueAndDate(array6));
        expect(testHighest[1]).to.equal(700.920);
        testHighest = (getHighestValueAndDate(array7));
        expect(testHighest[1]).to.equal(100);
        testHighest = (getHighestValueAndDate(array8));
        expect(testHighest[1]).to.equal(100.1);
    });
});

const descendingTrend1 = [
    [1111, 10],
    [2222, 20],
    [3333, 30],
    [4444, 40],
    [5555, 50],
    [6666, 60],
    [7777, 70]
];
const descendingTrend2 = [
    [1111, 70],
    [2222, 60],
    [3333, 50],
    [4444, 40],
    [5555, 30],
    [6666, 20],
    [7777, 10]
];
const descendingTrend3 = [
    [1111, 10],
    [2222, 20],
    [3333, 30],
    [4444, 40],
    [5555, 30],
    [6666, 20],
    [7777, 10],
    [8888, 10],
    [9999, 20],
    [1000, 19],
    [2000, 18],
    [3000, 17],
    [4000, 16],
    [5000, 15],
    [6000, 15]
];
const descendingTrend4 = [
    [1111, 3],
    [2222, 2],
    [3333, 1]
];
const descendingTrend5 = [
    [1111, 3],
    [2222, 3],
    [3333, 1]
];
const descendingTrend6 = [
    [1111, 3],
    [2222, 3],
    [3333, 3]
];

describe("Test getLongestBearishTrend", function() {
    it("Should return the number of longest downward sequence in array", function() {
        let testLongestDownward = (getLongestBearishTrend(descendingTrend1));
        expect(testLongestDownward).to.equal(0);
        testLongestDownward = (getLongestBearishTrend(descendingTrend2));
        expect(testLongestDownward).to.equal(6);
        testLongestDownward = (getLongestBearishTrend(descendingTrend3));
        expect(testLongestDownward).to.equal(5);
        testLongestDownward = (getLongestBearishTrend(descendingTrend4));
        expect(testLongestDownward).to.equal(2);
        testLongestDownward = (getLongestBearishTrend(descendingTrend5));
        expect(testLongestDownward).to.equal(1);
        testLongestDownward = (getLongestBearishTrend(descendingTrend6));
        expect(testLongestDownward).to.equal(0);
    });
});

const unixTimes1 = [
    [1635725007402,53094.49707882135],  // midnight #1
    [1635728421286,53293.103479242556],
    [1635732570710,53071.52968895052],
    [1635811516438,52624.350353473725], // midnight #2
    [1635818698369,52984.92276614089],
    [1635826534338,52792.8198322809],
    [1635832844418,53290.4014800102],
    [1635894180000,54372.06068168037],
    [1635897720973,54624.71696358728],  // midnight #3
    [1635901515409,54568.899805695415],
    [1635908463980,54563.297516314546],
    [1635984184518,54264.1610351158],   // midnight #4
    [1635987867110,54060.67358723676],
    [1635995006011,53873.90386890283],
    [1636070864319,53296.164099428686], // midnight #5
    [1636074234095,52749.33792104217],
    [1636077616374,53312.084989836636],
    [1636081677095,53586.86533060857],
    [1636088454232,53886.058405768745],
    [1636502544408,57914.295934630776], // midnight #6
    [1636588922306,56635.64786126113]   // midnight #7
];
const unixTimes2 = [                    //               hh:mm                  
    [1638835495083,44803.51872529366],  // midnight #1   00:04  start day
    [1638835717976,44875.84794667606],  //               00:08
    [1638836101902,44819.769976903284], //               00:15
    [1638841739497,44871.71495765137],  //               01:48
    [1638858522652,45187.42648291315],  //               06:28
    [1638921504009,44927.87083488738],  //               23:58
    [1638921857704,44903.4248759858]    // midnight #2   00:04  next day
];
const unixTimes3 = [                    //               hh:mm                  
    [1638921605000,44803.51872529366],  // midnight #1   00:00
    [1638921670000,44875.84794667606],  //               00:01
    [1638921730000,44819.769976903284], //               00:02
    [1639008070000,44871.71495765137],  // midnight #2   00:01  next day
    [1639008190000,45187.42648291315],  //               00:03
    [1639094830000,44927.87083488738],  // midnight #3   00:07  next day
    [1639181110000,44903.4248759858]    // midnight #4   00:05  next day
];
const unixTimes4 = [                    //               hh:mm                  
    [1638921605000,44803.51872529366],  // midnight #1   00:00
    [1639008070000,44871.71495765137],  // midnight #2   00:01  next day
    [1639094830000,44927.87083488738],  // midnight #3   00:07  next day
    [1639181110000,44903.4248759858]    // midnight #4   00:05  next day
];

describe("Test getMidnight", function() {
    it("Should return the timestamps closest to midnight for each day within the provided date range",
        function() {
        let testMidnight = getMidnight(unixTimes1);
        expect(testMidnight.length).to.equal(7);

        for (let i = 0; i < testMidnight.length; i++) {
            let date = new Date(testMidnight[i][0]);
            let hour = date.getUTCHours();
            expect(hour).to.equal(0);

            let dateLuxon = luxon.DateTime.fromMillis(testMidnight[i][0]).toUTC();
            let hourLuxon = dateLuxon.hour;
            expect(hourLuxon).to.equal(0);
        }

        testMidnight = getMidnight(unixTimes2);
        expect(testMidnight.length).to.equal(2);

        for (let i = 0; i < testMidnight.length - 1; i++) {
            let date = new Date(testMidnight[i][0]);
            let nextDate = new Date(testMidnight[i+1][0]);
            let day = date.getUTCDate();
            let nextDay = nextDate.getUTCDate();
            let hour = date.getUTCHours();
            let nextHour = nextDate.getUTCHours();
            expect(day).to.not.equal(nextDay);
            expect(hour).to.equal(0);
            expect(nextHour).to.equal(0);

            let dateLuxon = luxon.DateTime.fromMillis(testMidnight[i][0]).toUTC();
            let nextDateLuxon = luxon.DateTime.fromMillis(testMidnight[i+1][0]).toUTC();
            let dayLuxon = dateLuxon.day;
            let nextDayLuxon = nextDateLuxon.day;
            let hourLuxon = dateLuxon.hour;
            let nextHourLuxon = dateLuxon.hour;
            expect(dayLuxon).to.not.equal(nextDayLuxon);
            expect(hourLuxon).to.equal(0);
            expect(nextHourLuxon).to.equal(0);
        }

        testMidnight = getMidnight(unixTimes3);
        expect(testMidnight.length).to.equal(4);
        expect(testMidnight[0][1]).to.equal(44803.51872529366);
        expect(testMidnight[3][1]).to.equal(44903.4248759858);

        for (let i = 0; i < testMidnight.length - 1; i++) {
            let date = new Date(testMidnight[i][0]);
            let nextDate = new Date(testMidnight[i+1][0]);
            let day = date.getUTCDate();
            let nextDay = nextDate.getUTCDate();
            let hour = date.getUTCHours();
            let nextHour = nextDate.getUTCHours();
            expect(day).to.not.equal(nextDay);
            expect(hour).to.equal(0);
            expect(nextHour).to.equal(0);

            let dateLuxon = luxon.DateTime.fromMillis(testMidnight[i][0]).toUTC();
            let nextDateLuxon = luxon.DateTime.fromMillis(testMidnight[i+1][0]).toUTC();
            let dayLuxon = dateLuxon.day;
            let nextDayLuxon = nextDateLuxon.day;
            let hourLuxon = dateLuxon.hour;
            let nextHourLuxon = dateLuxon.hour;
            expect(dayLuxon).to.not.equal(nextDayLuxon);
            expect(hourLuxon).to.equal(0);
            expect(nextHourLuxon).to.equal(0);
        }

        testMidnight = getMidnight(unixTimes4);
        expect(testMidnight.length).to.equal(4);
        expect(testMidnight[0][1]).to.equal(44803.51872529366);
        expect(testMidnight[3][1]).to.equal(44903.4248759858);

        for (let i = 0; i < testMidnight.length - 1; i++) {
            let date = new Date(testMidnight[i][0]);
            let nextDate = new Date(testMidnight[i+1][0]);
            let day = date.getUTCDate();
            let nextDay = nextDate.getUTCDate();
            let hour = date.getUTCHours();
            let nextHour = nextDate.getUTCHours();
            expect(day).to.not.equal(nextDay);
            expect(hour).to.equal(0);
            expect(nextHour).to.equal(0);

            let dateLuxon = luxon.DateTime.fromMillis(testMidnight[i][0]).toUTC();
            let nextDateLuxon = luxon.DateTime.fromMillis(testMidnight[i+1][0]).toUTC();
            let dayLuxon = dateLuxon.day;
            let nextDayLuxon = nextDateLuxon.day;
            let hourLuxon = dateLuxon.hour;
            let nextHourLuxon = dateLuxon.hour;
            expect(dayLuxon).to.not.equal(nextDayLuxon);
            expect(hourLuxon).to.equal(0);
            expect(nextHourLuxon).to.equal(0);
        }
    });
});