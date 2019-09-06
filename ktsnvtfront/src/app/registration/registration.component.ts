import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, ActivatedRoute } from '@angular/router'
import { ToastrService } from 'ngx-toastr';
import { userBackend } from '../model/user-backend';
import { UserService} from '../services/user.service';
import { User} from '../model/user';
import { EmailValidator } from '@angular/forms';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  public user: User;
  private passwordRepeated = '';
  public passwordsEqual = false;

  constructor(
    private userService : UserService,
    private toastr : ToastrService,
    private router : Router,
    private route : ActivatedRoute
    )  
  {
    this.user = new User();
  }
  
  ngOnInit() {
  }

  checkPasswordValidation() {

    if (this.user.password === this.passwordRepeated) {
      this.passwordsEqual = true;
    } else {
      this.passwordsEqual = false;
    }
  }

  addUser(){
    if(this.user.firstName == undefined) {
      alert("You must enter username.")
    }
    else if(this.user.lastName == undefined){
      alert("You must enter lastName.")
    }
    else if(this.user.username == undefined){
      alert("You must enter username.")
    } 
    else if(this.user.email == undefined){
      alert("You must enter email.")
    } 
    else if(this.user.password == undefined){
      alert("You must enter password.")
    } 
    else if(this.user.city == undefined){
      alert("You must enter city.")
    }   
    else{
      this.userService.addUser(this.user);
      this.router.navigate(['/homepage'])
    }
    }
}
