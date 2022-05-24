export const dateOptions = {
  year: 'numeric',
  month: 'numeric',
  day: 'numeric',
  weekday: undefined,
  hour: 'numeric',
  minute: 'numeric',
  second: 'numeric',
  hour12: true,
  timeZone: undefined,
};

export const getDateStringByValue = (value) => {
  if (value) {
    return new Date(value).toLocaleString('en-US', dateOptions);
  }
  return new Date().toLocaleString('en-US', dateOptions);
};

export const isValidDateFormat = (date) => {
  // Use regular expression to check if date is valid as en-US format.
  const regex = /^\d{1,2}\/\d{1,2}\/\d{4}$/;
  return regex.test(date);
};

export const isValidTimeFormat = (date) => {
  // Use regular expression to check if date is valid as en-US format.
  const regex = /^\d{1,2}:\d{2}:\d{2}$/;
  return regex.test(date);
};

export const isValidDateTimeFormat = (date) => {
  // Use regular expression to check if date is valid as en-US format.
  const regex = /^\d{1,2}\/\d{1,2}\/\d{4}[T, ]+(?:|\d{1,2}:\d{1,2}:\d{1,2})$/;
  return regex.test(date);
};
