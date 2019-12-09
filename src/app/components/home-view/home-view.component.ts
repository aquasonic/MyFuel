import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ClrForm } from '@clr/angular';

@Component({
  selector: 'myf-home-view',
  templateUrl: './home-view.component.html',
  styleUrls: ['./home-view.component.scss']
})
export class HomeViewComponent implements OnInit {
  message = 'Loading...';
  numberOfUsers = 'Loading...';

  @ViewChild(ClrForm, { static: true }) clrForm;

  form = new FormGroup({
    userId: new FormControl('', Validators.required)
  });

  constructor(private http: HttpClient, private router: Router) {}

  submit() {
    if (this.form.invalid) {
      this.clrForm.markAsTouched();
    } else {
      this.router.navigate(['/', this.form.controls.userId.value]);
    }
  }

  ngOnInit(): void {
    this.http.get<any>('/.netlify/functions/ping').subscribe(
      result => (this.message = result.message),
      error => (this.message = error.message)
    );

    this.http.get<any>('/.netlify/functions/users-count').subscribe(
      result => (this.numberOfUsers = 'There are ' + result + ' users available.'),
      error => (this.numberOfUsers = error.message)
    );
  }
}
