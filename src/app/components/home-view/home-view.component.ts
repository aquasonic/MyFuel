import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'myf-home-view',
  templateUrl: './home-view.component.html'
})
export class HomeViewComponent implements OnInit {
  message = 'Loading...';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http
      .get<any>('/.netlify/functions/ping')
      .subscribe(result => (this.message = result.message), error => (this.message = error.message));
  }
}
