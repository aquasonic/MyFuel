import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngxs/store';
import { Car } from 'src/app/models/car.model';
import { CarService } from 'src/app/services/car.service';
import { CreateCar } from 'src/app/state/car.actions';
import { FetchUser } from 'src/app/state/user.actions';
import { UserState } from 'src/app/state/user.state';

import { CarDialogComponent } from '../car-dialog/car-dialog.component';

@Component({
  selector: 'myf-car-list-view',
  templateUrl: './car-list-view.component.html',
  styleUrls: ['./car-list-view.component.scss']
})
export class CarListViewComponent implements OnInit {
  @ViewChild(CarDialogComponent) private carDialog: CarDialogComponent;

  private readonly userId = this.route.snapshot.params.user;

  initialized = false;

  readonly isAuthorized$ = this.store.select(UserState.isAuthorized);
  readonly userName$ = this.store.select(UserState.getUserName);
  readonly cars$ = this.store.select(UserState.getCars);

  constructor(private store: Store, private carService: CarService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.store.dispatch(new FetchUser(this.userId)).subscribe(_ => (this.initialized = true));
  }

  createCar() {
    const car = { dateOfPurchase: new Date().toISOString().slice(0, 10) } as Car;
    this.carDialog.open(car, c => this.store.dispatch(new CreateCar(this.userId, c)));
  }

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
