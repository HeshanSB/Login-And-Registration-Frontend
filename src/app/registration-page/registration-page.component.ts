import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import Swal from 'sweetalert2';

import {RegistrationPageService} from './registration-page.service';
import {Registration} from './registration';
import {Response} from '../Response';

@Component({
  selector: 'app-registration-page',
  templateUrl: './registration-page.component.html',
  styleUrls: ['./registration-page.component.css']
})
export class RegistrationPageComponent implements OnInit {

  registrationForm: FormGroup;
  isFormSubmitted: boolean = false;
  registration = new Registration();
  response: Response;
  countryList = ["Afghanistan","Albania","Algeria","American Samoa","Andorra","Angola","Anguilla","Antarctica",
    "Antigua and Barbuda","Argentina","Armenia","Aruba","Australia","Austria","Azerbaijan","Bahamas (the)","Bahrain",
    "Bangladesh","Barbados","Belarus","Belgium","Belize","Benin","Bermuda","Bhutan","Bolivia (Plurinational State of)",
    "Bonaire, Sint Eustatius and Saba","Bosnia and Herzegovina","Botswana","Bouvet Island","Brazil","British Indian Ocean Territory (the)",
    "Brunei Darussalam","Bulgaria","Burkina Faso","Burundi","Cabo Verde","Cambodia","Cameroon","Canada","Cayman Islands (the)",
    "Central African Republic (the)","Chad","Chile","China","Christmas Island","Cocos (Keeling) Islands (the)",
    "Colombia","Comoros (the)","Congo (the Democratic Republic of the)","Congo (the)","Cook Islands (the)","Costa Rica",
    "Croatia","Cuba","Curaçao","Cyprus","Czechia","Côte d'Ivoire","Denmark","Djibouti","Dominica","Dominican Republic (the)",
    "Ecuador","Egypt","El Salvador","Equatorial Guinea","Eritrea","Estonia","Eswatini","Ethiopia","Falkland Islands (the) [Malvinas]",
    "Faroe Islands (the)","Fiji","Finland","France","French Guiana","French Polynesia","French Southern Territories (the)",
    "Gabon","Gambia (the)","Georgia","Germany","Ghana","Gibraltar","Greece","Greenland","Grenada","Guadeloupe",
  ];

  constructor(private formBuilder: FormBuilder,
    private registerService:RegistrationPageService,
    ) { }

  ngOnInit() {
    this.registrationForm = this.formBuilder.group({
      username: this.formBuilder.control(null, [Validators.required, Validators.email]),
      password: this.formBuilder.control(null, [Validators.required, Validators.minLength(8)]),
      cpassword: this.formBuilder.control(null, [Validators.required]),
      firstname: this.formBuilder.control(null, [Validators.required, Validators.pattern("([a-zA-Z0-9]*)")]),
      middlename: this.formBuilder.control(null, [Validators.required, Validators.pattern("([a-zA-Z0-9]*)")]),
      lastname: this.formBuilder.control(null, [Validators.required, Validators.pattern("([a-zA-Z0-9]*)")]),
      country: this.formBuilder.control(null, Validators.required),
    });
  }

  onSubmit(){

    if(this.registrationForm.valid){
      this.registration = this.registrationForm.value;
      if(this.registration.password==this.registration.cpassword){
        this.registerService.registerUser(this.registration).subscribe(
          res=>{
            this.response = res;
            if(this.response.responseMsg == "Success"){
              Swal.fire({
                title: 'Success!',
                text: 'Successfully registered',
                icon: 'success',
              })
            }
            else if(this.response.responseMsg == "Already"){
              Swal.fire({
                title: 'Falied!',
                text: 'Already used this username',
                icon: 'error',
              })
            }
            else{
              Swal.fire({
                title: 'Falied!',
                text: 'Registration Failed',
                icon: 'error',
              })
            } 
          }
        )
      }
      else{
        Swal.fire({
          title: 'Confirm password!',
          text: 'Confirm password not match',
          icon: 'error',
        })
      }
    }
    else{
      this.isFormSubmitted = true;
    }
    // swal.fire({
    //   title: 'Error!',
    //   text: 'Do you want to continue',
    //   icon: 'error',
    //   confirmButtonText: 'Cool'
    // })
  }

  get username() {
    return this.registrationForm.get('username');
  }
  get password() {
    return this.registrationForm.get('password');
  }
  get cpassword() {
    return this.registrationForm.get('cpassword');
  }
  get firstname() {
    return this.registrationForm.get('firstname');
  }
  get lastname() {
    return this.registrationForm.get('lastname');
  }
  get country() {
    return this.registrationForm.get('country');
  }
  get middlename() {
    return this.registrationForm.get('middlename');
  }

}
