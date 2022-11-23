import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IWorker } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class WorkerService {

  httpOptions = {
    headers: new HttpHeaders({ 
      'Access-Control-Allow-Origin':'*'
    })
  };

  constructor(private http: HttpClient) { }

  create(item: IWorker) {
    return this.http.post(`${environment.baseURL}/worker`, {...item}, this.httpOptions);
  }

  update(item: IWorker) {
    return this.http.put(`${environment.baseURL}/worker`, {...item}, this.httpOptions);
  }

  delete(item: number) {
    return this.http.post(`${environment.baseURL}/worker/delete`, {item}, this.httpOptions).subscribe((res) => {
      console.log('respuesta', res)
    })
  }

  singleWorker(item: number) {
    return this.http.get(`${environment.baseURL}/worker/${item}`, this.httpOptions);
  }

  allWorkers():Observable<any> {
    const reso = this.http.get(`${environment.baseURL}/worker`,  this.httpOptions)
    return reso
  }

  payroll(item: any):Observable<any> {
    const res = this.http.post(`${environment.baseURL}/worker/payroll`, {...item}, this.httpOptions)
    return res
  }
}
