import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/security/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(public auth: AuthService) { }

  public username: string;

  public ngOnInit() {
  }

  public logout() {
    this.auth.logout();
  }


}
