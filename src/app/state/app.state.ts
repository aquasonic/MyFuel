import { Action, State, StateContext } from '@ngxs/store';

import { Car } from '../models/car.model';
import { AddCar, DeleteCar, UpdateCar } from './car.actions';
import { AddFuel, DeleteFuel, UpdateFuel } from './fuel.actions';
import { InitializeUser } from './user.actions';

export interface AppStateModel {
  userId: string;
  userName: string;
  cars: Car[];
}

@State<AppStateModel>({
  name: 'app',
  defaults: {
    userId: undefined,
    userName: undefined,
    cars: []
  }
})
export class AppState {
  @Action(InitializeUser)
  private initializeUser(context: StateContext<AppStateModel>, { user }: InitializeUser) {
    context.setState({ userId: user.id, userName: user.name, cars: user.cars });
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

  @Action(AddFuel)
  private addFuel(context: StateContext<AppStateModel>, { carId, fuel }: AddFuel) {
    const state = context.getState();
    context.patchState({
      cars: [
        ...state.cars.map(c => {
          if (c.id === carId) {
            c.fuels = [...c.fuels, fuel];
            return Object.assign({}, c);
          }

          return c;
        })
      ]
    });
  }

  @Action(UpdateFuel)
  private updateFuel(context: StateContext<AppStateModel>, { carId, fuel }: UpdateFuel) {
    const state = context.getState();
    context.patchState({
      cars: [
        ...state.cars.map(c => {
          if (c.id === carId) {
            c.fuels = c.fuels.map(f => {
              if (f.id === fuel.id) {
                return Object.assign({}, f, fuel);
              }

              return f;
            });

            return Object.assign({}, c);
          }

          return c;
        })
      ]
    });
  }

  @Action(DeleteFuel)
  private deleteFuel(context: StateContext<AppStateModel>, { carId, fuelId }: DeleteFuel) {
    const state = context.getState();
    context.patchState({
      cars: [
        ...state.cars.map(c => {
          if (c.id === carId) {
            c.fuels = c.fuels.filter(f => f.id !== fuelId);
            return Object.assign({}, c);
          }

          return c;
        })
      ]
    });
  }
}
