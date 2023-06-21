import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { SellerService } from '../services/seller.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-seller',
  templateUrl: './seller.component.html',
  styleUrls: ['./seller.component.css']
})
export class SellerComponent {
  showLogin=false;
   loginError:string = ''
constructor(private seller:SellerService,private rout:Router){}
anand=new FormGroup({
  name:new FormControl(''),
  emailId:new FormControl(''),
  password:new FormControl('')

})

Shejul=new FormGroup({
  // name:new FormControl(''),
  emailId:new FormControl(''),
  password:new FormControl('')

})

LoginSave(data:any){
  this.loginError =""
  // console.log(this.Shejul.value)
  this.seller.userLogin(data)
  this.seller.isLogginError.subscribe((isError)=>{
    if(isError){
      this.loginError = "Email or password is Incorrect"
    }
  })
}

saveData(data:any){
  this.seller.singup(data)
}
  
openLogin(){
  this.showLogin=true
}
  
openreg(){
  this.showLogin=false  
}


}
