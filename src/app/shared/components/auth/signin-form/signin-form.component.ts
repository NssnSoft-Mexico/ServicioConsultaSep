import { Component } from '@angular/core';
import { LabelComponent } from '../../form/label/label.component';
import { ButtonComponent } from '../../ui/button/button.component';
import { InputFieldComponent } from '../../form/input/input-field.component';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../services/authService/auth.service';
import Swal from 'sweetalert2'
import { CommonModule } from '@angular/common';

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

  showPassword = false;
  isChecked = false;

  username = '';
  password = '';

  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit() {
    sessionStorage.removeItem('key');
    sessionStorage.removeItem('dir');
    sessionStorage.removeItem('tipoUsuario');
    sessionStorage.removeItem('nameUsuario');
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }
  
  onSignIn() {

    try {
      
      this.auth.login(this.username, this.password).subscribe({
        next: (res) => {
          sessionStorage.setItem("key", res.token);
          sessionStorage.setItem("dir", res.userData[0].distrital);
          sessionStorage.setItem("tipoUsuario", res.userData[0].tipo_usuario);
          sessionStorage.setItem("nameUsuario", res.userData[0].footer);
          this.router.navigate(['/']);
        },
        error: err => {
          if(err.error.code === 401){
            Swal.fire({
              icon: "error",
              title: "Usuario inactivo",
              text: "Por favor contacta al Administrador del Sistema",
            });
          } else if(err.error.code === 101) {
            Swal.fire({
              icon: "error",
              title: "Usuario no encontrado",
              text: "Por favor contacta al Administrador del Sistema",
            });
          }
        } 
      });

    } catch (error) {
      console.error("Error al iniciar sesión", error);
    }
  }
}
