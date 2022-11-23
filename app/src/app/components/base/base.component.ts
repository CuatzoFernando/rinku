import { Component, OnInit } from '@angular/core';
import { RegisterService } from 'src/app/services';
import { Routes, RouterModule, Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.css']
})
export class BaseComponent implements OnInit {

  buscar: string = ''
  ruta: string = ''
  textoBoton = 'Confirma tu Hora'
  role:number = 0

  constructor(private registerService: RegisterService, private router: Router) { }

  ngOnInit(): void {
  }

  onChangeEvent(event: any) {
    if (Object.values(event.target.value).length === 4) {
      this.registerService.check(this.buscar).subscribe((res: any) => {
        if (res.error) {
          alert('No se encontro el identificador')
        }
        if (res.ruta === 'checkin') {
          this.textoBoton = 'Confirma tu Hora de Entrada'
        } else {
          this.textoBoton = 'Confirma tu Hora de Salida'
        }
        this.ruta = res.ruta
      })
    }
    this.textoBoton = 'Confirma tu Hora'
  }

  async search() {
    this.registerService.checkin(this.buscar, this.ruta).subscribe((res: any) => {
      if (res.role === 4 && this.ruta === 'checkin') {
        this.router.navigate(['home']);
      } else {
        this.buscar = ''
        this.ruta = ''
        this.textoBoton = 'Confirma tu Hora'
      }

      if (res.response.coverShift === 1) {
        alert('Hoy tienes el Rol de Chofer');
      }

      if (res.response.coverShift === 2) {
        alert('Hoy tienes el Rol de Cargador');
      }
    })
  }

}
