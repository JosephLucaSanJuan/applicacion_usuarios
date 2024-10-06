import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../model/user';
import { Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private httpClient: HttpClient,
    private authService: AuthService
  ) { }

  getAll():Observable<User[]>{
    return this.httpClient.get<any[]>(environment.apiUrl+"/users",{headers:{Authorization:`Bearer ${this.authService.jwtToken}`}}).pipe(map(dataArray=>{
      return dataArray.map(data=>{
        return {
          id: data.id,
          name: data.name,
          surname: data.surname,
          email: data.email,
          userName: data.username
        };
      })
    }))
  }

  getUserById(id:string):Observable<User>{
    return this.httpClient.get<User>(environment.apiUrl+"/users/"+id,{headers:{Authorization:`Bearer ${this.authService.jwtToken}`}}).pipe(map(data=>{
      return {
        id:data.id,
        name: data.name,
        surname: data.surname,
        email:data.email,
        userName:data.userName,
        password:data.password
      }
    }))
  }

  /*getUserByName(un:string):Observable<User|null>{
    return this.httpClient.get<User[]>(environment.apiUrl+"/users?userName="+un).pipe(map(data=>{
      if(data.length == 0)
        return null;
      return {
        id:data[0].id,
        name: data[0].name,
        surname: data[0].surname,
        email:data[0].email,
        userName:data[0].userName,
        password:data[0].password,
        admin:data[0].admin
      }
    }))
  }

  getUserByPassword(pw:string):Observable<User>{
    return this.httpClient.get<User>(environment.apiUrl+"/users?password="+pw).pipe(map(data=>{
      return {
        id:data.id,
        name: data.name,
        surname: data.surname,
        email:data.email,
        userName:data.userName,
        password:data.password
      }
    }))
  }*/

  addUser(user:User): Observable<User>{
    return this.httpClient.post<User>(environment.apiUrl+"/users", user).pipe(map(data=>{
      return {
        id:data.id,
        name: data.name,
        surname: data.surname,
        email:data.email,
        userName:data.userName,
        password:data.password
      }
    }))
  }

  updateUser(id:string, user:User):Observable<User>{
    return this.httpClient.put<User>(environment.apiUrl+"/users/"+id, user,{headers:{Authorization:`Bearer ${this.authService.jwtToken}`}}).pipe(map(data=>{
      return {
        id:data.id,
        name:data.name,
        surname:data.surname,
        email:data.email,
        username:data.userName
      }
    }))
  }
  
  deleteUser(id:string):Observable<User>{
    return this.httpClient.delete<User>(environment.apiUrl+"/users/"+id,{headers:{Authorization:`Bearer ${this.authService.jwtToken}`}}).pipe(map(data=>{
      return {
        id: data.id,
        name: data.name,
        surname: data.surname,
        email: data.email,
        userName: data.userName
      }
    }))
  }
}
