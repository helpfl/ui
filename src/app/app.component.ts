import { Component } from '@angular/core';

const Mode = {
  TERMINAL: 'terminal',
  QR_CODE_GENERATOR: 'qr-code-generator',
  NONE: 'none'
};
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'helpfl';

  private mode: typeof Mode[keyof typeof Mode] = Mode.NONE;

  showTerminal() {
    console.log('show terminal');
    this.mode = Mode.TERMINAL;
  }

  showQrCodeGenerator() {
    this.mode = Mode.QR_CODE_GENERATOR;
  }

  isTerminal() {
    console.log('is terminal');
    return this.mode === Mode.TERMINAL;
  }

  isQrCodeGenerator() {
    return this.mode === Mode.QR_CODE_GENERATOR; 
  }

}
