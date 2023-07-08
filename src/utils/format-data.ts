import { Injectable } from '@nestjs/common';
import set from 'date-fns/set';
import moment from 'moment';

@Injectable()
export class FormatData {}

export const getDateTimeFromString = (dateTime: string) => {
  const date_splitted = dateTime.split(':');

  const date_formatted = set(new Date(), {
    hours: parseInt(date_splitted[0]),
    minutes: parseInt(date_splitted[1]),
    seconds: parseInt(date_splitted[2]),
  });

  return moment(date_formatted).utcOffset(0, true).format();
};

export const getStringFromDateTime = (dateTime: Date) => {
  const isoDate = dateTime.toISOString()
  const times = isoDate.split('T')[1].replace('.000Z', '')

  return times
};
