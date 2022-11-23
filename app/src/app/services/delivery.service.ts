import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IDelivery } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class DeliveryService {
  httpOptions = {
    headers: new HttpHeaders({ 
      'Access-Control-Allow-Origin':'*'
    })
  };
  
  constructor(private http: HttpClient) { }

  postDelivery(item: IDelivery) {
    return this.http.post(`${environment.baseURL}/delivery`, item);
  }

}
