import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Car } from 'src/app/models/car.model';
import { Fuel } from 'src/app/models/fuel.model';
import { CarService } from 'src/app/services/car.service';
import { FuelService } from 'src/app/services/fuel.service';
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
  @ViewChild(CarDialogComponent, { static: false }) private carDialog: CarDialogComponent;
  @ViewChild(FuelDialogComponent, { static: false }) private fuelDialog: FuelDialogComponent;
  @ViewChild(ConfirmDialogComponent, { static: false }) private confirmDialog: ConfirmDialogComponent;

  initialized = false;
  selectedFuel: Fuel;

  car$: Observable<Car>;
  fuels$: Observable<Fuel[]>;

  constructor(
    private userService: UserService,
    private carService: CarService,
    private fuelService: FuelService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    const userId = parseInt(this.route.snapshot.params.user, 10);
    const carId = parseInt(this.route.snapshot.params.car, 10);

    this.userService.fetchData(userId).subscribe(_ => (this.initialized = true));
    this.car$ = this.carService.getCarById(carId);
    this.fuels$ = this.fuelService.getAllFuelsByCarId(carId);
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

  addFuel(carId: number) {
    const fuel = { date: new Date().toISOString().slice(0, 10) } as Fuel;
    this.fuelDialog.open(
      fuel,
      f => this.fuelService.addFuel(carId, f),
      f => (this.selectedFuel = f)
    );
  }

  updateFuel(carId: number, fuel: Fuel) {
    this.fuelDialog.open(
      fuel,
      f => this.fuelService.updateFuel(carId, f),
      f => (this.selectedFuel = f)
    );
  }

  deleteFuel(carId: number, fuelId: number) {
    this.confirmDialog.open(
      'Delete fuel?',
      'Are you sure you want to delete this fuel? You could easily add it again later.',
      { carId, fuelId },
      params => this.fuelService.deleteFuel(params.carId, params.fuelId),
      () => (this.selectedFuel = undefined)
    );
  }

  selectFuel(fuel: Fuel) {
    if (this.selectedFuel !== undefined && this.selectedFuel.id === fuel.id) {
      this.selectedFuel = undefined;
    } else {
      this.selectedFuel = fuel;
    }
  }

  trackById(index: number, fuel: Fuel) {
    return fuel.id;
  }
}
