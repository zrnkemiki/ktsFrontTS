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
  private currentUserType: string;

  private applicationAdministrator: string;
  private applicationEmployee: string;
  private registeredUser: string;


  constructor(private router: Router, private loginService: LoginService) { }

  ngOnInit() {
    if (localStorage.getItem('currentUser') != null) {
      const currentUser: any = this.loginService.currentUserValue;

      this.currentUserEmail = currentUser.email
      this.currentUserType = currentUser.userType
    }

    if (this.currentUserType == "ADMINISTRATOR") {
      this.applicationAdministrator = this.currentUserType;
    }
    else if (this.currentUserType == "EMPLOYEE") {
      this.applicationEmployee = this.currentUserType;
    }
    else {
      this.registeredUser = this.currentUserType;
    }

  }

  register() {
    this.router.navigate(["/registration"]);
  }

  login() {
    this.router.navigate(["/login"]);
  }

  logout() {
    this.loginService.logout();
    location.reload()
  }

  dodajVozilo() {
    this.router.navigate(["/add-vehicle"]);
  }

  svaVozila() {
    this.router.navigate(["/vehicleSED"]);
  }

  dodajStajaliste() {
    this.router.navigate(["/add-stop"]);
  }

  svaStajalista() {
    this.router.navigate(["/stopSED"]);
  }

  dodajPolazak() {
    this.router.navigate(["/add-departure"]);
  }

  sviPolasci() {
    this.router.navigate(["/departureSED"]);
  }

  dodajLiniju() {
    this.router.navigate(["/add-line"]);
  }

  sveLinije() {
    this.router.navigate(["/lineSED"]);
  }

  sviKorisnici() {
    this.router.navigate(["/users"]);
  }

  dodajZaposlenog() {
    this.router.navigate(["/register-employee"]);
  }

  dodajCenovnik() {
    this.router.navigate(["/add-priceList"]);
  }

  sviCenovnici() {
    this.router.navigate(["/priceListSED"]);
  }

  kupiKartu() {
    this.router.navigate(["/add-ticket"]);
  }

  mojeKarte() {
    this.router.navigate(["/ticketSED"]);
  }
}
