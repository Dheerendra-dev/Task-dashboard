const SHORT_DATE_FORMAT_OPTIONS = {
  month: "short",
  day: "numeric",
  year: "numeric"
};

const FULL_DATE_FORMATTER = new Intl.DateTimeFormat("en-US", {
  weekday: "long",
  month: "long",
  day: "numeric",
  year: "numeric"
});

export const ONE_DAY_IN_MS = 1000 * 60 * 60 * 24;

export const toStartOfDayTimestamp = (dateValue) => {
  return new Date(`${dateValue}T00:00:00`).getTime();
};

export const getTodayStartTimestamp = (referenceDate = new Date()) => {
  const year = referenceDate.getFullYear();
  const month = referenceDate.getMonth();
  const date = referenceDate.getDate();

  return new Date(year, month, date).getTime();
};

export const formatShortDate = (dateValue, locale = undefined) => {
  return new Date(`${dateValue}T00:00:00`).toLocaleDateString(locale, SHORT_DATE_FORMAT_OPTIONS);
};

export const formatFullDate = (dateValue = new Date()) => {
  return FULL_DATE_FORMATTER.format(dateValue);
};
