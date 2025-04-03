import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { User, UserLogin, UserRegister} from "../types/user.type";

@Injectable({
    providedIn: 'root'
})

export class UserService{
    url = 'http://localhost:8000/api';

    constructor(private http: HttpClient){}

    registerTeste(data: UserRegister){
        return this.http.post(`${this.url}/user/register`, data);
    }

    login(data: UserLogin){
        return this.http.post(`${this.url}/user/login`, data, {withCredentials: true});
    }

    logout(){
        return this.http.post(`${this.url}/user/logout`, {}, {withCredentials: true});
    }

    getUsers(){
        return this.http.get(`${this.url}/api/user`);
    }

    getUser(cpf : string){
        return this.http.get(`${this.url}/user/${cpf}`);
    }

    getCurrentUser(){
        return this.http.get(`${this.url}/user`, {withCredentials: true});
    }

    /* createUser(user: User) {
        return this.http.post(`${this.url}/createUser`, user);
    } */
}

