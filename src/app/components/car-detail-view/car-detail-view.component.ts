import { Component, ViewChild, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CarDialogComponent } from '../car-dialog/car-dialog.component';
import { ICar, IFuel } from 'src/model';
import { timer } from 'rxjs';
import { map } from 'rxjs/operators';
import { ConfirmDialogComponent, IConfirmDialogParameters } from '../confirm-dialog/confirm-dialog.component';
import { FuelDialogComponent } from '../fuel-dialog/fuel-dialog.component';

enum ConfirmationType {
  DeleteCar = 1,
  DeleteFuel = 2
}

@Component({
  selector: 'myf-car-detail-view',
  templateUrl: './car-detail-view.component.html',
  styleUrls: ['./car-detail-view.component.scss']
})
export class CarDetailViewComponent {
  @ViewChild(CarDialogComponent, { static: false }) carDialog: CarDialogComponent;
  @ViewChild(FuelDialogComponent, { static: false }) fuelDialog: FuelDialogComponent;
  @ViewChild(ConfirmDialogComponent, { static: false }) confirmDialog: ConfirmDialogComponent;

  name: string;
  selectedFuelId: string;

  fuels: IFuel[] = [
    { id: '1', date: '2019-04-02', km: 634, litres: 47.44, cost: 10.35 },
    { id: '2', date: '2019-04-24', km: 673, litres: 47.45, cost: 20.3 },
    { id: '3', date: '2019-10-14', km: 705, litres: 50.34, cost: 30 },
    { id: '4', date: '2019-11-08', km: 634, litres: 47.44, cost: 40.35 }
  ];

  constructor(private router: Router, private route: ActivatedRoute) {
    this.name = this.route.snapshot.params.car;
  }

  updateCar() {
    this.carDialog.openModal({ id: 'id', name: this.name } as ICar, car => timer(500).pipe(map(_ => car)));
  }

  deleteCar() {
    this.confirmDialog.openModal(
      'Delete car?',
      'Are you sure you want to delete this car with all the fuel data? This can not be undone.',
      { type: ConfirmationType.DeleteCar, id: 'id' },
      params => timer(500)
    );
  }

  addFuel() {
    this.fuelDialog.openModal({ date: new Date().toISOString().slice(0, 10) } as IFuel, fuel => timer(500).pipe(map(_ => fuel)));
  }

  updateFuel() {
    this.fuelDialog.openModal(this.fuels[this.fuels.findIndex(f => f.id === this.selectedFuelId)], fuel => timer(500).pipe(map(_ => fuel)));
  }

  deleteFuel() {
    if (this.selectedFuelId) {
      this.confirmDialog.openModal(
        'Delete fuel?',
        'Are you sure you want to delete this fuel? You could easily add it again later.',
        { type: ConfirmationType.DeleteFuel, id: this.selectedFuelId },
        params =>
          timer(500).pipe(result => {
            this.fuels.splice(this.fuels.findIndex(fuel => fuel.id === params.id), 1);
            this.selectedFuelId = undefined;
            return result;
          })
      );
    }
  }

  onCarUpdated(car: ICar) {
    this.name = car.name;
  }

  onFuelAddedOrUpdated(fuel: IFuel) {
    if (fuel.id) {
      const index = this.fuels.findIndex(f => f.id === fuel.id);
      this.fuels[index] = fuel;
    } else {
      fuel.id = Math.floor(Math.random() * Math.floor(1000)).toString();
      this.fuels.push(fuel);
    }

    this.selectedFuelId = undefined;
  }

  onConfirmSucess(params: IConfirmDialogParameters) {
    switch (params.type) {
      case ConfirmationType.DeleteCar:
        this.router.navigate(['../'], { relativeTo: this.route });
        break;
    }
  }

  selectRow(fuel: IFuel) {
    if (this.selectedFuelId === fuel.id) {
      this.selectedFuelId = undefined;
    } else {
      this.selectedFuelId = fuel.id;
    }
  }

  trackById(index: number, fuel: IFuel) {
    return fuel.id;
  }
}
