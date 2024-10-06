import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';
import { Comment } from '../model/comment';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(
    private httpClient: HttpClient,
    private authService: AuthService
  ) { }

  getAllComments():Observable<Comment[]> {
    return this.httpClient.get<any[]>(environment.apiUrl+"/comments?populate=user",{headers:{Authorization:`Bearer ${this.authService.jwtToken}`}}).pipe(map(dataArray=>{
      return dataArray.map(data=>{
        return {
          id: data.data.id,
          title: data.data.attributes.title,
          message: data.data.attributes.message,
          createdAt: data.data.attributes.createdAt,
          user: {
            id:data.data.user.id,
            name:data.data.user.attributes.name,
            surname:data.data.user.attributes.surname,
            email:data.data.user.attributes.surname,
            username:data.data.user.attributes.username
          }
        }
      })
    }))
  }

  getCommentsById(id:number):Observable<Comment>{
    return this.httpClient.get<Comment>(environment.apiUrl+"/comments/"+id).pipe(map(dataArray=>{
      return {
        id: dataArray.id,
        title: dataArray.title,
        message: dataArray.message,
        createdAt: dataArray.createdAt,
        user: dataArray.user
      }
    }))
  }
  
}
