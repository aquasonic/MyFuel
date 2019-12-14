import { User } from './user.model';

// TODO: Remove as soon as we have db connetion
export const USER_MOCK: User = {
  id: 1,
  cars: [
    {
      id: 1,
      name: 'Audi RS 3',
      fuels: [
        { id: 1, date: '2019-04-02', km: 634, litres: 47.44, cost: 10.35 },
        { id: 2, date: '2019-04-24', km: 673, litres: 47.45, cost: 20.3 },
        { id: 3, date: '2019-10-14', km: 705, litres: 50.34, cost: 30 },
        { id: 4, date: '2019-11-08', km: 634, litres: 47.44, cost: 40.35 }
      ]
    },
    {
      id: 2,
      name: 'Porsche 911',
      fuels: []
    }
  ]
};
