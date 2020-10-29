import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UsuarioModel } from '../../models/usuario.model';
import { AuthService } from '../../services/auth.service';
import swal from 'sweetalert';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  usuario: UsuarioModel;

  constructor(private auth: AuthService,
              private router: Router) { }

  ngOnInit() {
    this.usuario = new UsuarioModel();
  }


  onSubmit(form: NgForm ) {
    if (form.invalid) { return; }

    swal({
      button: false,
      icon: 'info',
      text: 'Espere por favor...',
      closeOnClickOutside: false,
    });

    this.auth.nuevousuario(this.usuario)
    .subscribe(resp => {
      console.log(resp);
      swal.close();
      this.router.navigateByUrl('/home');
    }, (err) => {
      console.log(err.error.error.message);
      swal({
        icon: 'error',
        title: 'Error al registrar',
        text: err.error.error.message
      });
    });
  }

}
