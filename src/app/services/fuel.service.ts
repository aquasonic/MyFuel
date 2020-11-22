import {Apollo, gql} from 'apollo-angular';
import { Injectable } from '@angular/core';


import { map } from 'rxjs/operators';

import { Fuel } from '../models/fuel.model';

@Injectable({
  providedIn: 'root'
})
export class FuelService {
  constructor(private apollo: Apollo) {}

  createFuel(carId: string, fuel: Fuel) {
    return this.apollo
      .mutate<{ createFuel: { id: string } }>({
        mutation: gql`
          mutation createFuel($carId: ID!, $date: String!, $km: Int!, $litres: Float!, $cost: Float!) {
            createFuel(data: { car: { connect: $carId }, date: $date, km: $km, litres: $litres, cost: $cost }) {
              id: _id
            }
          }
        `,
        variables: {
          carId,
          date: fuel.date,
          km: fuel.km,
          litres: fuel.litres,
          cost: fuel.cost
        }
      })
      .pipe(map(response => response.data.createFuel.id));
  }

  updateFuel(fuel: Fuel) {
    return this.apollo
      .mutate<{ updateFuel: { timestamp: number } }>({
        mutation: gql`
          mutation updateFuel($id: ID!, $date: String!, $km: Int!, $litres: Float!, $cost: Float!) {
            updateFuel(id: $id, data: { date: $date, km: $km, litres: $litres, cost: $cost }) {
              timestamp: _ts
            }
          }
        `,
        variables: {
          id: fuel.id,
          date: fuel.date,
          km: fuel.km,
          litres: fuel.litres,
          cost: fuel.cost
        }
      })
      .pipe(map(response => response.data.updateFuel.timestamp));
  }

  deleteFuel(fuelId: string) {
    return this.apollo
      .mutate<{ deleteFuel: { id: string } }>({
        mutation: gql`
          mutation deleteFuel($id: ID!) {
            deleteFuel(id: $id) {
              id: _id
            }
          }
        `,
        variables: {
          id: fuelId
        }
      })
      .pipe(map(response => response.data.deleteFuel.id));
  }

  getConsumation(fuel: Fuel) {
    return (fuel.litres / fuel.km) * 100;
  }
}
