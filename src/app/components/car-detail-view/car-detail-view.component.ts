import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'myf-car-detail-view',
  templateUrl: './car-detail-view.component.html',
  styleUrls: ['./car-detail-view.component.scss']
})
export class CarDetailViewComponent {
  name: string;

  constructor(private route: ActivatedRoute) {
    this.name = this.route.snapshot.params.car;
  }
}
