import { Component, Input } from '@angular/core';
import { Car } from 'src/app/models/car.model';

@Component({
  selector: 'myf-archived-cars',
  templateUrl: './archived-cars.component.html',
  styleUrls: ['./archived-cars.component.scss'],
})
export class ArchivedCarsComponent {
  @Input() cars: Car[];
}
