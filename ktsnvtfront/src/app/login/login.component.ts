import { Component, OnInit } from '@angular/core';
import { LoginDTO } from '../model/loginDTO';
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from '../model/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  private loginDTO : LoginDTO;
  constructor(private loginService : LoginService, private router: Router, private toastr: ToastrService) { }

  ngOnInit() {
    this.loginDTO = new LoginDTO();
  }

  register(){
    this.router.navigate(['/registration'])
  }

  onClick(){
    this.loginService.login(this.loginDTO);
    this.loginService.currentUser.subscribe(

      (result)=> 
    {
      if(result)
      { 
        const currentUser: any = this.loginService.currentUserValue;
        this.router.navigate(['/homepage'])
      }
      else {
        //this.toastr.error('error logging');
      }
    });

    
  }

}
