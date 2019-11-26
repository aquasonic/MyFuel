import { Component, ViewChild } from '@angular/core';
import { CarDialogComponent } from '../car-dialog/car-dialog.component';
import { ICar } from 'src/model';
import { Router, ActivatedRoute } from '@angular/router';
import { timer } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'myf-car-list-view',
  templateUrl: './car-list-view.component.html',
  styleUrls: ['./car-list-view.component.scss']
})
export class CarListViewComponent {
  @ViewChild(CarDialogComponent, { static: false }) carDialog: CarDialogComponent;

  cars = ['Audi RS 3', 'Porsche 911'];

  constructor(private router: Router, private route: ActivatedRoute) {}

  addCar() {
    this.carDialog.openModal({} as ICar, car => timer(500).pipe(map(_ => car)));
  }

  onCarAdded(car: ICar) {
    this.router.navigate([car.name], { relativeTo: this.route });
  }
}
