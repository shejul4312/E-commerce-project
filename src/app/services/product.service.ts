import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  
  cartData = new EventEmitter<any[] | []>();

  constructor(private http:HttpClient) { }
  addProduct(data:any){
   return this.http.post('http://localhost:9090/product',data)
    
  }

  productList(){
   return this.http.get<any[]>('http://localhost:9090/product')

  }
  deleteProduct(id:number){
   return  this.http.delete(`http://localhost:9090/product/${id}`,{responseType:'text'})
  }

  getproduct(id:string){
    return this.http.get<any>(`http://localhost:9090/product/${id}`)
  }

  updateProduct(product:any){
    return this.http.put<any>(`http://localhost:9090/product/${product.id}`,product)

  }

  popularProduct() {
    return this.http.get<any[]>('http://localhost:9090/product?_limit=3');
  }

  trendyProducts() {
    return this.http.get<any[]>('http://localhost:9090/product?_limit=8');
  }
  searchProduct(query: string) {
    return this.http.get<any[]>(`http://localhost:9090/product?q=${query}`);
  }


  
  localAddToCart(data: any) {
    let cartData = [];
    let localCart = localStorage.getItem('localCart');
    if (!localCart) {
      localStorage.setItem('localCart', JSON.stringify([data]));
      this.cartData.emit([data]);
    } else {
      cartData = JSON.parse(localCart);
      cartData.push(data);
      localStorage.setItem('localCart', JSON.stringify(cartData));
      this.cartData.emit(cartData);
    }
  }

  removeItemFromCart(productId: number) {
    let cartData = localStorage.getItem('localCart');
    if (cartData) {
      let items: any[] = JSON.parse(cartData);
      items = items.filter((item: any) => productId !== item.id);
      localStorage.setItem('localCart', JSON.stringify(items));
      this.cartData.emit(items);
    }
  }

  addToCart(cartData: any) {
    return this.http.post('http://localhost:9090/cart', cartData);
  }
  getCartList(userId: number) {
    return this.http
      .get<any[]>('http://localhost:9090/cart?userId=' + userId, {
        observe: 'response',
      })
      .subscribe((result) => {
        if (result && result.body) {
          this.cartData.emit(result.body);
        }
      });
  }
  removeToCart(cartId: number) {
    return this.http.delete('http://localhost:9090/cart/' + cartId);
  }
  currentCart() {
    let userStore = localStorage.getItem('user');
    let userData = userStore && JSON.parse(userStore);
    return this.http.get<any[]>('http://localhost:9090/cart?userId=' + userData.id);
  }

  orderNow(data: any) {
    return this.http.post('http://localhost:9090/orders', data);
  }
  orderList() {
    let userStore = localStorage.getItem('user');
    let userData = userStore && JSON.parse(userStore);
    return this.http.get<any[]>('http://localhost:9090/orders?userId=' + userData.id);
  }

  deleteCartItems(cartId: number) {
    return this.http.delete('http://localhost:9090/cart/' + cartId).subscribe((result) => {
      this.cartData.emit([]);
    })
  }

  cancelOrder(orderId:number){
    return this.http.delete('http://localhost:9090/orders/'+orderId)

  }
}
