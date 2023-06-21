import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import {faTrash,faEdit} from '@fortawesome/free-solid-svg-icons'

@Component({
  selector: 'app-seller-home',
  templateUrl: './seller-home.component.html',
  styleUrls: ['./seller-home.component.css']
})
export class SellerHomeComponent implements OnInit{
productList:any[] |undefined
productMessage:undefined|string
icon=faTrash;
iconEdit=faEdit;

  constructor(private product:ProductService){}
  ngOnInit(): void {
    this.product.productList().subscribe((res)=>{console.log(res);
      this.productList=res;

    })
  }

  deleteProduct(id:number ){
    console.log("test id",id);
    
    this.product.deleteProduct(id).subscribe((res)=>{console.log(res);
      if(res){
        this.productMessage="product is deleted"
        window.location.reload()
      }

    })
    setTimeout(()=>{
      this.productMessage=undefined
    }, 3000)
    
  }

}
