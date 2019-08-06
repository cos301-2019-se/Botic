import { Component } from '@angular/core';
import { AuthService } from './services/security/auth/auth.service';
import { LoginControllerService } from './services/controllers/login/login-controller.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  public title = 'Botic: Privacy Aware chatbot.';

  constructor() {
    // this.auth.processAuth();
  }
}
