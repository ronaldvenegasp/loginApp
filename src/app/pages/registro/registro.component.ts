import { Component, OnInit } from '@angular/core';
import { UsuarioModel } from '../../models/usuario.model';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  usuario: UsuarioModel = new UsuarioModel();
  recordarme = false;

  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit() {
  }

  onSubmit(form: NgForm) {
    if (form.invalid) {
      return;
    }

    Swal.fire({
      allowOutsideClick: false,
      type: 'info',
      text: 'Espere por favor...'
    });
    Swal.showLoading();

    // console.log('Formulario enviado');
    // console.log(this.usuario);
    // console.log(form);

    this.auth.nuevoUsuario(this.usuario).subscribe(respuesta => {
      console.log(respuesta);
      Swal.close();
      if (this.recordarme) {
        localStorage.setItem('email', this.usuario.email);
      }
      this.router.navigateByUrl('/home');
    }, (error => {
      console.log(error.error.error.message);
      Swal.fire({
        type: 'error',
        title: 'Error al autenticar',
        text: error.error.error.message
      });
    }));
  }


}
