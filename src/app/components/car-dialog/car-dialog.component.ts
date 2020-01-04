import { Component, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ClrForm, ClrLoadingState } from '@clr/angular';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { Car } from 'src/app/models/car.model';

@Component({
  selector: 'myf-car-dialog',
  templateUrl: './car-dialog.component.html',
  styleUrls: ['./car-dialog.component.scss']
})
export class CarDialogComponent {
  @ViewChild(ClrForm, { static: true }) clrForm;

  isOpen = false;
  isNew = false;

  submitButtonState = ClrLoadingState.DEFAULT;

  form = new FormGroup({
    id: new FormControl(),
    name: new FormControl(null, Validators.required),
    dateOfPurchase: new FormControl(null, Validators.required),
    mileageAtPurchase: new FormControl(null, [Validators.required, Validators.pattern(/^\d*$/)])
  });

  private submitHandler: (car: Car) => Observable<void>;

  open(car: Car, submitHandler: (car: Car) => Observable<void>) {
    this.isNew = car.id === undefined;
    this.submitHandler = submitHandler;

    this.isOpen = true;

    this.form.reset();
    this.form.patchValue(car);
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
