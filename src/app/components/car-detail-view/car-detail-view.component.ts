import { Component, ViewChild, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CarDialogComponent } from '../car-dialog/car-dialog.component';
import { ICar } from 'src/model';
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

  fuels = [
    { date: new Date(), km: 134, litres: 24.33, consumption: 10.33, cost: 10.35 },
    { date: new Date(), km: 134, litres: 24.33, consumption: 10.33, cost: 20.35 },
    { date: new Date(), km: 134, litres: 24.33, consumption: 10.33, cost: 30.35 },
    { date: new Date(), km: 134, litres: 24.33, consumption: 10.33, cost: 40.35 }
  ];

  constructor(private router: Router, private route: ActivatedRoute) {
    this.name = this.route.snapshot.params.car;
  }

  addFuel() {
    this.fuels.push({ date: new Date(), km: 134, litres: 24.33, consumption: 10.33, cost: 50.35 });
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
}
