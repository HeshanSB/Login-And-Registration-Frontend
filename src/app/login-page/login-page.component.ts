import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

import {LoginPageService} from './login-page.service'
import {Response} from '../Response';
import { Login } from './login';
@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

  loginForm : FormGroup
  isFormSubmitted: boolean = false;
  login = new Login();
  response:Response;

  constructor(private formBuilder: FormBuilder,
      private loginService: LoginPageService,
      private router: Router,) { }

  ngOnInit() {

    this.loginForm = this.formBuilder.group({
      username: this.formBuilder.control(null, [Validators.required, Validators.email]),
      password: this.formBuilder.control(null, [Validators.required]),
    });
  }

  onSubmit(){
    if(this.loginForm.valid){
      this.login = this.loginForm.value;
        this.loginService.loginUser(this.login).subscribe(
          res=>{
            this.response = res;
            if(this.response.responseCode == "00"){
              localStorage.setItem("token", this.response.responseMsg);
              this.loginHome();
            }
            else if(this.response.responseMsg == "Bad credential"){
              Swal.fire({
                title: 'Login Falied!',
                text: 'Username or Password Incorrect',
                icon: 'error',
              })
            }
            else{
              Swal.fire({
                title: 'Falied!',
                text: 'Login Failed',
                icon: 'error',
              })
            } 
          }
        )
      }
    else{
      this.isFormSubmitted = true;
    }
  }

  get username() {
    return this.loginForm.get('username');
  }
  get password() {
    return this.loginForm.get('password');
  }

  loginHome() {
    this.router.navigate(["home"]);
  }

}
