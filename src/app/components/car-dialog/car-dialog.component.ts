import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ClrForm, ClrLoadingState } from '@clr/angular';
import { from, ObservableInput } from 'rxjs';
import { Car } from 'src/app/models/car.model';

@Component({
  selector: 'myf-car-dialog',
  templateUrl: './car-dialog.component.html',
  styleUrls: ['./car-dialog.component.scss']
})
export class CarDialogComponent {
  @ViewChild(ClrForm, { static: true }) clrForm;

  @Output() sucess = new EventEmitter<Car>();

  private saveHandler: (car: Car) => ObservableInput<Car>;

  isModalOpen = false;
  isNew = false;

  submitButtonState = ClrLoadingState.DEFAULT;

  form = new FormGroup({
    name: new FormControl('', Validators.required)
  });

  openModal(car: Car, saveHandler: (car: Car) => ObservableInput<Car>) {
    this.isModalOpen = true;
    this.isNew = car.id === undefined;
    this.saveHandler = saveHandler;
    this.form.patchValue(car);
  }

  closeModal() {
    this.form.reset();
    this.isModalOpen = false;
  }

  submitForm() {
    if (this.form.invalid) {
      this.clrForm.markAsTouched();
    } else {
      const car = Object.assign({}, this.form.value);
      this.submitButtonState = ClrLoadingState.LOADING;

      from(this.saveHandler(car)).subscribe(
        result => {
          this.submitButtonState = ClrLoadingState.SUCCESS;
          this.sucess.emit(result);
          this.closeModal();
        },
        error => {
          this.submitButtonState = ClrLoadingState.ERROR;
        }
      );
    }
  }
}
