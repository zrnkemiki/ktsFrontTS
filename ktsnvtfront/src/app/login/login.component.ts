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
        this.goToPageOfLoggedUser(currentUser);
      }
      else {
        //this.toastr.error('error logging');
      }
    });

    
  }

  goToPageOfLoggedUser(currentUser: any) {
    const role = currentUser.userType

    if (role === 'SYS_ADMIN') {
      this.router.navigate(['/add-admin']);
    }
    else if (role === 'RENTACAR_ADMIN') {
      this.router.navigate(['/vehiclesSED']);
    }
    else if (role === 'HOTEL_ADMIN') {
      this.router.navigate(['/hotel-admin']);
    }
    else if (role === 'AIRLINE_ADMIN') {
      this.router.navigate(['/hotel']);
    }
    else if (role == 'REGISTERED_USER'){
        this.router.navigate(['/homepage']);
    }
    else {
      this.toastr.error('Unknown user type!');
    }
}

}
