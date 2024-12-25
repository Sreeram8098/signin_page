import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router, RouteReuseStrategy } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private router:Router,private http:HttpClient) { }

  isAuthenticated():boolean{
    if (sessionStorage.getItem('token')!==null) {
        return true;
    }
    return false;
  }

  canAccess(){
    if (!this.isAuthenticated()) {
      //redirect to login
      this.router.navigate(['/login']);
  }
  }
  canAuthenticate(){
    if (this.isAuthenticated()) {
      //redirect to dashboard
      this.router.navigate(['/dashboard']);
  }

   }
  register(name:string,email:string,password:string){
   //send data to register api 
   return this.http.post<{idToken:string}>(
'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAtu7qj4d2sWh2izt-8hdjjAAY2f6li1YM', 
    {displayName:name,email,password}
   );


  }

  storeToken(token:string){
     sessionStorage.setItem('token',token);
  }

  loggin(email:string,password:string){
   //send data to login api 
   return this.http
   .post<{idToken:string}>(
 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAtu7qj4d2sWh2izt-8hdjjAAY2f6li1YM', 
     {email,password}
   );

   

   }
   detail(){
    let token = sessionStorage.getItem('token');
console.log('----->token',token)

    
    return this.http.post<{users:Array<{localId:string,displayName:string}>}>(
'https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyAtu7qj4d2sWh2izt-8hdjjAAY2f6li1YM',        {idToken:token}
    );
   }
   removeToken(){
    sessionStorage.removeItem('token');
  }
  updateUser(newDetails: { displayName: string; email: string }) {
    const token = sessionStorage.getItem('token'); // Retrieve the token for authentication
    console.log("ftrgrttr",newDetails.email);
    
    return this.http.post('https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyAtu7qj4d2sWh2izt-8hdjjAAY2f6li1YM', {
      idToken: token,  // Include the ID token for authentication
      displayName: newDetails.displayName,
      email: newDetails.email,
      returnSecureToken: true
    });
  }
  
  
   

  }

