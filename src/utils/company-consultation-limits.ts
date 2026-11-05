export function getConsultationPeriodStarts(now: Date) {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/Sao_Paulo",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hourCycle: "h23",
  }).formatToParts(now);
  const values = Object.fromEntries(parts.map(({ type, value }) => [type, value]));
  const year = Number(values.year);
  const month = Number(values.month);
  const day = Number(values.day);
  const localTimeAsUtc = Date.UTC(
    year,
    month - 1,
    day,
    Number(values.hour),
    Number(values.minute),
    Number(values.second),
  );
  const offset = localTimeAsUtc - Math.floor(now.getTime() / 1000) * 1000;

  return {
    dayStart: new Date(Date.UTC(year, month - 1, day) - offset),
    monthStart: new Date(Date.UTC(year, month - 1, 1) - offset),
  };
}

export function isConsultationLimitReached(limit: number, count: number) {
  return limit > 0 && count >= limit;
}