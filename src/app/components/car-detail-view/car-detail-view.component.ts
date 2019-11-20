import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'myf-car-detail-view',
  templateUrl: './car-detail-view.component.html',
  styleUrls: ['./car-detail-view.component.scss']
})
export class CarDetailViewComponent {
  name: string;

  fuels = [
    { date: new Date(), km: 134, litres: 24.33, consumption: 10.33, cost: 10.35 },
    { date: new Date(), km: 134, litres: 24.33, consumption: 10.33, cost: 20.35 },
    { date: new Date(), km: 134, litres: 24.33, consumption: 10.33, cost: 30.35 },
    { date: new Date(), km: 134, litres: 24.33, consumption: 10.33, cost: 40.35 }
  ];

  constructor(private route: ActivatedRoute) {
    this.name = this.route.snapshot.params.car;
  }

  addFuel() {
    this.fuels.push({ date: new Date(), km: 134, litres: 24.33, consumption: 10.33, cost: 50.35 });
  }
}
