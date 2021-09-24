import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AppService {
 
  api = 'http://localhost:3000'

  constructor(
    private http:HttpClient
  ) { }

  login(user:any) {
    return this.http.post( this.api + '/login', user)
  }

  getCategory(search: any = null) {
    return this.http.get(this.api + '/categories?filter=' );
  }

  getCategoryId(name:any) {
    return this.http.get(this.api + '/categories/name/' + name);
  }

  getArticlesByCategs(id:any) {
    return this.http.get(this.api + '/categories/' + id + '/articles');
  }

  orderAction(user:any) {
    return this.http.post( this.api + '/orders', user)
  }

  signup(user:any) {
    return this.http.post( this.api + '/utilisateurs', user)
  }
}
