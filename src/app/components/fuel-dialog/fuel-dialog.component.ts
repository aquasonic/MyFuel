import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ClrForm, ClrLoadingState } from '@clr/angular';
import { from, ObservableInput } from 'rxjs';
import { Fuel } from 'src/app/models/fuel.model';

@Component({
  selector: 'myf-fuel-dialog',
  templateUrl: './fuel-dialog.component.html',
  styleUrls: ['./fuel-dialog.component.scss']
})
export class FuelDialogComponent {
  @ViewChild(ClrForm, { static: true }) clrForm;

  @Output() sucess = new EventEmitter<Fuel>();

  private saveHandler: (fuel: Fuel) => ObservableInput<Fuel>;
  private id?: number;

  isModalOpen = false;
  isNew = false;

  submitButtonState = ClrLoadingState.DEFAULT;

  form = new FormGroup({
    date: new FormControl('', Validators.required),
    km: new FormControl('', [Validators.required, Validators.pattern(/^\d*$/)]),
    litres: new FormControl('', [Validators.required, Validators.pattern(/^\d*\.?\d{0,2}$/)]),
    cost: new FormControl('', [Validators.required, Validators.pattern(/^\d*\.?\d{0,2}$/)])
  });

  openModal(fuel: Fuel, saveHandler: (fuel: Fuel) => ObservableInput<Fuel>) {
    this.isModalOpen = true;
    this.isNew = fuel.id === undefined;
    this.saveHandler = saveHandler;
    this.id = fuel.id;
    this.form.patchValue(fuel);
  }

  closeModal() {
    this.form.reset();
    this.isModalOpen = false;
  }

  submitForm() {
    if (this.form.invalid) {
      this.clrForm.markAsTouched();
    } else {
      const fuel = Object.assign({}, this.form.value) as Fuel;
      fuel.id = this.id;

      this.submitButtonState = ClrLoadingState.LOADING;

      from(this.saveHandler(fuel)).subscribe(
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
