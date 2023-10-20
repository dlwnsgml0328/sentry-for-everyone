export const dateToLocalDateString = (date: Date) => {
  const dateObj = new Date(date);

  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  };

  const formattedDate = dateObj.toLocaleDateString('en-US', options);

  return formattedDate;
};
