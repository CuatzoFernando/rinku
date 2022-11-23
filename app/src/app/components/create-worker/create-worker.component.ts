import { Component, OnInit } from '@angular/core';
import { WorkerService, RoleService } from 'src/app/services';
import { IRole, IWorker } from 'src/app/interfaces';
import { Routes, RouterModule, Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-create-worker',
  templateUrl: './create-worker.component.html',
  styleUrls: ['./create-worker.component.css']
})
export class CreateWorkerComponent implements OnInit {

  id: number = 0

  singleWorker: IWorker = {}
  roles: IRole[] = []
  viewChangeCoverShift: boolean = false

  constructor(
              private workerService: WorkerService, 
              private activatedRoute: ActivatedRoute, 
              private router:Router, 
              private roleService: RoleService
  ) { }

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.params['id']
    this.changeWorker(this.id)
  }

  async changeWorker(id: number) {
    this.roleService.allRoles().subscribe((response: any) => {
      this.roles = response
    })
  }

  async save() {
    if (Object.values(this.singleWorker).length > 3) {
      this.workerService.create(this.singleWorker).subscribe((res) => {
        if (res) {
          this.router.navigate(['home']);
        }
      })
    }
  }

}
