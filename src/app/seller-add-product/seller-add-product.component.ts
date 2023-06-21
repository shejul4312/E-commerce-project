import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-seller-add-product',
  templateUrl: './seller-add-product.component.html',
  styleUrls: ['./seller-add-product.component.css']
})
export class SellerAddProductComponent {
  addProductMessage:string|undefined
constructor(private product:ProductService){

}

  add=new FormGroup({
    name:new FormControl(''),
    price:new FormControl(''),
    color:new FormControl(''),
    Catagory:new FormControl(''),
    Description:new FormControl(''),
    url:new FormControl('')


  
  })

  submit(){
    // console.log(this.add.value);
    this.product.addProduct(this.add.value).subscribe((res)=>{console.log(res);
    if(res){
      this.addProductMessage='Product is Succesfully added'
    }
    setTimeout(()=>(this.addProductMessage=undefined),3000)
    
    })
    
  }
}
