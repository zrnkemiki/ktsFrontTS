import { Injectable } from '@angular/core';
import { User } from '../model/user';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class UserService {

  private userUrl = "http://localhost:8080/api/user";
  private userSource = new BehaviorSubject<User[]>([]);
  userObservable = this.userSource.asObservable();
  private users = [];

  constructor(private http: HttpClient) { }

  findAll() {
    this.http.get<User[]>(this.userUrl)
      .subscribe(
        users => {
          this.users = users;
          this.userSource.next(this.users);
        }
      );
  }

  getAll() {
    return this.http.get<User[]>(this.userUrl);
  }

  getUser(username) {
    return this.http.get<User>(this.userUrl + "/" + username)
      .pipe(tap(
        user => {
          for (var i = 0; i < this.users.length; i++) {
            if (user.username === this.users[i].username) {
              this.users[i] = stop;
              this.userSource.next(this.users);
              return stop;
            }
          }
        })
      )
  }

  editUser(user: User) {
    this.http.put<User>(this.userUrl, user)
      .subscribe(
        editedUser => {
          for (var i = 0; i < this.users.length; i++) {
            if (editedUser.username === this.users[i].username) {
              this.users[i] = editedUser;
              this.userSource.next(this.users);
              return;
            }
          }
        });
  }

  addEmployee(user) {
    this.http.post<User>("http://localhost:8080/api/user/addEmployee", user)
      .subscribe(
        addedUser => {
          console.log(addedUser);
          this.users.push(addedUser);
          this.userSource.next(this.users);
          alert("Succesfully added employee" + user.username + "now.");
        }
      )
  }

  addUser(user) {
    this.http.post<User>(this.userUrl, user)
      .subscribe(
        addedUser => {
          console.log(addedUser);
          this.users.push(addedUser);
          this.userSource.next(this.users);
          alert("Succesfully added user" + user.username + "now.");
        }
      )
  }
}
