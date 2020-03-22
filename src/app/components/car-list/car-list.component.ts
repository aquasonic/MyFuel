import { Component, Input } from '@angular/core';
import { Car } from 'src/app/models/car.model';
import { CarService } from 'src/app/services/car.service';

@Component({
  selector: 'myf-car-list',
  templateUrl: './car-list.component.html',
  styleUrls: ['./car-list.component.scss']
})
export class CarListComponent {
  @Input() cars: Car[];

  constructor(private carService: CarService) {}

  getTotalKm(car: Car) {
    return this.carService.getTotalKm(car);
  }

  getAverageConsumation(car: Car) {
    return this.carService.getAverageConsumation(car);
  }

  trackById(index: number, car: Car) {
    return car.id;
  }
}
