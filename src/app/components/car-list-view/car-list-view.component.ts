import { Component } from '@angular/core';

@Component({
  selector: 'myf-car-list-view',
  templateUrl: './car-list-view.component.html',
  styleUrls: ['./car-list-view.component.scss']
})
export class CarListViewComponent {
  cars = ['Audi RS 3', 'Porsche 911'];

  onCarAdded(name: string) {
    this.cars.push(name);
  }
}
