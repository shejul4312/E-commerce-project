import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SellerService {



isSellerLoggedIn= new BehaviorSubject<boolean>(false)
isLogginError= new EventEmitter<boolean>(false)
  constructor(private http:HttpClient, private rout:Router) { }

  singup(data:any){
     this.http.post('http://localhost:9090/seller',data,{observe:'response'})
     .subscribe((res)=>{
      this.isSellerLoggedIn.next(true);
      localStorage.setItem('seller',JSON.stringify(res.body))
      this.rout.navigate(['sellerhome'])
      
     })
    
     
  }

  reloadSeller(){
    if(localStorage.getItem('seller')){
      this.isSellerLoggedIn.next(true)
      this.rout.navigate(['sellerhome'])
    }
   }

   userLogin(data:any){
    console.log(data);
    this.http.get(`http://localhost:9090/seller?email=${data.email}&password=${data.password}`,{observe:'response'})
    .subscribe((res:any)=>{
     console.log(res);
     if(res && res.body &&res.body.length){
      console.log("user logged in");
      localStorage.setItem('seller',JSON.stringify(res.body))
      this.rout.navigate(['sellerhome'])
      
     }else{
      console.log("login failed");
      this.isLogginError.emit(true)
      
     }
     
     
    })
   }
}
