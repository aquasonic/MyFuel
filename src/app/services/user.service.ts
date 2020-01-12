import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private apollo: Apollo) {}

  findUserById(userId: string) {
    return this.apollo
      .query<{ findUserByID }>({
        query: gql`
          query findUserById($id: ID!) {
            findUserByID(id: $id) {
              id: _id
              timestamp: _ts
              name
              cars {
                data {
                  id: _id
                  timestamp: _ts
                  name
                  dateOfPurchase
                  mileageAtPurchase
                  fuels(_size: 10000) {
                    data {
                      id: _id
                      timestamp: _ts
                      date
                      km
                      litres
                      cost
                    }
                  }
                }
              }
            }
          }
        `,
        variables: {
          id: userId
        }
      })
      .pipe(map(response => response.data.findUserByID));
  }
}
