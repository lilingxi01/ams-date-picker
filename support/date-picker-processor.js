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
  const modifiers = userInput.split(' ');

  while (modifiers.length > 0) {
    // Get the first element from the array.
    const currentModifier = modifiers.shift();

    if (currentModifier.length === 0) {
      continue;
    }

    if (['-', '+'].includes(currentModifier.charAt(0)) /* If this is a date modifier. */) {
      const prefix = currentModifier.charAt(0);
      const amount = currentModifier.replace(/\D/g, '');
      const flag = currentModifier.replace(/\W/g, '').replace(/\d/g, '').toLowerCase();
      if (prefix === '+') {
        changeDateByAmount(updatedDate, amount, flag);
      } else {
        changeDateByAmount(updatedDate, -amount, flag);
      }
    } else if (currentModifier.toLowerCase() === 'now' /* If this is a now modifier. */) {
      // Override the updatedDate to the current date.
      updatedDate = new Date();
    } else if (currentModifier.toLowerCase().match(/^\d+:?\d*(am|pm)?$/g) /* If this is a time. */) {
      // Parse the time.
      const matches = currentModifier.toLowerCase().match(/^\d+:?\d*(am|pm)?$/);
      if (matches.length < 1) {
        continue;
      }

      const time = matches[0].replace(/(am|pm)/g, '');
      const timeArray = time.split(':');
      const hour = timeArray[0];
      const minute = timeArray[1] || 0;

      if ((hour > 12 && matches[1] === 'pm') || hour >= 24) {
        throw new Error('Invalid hour.');
      } else if (minute >= 60) {
        throw new Error('Invalid minute.');
      }

      const hourInt = parseInt(hour);
      const minuteInt = parseInt(minute);
      const ampmInt = (matches[1] || 'am') === 'am' ? 0 : 12;
      updatedDate.setHours(hourInt + ampmInt);
      updatedDate.setMinutes(minuteInt);
    } else if (currentModifier.toLowerCase().match(/\d+\/\d+\/\d+[,]?/g) /* If this is a date. */) {
      // Parse the date.
      const matches = currentModifier.toLowerCase().match(/(\d+\/\d+\/\d+)[,]?/);
      if (matches.length < 1) {
        continue;
      }

      const dateArray = matches[1].split('/');
      const month = dateArray[0];
      const day = dateArray[1];
      const year = dateArray[2];
      updatedDate.setMonth((parseInt(month) || 1) - 1); // -1 because the month starts from 0.
      updatedDate.setDate(parseInt(day) || 1);
      updatedDate.setFullYear(parseInt(year) || new Date().getFullYear());
    }
  }

  // TODO.

  // Below is the old version of the date parsing function.
  // The parsing logic is a bit tricky so I updated it to the newer function above.

  // const input = inputValue;
  // const inputValueArr = input.split(/[:\s]/i);
  //
  // let parsedValue = inputValueArr[0];
  // let hour = '00';
  // let minutes = '00';
  //
  // if (inputValueArr.length > 1) {
  //   hour = inputValueArr[1].replace(/\D/g, '');
  //   parsedValue += ' ' + hour;
  // }
  // if (inputValueArr.length > 2) {
  //   minutes = inputValueArr[2].replace(/\D/g, '');
  //   if (/^\d+$/.test(minutes)) {
  //     parsedValue += ':' + minutes;
  //   }
  // }
  // if (input.toLowerCase().includes('am')) {
  //   if (! /^\d+$/.test(minutes)) {
  //     parsedValue += ':' + '00';
  //   }
  //   parsedValue += ' AM';
  // } else if (input.toLowerCase().includes('pm')) {
  //   if (! /^\d+$/.test(minutes)) {
  //     parsedValue += ':' + '00';
  //   }
  //   parsedValue += ' PM';
  // }

  return updatedDate;
}
