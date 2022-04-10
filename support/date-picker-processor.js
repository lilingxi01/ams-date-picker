// This function is a mix of the `addAction` and `minusAction` functions because we can pass a negative value in.
const changeDateByAmount = (base, amount, flag) => {
  switch (flag) {
    case 'h':
      const newHour = parseInt(base.getHours()) + parseInt(amount);
      base.setHours(newHour);
      break;
    case 'd':
      const newDate = parseInt(base.getDate()) + parseInt(amount);
      base.setDate(newDate);
      break;
    case 'm':
      const newMinute = parseInt(base.getMinutes()) + parseInt(amount);
      base.setMinutes(newMinute);
      break;
    case 'mo':
      const newMonth = parseInt(base.getMonth()) + parseInt(amount);
      base.setMonth(newMonth);
      break;
    case 'y':
      const newYear = parseInt(base.getFullYear()) + parseInt(amount);
      base.setFullYear(newYear);
      break;
  }
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
 * Check if it is the first sunday in November.
 * @param {Date} date - The date to check.
 * @return {boolean} - True if it is under the conflict of daylight saving time.
 */
export function isInDaylightSavingConflictTime(date) {
  if (!isDaylightSavingArea()) { // If it is not in DST area, it will never be in a conflict time.
    return false;
  }

  const month = date.getMonth();
  const dateOfMonth = date.getDate();
  const dayOfWeek = date.getDay();
  const hour = date.getHours();
  const minute = date.getMinutes();

  // Check if the day matches the first sunday in November.
  if (month === 10 && dateOfMonth <= 7 && dayOfWeek === 0) {
    // Check if it is in the DST conflict time.
    if ((hour === 1 && minute >= 0 && minute <= 59) || (hour === 2 && minute === 0)) {
      return true;
    }
  }
  return false;
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

  while (modifiers.length > 0) {
    // Get the first element from the array.
    const currentModifier = modifiers.shift();

    if (currentModifier.length === 0) {
      continue;
    }

    if (
      /* If this is a date modifier. */
      ['-', '+'].includes(currentModifier.charAt(0))
    ) {
      const prefix = currentModifier.charAt(0);
      const amount = currentModifier.replace(/\D/g, '');
      const flag = currentModifier.replace(/\W/g, '').replace(/\d/g, '').toLowerCase();
      if (prefix === '+') {
        changeDateByAmount(updatedDate, amount, flag);
      } else {
        changeDateByAmount(updatedDate, -amount, flag);
      }
    } else if (
      /* If this is a now modifier. */
      currentModifier.toLowerCase() === 'now'
    ) {
      // Override the updatedDate to the current date.
      updatedDate = new Date();
    } else if (
      /* If this is a time. */
      currentModifier.toLowerCase().match(/^\d+:?\d*(am|pm)?$/g)
    ) {
      // Parse the time.
      const matches = currentModifier.toLowerCase().match(/^\d+:?\d*(am|pm)?$/);
      if (matches.length < 1) {
        continue;
      }

      const time = matches[0].replace(/(am|pm)/g, '');
      const timeArray = time.split(':');
      const hour = timeArray[0];
      const minute = timeArray[1] || 0;

      if (hour >= 24) {
        throw new Error('Invalid hour. The hour must be between 0 and 23.');
      } else if (minute >= 60) {
        throw new Error('Invalid minute. The minute must be between 0 and 59.');
      }

      // If the user types `12am`, we need to set the hour to 0.
      const hourInt = hour === '12' ? 0 : parseInt(hour);
      const minuteInt = parseInt(minute);
      const ampmInt = (matches[1] || 'am') === 'am' ? 0 : (hourInt > 11 ? 0 : 12);
      updatedDate.setHours(hourInt + ampmInt);
      updatedDate.setMinutes(minuteInt);
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
      const year = parseInt(dateArray[2]) || new Date().getFullYear();

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

  return updatedDate;
}
