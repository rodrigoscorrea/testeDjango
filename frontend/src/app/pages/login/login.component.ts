import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(
    private formBuild: FormBuilder,
    private authService: AuthService,
    private router: Router
  ){
    this.loginForm = this.formBuild.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    })
  }
  

  onSubmit(){
    this.authService.login(this.loginForm.value).subscribe({
      next: (response) => {
        // Set authentication state to true
        this.authService.setLoggedIn(true);
        // Redirect to home or dashboard
        this.router.navigate(['/']);
      },
      error: (error) => {
        console.error('Login failed', error);
        // Handle login error
      }
    });
  }

  
}
