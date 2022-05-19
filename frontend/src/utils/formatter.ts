export function getDatesInRange(startDate: Date, endDate: Date): string[] {
  let date: Date = new Date(startDate.getTime());
  const dates: string[] = [];

  while (date <= endDate) {
    const dateStr: string = date
      .toISOString()
      .replace("T", " ")
      .substring(0, 16);
    dates.push(dateStr);
    date = new Date(date.getTime() + 60000);
  }

  return dates;
}

export function getDateTimeFormat(data: Date): string {
  return data.toISOString().replace("T", " ").substring(0, 19);
}
