import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IWorker } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  httpOptions = {
    headers: new HttpHeaders({ 
      'Access-Control-Allow-Origin':'*'
    })
  };

  constructor(private http: HttpClient) { }

  checkin(item: string, ruta: string) {
    return this.http.post(`${environment.baseURL}/register/${ruta}`, {
      identificator: item
    }, this.httpOptions);
  }

  check(item: string) {
    return this.http.post(`${environment.baseURL}/register/verify`, {
      identificator: item
    }, this.httpOptions);
  }

}
