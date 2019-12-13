import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EMPTY, Observable, timer } from 'rxjs';
import { map } from 'rxjs/operators';
import { Car } from 'src/app/models/car.model';
import { Fuel } from 'src/app/models/fuel.model';
import { CarService } from 'src/app/services/car.service';
import { UserService } from 'src/app/services/user.service';

import { CarDialogComponent } from '../car-dialog/car-dialog.component';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { FuelDialogComponent } from '../fuel-dialog/fuel-dialog.component';

@Component({
  selector: 'myf-car-detail-view',
  templateUrl: './car-detail-view.component.html',
  styleUrls: ['./car-detail-view.component.scss']
})
export class CarDetailViewComponent implements OnInit {
  @ViewChild(CarDialogComponent, { static: false }) carDialog: CarDialogComponent;
  @ViewChild(FuelDialogComponent, { static: false }) fuelDialog: FuelDialogComponent;
  @ViewChild(ConfirmDialogComponent, { static: false }) confirmDialog: ConfirmDialogComponent;

  initialized = false;

  car$: Observable<Car>;

  selectedFuelId?: number;

  fuels: Fuel[] = [
    { id: 1, date: '2019-04-02', km: 634, litres: 47.44, cost: 10.35 },
    { id: 2, date: '2019-04-24', km: 673, litres: 47.45, cost: 20.3 },
    { id: 3, date: '2019-10-14', km: 705, litres: 50.34, cost: 30 },
    { id: 4, date: '2019-11-08', km: 634, litres: 47.44, cost: 40.35 }
  ];

  constructor(private userService: UserService, private carService: CarService, private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {
    this.userService.fetchData(parseInt(this.route.snapshot.params.user, 10)).subscribe(_ => (this.initialized = true));
    this.car$ = this.carService.getCarById(parseInt(this.route.snapshot.params.car, 10));
  }

  updateCar(car: Car) {
    this.carDialog.open(car, c => this.carService.updateCar(c));
  }

  deleteCar(id: number) {
    this.confirmDialog.open(
      'Delete car?',
      'Are you sure you want to delete this car with all the fuel data? This can not be undone.',
      id,
      params => this.carService.deleteCar(params),
      () => this.router.navigate(['../'], { relativeTo: this.route })
    );
  }

  addFuel() {
    this.fuelDialog.openModal({ date: new Date().toISOString().slice(0, 10) } as Fuel, fuel => timer(500).pipe(map(_ => fuel)));
  }

  updateFuel() {
    this.fuelDialog.openModal(this.fuels[this.fuels.findIndex(f => f.id === this.selectedFuelId)], fuel => timer(500).pipe(map(_ => fuel)));
  }

  deleteFuel() {
    if (this.selectedFuelId) {
      this.confirmDialog.open(
        'Delete fuel?',
        'Are you sure you want to delete this fuel? You could easily add it again later.',
        this.selectedFuelId,
        params => {
          this.fuels.splice(
            this.fuels.findIndex(fuel => fuel.id === params.id),
            1
          );

          this.selectedFuelId = undefined;
          return EMPTY;
        },
        () => {}
      );
    }
  }

  onFuelAddedOrUpdated(fuel: Fuel) {
    if (fuel.id) {
      const index = this.fuels.findIndex(f => f.id === fuel.id);
      this.fuels[index] = fuel;
    } else {
      fuel.id = Math.floor(Math.random() * Math.floor(1000));
      this.fuels.push(fuel);
    }

    this.selectedFuelId = undefined;
  }

  selectRow(fuel: Fuel) {
    if (this.selectedFuelId === fuel.id) {
      this.selectedFuelId = undefined;
    } else {
      this.selectedFuelId = fuel.id;
    }
  }

  trackById(index: number, fuel: Fuel) {
    return fuel.id;
  }
}
