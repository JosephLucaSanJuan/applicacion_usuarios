import { Injectable } from '@angular/core';
import { User } from '../model/user';
import { Login } from '../model/login';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  static UNKNOWN_USER = new User
  isLoggedIn$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false)
  private isUserAdmin: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public isUserAdmin$ = this.isUserAdmin.asObservable();
  userLogged: BehaviorSubject<User|null> = new BehaviorSubject<User|null>(null);
  userLogged$ = this.userLogged.asObservable();
  jwtToken:string|undefined = undefined;

  constructor(
    private httpClient: HttpClient
  ) { }

  register(user:User):Observable<User>{
    return new Observable<User>(observer=>{
      this.httpClient.post<User>(environment.apiUrl+"/users", user,{headers:{Authorization:`Bearer ${this.jwtToken}`}}).pipe(map((data:any)=>{
        console.log(data)
          observer.next({
            id: data.id,
            name: data.name,
            surname: data.surname,
            email: data.email,
            userName: data.userName
          })
          this.isUserAdmin.next(data.user.isAdmin);
          this.jwtToken = data.jwt;
          this.httpClient.get(environment.apiUrl+"/users",{headers:{Authorization:`Bearer ${this.jwtToken}`}}).subscribe({
            next:data=>{
              console.log(data);
            },
            error:err=>{}
          });
      }))
    })
  }

  login(login:Login):Observable<User>{
    return new Observable<User>(observer=>{
      if (login.username) {
        this.httpClient.post(environment.apiUrl+"/auth/local", {identifier:login.username, password:login.password}).subscribe({
          next:(data:any)=>{
            console.log(data)
            if (data && data.jwt && data.user) {
              observer.next({
                id:data.user.id,
                name:data.user.name,
                surname:data.user.surname,
                email:data.user.email,
                userName:data.user.userName
              });
              this.isLoggedIn$.next(true)
              this.userLogged.next({
                id:data.user.id,
                name:data.user.name,
                surname:data.user.surname,
                email:data.user.email,
                userName:data.user.userName
              });
              this.isUserAdmin.next(data.user.isAdmin);
              this.jwtToken = data.jwt;
              this.httpClient.get(environment.apiUrl+"/users",{headers:{Authorization:`Bearer ${this.jwtToken}`}}).subscribe({
                next:data=>{
                  console.log(data);
                },
                error:err=>{}
              });
            }
            else
              observer.error("Contraseña o usuario incorrecto");
          },
          error:err=>observer.error("Contraseña o usuario incorrecto")
        });
      }
      else{
        observer.error("Contraseña o usuario incorrecto");
      }
    });

  }
  
  logOut(){
    this.isLoggedIn$.next(false)
  }

}
