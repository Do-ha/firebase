import { Injectable } from '@angular/core';
import{AngularFireAuth} from '@angular/fire/compat/auth'
import { Router } from '@angular/router';
import { GoogleAuthProvider, GithubAuthProvider, FacebookAuthProvider} from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private fireauth : AngularFireAuth, private router :Router) { }
  login(email : string,password:string){
    this.fireauth.signInWithEmailAndPassword(email,password).then(res=>{
      localStorage.setItem('token' , 'true');
      this.router.navigate(['dashboard']);

      if(res.user?.emailVerified == true){
        this.router.navigate(['dashboard']);
      }else{
        this.router.navigate(['/verify-mail']);
      }
    },err=>{
      alert(err.message);
      this.router.navigate(['/login']);
    
    })
  }
  register(email:string,password:string){
    this.fireauth.createUserWithEmailAndPassword(email,password).then(res=>{
alert('Registration Successful');
this.router.navigate(['/login']);
this.sendEmailForVerification(res.user);
    },err => {
      alert(err.message);
      this.router.navigate(['/register']);
    
    })
  }
  logout(){
    this.fireauth.signOut().then(()=>{
      localStorage.removeItem('token');
      this.router.navigate(['/login']);
    },err => {
      alert(err.message)
    
    })
  }

  forgotPassword(email : string){
    this.fireauth.sendPasswordResetEmail(email).then(()=>{
      this.router.navigate(['/verify-mail']);
    },err => {
      alert('Something went wrong');
    } )
  }
  sendEmailForVerification(user:any){
    user.sendEmailForVerification().then((res:any) =>{
      this.router.navigate(['/verify-mail']);
    },(err : any) =>{
      alert('Something went wrong.Not able to send mail to your email.')
    
    })

    //hello word
  }
  googleSignIn() {
    return this.fireauth.signInWithPopup(new GoogleAuthProvider).then(res => {

      this.router.navigate(['/dashboard']);
      localStorage.setItem('token',JSON.stringify(res.user?.uid));

    }, err => {
      alert(err.message);
    })
  }
  facebookSignIn() {
    return this.fireauth.signInWithPopup(new FacebookAuthProvider).then(res => {
  
      this.router.navigate(['/dashboard']);
      localStorage.setItem('token',JSON.stringify(res.user?.uid));
  
    }, err => {
      alert(err.message);
    })
  }
}




