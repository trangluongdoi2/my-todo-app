import dayjs from "dayjs";
import localizeFormat from 'dayjs/plugin/localizedFormat';

export const formatDateToDDMMYYY = (date: string) => {
  const d = new Date(date);
  const day = String(d.getDate()).padStart(2, '0');
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const year = d.getFullYear();
  return `${day}/${month}/${year}`;
};

export const formatDateToDDMMYYWithDayjs = (date: string) => {
  dayjs.extend(localizeFormat);
  return dayjs(date).format('LLL');
};
