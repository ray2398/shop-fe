import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  email: string = '';
  password: string = '';
  errorEmail: string = '';
  errorPassword: string = '';
  errorLogin: string = '';

  constructor(
    private requestService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    let storageUser = localStorage.getItem('user');
    if(storageUser) {
      this.router.navigate(['/tabs/tab1']);
      return;
    }
  }

  async login() {
    try {
      this.reset();
      if (this.isValidForm()) {
        let response = await this.requestService.login({email: this.email, password: this.password}).toPromise();
        if(response.token){
          localStorage.setItem('user', JSON.stringify(response));
          this.router.navigate(['/tabs']);
        }
      }
    } catch (error: any) {
      if(error.error.text === 'PASSWORD_INCORRECT' || error.error.text === 'NOT_FOUND_USER') {
        this.errorLogin = 'Tus datos de inicio de sesión son incorrectos';
      } else {
        this.errorLogin = 'Verifica tu conexión'
      }
    }
  }

  isValidForm(): boolean {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (this.email === '') {
      this.errorEmail = 'El campo email es requerido';
      return false;
    }
    if (reg.test(this.email) === false) {
      this.errorEmail = 'El campo email no es válido';
      return false;
    }
    if (this.password === '') {
      this.errorPassword = 'El campo contraseña es requerido';
      return false;
    }
    return true;
  };

  reset(){
    this.errorEmail = '';
    this.errorPassword = '';
    this.errorLogin = '';
  }

}
