import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AppService {

   headers = new HttpHeaders();

  constructor(private http:HttpClient) {
    this.headers.append('Content-Type', 'application/json');
    this.headers.append('Accept', 'application/json');
   }

  getOrders(search: any = null) {
    return this.http.get(environment.api + '/orders?filter=' );
  }

  getProducts(search: any = null) {
    return this.http.get(environment.api + '/articles?filter=',{headers: this.headers});
  }

  getProductsById(ID: string) {
    return this.http.get(environment.api+'/articles/'+ID);
  } 

  editProducts(ID: string,item:any){
    return this.http.put(environment.api+'/articles/'+ID,item);
  } 

  addProducts(mark:any) {
    return this.http.post(environment.api+'/articles', mark)
  } 
  
  deleteProducts(ID: string) {
    return this.http.delete(environment.api+'/articles/'+ID);
  }

  getCategory(search: any = null) {
    return this.http.get(environment.api + '/categories?filter=' );
  }

  getCategoryById(ID: string) {
    return this.http.get(environment.api+'/categories/'+ID);
  } 

  editCategory(ID: string,item:any){
    return this.http.put(environment.api+'/categories/'+ID,item);
  } 

  addCategory(mark:any) {
    return this.http.post(environment.api+'/categories', mark)
  } 
  
  deleteCategory(ID: string) {
    return this.http.delete(environment.api+'/categories/' + ID);
  }

  getUsers(search: any = null) {
    return this.http.get(environment.api + '/utilisateurs?filter=');
  }

  deleteUser(ID: string) {
    return this.http.delete(environment.api+'/utilisateurs/'+ID);
  }

  addUser(mark:any) {
    return this.http.post(environment.api+'/utilisateurs', mark)
  } 

  getMessages(search: any = null) {
    return this.http.get(environment.api + '/messages?filter=');
  }
}
