import { Injectable } from '@angular/core';

import { Car } from '../models/car.model';
import { Fuel } from '../models/fuel.model';

@Injectable({
  providedIn: 'root'
})
export class MappingService {
  toCar(data: any) {
    return {
      id: data.id,
      timestamp: data.timestamp,
      name: data.name,
      dateOfPurchase: data.dateOfPurchase,
      mileageAtPurchase: data.mileageAtPurchase,
      fuels: data.fuels.data.map(fuel => this.toFuel(fuel))
    } as Car;
  }

  toFuel(data: any) {
    return {
      id: data.id,
      timestamp: data.timestamp,
      date: data.date,
      km: data.km,
      litres: data.litres,
      cost: data.cost
    } as Fuel;
  }
}
