import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { timer } from 'rxjs';
import { map } from 'rxjs/operators';
import { Car } from 'src/model';

import { CarDialogComponent } from '../car-dialog/car-dialog.component';

@Component({
  selector: 'myf-car-list-view',
  templateUrl: './car-list-view.component.html',
  styleUrls: ['./car-list-view.component.scss']
})
export class CarListViewComponent {
  @ViewChild(CarDialogComponent, { static: false }) carDialog: CarDialogComponent;

  cars: Car[] = [
    { id: 'audi', name: 'Audi RS 3' },
    { id: 'porsche', name: 'Porsche 911' }
  ];

  constructor(private router: Router, private route: ActivatedRoute) {}

  addCar() {
    this.carDialog.openModal({} as Car, car => timer(500).pipe(map(_ => car)));
  }

  onCarAdded(car: Car) {
    this.router.navigate([car.name], { relativeTo: this.route });
  }

  trackById(index: number, car: Car) {
    return car.id;
  }
}
