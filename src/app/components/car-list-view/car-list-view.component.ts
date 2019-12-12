import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Car } from 'src/app/models/car.model';
import { CarService } from 'src/app/services/car.service';
import { UserService } from 'src/app/services/user.service';

import { CarDialogComponent } from '../car-dialog/car-dialog.component';

@Component({
  selector: 'myf-car-list-view',
  templateUrl: './car-list-view.component.html',
  styleUrls: ['./car-list-view.component.scss']
})
export class CarListViewComponent implements OnInit {
  @ViewChild(CarDialogComponent, { static: false }) private carDialog: CarDialogComponent;

  private initialized = false;

  readonly cars$ = this.carService.cars$;

  constructor(private userService: UserService, private carService: CarService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.userService.fetchData(parseInt(this.route.snapshot.params.user, 10)).subscribe(_ => (this.initialized = true));
  }

  addCar() {
    this.carDialog.openModal({} as Car, car => this.carService.addCar(car));
  }

  trackById(index: number, car: Car) {
    return car.id;
  }
}
