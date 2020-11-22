import {Apollo, gql} from 'apollo-angular';
import { Injectable } from '@angular/core';


import { of } from 'rxjs';
import { concatMap, map } from 'rxjs/operators';

import { Car } from '../models/car.model';
import { FuelService } from './fuel.service';

@Injectable({
  providedIn: 'root'
})
export class CarService {
  constructor(private apollo: Apollo, private fuelService: FuelService) {}

  createCar(userId: string, car: Car) {
    return this.apollo
      .mutate<{ createCar: { id: string } }>({
        mutation: gql`
          mutation createCar($userId: ID!, $name: String!, $dateOfPurchase: String!, $mileageAtPurchase: Int!, $archived: Boolean) {
            createCar(
              data: {
                user: { connect: $userId }
                name: $name
                dateOfPurchase: $dateOfPurchase
                mileageAtPurchase: $mileageAtPurchase
                archived: $archived
              }
            ) {
              id: _id
            }
          }
        `,
        variables: {
          userId,
          name: car.name,
          dateOfPurchase: car.dateOfPurchase,
          mileageAtPurchase: car.mileageAtPurchase,
          archived: car.archived ? true : null
        }
      })
      .pipe(map(response => response.data.createCar.id));
  }

  updateCar(car: Car) {
    return this.apollo
      .mutate<{ updateCar: { timestamp: number } }>({
        mutation: gql`
          mutation updateCar($id: ID!, $name: String!, $dateOfPurchase: String!, $mileageAtPurchase: Int!, $archived: Boolean) {
            updateCar(
              id: $id
              data: { name: $name, dateOfPurchase: $dateOfPurchase, mileageAtPurchase: $mileageAtPurchase, archived: $archived }
            ) {
              timestamp: _ts
            }
          }
        `,
        variables: {
          id: car.id,
          name: car.name,
          dateOfPurchase: car.dateOfPurchase,
          mileageAtPurchase: car.mileageAtPurchase,
          archived: car.archived ? true : null
        }
      })
      .pipe(map(response => response.data.updateCar.timestamp));
  }

  // TODO: Find a better way to implement delete cascading for fuels...
  deleteCar(carId: string) {
    return this.apollo
      .query<{ findCarByID }>({
        query: gql`
          query findCarById($id: ID!) {
            findCarByID(id: $id) {
              fuels {
                data {
                  id: _id
                }
              }
            }
          }
        `,
        variables: {
          id: carId
        }
      })
      .pipe(
        concatMap(response => {
          const fuels = response.data.findCarByID.fuels.data.map(f => f.id);
          if (fuels.length > 0) {
            let fuelsMutation = '';
            fuels.forEach(fuelId => {
              fuelsMutation = fuelsMutation + `fuel` + fuelId + `: deleteFuel(id: "` + fuelId + `") { _id }\n`;
            });

            return this.apollo.mutate({
              mutation: gql('mutation deleteFuels {\n' + fuelsMutation + '}'),
              errorPolicy: 'ignore'
            });
          }

          return of(true);
        }),
        concatMap(_ => {
          return this.apollo.mutate<{ deleteCar: { id: string } }>({
            mutation: gql`
              mutation deleteCar($id: ID!) {
                deleteCar(id: $id) {
                  id: _id
                }
              }
            `,
            variables: {
              id: carId
            }
          });
        }),
        map(response => response.data.deleteCar.id)
      );
  }

  getTotalKm(car: Car) {
    if (!car.fuels || !car.fuels.length) {
      return 0;
    }

    return car.fuels.reduce((a, b) => a + b.km, 0);
  }

  getAverageConsumation(car: Car) {
    if (!car.fuels || !car.fuels.length) {
      return 0;
    }

    return car.fuels.reduce((a, b) => a + this.fuelService.getConsumation(b), 0) / car.fuels.length;
  }
}
