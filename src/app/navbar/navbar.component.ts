import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { ProductService } from '../services/product.service';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  menuType:string='default';
  sellerName:any="";
  searchResult:undefined|any[]
  userName:string=""
  cartItems=0;

  constructor(private rout:Router,private product:ProductService){

  }
  ngOnInit(): void {
    this.rout.events.subscribe((val:any)=>{
      if(val.url){
        if(localStorage.getItem('seller')&&val.url.includes('seller')){
          console.log("in seller area");
          this.menuType="seller"
          if(localStorage.getItem('seller')){
            let sellerStore=localStorage.getItem('seller');
            let sellerData=sellerStore && JSON.parse(sellerStore)[0];
            this.sellerName=sellerData.name;
            this.menuType='seller'
          }

        }else if(localStorage.getItem('user')){
          let userStore = localStorage.getItem('user');
          let userData = userStore && JSON.parse(userStore);
          this.userName= userData.name;
          this.menuType='user';
          this.product.getCartList(userData.id);
        }
        else{
          console.log("outside seller");
          this.menuType="default"
          
        }
      }
    })
    let cartData= localStorage.getItem('localCart');
    if(cartData){
      this.cartItems= JSON.parse(cartData).length
    }
    this.product.cartData.subscribe((items: string | any[])=>{
      this.cartItems= items.length
    })
  }

  logout(){
    localStorage.removeItem('seller')
    this.rout.navigate([''])
  }

  userLogout(){
    localStorage.removeItem('user')
    this.rout.navigate(['/user-auth'])
    this.product.cartData.emit([])
  }

  searchProduct(query:KeyboardEvent){
    if(query){
      const element = query.target as HTMLInputElement;
      this.product.searchProduct(element.value).subscribe((result)=>{
       
        if(result.length>5){
          result.length=5
        }
        this.searchResult=result;
      })
    }
  }

  hideSearch(){
    this.searchResult=undefined
  }
  redirectToDetails(id:number){
    this.rout.navigate(['/details/'+id])
  }
  submitSearch(val:string){
    console.warn(val)
  this.rout.navigate([`search/${val}`]);
  
  }

}
