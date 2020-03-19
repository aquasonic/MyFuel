import { Component, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ClrForm } from '@clr/angular';

@Component({
  selector: 'myf-home-view',
  templateUrl: './home-view.component.html',
  styleUrls: ['./home-view.component.scss']
})
export class HomeViewComponent {
  @ViewChild(ClrForm, { static: true }) clrForm;

  form = new FormGroup({
    userId: new FormControl('', [Validators.required, Validators.pattern(/^\d*$/)])
  });

  constructor(private router: Router) {}

  submit() {
    if (this.form.invalid) {
      this.clrForm.markAsTouched();
    } else {
      this.router.navigate(['/', this.form.controls.userId.value]);
    }
  }
}
