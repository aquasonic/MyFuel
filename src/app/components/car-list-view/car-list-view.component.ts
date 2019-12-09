import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { timer } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { CarService } from 'src/app/services';
import { Car } from 'src/model';

import { CarDialogComponent } from '../car-dialog/car-dialog.component';

@Component({
  selector: 'myf-car-list-view',
  templateUrl: './car-list-view.component.html',
  styleUrls: ['./car-list-view.component.scss']
})
export class CarListViewComponent {
  @ViewChild(CarDialogComponent, { static: false }) carDialog: CarDialogComponent;

  readonly cars$ = this.route.params.pipe(switchMap(params => this.carService.getCars(params.user)));

  constructor(private carService: CarService, private router: Router, private route: ActivatedRoute) {}

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
