import { Component } from '@angular/core';
import { User } from './types/user.type';
import { UserService } from './services/user.service';
import { AuthService } from './services/auth/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'frontend';
  show:boolean;
  user : any;
  cpf: string = ''; // Para armazenar o CPF digitado
  foundUser: any;
  errorMessage: string = ''; // Para mensagens de erro
  authenticated: boolean = false;

  constructor(
    private userData : UserService, 
    protected authService: AuthService, 
    private userService: UserService,
    private router: Router)
    {
    this.show = false
    this.authenticated = this.authService.isAuthenticated()
    }

  ngAfterViewInit(){
      this.userService.getCurrentUser().subscribe((res: any) => {
        this.user = res.user
      })
  }

  public logout(){
    this.authService.logout().subscribe({
      next: () => {
        this.authService.setLoggedIn(false);
        // Optional: redirect to login page
        this.router.navigate(['/login']);
      },
      error: (error) => {
        console.error('Logout failed', error);
      }
    });
  }

  public searchUser(){
    if (!this.cpf) {
      this.errorMessage = 'Por favor, insira um CPF válido.';
      this.foundUser = null;
      return;
    }

    this.userData.getUser(this.cpf).subscribe((data)=>{
      this.foundUser = data;
    }, (error) =>{
      this.errorMessage = 'Usuário não encontrado ou erro na requisição.';
      this.foundUser = null;
    })
  }
}

