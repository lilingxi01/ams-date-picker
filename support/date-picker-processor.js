// This function is a mix of the `addAction` and `minusAction` functions because we can pass a negative value in.
const changeDateByAmount = (base, amount, flag) => {
  const baseDate = new Date(base);

  switch (flag) {
    case 's':
      baseDate.setTime(baseDate.getTime() + (amount * 1000));
      break;
    case 'h':
      baseDate.setTime(baseDate.getTime() + (amount * 60 * 60 * 1000));
      break;
    case 'd':
      const newDate = parseInt(baseDate.getDate()) + parseInt(amount);
      baseDate.setDate(newDate);
      break;
    case 'm':
      baseDate.setTime(baseDate.getTime() + (amount * 60 * 1000));
      break;
    case 'mo':
      const newMonth = parseInt(baseDate.getMonth()) + parseInt(amount);
      baseDate.setMonth(newMonth);
      break;
    case 'y':
      const newYear = parseInt(baseDate.getFullYear()) + parseInt(amount);
      baseDate.setFullYear(newYear);
      break;
  }

  return baseDate;
};

// A function parse the month number to a string of the month name.
const parseMonthName = (monthNumber) => {
  return new Date(0, monthNumber - 1)
      .toLocaleString('en-US', {month: 'long'});
};

// A function checking if the current area is in Daylight Saving Time area.
const isDaylightSavingArea = () => {
  const date = new Date();
  const january = new Date(date.getFullYear(), 0, 1); // January 1st.
  const july = new Date(date.getFullYear(), 6, 1); // July 1st.
  return january.getTimezoneOffset() !== july.getTimezoneOffset(); // If the timezone offset is not the same, it is in DST area.
};

/**
 * Check if the given time in under a potential conflict of the daylight saving time.
 * @param {Date} date - The date to check.
 * @return {boolean} - True if it is under the conflict of daylight saving time.
 */
export function isInDaylightSavingConflictTime(date) {
  if (!isDaylightSavingArea()) { // If it is not in DST area, it will never be in a conflict time.
    return false;
  }

  // Get the 12PM of the day before the given date.
  const yesterdayNoon = new Date(date.getFullYear(), date.getMonth(), date.getDate() - 1, 12);

  // Get the 12PM of the given date.
  const todayNoon = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 12);

  const hour = date.getHours();
  const minute = date.getMinutes();

  // If the 12PM of the day before the given date is before the 12PM of the given date, it is in the conflict time.
  if (yesterdayNoon.getTimezoneOffset() < todayNoon.getTimezoneOffset()) {
    if ((hour === 1 && minute >= 0 && minute <= 59)) {
      return true;
    }
  }
  return false;
}

/**
 * Set the timezone of a date to the given timezone.
 *
 * @param {Date} date - The date to set the timezone.
 * @param {number | null} offset - The offset of the timezone.
 * @return {Date} - The date with the timezone set.
 */
export function setTimezoneByOffset(date, offset) {
  const newDate = new Date(date);
  newDate.setTime(date.getTime() - (date.getTimezoneOffset() - offset) * 60 * 1000);
  return newDate;

  // Below is the original code.
  // I was considering the case that we may have a duplicated 2AM, so I wrote this solution.
  // But after digging into the problem, I found that we do not have a duplicated 2AM.
  // The overlapping area is from 1:00AM to 1:59AM.
  // Just keep this here for a while in case of a future reference.

  // const timezoneModifier = offset / -60 > 0 ? '+' : '-';
  // const timezoneHour = Math.abs(offset / 60);
  // return DateTime.fromJSDate(date).setZone(`UTC${timezoneModifier}${timezoneHour}`, {keepLocalTime: true}).toJSDate();
}

/**
 * This function takes the user input string and returns the parsed date in the format of DateTime object.
 *
 * Expected behaviors:
 * - Input: `-10d 9am` = 10 days ago at 9am.
 * - Input: `-10d` = 10 days ago.
 * - Input: `now -10h` = 10 hours ago from now.
 * - Input: `12/20/2022 10AM` = `12/20/2022, 10:00 AM` (in Date object format).
 *
 * @param {string} userInput - The user input string.
 * @param {Date} baseDate - The base date to be used for the parsing.
 * @throws {Error} - Throws an error if the input is not valid.
 * @return {Date} - DateTime object.
 */
export function parseDate(userInput, baseDate) {
  // The date object to be returned.
  let updatedDate = new Date(baseDate);
  // Separate the user input string into an array of strings (in order to determine each modifier).
  const modifiers = userInput.split(/[ ,]+/);

  let gmtFlag = false;
  if (modifiers[0].toLowerCase() === 'gmt') {
    gmtFlag = true;
    modifiers.shift();
  }

  while (modifiers.length > 0) {
    // Get the first element from the array.
    const currentModifier = modifiers.shift();

    if (currentModifier.length === 0) {
      continue;
    }

    if (
      // Match the ISO 8601 format. Experimental!
      currentModifier.match(/^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}(?:\.\d+)?)(Z|([+-])(\d{2}):(\d{2}))$/)
    ) {
      const matches = currentModifier.match(/^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}(?:\.\d+)?)(Z|([+-])(\d{2}):(\d{2}))$/);
      const year = parseInt(matches[1], 0);
      const month = parseInt(matches[2], 0) - 1;
      const day = parseInt(matches[3], 0);
      const hour = parseInt(matches[4], 0);
      const minute = parseInt(matches[5], 0);
      const secondAndMillisecond = matches[6].split('.');
      const [second, millisecond] = (
        secondAndMillisecond.length > 1 ?
          [parseInt(secondAndMillisecond[0]), parseInt(secondAndMillisecond[1])] :
          [parseInt(secondAndMillisecond[0]), 0]
      );
      const timezone = matches[7];

      if (timezone !== 'Z') {
        // In non-UTC timezone.
        const timezonePrefix = matches[8];
        const timezoneHour = parseInt(matches[9], 0);
        const timezoneMinute = parseInt(matches[10], 0);
        const timezoneOffset = (timezonePrefix === '-' ? 1 : -1) * timezoneHour * 60 + timezoneMinute;
        updatedDate = new Date(
            year,
            month,
            day,
            hour,
            minute,
            second,
            millisecond,
        );
        updatedDate = setTimezoneByOffset(updatedDate, timezoneOffset);
      } else {
        updatedDate = new Date(Date.UTC(year, month, day, hour, minute, second, millisecond));
      }
    } else if (
      /* If this is a date modifier. */
      ['-', '+'].includes(currentModifier.charAt(0))
    ) {
      const prefix = currentModifier.charAt(0);
      const amount = currentModifier.replace(/\D/g, '');
      const flag = currentModifier.replace(/\W/g, '').replace(/\d/g, '').toLowerCase();
      if (prefix === '+') {
        updatedDate = changeDateByAmount(updatedDate, amount, flag);
      } else {
        updatedDate = changeDateByAmount(updatedDate, -amount, flag);
      }
    } else if (
      /* If this is a now modifier. */
      currentModifier.toLowerCase() === 'now'
    ) {
      // Override the updatedDate to the current date.
      updatedDate = new Date();
    } else if (
      /* If this is a time. */
      currentModifier.toLowerCase().match(/^\d{1,2}(?::\d{2}){0,2}(am|pm)?$/g)
    ) {
      // Parse the time.
      const matches = currentModifier
          .toLowerCase()
          .match(/^\d{1,2}(?::\d{2}){0,2}(am|pm)?$/);

      if (matches.length < 1) {
        continue;
      }

      const time = matches[0].replace(/(am|pm)/g, '');
      const timeArray = time.split(':');
      const hour = timeArray[0];
      const minute = timeArray[1] || 0;
      const second = timeArray[2] || 0;

      if (hour >= 24) {
        throw new Error('Invalid hour. The hour must be between 0 and 23.');
      } else if (minute >= 60) {
        throw new Error('Invalid minute. The minute must be between 0 and 59.');
      } else if (second >= 60) {
        throw new Error('Invalid second. The second must be between 0 and 59.');
      }
      // If the user types `12am`, we need to set the hour to 0.
      const hourInt = ((matches[1] === 'am') && (hour === '12')) ? 0 : parseInt(hour);
      const minuteInt = parseInt(minute);
      const secondInt = parseInt(second);
      const ampmInt = (matches[1] || 'am') === 'am' ? 0 : (hourInt > 11 ? 0 : 12);

      updatedDate.setHours(hourInt + ampmInt);
      updatedDate.setMinutes(minuteInt);
      updatedDate.setSeconds(secondInt);
    } else if (
      /* If this is a date. */
      currentModifier.toLowerCase().match(/^\d{1,2}\/\d{1,2}(?:|\/\d{2}|\/\d{4})$/g)
    ) {
      // Parse the date.
      const matches = currentModifier.toLowerCase().match(
          /^(\d{1,2}\/\d{1,2}(?:|\/\d{2}|\/\d{4}))$/
      );

      if (matches.length < 1) {
        continue;
      }

      const dateArray = matches[1].split('/');
      const month = parseInt(dateArray[0]) || 1;
      const day = parseInt(dateArray[1]) || 1;
      const year = parseInt(dateArray[2]) || updatedDate.getFullYear();

      // Throw errors if the date is invalid.
      if (month > 12) {
        throw new Error('Invalid month. The month must be between 1 and 12.');
      } else if (month === 2) {
        if ((0 === year % 4) && (0 !== year % 100) || (0 === year % 400)) {
          // This is a leap year.
          if (day > 29) {
            throw new Error('Invalid day. February has only 29 days in a leap year.');
          }
        } else if (day > 28) {
          throw new Error('Invalid day. February only has 28 days in a non-leap year.');
        }
      } else if (day > 30) {
        if ([4, 6, 9, 11].includes(month)) {
          throw new Error(`Invalid day. ${parseMonthName(month)} only has 30 days.`);
        }
        if (day > 31) {
          throw new Error(`Invalid day. ${parseMonthName(month)} only has 31 days.`);
        }
      } else if (year < 0 || year > 9999) {
        throw new Error('Invalid year.');
      }

      updatedDate.setFullYear(year);

      // -1 because the month starts from 0.
      updatedDate.setMonth(month - 1, day);
    } else if (
      /* If this is a standalone `am` or `pm`. */
      ['am', 'pm'].includes(currentModifier.toLowerCase())
    ) {
      // Parse the am/pm and add that to the updatedDate if needed.
      const hour = updatedDate.getHours();
      if (currentModifier.toLowerCase() === 'pm' && hour < 12) {
        updatedDate.setHours(hour + 12);
      }
    } else {
      // Invalid format.
      throw new Error('Invalid format.');
    }
  }
  if (gmtFlag) {
    const utcTime = Date.UTC(updatedDate.getFullYear(), updatedDate.getMonth(), updatedDate.getDate(), updatedDate.getHours(), updatedDate.getMinutes(), updatedDate.getSeconds(), updatedDate.getMilliseconds());

    // Convert the date to GMT without changing the absolute value of each term.
    return new Date(utcTime);
  }
  return updatedDate;
}
