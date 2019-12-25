import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FaunaService {
  constructor(private apollo: Apollo) {}

  getUserNameByUserId(id: string) {
    // TODO: Remove, this is only a test

    return this.apollo
      .query({
        query: gql`
          query findUserById($id: ID!) {
            findUserByID(id: $id) {
              _id
              name
            }
          }
        `,
        variables: {
          id
        }
      })
      .pipe(
        map(response => {
          if (response.errors || !response.data['findUserByID']) {
            return undefined;
          }

          return response.data['findUserByID'].name as string;
        })
      );
  }
}
