import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { map } from 'rxjs/operators';

import { Car } from '../models/car.model';

@Injectable({
  providedIn: 'root'
})
export class CarService {
  constructor(private apollo: Apollo) {}

  createCar(userId: string, car: Car) {
    return this.apollo
      .mutate<{ createCar: { id: string } }>({
        mutation: gql`
          mutation createCar($userId: ID!, $name: String!, $dateOfPurchase: String!, $mileageAtPurchase: Int!) {
            createCar(
              data: { user: { connect: $userId }, name: $name, dateOfPurchase: $dateOfPurchase, mileageAtPurchase: $mileageAtPurchase }
            ) {
              id: _id
            }
          }
        `,
        variables: {
          userId: userId,
          name: car.name,
          dateOfPurchase: car.dateOfPurchase,
          mileageAtPurchase: car.mileageAtPurchase
        }
      })
      .pipe(map(response => response.data.createCar.id));
  }

  updateCar(car: Car) {
    return this.apollo
      .mutate<{ updateCar: { timestamp: number } }>({
        mutation: gql`
          mutation updateCar($id: ID!, $name: String!, $dateOfPurchase: String!, $mileageAtPurchase: Int!) {
            updateCar(id: $id, data: { name: $name, dateOfPurchase: $dateOfPurchase, mileageAtPurchase: $mileageAtPurchase }) {
              timestamp: _ts
            }
          }
        `,
        variables: {
          id: car.id,
          name: car.name,
          dateOfPurchase: car.dateOfPurchase,
          mileageAtPurchase: car.mileageAtPurchase
        }
      })
      .pipe(map(response => response.data.updateCar.timestamp));
  }

  deleteCar(carId: string) {
    return this.apollo
      .mutate<{ deleteCar: { id: string } }>({
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
      })
      .pipe(map(response => response.data.deleteCar.id));
  }
}
