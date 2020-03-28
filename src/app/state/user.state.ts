import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { append, patch, removeItem, updateItem } from '@ngxs/store/operators';
import { map, tap } from 'rxjs/operators';

import { Car } from '../models/car.model';
import { Fuel } from '../models/fuel.model';
import { CarService } from '../services/car.service';
import { FuelService } from '../services/fuel.service';
import { MappingService } from '../services/mapping.service';
import { UserService } from '../services/user.service';
import { CreateCar, DeleteCar, UpdateCar } from './car.actions';
import { CreateFuel, DeleteFuel, SelectFuel, UpdateFuel } from './fuel.actions';
import { FetchUser } from './user.actions';

export interface UserStateModel {
  isLoading: boolean;
  isAuthorized: boolean;
  userId: string;
  userName: string;
  cars: Car[];
}

@State<UserStateModel>({
  name: 'user',
  defaults: {
    isLoading: false,
    isAuthorized: false,
    userId: undefined,
    userName: undefined,
    cars: []
  }
})
@Injectable()
export class UserState {
  constructor(
    private userService: UserService,
    private carService: CarService,
    private fuelService: FuelService,
    private mappingService: MappingService
  ) {}

  @Selector()
  static isLoading(state: UserStateModel) {
    return state.isLoading;
  }

  @Selector()
  static isAuthorized(state: UserStateModel) {
    return state.isAuthorized;
  }

  @Selector()
  static getUserId(state: UserStateModel) {
    return state.userId;
  }

  @Selector()
  static getUserName(state: UserStateModel) {
    return state.userName;
  }

  @Selector()
  static getCars(state: UserStateModel) {
    return [...state.cars].sort((a: Car, b: Car) => a.name.localeCompare(b.name));
  }

  @Selector()
  static getCarById(state: UserStateModel) {
    return (carId: string) => {
      return state.cars.find(c => c.id === carId);
    };
  }

  @Selector()
  static getFuelsByCarId(state: UserStateModel) {
    return (carId: string) => {
      const car = state.cars.find(c => c.id === carId);
      if (!car || !car.fuels) {
        return [];
      }

      return car.fuels.sort((a: Fuel, b: Fuel) => new Date(b.date).getTime() - new Date(a.date).getTime());
    };
  }

  @Action(FetchUser)
  private fetchUser(context: StateContext<UserStateModel>, { userId }: FetchUser) {
    if (userId !== context.getState().userId) {
      context.patchState({ isLoading: true });

      return this.userService.findUserById(userId).pipe(
        tap(data => {
          if (data) {
            context.setState({
              isLoading: false,
              isAuthorized: true,
              userId: data.id,
              userName: data.name,
              cars: data.cars.data.map(c => this.mappingService.toCar(c))
            });
          } else {
            context.setState({
              isLoading: false,
              isAuthorized: false,
              userId: undefined,
              userName: undefined,
              cars: []
            });
          }
        })
      );
    }
  }

  @Action(CreateCar)
  private createCar(context: StateContext<UserStateModel>, { userId, car }: CreateCar) {
    return this.carService.createCar(userId, car).pipe(
      map(id => Object.assign({}, car, { id }) as Car),
      tap(newCar => {
        context.setState(
          patch({
            cars: append([newCar])
          })
        );
      })
    );
  }

  @Action(UpdateCar)
  private updateCar(context: StateContext<UserStateModel>, { car }: UpdateCar) {
    return this.carService.updateCar(car).pipe(
      map(timestamp => Object.assign({}, car, { timestamp }) as Car),
      tap(newCar => {
        context.setState(
          patch({
            cars: updateItem(c => c.id === car.id, patch(newCar))
          })
        );
      })
    );
  }

  @Action(DeleteCar)
  private deleteCar(context: StateContext<UserStateModel>, { carId }: DeleteCar) {
    return this.carService.deleteCar(carId).pipe(
      tap(id => {
        context.setState(
          patch({
            cars: removeItem<Car>(c => c.id === id)
          })
        );
      })
    );
  }

  @Action(CreateFuel)
  private createFuel(context: StateContext<UserStateModel>, { carId, fuel }: CreateFuel) {
    return this.fuelService.createFuel(carId, fuel).pipe(
      map(id => Object.assign({}, fuel, { id }) as Fuel),
      tap(newFuel => {
        context.setState(
          patch({
            cars: updateItem(c => c.id === carId, patch({ fuels: append([newFuel]) }))
          })
        );
      }),
      tap(newFuel => context.dispatch(new SelectFuel(newFuel)))
    );
  }

  @Action(UpdateFuel)
  private updateFuel(context: StateContext<UserStateModel>, { fuel }: UpdateFuel) {
    return this.fuelService.updateFuel(fuel).pipe(
      map(timestamp => Object.assign({}, fuel, { timestamp }) as Fuel),
      tap(newFuel => {
        context.setState(
          patch({
            cars: updateItem(
              c => c.fuels && c.fuels.some(f => f.id === fuel.id),
              patch({ fuels: updateItem(f => f.id === fuel.id, newFuel) })
            )
          })
        );
      }),
      tap(newFuel => context.dispatch(new SelectFuel(newFuel)))
    );
  }

  @Action(DeleteFuel)
  private deleteFuel(context: StateContext<UserStateModel>, { fuelId }: DeleteFuel) {
    return this.fuelService.deleteFuel(fuelId).pipe(
      tap(id => {
        context.setState(
          patch({
            cars: updateItem(c => c.fuels && c.fuels.some(f => f.id === id), patch({ fuels: removeItem<Fuel>(f => f.id === id) }))
          })
        );
      }),
      tap(_ => context.dispatch(new SelectFuel(undefined)))
    );
  }
}
