import { Component } from '@angular/core';
import { ClrLoadingState } from '@clr/angular';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'myf-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss']
})
export class ConfirmDialogComponent {
  isOpen = false;
  title: string;
  message: string;

  confirmButtonState = ClrLoadingState.DEFAULT;

  private params: any;
  private confirmHandler: (params: any) => Observable<void>;
  private callback: () => void;

  open(title: string, message: string, params: any, confirmHandler: (params: any) => Observable<void>, callback: () => void) {
    this.isOpen = true;
    this.title = title;
    this.message = message;

    this.params = params;
    this.confirmHandler = confirmHandler;
    this.callback = callback;
  }

  close() {
    this.isOpen = false;
  }

  confirm() {
    this.confirmButtonState = ClrLoadingState.LOADING;
    this.confirmHandler(this.params)
      .pipe(finalize(() => (this.confirmButtonState = ClrLoadingState.DEFAULT)))
      .subscribe(_ => {
        this.isOpen = false;
        this.callback();
      });
  }
}
