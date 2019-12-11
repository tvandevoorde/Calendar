import * as Calendar from './calendar';

export const services: any[] = [
  ...Calendar.services
];

export * from './calendar';
export * from './auth.service';
export * from './local-storage.service';
