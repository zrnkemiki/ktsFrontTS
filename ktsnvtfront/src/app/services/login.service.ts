import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpBackend } from '@angular/common/http';
import { Observable, of, BehaviorSubject} from 'rxjs';
import { User } from '../model/user';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { LoginDTO } from '../model/loginDTO';
@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private userUrl = "http://localhost:8080/api/login";
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;
  private http: HttpClient;

  constructor(private handler: HttpBackend, private router: Router) {
    this.http = new HttpClient(handler);
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    let user : User = new User();
    if(localStorage.getItem('currentUser')){
      user.deserialize(JSON.parse(localStorage.getItem('currentUser')));
      if(user.idUser!=this.currentUserSubject.value.idUser){
        this.currentUserSubject.next(user);
      }
    }
    return this.currentUserSubject.value;
  }

  public get currentUserStatus(): String {
    if(this.currentUserValue){
      return this.currentUserValue.status;
    }
    return "ADMIN";
  }

  login(loginDto : LoginDTO) {
    return this.http.post<any>(this.userUrl, loginDto)
        .pipe(map(userDTO => {
            if (userDTO && userDTO.jwttoken) {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                let user : User = new User().deserialize(userDTO);
                localStorage.setItem('currentUser', JSON.stringify(user));
                this.currentUserSubject.next(user);
            }
            return userDTO;
        })).subscribe(
        (data)=>{},
           error=>{alert("You have entered wrong username or password. Please try again!")} 
        );

}
  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
    alert("You have succesfully logged out!")
    this.router.navigate(["/homepage"]);
  }

}
