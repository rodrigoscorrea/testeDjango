import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
//import { UserService } from 'src/app/services/user.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Router

 } from '@angular/router';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  constructor(
    private formBuilder: FormBuilder,
    //private userService: UserService,
    private router: Router,
    private authService: AuthService
  ){
    this.registerForm = this.formBuilder.group({
      name: ['', Validators.required],
      //cpf: ['', Validators.required],
      //idade: [0, Validators.required],
      password: ['', Validators.required],
      email: ['', Validators.required]
    })
  }
  
  registerForm: FormGroup;

  onSubmit(){
    this.authService.register(this.registerForm.value).subscribe((response: any) => {
      console.log('response ', response);

      this.router.navigate(['/login']);
      
    })
  }
}
