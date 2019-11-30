import { Component, ViewChild, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CarDialogComponent } from '../car-dialog/car-dialog.component';
import { ICar, IFuel } from 'src/model';
import { timer } from 'rxjs';
import { map } from 'rxjs/operators';
import { ConfirmDialogComponent, IConfirmDialogParameters } from '../confirm-dialog/confirm-dialog.component';

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
  @ViewChild(ConfirmDialogComponent, { static: false }) confirmDialog: ConfirmDialogComponent;

  name: string;
  selectedFuelId: string;

  fuels: IFuel[] = [
    { id: '1', date: new Date(), km: 134, litres: 24.33, consumption: 10.33, cost: 10.35 },
    { id: '2', date: new Date(), km: 134, litres: 24.33, consumption: 10.33, cost: 20.35 },
    { id: '3', date: new Date(), km: 134, litres: 24.33, consumption: 10.33, cost: 30.35 },
    { id: '4', date: new Date(), km: 134, litres: 24.33, consumption: 10.33, cost: 40.35 }
  ];

  constructor(private router: Router, private route: ActivatedRoute) {
    this.name = this.route.snapshot.params.car;
  }

  addFuel() {
    this.fuels.push({
      id: Math.floor(Math.random() * Math.floor(1000)).toString(),
      date: new Date(),
      km: 134,
      litres: 24.33,
      consumption: 10.33,
      cost: 50.35
    });
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
