import { ComponentCardComponent } from '../../common/component-card/component-card.component';
import { AuthService } from '../../../services/authService/auth.service';
import { HttpClient } from '@angular/common/http';
import { ButtonComponent } from '../../ui/button/button.component';
import { CommonModule } from '@angular/common';
import { saveAs } from 'file-saver';
import PizZip from 'pizzip';
import Docxtemplater from 'docxtemplater';
import Swal from 'sweetalert2';
import { Component } from '@angular/core';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatSelectModule } from '@angular/material/select';
import { MatTimepickerModule } from '@angular/material/timepicker';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { FormsModule } from '@angular/forms';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { CustomDateAdapter } from './custom-date-format';
import { MatNativeDateModule } from '@angular/material/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

export const MY_DATE_FORMATS = {
  parse: {
    dateInput: 'DD/MM/YYYY',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MMMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};
@Component({
  selector: 'app-ecommerce-metrics',
  imports: [
    ComponentCardComponent,
    ButtonComponent,
    MatFormFieldModule,
    CommonModule,
    MatSelectModule,
    MatFormFieldModule,
    MatCardModule,
    MatDatepickerModule,
    MatInputModule,
    MatFormFieldModule,
    MatTableModule,
    MatSelectModule,
    FormsModule,
    MatPaginatorModule,
    MatButtonModule,
    MatProgressBarModule,
    MatChipsModule,
    MatTimepickerModule,
    CommonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './ecommerce-metrics.component.html',
  providers: [ 
    { provide: DateAdapter, useClass: CustomDateAdapter },
    { provide: MAT_DATE_FORMATS, useValue: MAT_DATE_FORMATS },
      { provide: MAT_DATE_LOCALE, useValue: 'es-ES' },
    { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS }]
})
export class EcommerceMetricsComponent {

  dataSource: any[] = [];
  value!: Date;
  selectedUnidad: number | null = null;
  idDistrital = sessionStorage.getItem('dir') || '0';
  tokenSesion = sessionStorage.getItem('key') || '0';
  fechaSeleccionada : Date | null = null;
  horaSeleccionada: string = '';
  horaSeleccionadas: string = '';
  
  registrosC!: number;
  dt!: number;
  anioSeleccionado!: string;

  registroEnEdicion: any = null;
  dataReport: any[] = [];
  opcionesHoras: string[] = [];
  unidades: any[] = [];
  registros: any[] = [];
  
  selectedDistrito: boolean = false;
  existDataSame: boolean = false;
  modoEdicion: boolean = false;
  actualiza: boolean = false;
  sinRegistros: boolean = false;
  territorioSelected!: boolean;
  datosRegistros!: boolean;
  loading = false;
  
  dataUpdate: any;
  distritoChange: any;
  utChange: any;
  minFecha = new Date(2026, 2, 20);
  maxFecha = new Date(2026, 2, 30);

  constructor(private http: HttpClient, private service: AuthService) {}

  timeValue = '';

  public icons = {
    groupIcon:`<svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="text-gray-800 size-6 dark:text-white/90"><path fill-rule="evenodd" clip-rule="evenodd" d="M8.80443 5.60156C7.59109 5.60156 6.60749 6.58517 6.60749 7.79851C6.60749 9.01185 7.59109 9.99545 8.80443 9.99545C10.0178 9.99545 11.0014 9.01185 11.0014 7.79851C11.0014 6.58517 10.0178 5.60156 8.80443 5.60156ZM5.10749 7.79851C5.10749 5.75674 6.76267 4.10156 8.80443 4.10156C10.8462 4.10156 12.5014 5.75674 12.5014 7.79851C12.5014 9.84027 10.8462 11.4955 8.80443 11.4955C6.76267 11.4955 5.10749 9.84027 5.10749 7.79851ZM4.86252 15.3208C4.08769 16.0881 3.70377 17.0608 3.51705 17.8611C3.48384 18.0034 3.5211 18.1175 3.60712 18.2112C3.70161 18.3141 3.86659 18.3987 4.07591 18.3987H13.4249C13.6343 18.3987 13.7992 18.3141 13.8937 18.2112C13.9797 18.1175 14.017 18.0034 13.9838 17.8611C13.7971 17.0608 13.4132 16.0881 12.6383 15.3208C11.8821 14.572 10.6899 13.955 8.75042 13.955C6.81096 13.955 5.61877 14.572 4.86252 15.3208ZM3.8071 14.2549C4.87163 13.2009 6.45602 12.455 8.75042 12.455C11.0448 12.455 12.6292 13.2009 13.6937 14.2549C14.7397 15.2906 15.2207 16.5607 15.4446 17.5202C15.7658 18.8971 14.6071 19.8987 13.4249 19.8987H4.07591C2.89369 19.8987 1.73504 18.8971 2.05628 17.5202C2.28015 16.5607 2.76117 15.2906 3.8071 14.2549ZM15.3042 11.4955C14.4702 11.4955 13.7006 11.2193 13.0821 10.7533C13.3742 10.3314 13.6054 9.86419 13.7632 9.36432C14.1597 9.75463 14.7039 9.99545 15.3042 9.99545C16.5176 9.99545 17.5012 9.01185 17.5012 7.79851C17.5012 6.58517 16.5176 5.60156 15.3042 5.60156C14.7039 5.60156 14.1597 5.84239 13.7632 6.23271C13.6054 5.73284 13.3741 5.26561 13.082 4.84371C13.7006 4.37777 14.4702 4.10156 15.3042 4.10156C17.346 4.10156 19.0012 5.75674 19.0012 7.79851C19.0012 9.84027 17.346 11.4955 15.3042 11.4955ZM19.9248 19.8987H16.3901C16.7014 19.4736 16.9159 18.969 16.9827 18.3987H19.9248C20.1341 18.3987 20.2991 18.3141 20.3936 18.2112C20.4796 18.1175 20.5169 18.0034 20.4837 17.861C20.2969 17.0607 19.913 16.088 19.1382 15.3208C18.4047 14.5945 17.261 13.9921 15.4231 13.9566C15.2232 13.6945 14.9995 13.437 14.7491 13.1891C14.5144 12.9566 14.262 12.7384 13.9916 12.5362C14.3853 12.4831 14.8044 12.4549 15.2503 12.4549C17.5447 12.4549 19.1291 13.2008 20.1936 14.2549C21.2395 15.2906 21.7206 16.5607 21.9444 17.5202C22.2657 18.8971 21.107 19.8987 19.9248 19.8987Z" fill="currentColor"></path></svg>`,
    arrowUpIcon:`<svg class="fill-current" width="1em" height="1em" viewBox="0 0 13 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M6.06462 1.62393C6.20193 1.47072 6.40135 1.37432 6.62329 1.37432C6.6236 1.37432 6.62391 1.37432 6.62422 1.37432C6.81631 1.37415 7.00845 1.44731 7.15505 1.5938L10.1551 4.5918C10.4481 4.88459 10.4483 5.35946 10.1555 5.65246C9.86273 5.94546 9.38785 5.94562 9.09486 5.65283L7.37329 3.93247L7.37329 10.125C7.37329 10.5392 7.03751 10.875 6.62329 10.875C6.20908 10.875 5.87329 10.5392 5.87329 10.125L5.87329 3.93578L4.15516 5.65281C3.86218 5.94561 3.3873 5.94546 3.0945 5.65248C2.8017 5.35949 2.80185 4.88462 3.09484 4.59182L6.06462 1.62393Z" fill=""></path></svg>`,
    boxIconLine:`<svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="text-gray-800 size-6 dark:text-white/90"><path fill-rule="evenodd" clip-rule="evenodd" d="M11.665 3.75621C11.8762 3.65064 12.1247 3.65064 12.3358 3.75621L18.7807 6.97856L12.3358 10.2009C12.1247 10.3065 11.8762 10.3065 11.665 10.2009L5.22014 6.97856L11.665 3.75621ZM4.29297 8.19203V16.0946C4.29297 16.3787 4.45347 16.6384 4.70757 16.7654L11.25 20.0366V11.6513C11.1631 11.6205 11.0777 11.5843 10.9942 11.5426L4.29297 8.19203ZM12.75 20.037L19.2933 16.7654C19.5474 16.6384 19.7079 16.3787 19.7079 16.0946V8.19202L13.0066 11.5426C12.9229 11.5844 12.8372 11.6208 12.75 11.6516V20.037ZM13.0066 2.41456C12.3732 2.09786 11.6277 2.09786 10.9942 2.41456L4.03676 5.89319C3.27449 6.27432 2.79297 7.05342 2.79297 7.90566V16.0946C2.79297 16.9469 3.27448 17.726 4.03676 18.1071L10.9942 21.5857L11.3296 20.9149L10.9942 21.5857C11.6277 21.9024 12.3732 21.9024 13.0066 21.5857L19.9641 18.1071C20.7264 17.726 21.2079 16.9469 21.2079 16.0946V7.90566C21.2079 7.05342 20.7264 6.27432 19.9641 5.89319L13.0066 2.41456Z" fill="currentColor"></path></svg>`,
    arrowDownIcon:`<svg class="fill-current" width="1em" height="1em" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M5.31462 10.3761C5.45194 10.5293 5.65136 10.6257 5.87329 10.6257C5.8736 10.6257 5.8739 10.6257 5.87421 10.6257C6.0663 10.6259 6.25845 10.5527 6.40505 10.4062L9.40514 7.4082C9.69814 7.11541 9.69831 6.64054 9.40552 6.34754C9.11273 6.05454 8.63785 6.05438 8.34486 6.34717L6.62329 8.06753L6.62329 1.875C6.62329 1.46079 6.28751 1.125 5.87329 1.125C5.45908 1.125 5.12329 1.46079 5.12329 1.875L5.12329 8.06422L3.40516 6.34719C3.11218 6.05439 2.6373 6.05454 2.3445 6.34752C2.0517 6.64051 2.05185 7.11538 2.34484 7.40818L5.31462 10.3761Z" fill=""></path></svg>`
  }

  options: any[] = [];
  currentPage = 1;
  itemsPerPage = 5;

  handleDateChange(event: any) {
    console.log('Selected date:', event.dateStr);
    this.fechaSeleccionada = event.dateStr;
  }

  onTimeSelected(time: string) {
    console.log('Picked time:', time);

    this.horaSeleccionada = time;
  }

  get totalPages(): number {
    return Math.ceil(this.dataSource.length / this.itemsPerPage);
  }

  get currentItems(): any[] {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    return this.dataSource.slice(start, start + this.itemsPerPage);
  }

  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }

  ngOnInit(): void {

    this.generarOpcionesHoras('08:00', '23:55', 5)

    this.service.catUnidad(parseInt(this.idDistrital), this.tokenSesion).subscribe({
      next: (data) => {
        this.unidades = data.catUnidad;
      }, error: (err) => {
        
        if(err.error.code === 160) {
         this.service.cerrarSesionByToken();
        }
        
      }
    });

    this.getDataService(parseInt(this.idDistrital));
  }
  
  fechaValida = (d: Date | null): boolean => {
    if (!d) return false;
    return d >= this.minFecha && d <= this.maxFecha;
  }

  blockMonthNavigation(event: any) {
    setTimeout(() => {
      const calendar = document.querySelector('.mat-calendar');
      if (calendar) {
        const prevButton = calendar.querySelector('.mat-calendar-previous-button') as HTMLButtonElement;
        const nextButton = calendar.querySelector('.mat-calendar-next-button') as HTMLButtonElement;

        if (prevButton) prevButton.disabled = true;
        if (nextButton) nextButton.disabled = true;
      }
    }, 0);
  }

  validaHora() {
    if (!this.fechaSeleccionada) {
      this.existDataSame = false;
      return;
    }

    const fechaSeleccionadaStr = this.extractFecha(this.fechaSeleccionada);
    const anioSel = Number(this.anioSeleccionado);
    
    this.existDataSame = this.dataSource.some((element: any) => {

      const mismoAnio = Number(element.anio) === anioSel;
      
      if (!mismoAnio) {
        return false;
      }

      const horaProcesada = this.extraerHoraUTCToGetData(element.hora);
      const fechaProcesada = this.extractFecha(element.fecha);
      
      return (
        horaProcesada === this.horaSeleccionada &&
        fechaProcesada === fechaSeleccionadaStr
      );    
    });
  }

  generarOpcionesHoras(inicio: string, fin: string, intervaloMin: number) {
    const [hInicio, mInicio] = inicio.split(':').map(Number);
    const [hFin, mFin] = fin.split(':').map(Number);

    const start = hInicio * 60 + mInicio;
    const end = hFin * 60 + mFin;

    for (let min = start; min <= end; min += intervaloMin) {
      const horas = String(Math.floor(min / 60)).padStart(2, '0');
      const minutos = String(min % 60).padStart(2, '0');
      this.opcionesHoras.push(`${horas}:${minutos}`);
    }
  }

  getDataService(claveIUt: number) {
    this.service.getRegistros(claveIUt, this.tokenSesion).subscribe({
      next: (data) => {
        this.dataSource = data.registrosCalendario ?? [];
        this.sinRegistros = false;
        this.datosRegistros = this.dataSource.some(d => this.registrosC === d.ut[0]);
      }, error: (err) => {
         if (err.error.code === 100) {
          this.sinRegistros = true;
          this.dataSource = [];
          this.datosRegistros = false;
        } else {

          if(err.error.code === 160) {
            this.service.cerrarSesionByToken();
          }

        }
      }
    })
  }

  guardaData() {

    if(this.actualiza) {
      this.actualizaData();
    } else {

      if(!this.fechaSeleccionada || !this.horaSeleccionada || !this.anioSeleccionado || !this.registrosC || !this.dt) {
        Swal.fire({
          title: "Datos incompletos, por favor verifique",
          icon: "warning"
        });
        return;
      }

    const dataRegistro = {
      dt: this.dt,
      ut: this.registrosC,
      distrito: sessionStorage.getItem('dir'),
      fecha: this.fechaSeleccionada,
      hora: this.horaSeleccionada,
      anio: Number(this.anioSeleccionado)
    }

    this.loading = true;

    setTimeout(() => {
      this.loading = false;

      Swal.fire({
      title: "¿Está seguro de guardar esta programación?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Aceptar",
      cancelButtonText: "Cancelar",

    }).then((result) => {
      if (result.isConfirmed) {
        this.loading = false;
        this.validaHora();

        if(this.existDataSame) {
          Swal.fire( "Se encuentra registros con la misma hora, por favor verifique", "", "warning");
        } else {
          this.service.guardaRegistros(dataRegistro, this.tokenSesion).subscribe({
            next: (data) => {  
                  Swal.fire({
                    title: "Creación de la programación con éxito",
                    icon: "success"
                  });

                  this.service.getRegistros(parseInt(this.idDistrital), this.tokenSesion).subscribe({
                    next: (data) => {
                      this.loading = false;
                      this.dataSource = data.registrosCalendario ?? [];
                      this.datosRegistros = this.dataSource.some(d => this.registrosC === d.ut[0]);
                      this.fechaSeleccionada = null;
                      this.horaSeleccionada = '';
                      this.anioSeleccionado = '';

                      this.selectedUnidad = null;
                      this.territorioSelected = false;
                      this.registrosC = undefined as any;
                      this.dt = undefined as any;
                    },
                    error: (err) => {
                      if (err.error.code === 100) {
                        this.dataSource = [];
                        this.datosRegistros = false;
                      } else {

                        if(err.error.code === 160) {
                          this.service.cerrarSesionByToken();
                        }

                      }
                    }
                  });
                }, error: (err) => {
                Swal.fire({
                  title: "Error al crear la programación",
                  icon: "warning"
                });

                if(err.error.code === 160) {
                  this.service.cerrarSesionByToken();
                }
              }
          });
        }
      } else {
        Swal.fire({
          title: "No se creo la programación",
          icon: "warning"
        });
      }
    });
    }, 2000);
    }
  }

  extraerHoraUTC(iso: string): string {
    const date = new Date(iso);
    let hours = date.getUTCHours();
    const minutes = date.getUTCMinutes().toString().padStart(2, '0');
    const formattedHours = hours.toString().padStart(2, '0');
    const hrs = "Hrs";

    return `${formattedHours}:${minutes} ${hrs}`;
  }
  
  extraerHoraUTCToGetData(iso: string): string {
    const date = new Date(iso);
    let hours = date.getUTCHours();
    const minutes = date.getUTCMinutes().toString().padStart(2, '0');
    const formattedHours = hours.toString().padStart(2, '0');
    const hrs = "Hrs";

    return `${formattedHours}:${minutes}`;
  }

  extractFecha(fecha: Date) {
    const date = new Date(fecha);
    const day = String(date.getUTCDate()).padStart(2, '0');
    const month = String(date.getUTCMonth() + 1).padStart(2, '0');
    const year = date.getUTCFullYear();

    return `${day}/${month}/${year}`;
  }

  async generaDocumento() {

    this.loading = true;
    const primerRegistro = this.dataSource[0];

    const datos = {
      distrito: primerRegistro?.distrito ?? '',
      domicilio: primerRegistro?.domicilio ?? '',
      sod: primerRegistro?.sod ?? '',
      tod: primerRegistro?.tod ?? '',
      productos: this.dataSource.map((item, index) => ({
        id: index + 1,
        dt: item.dt[1],
        clave: item.ut[0],
        ut: item.ut[1],
        fecha: this.extractFecha(item.fecha),
        hora: this.extraerHoraUTC(item.hora),
        anio: item.anio
      }))
    };

    const templateBob = await this.http
      .get('assets/Anexo-Invitacion.docx', { responseType: 'arraybuffer' })
      .toPromise();

      if (!templateBob) {
        throw new Error("No se pudo cargar el Documento");
      }

      const zip = new PizZip(templateBob);
      const doc = new Docxtemplater(zip, { 
        paragraphLoop: true,
        linebreaks: true,
        delimiters: { start: '[[', end: ']]' }
      });

      doc.setData(datos);

      try{
        doc.render();
      } catch (error) {
        console.error('Error al cargar archivo', error);
        return;
      } 

      const output = doc.getZip().generate({ type: 'blob' });
      saveAs(output, 'Anexo Calendario.docx');
      this.loading = false;
  }

  eliminarElemento(element: any) {

    Swal.fire({
      title: "¿Está seguro de eliminar esta programación?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Aceptar",
    }).then((result) => {
      if (result.isConfirmed) {
        this.service.delRegistros(element.ut[0], this.tokenSesion).subscribe({
          next: (data) => {
            Swal.fire({
              title: "Eliminación de la programación con éxito",
              icon: "success"
            });

             this.service.getRegistros(parseInt(this.idDistrital), this.tokenSesion).subscribe({
                next: (data) => {
                  this.sinRegistros = false;
                  this.dataSource = data.registrosCalendario ?? [];
                  this.datosRegistros = this.dataSource.some(d => this.registrosC === d.ut[0]);
                },
                error: (err) => {

                  if (err.error.code === 100) {
                    this.sinRegistros = true;
                    this.dataSource = [];
                    this.datosRegistros = false;
                  } else {

                    if(err.error.code === 160) {
                      this.service.cerrarSesionByToken();
                    }

                  }
                }
              });
              
          }, error: (err) => {
             Swal.fire({
              title: "Error al eliminar la programación",
              icon: "warning"
            });
          }
        });
      }
    });
  }

  onDistritoChange(idDistrito: any) {
    this.actualiza = false;
    this.territorioSelected = true;
    // let idD = idDistrito.clave_ut;
    this.registrosC = idDistrito.clave_ut;
    this.dt = idDistrito.idDt;
    // this.dataReport = [];
    // this.selectedDistrito = true;
    this.fechaSeleccionada = null;
    this.horaSeleccionada = '';
    // this.datosRegistros = this.dataSource.data.some(d => this.registrosC === d.ut[0]);
    this.sinRegistros = false;
  }

  actualizaData() {

    const data = { 
      distrito: this.distritoChange,
      hora: this.horaSeleccionada,
      ut: this.utChange,
      fecha: this.fechaSeleccionada,
      anio: this.anioSeleccionado
    };

     Swal.fire({
      title: "¿Está seguro de actualizar esta programación?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Aceptar",
      cancelButtonText: "Cancelar",

    }).then((result) => {
      if (result.isConfirmed) {
        this.loading = false;

        this.validaHora();

        if(this.existDataSame) {
          Swal.fire( "Se encuentra registros con la misma hora, por favor verifique", "", "warning");
        } else {
          this.service.actualizaRegistros(data, this.tokenSesion).subscribe({
            next: (data) => {  
                Swal.fire({
                  title: "Actualización de la programación con éxito",
                  icon: "success"
                });

                this.service.getRegistros(parseInt(this.idDistrital), this.tokenSesion).subscribe({
                  next: (data) => {
                    this.dataSource = data.registrosCalendario ?? [];
                    this.datosRegistros = this.dataSource.some(d => this.registrosC === d.ut[0]);
                    this.fechaSeleccionada = null;
                    this.horaSeleccionada = '';
                    this.anioSeleccionado = '';
                  },
                  error: (err) => {

                    if(err.error.code === 160) {
                      this.service.cerrarSesionByToken();
                    }

                    if (err.error.code === 100) {
                      this.dataSource = [];
                      this.datosRegistros = false;
                    }

                  }
                });
              }, error: (err) => {
              Swal.fire({
                title: "Error al actualizar la programación con éxito",
                icon: "warning"
              });
            }
          });
        }
      } else {
        Swal.fire({
          title: "Error al actualizar la programación",
          icon: "warning"
        });
      }
    });
  }

  editarElemento(element: any) {
    const fecha = new Date(element.fecha);
    const fechaCorrecta = new Date(
      fecha.getUTCFullYear(),
      fecha.getUTCMonth(),
      fecha.getUTCDate()
    );
    const anio = element.anio;
    const hora = new Date(element.hora);
    this.fechaSeleccionada = fechaCorrecta;
    this.anioSeleccionado = anio;
    this.horaSeleccionada = hora.toISOString().substring(11, 16);
    this.distritoChange = element.distrito;
    this.utChange = element.ut[0];
    this.actualiza = true;
    this.territorioSelected = true;
    this.datosRegistros = false;
    this.selectedUnidad = this.unidades.find(ut => ut.clave_ut === element.ut[0]);
  }
}
