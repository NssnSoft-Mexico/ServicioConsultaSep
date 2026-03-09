import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CedulaService {

  private url = 'https://cedulaprofesional.sep.gob.mx/';

  constructor(private http: HttpClient) {}

  buscarCedula(idCedula: string) {

    const query = {
      maxResult: "100",
      nombre: "",
      paterno: "",
      materno: "",
      idCedula: idCedula
    };

    const params = new HttpParams()
      .set('json', JSON.stringify(query));

    return this.http.get(this.url, { params });

  }

}