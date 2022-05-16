export default function changeTime(value: Date | null) {
  if (value !== null) {
    const koreaTime = new Date(
      value.getTime() - value.getTimezoneOffset() * 60000
    )
      .toISOString()
      .replace("T", " ")
      .substring(0, 19);
    return koreaTime;
  }
}
