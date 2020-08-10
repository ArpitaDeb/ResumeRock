  export default function showDateFromTo (s, e){
    const start = s ? new Date(s) : "";
    const end = e ? new Date(e): "";
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec"];
    const toMonth = (end === "" ? "Present" : months[end.getMonth()]);
    const fromMonth = months[start.getMonth()];
    return (toMonth === "Present" ? (`${fromMonth} ${start.getFullYear()} - ${toMonth}`) : (`${fromMonth} ${start.getFullYear()} - ${toMonth} ${end.getFullYear()}`));
  }