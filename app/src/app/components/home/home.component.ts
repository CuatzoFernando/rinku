import { Component, OnInit } from '@angular/core';
import { WorkerService } from './../../services'
import { IWorker } from 'src/app/interfaces';
import { Routes, RouterModule, Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  workers: IWorker[] = []
  
  constructor(private workerService: WorkerService, private router:Router) { }

  ngOnInit(): void {
    this.returnAllWorker()
  }  

  async returnAllWorker () {
    this.workerService.allWorkers().subscribe((resultado) =>{
      const result: IWorker[] = resultado as IWorker[]
      for (const item of result) {

        /// rol al que pertenece

        if (item.roleID === 1) {
          item.roleID = 'Chofer'
        }

        if (item.roleID === 2) {
          item.roleID = "Cargador"
        }

        if (item.roleID == 3) {
          item.roleID = 'Auxiliar'
        }

        if (item.roleID == 4) {
          item.roleID = 'Administrador'
        }

        this.workers.push(item)
      }
    })
  }

  async deleteWorker (id: any) {
    this.workerService.delete(id)
  }

  async detailWorker (id: any) {
    this.router.navigate([`detalle/${id}`]);
  }

  async createWorker() {
    this.router.navigate(['create']);
  }

}
