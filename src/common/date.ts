import dayjs from "dayjs";
import localizeFormat from 'dayjs/plugin/localizedFormat';

export const formatDateToDDMMYYY = (date: string) => dayjs(date).format('DD/MM/YYYY');

export const formatDateToDDMMYYWithDayjs = (date: string) => {
  dayjs.extend(localizeFormat);
  return dayjs(date).format('LLL');
};
