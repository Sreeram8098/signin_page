import { Component } from '@angular/core';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  constructor(public auth:AuthService) { }

  logout(){
    //remove token 
    this.auth.removeToken();
    this.auth.canAccess();
  }

}
