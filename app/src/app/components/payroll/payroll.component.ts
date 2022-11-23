import { Component, OnInit } from '@angular/core';
import { WorkerService, RoleService } from 'src/app/services';
import { IRole, IWorker } from 'src/app/interfaces';
import { Routes, RouterModule, Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-payroll',
  templateUrl: './payroll.component.html',
  styleUrls: ['./payroll.component.css']
})
export class PayrollComponent implements OnInit {

  id: number = 0

  singleWorker: IWorker = {}
  payroll: any[] = []

  constructor(
    private workerService: WorkerService, 
              private activatedRoute: ActivatedRoute, 
              private router:Router, 
              private roleService: RoleService
  ) { }

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.params['id']
    this.workerService.singleWorker(this.id).subscribe((res: any) => {     
      this.singleWorker = res
      if (res) {
        res.dateValue = new Date()
        this.workerService.payroll(res).subscribe((data) => {
          this.payroll.push(data)
        })
      }
    })

    console.log(this.payroll)
  }

}
