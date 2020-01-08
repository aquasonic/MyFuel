import { Action, Selector, State, StateContext } from '@ngxs/store';
import { patch } from '@ngxs/store/operators';

import { Fuel } from '../models/fuel.model';
import { SelectFuel } from './fuel.actions';

export interface CarStateModel {
  selectedFuel: Fuel;
}

@State<CarStateModel>({
  name: 'car',
  defaults: {
    selectedFuel: undefined
  }
})
export class CarState {
  @Selector()
  static getSelectedFuel(state: CarStateModel) {
    return state.selectedFuel;
  }

  @Action(SelectFuel)
  private selectFuel(context: StateContext<CarStateModel>, { fuel }: SelectFuel) {
    return context.setState(
      patch({
        selectedFuel: fuel
      })
    );
  }
}
