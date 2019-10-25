import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'myf-home-view',
  templateUrl: './home-view.component.html'
})
export class HomeViewComponent implements OnInit {
  message = 'Loading...';
  numberOfUsers = 'Loading...';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http
      .get<any>('/.netlify/functions/ping')
      .subscribe(result => (this.message = result.message), error => (this.message = error.message));

    this.http
      .get<any>('/.netlify/functions/users-count')
      .subscribe(
        result => (this.numberOfUsers = 'There are ' + result + ' users available.'),
        error => (this.numberOfUsers = error.message)
      );
  }
}
