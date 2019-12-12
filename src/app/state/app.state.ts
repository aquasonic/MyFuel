import { Action, Selector, State, StateContext } from '@ngxs/store';

import { Car } from '../models/car.model';
import { AddCar, DeleteCar, UpdateCar } from './car.actions';
import { InitializeUser } from './user.actions';

export interface AppStateModel {
  userId?: number;
  cars: Car[];
}

@State<AppStateModel>({
  name: 'app',
  defaults: {
    userId: undefined,
    cars: []
  }
})
export class AppState {
  @Selector()
  static getUserId(state: AppStateModel) {
    return state.userId;
  }

  @Selector()
  static getCars(state: AppStateModel) {
    return state.cars.sort((a, b) => a.name.localeCompare(b.name));
  }

  @Action(InitializeUser)
  private initializeUser(context: StateContext<AppStateModel>, { user }: InitializeUser) {
    context.setState({ userId: user.id, cars: user.cars });
  }

  @Action(AddCar)
  private addCar(context: StateContext<AppStateModel>, { car }: AddCar) {
    const state = context.getState();
    context.patchState({
      cars: [...state.cars, car]
    });
  }

  @Action(UpdateCar)
  private updateCar(context: StateContext<AppStateModel>, { car }: UpdateCar) {
    const state = context.getState();
    context.patchState({
      cars: [
        ...state.cars.map(c => {
          if (c.id === car.id) {
            return Object.assign({}, c, car);
          }

          return c;
        })
      ]
    });
  }

  @Action(DeleteCar)
  private deleteCar(context: StateContext<AppStateModel>, { id }: DeleteCar) {
    const state = context.getState();
    context.patchState({ cars: [...state.cars.filter(c => c.id !== id)] });
  }
}
