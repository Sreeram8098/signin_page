import { Component,OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.css'
})
export class SigninComponent implements OnInit{
  
  formdata={name:"",email:"",password:""};
  sumbit=false;
  errorMessage="";
  loading=false;

  constructor(private auth:AuthService) { }

  ngOnInit(): void {

    this.auth.canAuthenticate();
  }
  

  onSubmit() {
    this.loading = true;
  
    // Call the login service
    this.auth.register(this.formdata.name,this.formdata.email, this.formdata.password)
      .subscribe({
        next: (data) => {

          // Store token from response data
          this.auth.storeToken(data.idToken);
          this.auth.canAuthenticate()
          console.log('Logged in successfully, idToken:', data.idToken);
  
          
        
        },
          
        error: (error) => {
          // Handle error messages based on error codes
          if (error.error && error.error.error) {
            const errorMessage = error.error.error.message;
  
            if (errorMessage === "EMAIL_EXISTS") {
              // Handle "email already exists" error
              this.errorMessage = "Email already exists. Please use a different email.";
            } else if (errorMessage === "EMAIL_NOT_FOUND") {
              // Handle "email not found" error (for login)
              this.errorMessage = "Email not registered. Please sign up first.";
            } else if (errorMessage === "INVALID_PASSWORD") {
              // Handle "invalid password" error
              this.errorMessage = "Incorrect password. Please try again.";
            } else if (errorMessage === "MISSING_EMAIL" || errorMessage === "MISSING_PASSWORD") {
              // Handle missing email or password error
              this.errorMessage = "Please enter both email and password.";
            } else {
              // Handle unknown errors
              this.errorMessage = "An unknown error occurred. Please try again later.";
            }
          } else {
            // Generic fallback for unknown errors
            this.errorMessage = "An unknown error occurred. Please try again later.";
          }
        }
      }).add(() => {
        this.loading = false;
        console.log('Login process completed!');
      });
  }


onUpdate() {
  const updatedDetails = {
    displayName: this.formdata.name,
    email: this.formdata.email
  };
  console.log("------>",this.formdata);
  

  this.auth.updateUser(updatedDetails).subscribe({
    next: (data) => {
      console.log('User updated successfully:', data);
      alert('Profile updated successfully!');
    },
    error: (error) => {
      // Handle error messages based on error codes
      if (error.error && error.error.error) {
        const errorMessage = error.error.error.message;

        if (errorMessage === "EMAIL_EXISTS") {
          this.errorMessage = "Email already exists. Please use a different email.";
        } else {
          this.errorMessage = "An error occurred while updating the profile.";
        }
      } else {
        // Generic fallback for unknown errors
        this.errorMessage = "An unknown error occurred while updating the profile.";
      }
    }
  });
}
}
