import { Component, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ClrForm } from '@clr/angular';

@Component({
  selector: 'myf-add-car',
  templateUrl: './add-car.component.html',
  styleUrls: ['./add-car.component.scss']
})
export class AddCarComponent {
  @ViewChild(ClrForm, { static: true }) clrForm;

  isModalOpen = false;

  form = new FormGroup({
    name: new FormControl('', Validators.required)
  });

  openModal() {
    this.isModalOpen = true;
  }

  closeModal() {
    this.form.reset();
    this.isModalOpen = false;
  }

  submit() {
    if (this.form.invalid) {
      this.clrForm.markAsTouched();
    } else {
      this.closeModal();
    }
  }
}
