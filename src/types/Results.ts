import { Result } from './Result';

export interface Results {
  id: number,
  userName: string,
  date: string,
  time: number,
  rate: number,
  list: Result[],
};
