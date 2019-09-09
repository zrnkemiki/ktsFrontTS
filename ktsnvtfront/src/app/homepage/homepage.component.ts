import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  private currentUserEmail: string;
  private currentUserUsername: string;

  constructor(private router: Router, private loginService : LoginService) { }

  ngOnInit() {if(localStorage.getItem('currentUser')!= null){
    const currentUser: any = this.loginService.currentUserValue;

    this.currentUserUsername = currentUser.username} 
    
}

  register() {
    this.router.navigate(["/registration"]);
  }

  login() {
    this.router.navigate(["/login"]);
  }

  logout(){
    this.loginService.logout();
    location.reload()
  }

  dodajVozilo() {
    this.router.navigate(["/add-vehicle"]);
  }

  svaVozila() {
    this.router.navigate(["/vehicleSED"]);
  }

  dodajZaposlenog() {
    this.router.navigate(["/register-employee"]);
  }
}
