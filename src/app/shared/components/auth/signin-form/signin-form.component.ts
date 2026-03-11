import { Component, EventEmitter, Output } from '@angular/core';
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
  mostarTabla: boolean = false;
  form: FormGroup;
  modalForm: FormGroup;
  datosModal: CedulaProfesional | null = null;

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

    this.modalForm = this.fb.group ({
      nombre: [''],
      primerApellido: [''],
      segundoApellido: [''],
      institucion: [''],
      carrera: [''],
      correo: [''],
      telefono: ['']
    });
  }

  ngOnInit() {

    // this.getDatosCedula();
    this.form.get('cedula')?.valueChanges.subscribe(valor => {
      if (valor && valor.length > 3) { 
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
            Swal.fire({
              title: "Sin registros encontrados!",
              icon: "error",
              draggable: true
            });
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

  getDatosCedula() {
    this.cedulaService.obteneRegistros().subscribe({
      next: data => {
        this.resultado = data;
        // console.log(data)
      },
      error: err => {
        Swal.fire({
          title: "Error al obtener los registros!",
          text: err.message,
          icon: "error",
          draggable: true
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
  
  soloLetras(event: KeyboardEvent) {
    const char = event.key;
    const regex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]$/;
  
    if (!regex.test(char)) {
      event.preventDefault();
    }
  }

  guardarRegistros() {
    try {
        const datos: CedulaProfesional = this.form.value;

        this.cedulaService.guardarRegistro(datos)
          .subscribe({
            next: (res) => {
              Swal.fire({
                text: "Esta seguro de guardar los registros!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Registrar",
                cancelButtonText: "Cancelar"
              }).then((result) => {
                if (result.isConfirmed) {
                  Swal.fire({
                    text: "Datos de cedula guardados correctamente.",
                    icon: "success"
                  });

                  this.datosModal = datos;
                  this.openModal();
                  this.form.reset();
                  this.muestraDatosCedula = false;
                  this.mostarTabla = true;
                }
              });             
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
    this.muestraDatosCedula = false;
    this.isOpen = false;
    this.form.reset();
    this.getDatosCedula();
    this.mostarTabla = true;
  }

  get f() {
    return this.form.controls;
  }
}
