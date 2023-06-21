import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  invalidUserAuth= new EventEmitter<boolean>(false)
  constructor(private http:HttpClient,private router:Router) { }

  userSignUp(user:any){
    this.http.post('http://localhost:9090/user',user,{observe:'response'})
    .subscribe((result)=>{
     if(result){
       localStorage.setItem('user',JSON.stringify(result.body));
       this.router.navigate(['/']);
     }
     
    })
     
   }

   userLogin(data:any){
    this.http.get<any[]>(`http://localhost:9090/user?email=${data.email}&password=${data.password}`,
    {observe:'response'}
    ).subscribe((result)=>{
      if(result && result.body?.length){
        localStorage.setItem('user',JSON.stringify(result.body[0]));
        this.router.navigate(['/']);
        this.invalidUserAuth.emit(false)
      }
      else{
        this.invalidUserAuth.emit(true)
      }
    })
  }
   userAuthReload(){
    if(localStorage.getItem('user')){
      this.router.navigate(['/']);
    }
  }
}
