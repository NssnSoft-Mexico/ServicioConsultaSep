import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../enviroment/enviroment';
import { catchError, Observable, throwError } from 'rxjs';

export interface CedulaProfesional {
  id?: number;
  cedula: string;
  nombre: string;
  paterno: string;
  materno: string;
  institucion: string;
  carrera: string;
  correo: string;
  telefono: string;
}

@Injectable({
  providedIn: 'root'
})
export class CedulaService {

  private apiUrl = `${environment.apiUrl}`;
  
  constructor(private http: HttpClient) {}

  buscarCedula(cedula: string): Observable<CedulaProfesional> {
    return this.http.get<CedulaProfesional>(`${this.apiUrl}cedulas/${cedula}`)
      .pipe(
        catchError(this.handleError)
      );
  }

  guardarRegistro(cedula: CedulaProfesional): Observable<CedulaProfesional> {
    return this.http.post<CedulaProfesional>(this.apiUrl + 'cedulas', cedula)
      .pipe(
        catchError(this.handleError)
      );
  }

  obteneRegistros(): Observable<CedulaProfesional[]> {
    return this.http.get<CedulaProfesional[]>(this.apiUrl + 'cedulas')
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse) {
    let mensaje = 'Ocurrió un error inesperado';
    if (error.error?.mensaje) {
      mensaje = error.error.mensaje;
    } else if (error.status === 0) {
      mensaje = 'No se pudo conectar con el servidor';
    }
    return throwError(() => new Error(mensaje));
  }

}