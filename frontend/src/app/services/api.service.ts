import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private URL = `http://127.0.0.1:3000/api`

  constructor(private http: HttpClient) { }

  submitContact(userParams: unknown) {
    return this.http.post(this.URL + '/users/register', userParams)
  }

  getCategories(): Observable<Object>;
  getCategories(categorieId: number): Observable<Object>

  getCategories(categorieId?: number): Observable<Object> {
    if (typeof categorieId === 'undefined') return this.http.get(this.URL + '/categories/get');
    return this.http.get(this.URL + '/categories/get/' + categorieId)
  }

}
