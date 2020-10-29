import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UsuarioModel } from '../../models/usuario.model';
import { AuthService } from '../../services/auth.service';
import swal from 'sweetalert';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  usuario: UsuarioModel = new UsuarioModel();

  constructor(private auth: AuthService,
              private router: Router) { }

  ngOnInit() {
  }

  login(form: NgForm){
    if (form.invalid) { return; }

    swal({
      button: false,
      icon: 'info',
      text: 'Espere por favor...',
      closeOnClickOutside: false,
    });

    this.auth.login(this.usuario)
    .subscribe(resp => {
      console.log(resp);
      swal.close();
      this.router.navigateByUrl('/home');
    }, (err) => {
      console.log(err.error.error.message);
      swal({
        icon: 'error',
        title: 'Error al autenticar',
        text: err.error.error.message,
        
        //timer: 3000,
      });
    });
  }

}
