import { Component, ViewChild, EventEmitter, Output } from '@angular/core';
import { ObservableInput, from } from 'rxjs';
import { IFuel } from 'src/model';
import { ClrForm, ClrLoadingState } from '@clr/angular';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'myf-fuel-dialog',
  templateUrl: './fuel-dialog.component.html',
  styleUrls: ['./fuel-dialog.component.scss']
})
export class FuelDialogComponent {
  @ViewChild(ClrForm, { static: true }) clrForm;

  @Output() sucess = new EventEmitter<IFuel>();

  private saveHandler: (fuel: IFuel) => ObservableInput<IFuel>;
  private id: string;

  isModalOpen = false;
  isNew = false;

  submitButtonState = ClrLoadingState.DEFAULT;

  form = new FormGroup({
    date: new FormControl('', Validators.required),
    km: new FormControl('', [Validators.required, Validators.pattern(/^\d*$/)]),
    litres: new FormControl('', [Validators.required, Validators.pattern(/^\d*\.?\d{0,2}$/)]),
    cost: new FormControl('', [Validators.required, Validators.pattern(/^\d*\.?\d{0,2}$/)])
  });

  openModal(fuel: IFuel, saveHandler: (fuel: IFuel) => ObservableInput<IFuel>) {
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
      const fuel = Object.assign({}, this.form.value) as IFuel;
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
