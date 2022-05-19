export default function changeTime(value: Date | null): string {
  if (value !== null && String(value).length === 42) {
    const koreaTime = new Date(
      value.getTime() - value.getTimezoneOffset() * 60000
    )
      .toISOString()
      .replace("T", " ")
      .substring(0, 19);
    return koreaTime;
  }
  return "";
}
