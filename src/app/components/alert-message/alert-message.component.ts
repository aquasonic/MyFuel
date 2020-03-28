import { Component, Input } from '@angular/core';

@Component({
  selector: 'myf-alert-message',
  templateUrl: './alert-message.component.html'
})
export class AlertMessageComponent {
  @Input() alertType: string;
}
