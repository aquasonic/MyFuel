import { Component, Input } from '@angular/core';
import { Car } from 'src/app/models/car.model';

@Component({
  selector: 'myf-active-cars',
  templateUrl: './active-cars.component.html',
  styleUrls: ['./active-cars.component.scss'],
})
export class ActiveCarsComponent {
  @Input() cars: Car[];
}
