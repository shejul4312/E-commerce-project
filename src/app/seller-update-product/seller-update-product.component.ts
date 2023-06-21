import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-seller-update-product',
  templateUrl: './seller-update-product.component.html',
  styleUrls: ['./seller-update-product.component.css']
})
export class SellerUpdateProductComponent implements OnInit {
  productMessage:any
productData:undefined|any
  constructor(private rout:ActivatedRoute, private product:ProductService){}

  
  ngOnInit(): void {
    let productId= this.rout.snapshot.paramMap.get('id')
    console.log(productId);
    productId && this.product.getproduct(productId).subscribe((data)=>{console.log(data);
      this.productData=data
    })
    
  }


  submit(data:any){
    console.log(data);
    if(this.productData){
        data.id=this.productData.id
    }
    this.product.updateProduct(data).subscribe((res)=>{
      if(res){
        this.productMessage='Product has updeted'
      }
    })
    setTimeout(()=> {
      this.productMessage=undefined;
    }
    ,3000)
    
  }

}
