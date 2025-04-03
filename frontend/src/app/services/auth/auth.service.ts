import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { User, UserLogin, UserRegister} from "../../types/user.type";

@Injectable({
    providedIn: 'root'
})

export class AuthService{
  url = 'http://localhost:8000/api';
  private loggedIn = false;

  constructor(private http: HttpClient) {
    this.checkAuthState();
  }

  register(data: UserRegister) {
    return this.http.post(`${this.url}/auth/register`, data);
  }

  login(data: UserLogin) {
    return this.http.post(`${this.url}/auth/login`, data, { withCredentials: true });
  }

  logout() {
    return this.http.post(`${this.url}/auth/logout`, {}, { withCredentials: true });
  }

  // Add a method to check session status with backend
  checkSession() {
    return this.http.get(`${this.url}/auth/user`, { withCredentials: true });
  }

  checkAuthState() {
    // First check if the cookie exists
    var userAuthenticated: boolean;
    this.checkSession().subscribe((res: any) => {
      userAuthenticated = res.authenticated

      if (userAuthenticated) {
        this.loggedIn = true;
      } else {
        this.loggedIn = false;
      }
      
      return this.loggedIn;
    })
  }

  isAuthenticated(): boolean {
    return this.loggedIn;
  }

  // Call this after successful login
  setLoggedIn(value: boolean) {
    this.loggedIn = value;
  }
}

