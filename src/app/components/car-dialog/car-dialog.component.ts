import { Component, ViewChild, EventEmitter, Output, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ClrForm, ClrLoadingState } from '@clr/angular';
import { ICar } from 'src/model';
import { ObservableInput, from } from 'rxjs';

@Component({
  selector: 'myf-car-dialog',
  templateUrl: './car-dialog.component.html',
  styleUrls: ['./car-dialog.component.scss']
})
export class CarDialogComponent {
  @ViewChild(ClrForm, { static: true }) clrForm;

  @Output() sucess = new EventEmitter<ICar>();

  private saveHandler: (car: ICar) => ObservableInput<ICar>;

  isModalOpen = false;
  isNew = false;

  submitButtonState = ClrLoadingState.DEFAULT;

  form = new FormGroup({
    name: new FormControl('', Validators.required)
  });

  openModal(car: ICar, saveHandler: (car: ICar) => ObservableInput<ICar>) {
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
