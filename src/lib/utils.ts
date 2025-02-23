/* eslint-disable @typescript-eslint/no-explicit-any */
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatDateTime = (dateString: Date | string) => {
  const dateTimeOptions: Intl.DateTimeFormatOptions = {
    // weekday: "short", // abbreviated weekday name (e.g., 'Mon')
    month: "short", // abbreviated month name (e.g., 'Oct')
    day: "numeric", // numeric day of the month (e.g., '25')
    year: "numeric", // numeric year (e.g., '2023')
    hour: "numeric", // numeric hour (e.g., '8')
    minute: "numeric", // numeric minute (e.g., '30')
    hour12: true, // use 12-hour clock (true) or 24-hour clock (false)
  };

  const dateDayOptions: Intl.DateTimeFormatOptions = {
    weekday: "short", // abbreviated weekday name (e.g., 'Mon')
    year: "numeric", // numeric year (e.g., '2023')
    month: "2-digit", // abbreviated month name (e.g., 'Oct')
    day: "2-digit", // numeric day of the month (e.g., '25')
  };

  const dateOptions: Intl.DateTimeFormatOptions = {
    month: "short", // abbreviated month name (e.g., 'Oct')
    year: "numeric", // numeric year (e.g., '2023')
    day: "numeric", // numeric day of the month (e.g., '25')
  };

  const timeOptions: Intl.DateTimeFormatOptions = {
    hour: "numeric", // numeric hour (e.g., '8')
    minute: "numeric", // numeric minute (e.g., '30')
    hour12: true, // use 12-hour clock (true) or 24-hour clock (false)
  };

  const formattedDateTime: string = new Date(dateString).toLocaleString(
    "en-US",
    dateTimeOptions
  );

  const formattedDateDay: string = new Date(dateString).toLocaleString(
    "en-US",
    dateDayOptions
  );

  const formattedDate: string = new Date(dateString).toLocaleString(
    "en-US",
    dateOptions
  );

  const formattedTime: string = new Date(dateString).toLocaleString(
    "en-US",
    timeOptions
  );

  return {
    dateTime: formattedDateTime,
    dateDay: formattedDateDay,
    dateOnly: formattedDate,
    timeOnly: formattedTime,
  };
};

export function formatDate(dateString: string) {
  const options: any = { year: "numeric", month: "short", day: "numeric" };
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", options);
}

export function formatDateTodayYesterdayOrShort(input: string) {
  const date = typeof input === "string" ? new Date(input) : input;
  const now = new Date();

  // 2) Zero out hours/minutes/seconds for both dates (to compare calendar days)
  const today: any = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const thatDay: any = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate()
  );

  // 3) Calculate difference in days (positive, negative, or zero)
  const msInADay = 24 * 60 * 60 * 1000;
  const dayDiff = (thatDay - today) / msInADay; // e.g. 0 for same day, -1 for yesterday

  // 4) Build a 12-hour time string: "4:00 PM"
  let hours = date.getHours();
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12 || 12; // 0 => 12 (midnight/noon)
  const timeString = `${hours}:${minutes} ${ampm}`;

  // 5) Decide which label to use based on day difference
  if (dayDiff === 0) {
    return `Today at ${timeString}`;
  } else if (dayDiff === -1) {
    return `Yesterday at ${timeString}`;
  } else {
    // Format: "DD MMM at HH:MM AM/PM" (e.g., "18 Feb at 4:00 PM")
    const day = date.getDate();
    const monthNames = [
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
      "Dec",
    ];
    const shortMonth = monthNames[date.getMonth()];

    return `${day} ${shortMonth} at ${timeString}`;
  }
}

export const getFormattedName = (fullName: string) => {
  const nameParts = fullName.split(" ");
  const firstName = nameParts[0];
  const lastNameInitial = nameParts.length > 1 ? nameParts[1][0] + "." : "";
  return `${firstName} ${lastNameInitial}`;
};

export const getInitials = (fullName: string) => {
  const nameParts = fullName.split(" ");
  const firstInitial = nameParts[0] ? nameParts[0][0].toUpperCase() : "";
  const lastInitial = nameParts.length > 1 ? nameParts[1][0].toUpperCase() : "";
  return `${firstInitial}${lastInitial}`;
};
