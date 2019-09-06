import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { User} from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userUrl = "http://localhost:8080/api/user";
  private userSeource = new BehaviorSubject<User[]>([]);
  userObservable = this.userSeource.asObservable();
  private users = [];

  constructor(private http: HttpClient) { }

  addUser(user){
    this.http.post<User>(this.userUrl, user)
    .subscribe(
      addedUser =>{
        console.log(addedUser);
        this.users.push(addedUser);
        this.userSeource.next(this.users);
        alert("Succesfully added user" + user.username + "now.");
      }
    )
  }
}
