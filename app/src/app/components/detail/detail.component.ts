import { Component, OnInit } from '@angular/core';
import { WorkerService, RoleService } from 'src/app/services';
import { IRole, IWorker } from 'src/app/interfaces';
import { Routes, RouterModule, Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {

  id: number = 0

  singleWorker: IWorker = {}
  roles: IRole[] = []
  viewChangeCoverShift: boolean = false

  /// vistas 
  viewButtons: boolean = true
  viewButtonSave: boolean = false


  ///
  viewChangeRol: boolean = true
  viewStateRol: boolean = true
  viewChangeTempRol: boolean = true
  viewGeneralData: boolean = true

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
        this.workerService.singleWorker(id).subscribe((res: any) => {
          if (res.roleID === 3) {
            this.viewChangeCoverShift = true
          }
          
          this.singleWorker = res
        })
    })
  }

  async save() {
    this.viewButtonSave = false
    this.viewButtons = true
  }

  async edit() {
    this.viewButtonSave = true
    this.viewButtons = false
  }

  async changeRol(){
    this.viewButtonSave = true
    this.viewButtons = false
    this.viewChangeRol = false
  }

  async changeState () {
    this.viewButtonSave = true
    this.viewButtons = false
    this.viewStateRol = false
  }

  async changeRoltemporaly () {
    this.viewButtonSave = true
    this.viewButtons = false
    this.viewChangeTempRol = false
  }

  async viewPayroll () {
    this.router.navigate([`payroll/${this.id}`]);
  }

}
