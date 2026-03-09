import { Component } from '@angular/core';
import { LabelComponent } from '../../form/label/label.component';
import { ButtonComponent } from '../../ui/button/button.component';
import { InputFieldComponent } from '../../form/input/input-field.component';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { CedulaService } from '../../../services/authService/auth.service';

@Component({
  selector: 'app-signin-form',
  imports: [
    CommonModule,
    LabelComponent,
    ButtonComponent,
    InputFieldComponent,
    RouterModule,
    FormsModule
],
  templateUrl: './signin-form.component.html',
  styles: ``
})
export class SigninFormComponent {

  muestraDatosCedula: boolean = false;
  cedula = '';
  resultado: any;

  constructor(private http: HttpClient, private cedulaService: CedulaService) {}
  
  changeCedula(cedulaValor: any) {
    console.log('El texto cambió a:', cedulaValor);
    this.buscarCedula(cedulaValor)
    // Ejecutar tu método aquí
  }

  buscarCedula(cedulaParameter: string) {

    try {

      this.cedulaService.buscarCedula(cedulaParameter)
        .subscribe({
          next: (resp) => {
            this.resultado = resp;
            console.log(resp);

            this.muestraDatosCedula = true;
          },
          error: (err) => {
            this.muestraDatosCedula = true;
            console.error(err);
          }
        });
      } catch(error) {
        console.log(error)
      }
  }

  guardaRegistros() {
    
  }
}
