const dayjs = require('dayjs');

const dayOfYear = require('dayjs/plugin/dayOfYear');
const utcOffset = require('dayjs/plugin/utc');

dayjs.extend(dayOfYear);
dayjs.extend(utcOffset);

function getTodayInDayOfYear() {
    const day = dayjs().utcOffset(-3);
    return day.dayOfYear();
}

function convertDayAndMothInDayOfYear(day, month) {
    const year = dayjs().year();
    const date = dayjs(`${month}-${day}-${year}`);
    return date.dayOfYear();
} 

module.exports = { 
    getTodayInDayOfYear, 
    convertDayAndMothInDayOfYear 
}