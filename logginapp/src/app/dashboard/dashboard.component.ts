import { Component ,OnInit} from '@angular/core';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

  constructor(private auth:AuthService) { }
  user = {localId:"someid",displayName:"somename"};

  ngOnInit(): void {
    this.auth.canAccess();
    if (this.auth.isAuthenticated()){
      //call user details service 
      this.auth.detail().subscribe({
       next:data=>{
        this.user.localId = data.users[0].localId;
        this.user.displayName = data.users[0].displayName;
       }

      })

      
    }
  }

  
  onDeleteAccount() {
    const confirmed = confirm('Are you sure you want to delete your account? This action cannot be undone.');
    if (confirmed) {
      // Add your account deletion logic here.
      console.log('Account deleted');
      alert('Your account has been successfully deleted.');
    } else {
      console.log('Account deletion canceled');
    }
  }


}
