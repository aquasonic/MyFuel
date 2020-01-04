import { Action, Selector, State, StateContext } from '@ngxs/store';
import { append, patch, removeItem, updateItem } from '@ngxs/store/operators';
import { tap } from 'rxjs/operators';

import { Car } from '../models/car.model';
import { Fuel } from '../models/fuel.model';
import { CarService } from '../services/car.service';
import { FuelService } from '../services/fuel.service';
import { UserService } from '../services/user.service';
import { CreateCar, DeleteCar, UpdateCar } from './car.actions';
import { CreateFuel, DeleteFuel, UpdateFuel } from './fuel.actions';
import { FetchUser } from './user.actions';

export interface UserStateModel {
  isAuthorized: boolean;
  userId: string;
  userName: string;
  cars: Car[];
}

@State<UserStateModel>({
  name: 'user',
  defaults: {
    isAuthorized: false,
    userId: undefined,
    userName: undefined,
    cars: []
  }
})
export class UserState {
  constructor(private userService: UserService, private carService: CarService, private fuelService: FuelService) {}

  @Selector()
  static isAuthorized(state: UserStateModel) {
    return state.isAuthorized;
  }

  @Selector()
  static getUserName(state: UserStateModel) {
    return state.userName;
  }

  @Selector()
  static getCars(state: UserStateModel) {
    return state.cars.sort((a: Car, b: Car) => a.name.localeCompare(b.name));
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
      return this.userService.findUserById(userId).pipe(
        tap(data => {
          if (data) {
            context.setState({
              isAuthorized: true,
              userId: data.id,
              userName: data.name,
              cars: data.cars.data.map(c => this.toCar(c))
            });
          } else {
            context.setState({
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
      tap(id => {
        context.setState(
          patch({
            cars: append([Object.assign({}, car, { id })])
          })
        );
      })
    );
  }

  @Action(UpdateCar)
  private updateCar(context: StateContext<UserStateModel>, { car }: UpdateCar) {
    return this.carService.updateCar(car).pipe(
      tap(timestamp => {
        context.setState(
          patch({
            cars: updateItem(c => c.id === car.id, patch(Object.assign({}, car, { timestamp })))
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
      tap(id => {
        context.setState(
          patch({
            cars: updateItem(c => c.id === carId, patch({ fuels: append([Object.assign({}, fuel, { id })]) }))
          })
        );
      })
    );
  }

  @Action(UpdateFuel)
  private updateFuel(context: StateContext<UserStateModel>, { fuel }: UpdateFuel) {
    return this.fuelService.updateFuel(fuel).pipe(
      tap(timestamp => {
        context.setState(
          patch({
            cars: updateItem(
              c => c.fuels && c.fuels.some(f => f.id === fuel.id),
              patch({ fuels: updateItem(f => f.id === fuel.id, Object.assign({}, fuel, { timestamp })) })
            )
          })
        );
      })
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
      })
    );
  }

  private toCar(data: any) {
    return { id: data.id, timestamp: data.timestam, name: data.name, fuels: data.fuels.data.map(fuel => this.toFuel(fuel)) } as Car;
  }

  private toFuel(data: any) {
    return { id: data.id, timestamp: data.timestam, date: data.date, km: data.km, litres: data.litres, cost: data.cost } as Fuel;
  }
}
