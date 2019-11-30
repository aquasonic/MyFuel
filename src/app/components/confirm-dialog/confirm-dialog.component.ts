import { Component, EventEmitter, Output } from '@angular/core';
import { ClrLoadingState } from '@clr/angular';
import { ObservableInput, from } from 'rxjs';

export interface IConfirmDialogParameters {
  type: number;
  id: string;
}

@Component({
  selector: 'myf-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss']
})
export class ConfirmDialogComponent {
  @Output() sucess = new EventEmitter<any>();

  private params: IConfirmDialogParameters;
  private saveHandler: (params: IConfirmDialogParameters) => ObservableInput<void>;

  isModalOpen = false;
  title: string;
  message: string;

  confirmButtonState = ClrLoadingState.DEFAULT;

  openModal(
    title: string,
    message: string,
    params: IConfirmDialogParameters,
    saveHandler: (params: IConfirmDialogParameters) => ObservableInput<void>
  ) {
    this.isModalOpen = true;
    this.title = title;
    this.message = message;

    this.params = params;
    this.saveHandler = saveHandler;
  }

  closeModal() {
    this.isModalOpen = false;
  }

  confirm() {
    this.confirmButtonState = ClrLoadingState.LOADING;

    from(this.saveHandler(this.params)).subscribe(
      result => {
        this.confirmButtonState = ClrLoadingState.SUCCESS;
        this.sucess.emit(this.params);
        this.closeModal();
      },
      error => {
        this.confirmButtonState = ClrLoadingState.ERROR;
      }
    );
  }
}