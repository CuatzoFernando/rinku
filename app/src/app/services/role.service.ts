import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  httpOptions = {
    headers: new HttpHeaders({ 
      'Access-Control-Allow-Origin':'*'
    })
  };
  constructor(private http: HttpClient) { }

  allRoles():Observable<any> {
    const reso = this.http.get(`${environment.baseURL}/role`,  this.httpOptions)
    return reso
  }
}
