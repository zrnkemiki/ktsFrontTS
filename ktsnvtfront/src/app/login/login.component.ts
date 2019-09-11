import { Component, OnInit } from '@angular/core';
import { LoginDTO } from '../model/loginDTO';
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  private loginDTO: LoginDTO;
  constructor(private loginService: LoginService, private router: Router) { }

  ngOnInit() {
    this.loginDTO = new LoginDTO();
  }

  register() {
    this.router.navigate(['/registration'])
  }

  onClick() {
    this.loginService.login(this.loginDTO);
    this.loginService.currentUser.subscribe(

      (result) => {
        if (result) {
          this.router.navigate(['/homepage'])
        }
        else {
          //this.toastr.error('error logging');
        }
      });


  }

}
