import { Component ,OnInit} from '@angular/core';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{

  formdata = {email:"",password:""};
  sumbit =false;
  loading = false;
  errorMessage="";
  constructor(private auth:AuthService) { }

  ngOnInit(): void {
    this.auth.canAuthenticate();
  }

  onSumbit(){
    this,this.loading=true;
  //call login service
  this.auth.loggin(this.formdata.email,this.formdata.password)
  .subscribe({
      next:data=>{
        //store token
        this.auth.storeToken(data.idToken);
        console.log('logged user token is ' + data.idToken);
        this.auth.canAuthenticate();
        

      },
      error:data=>{
        console.log('------>',data)
        if(data.error.error.message=="INVALID_LOGIN_CREDENTIALS" ){
          this.errorMessage = "Invalid Credentials";
        }else {
          this.errorMessage = "Unknown error when logging into this account!"
        }
      }
  }).add(()=>{
    this.loading =false;
    console.log('login process completed!');
    

  })
}

}