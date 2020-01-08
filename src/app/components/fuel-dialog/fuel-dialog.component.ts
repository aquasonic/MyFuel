import { Component, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ClrForm, ClrLoadingState } from '@clr/angular';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { Fuel } from 'src/app/models/fuel.model';

@Component({
  selector: 'myf-fuel-dialog',
  templateUrl: './fuel-dialog.component.html',
  styleUrls: ['./fuel-dialog.component.scss']
})
export class FuelDialogComponent {
  @ViewChild(ClrForm, { static: true }) clrForm;

  isOpen = false;
  isNew = false;

  submitButtonState = ClrLoadingState.DEFAULT;

  form = new FormGroup({
    id: new FormControl(),
    date: new FormControl(null, Validators.required),
    km: new FormControl(null, [Validators.required, Validators.pattern(/^\d*$/)]),
    litres: new FormControl(null, [Validators.required, Validators.pattern(/^\d*\.?\d{0,2}$/)]),
    cost: new FormControl(null, [Validators.required, Validators.pattern(/^\d*\.?\d{0,2}$/)])
  });

  private submitHandler: (fuel: Fuel) => Observable<void>;

  open(fuel: Fuel, submitHandler: (fuel: Fuel) => Observable<void>) {
    this.isNew = fuel.id === undefined;
    this.submitHandler = submitHandler;

    this.isOpen = true;

    this.form.reset();
    this.form.patchValue(fuel);
  }

  close() {
    this.form.reset();
    this.isOpen = false;
  }

  submit() {
    if (this.form.invalid) {
      this.clrForm.markAsTouched();
    } else {
      this.submitButtonState = ClrLoadingState.LOADING;
      this.submitHandler({ ...this.form.value })
        .pipe(finalize(() => (this.submitButtonState = ClrLoadingState.DEFAULT)))
        .subscribe(_ => {
          this.isOpen = false;
        });
    }
  }
}
