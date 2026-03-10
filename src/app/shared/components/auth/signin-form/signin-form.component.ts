import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AbstractControl, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { CedulaProfesional, CedulaService } from '../../../services/authService/auth.service';
import { FullCalendarModule } from '@fullcalendar/angular';
import { ModalComponent } from '../../ui/modal/modal.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-signin-form',
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    FullCalendarModule,
    ModalComponent,
    ReactiveFormsModule
],
  templateUrl: './signin-form.component.html',
  styles: ``
})
export class SigninFormComponent {

  muestraDatosCedula: boolean = false;
  resultado: any;
  isOpen = false;
  form: FormGroup;

  constructor(
    private http: HttpClient, 
    private cedulaService: CedulaService,
    private fb: FormBuilder,
  ) {
    this.form = this.fb.group({
      cedula: ['', [Validators.required]],
      nombre: ['', [Validators.required, this.letrasValidator]],
      primerApellido: ['', [Validators.required, this.letrasValidator]],
      segundoApellido: ['', [Validators.required, this.letrasValidator]],
      institucion: ['', [Validators.required, this.letrasValidator]],
      carrera: ['', [Validators.required, this.letrasValidator]],
      correo: ['', [Validators.required, Validators.email]],
      telefono: ['', [Validators.required]]
    });
  }

  ngOnInit() {
    this.form.get('cedula')?.valueChanges.subscribe(valor => {
      if (valor && valor.length > 3) { // evitar buscar con valores muy cortos
        this.cedulaService.buscarCedula(valor).subscribe({
          next: data => {
            if (data) {
              this.muestraDatosCedula = true;
              
              this.form.patchValue({
                nombre: data.nombre,
                primerApellido: data.paterno,
                segundoApellido: data.materno,
                institucion: data.institucion,
                carrera: data.carrera,
                correo: data.correo,
                telefono: data.telefono
              });
            }
          },
          error: err => {
            Swal.fire("Sin registros encontrados");
            this.muestraDatosCedula = true;
            
            this.form.patchValue({
              nombre: '',
              primerApellido: '',
              segundoApellido: '',
              institucion: '',
              carrera: '',
              correo: '',
              telefono: ''
            });
          }
        });
      }
    });
  }

  letrasValidator(control: AbstractControl): ValidationErrors | null {
    const valor = control.value;
    if (valor && !/^[a-zA-Z\s]+$/.test(valor)) {
      return { soloLetras: true };
    }
    return null;
  }

  guardarRegistros() {
    try {
        const datos: CedulaProfesional = this.form.value;

        this.cedulaService.guardarRegistro(datos)
          .subscribe({
            next: (res) => {
              Swal.fire("success", "Registro guardado correctamente")
              this.form.reset();
            },
            error: (err) => {
              Swal.fire(err.message);
            }
          });
      } catch(error) {
        console.error(error);
      }
  }

  openModal() {
    this.isOpen = true;
  }

  closeModal() {
    this.isOpen = false;
    this.form.reset();
  }

  get f() {
    return this.form.controls;
  }
}
