import { Component, OnInit } from '@angular/core';
import { Line } from '../model/line';
import { Router } from '@angular/router'
import { LineService } from '../services/line.service';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-line-sed',
  templateUrl: './line-sed.component.html',
  styleUrls: ['./line-sed.component.css']
})
export class LineSEDComponent implements OnInit {

  public lines: Line[];
  private currentUserEmail: string;
  private currentUserUsername: string;
  private currentUserType: string;

  private applicationAdministrator: string;
  private applicationEmployee: string;
  private registeredUser: string;

  constructor(private router: Router, private lineService: LineService, private loginService: LoginService) { }

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

    this.lines = [];
    if (this.router.url === "/lineSED") {
      this.getLines();
    }
  }

  getLines() {
    this.lineService.linesObservable.subscribe(lines => this.lines = lines);
    this.lineService.findAll();
  }

  addLine() {
    this.router.navigate(["/add-line"]);
  }

  editLine(id) {
    this.router.navigate(["/edit-line/" + id]);
  }

  deleteLine(id) {
    this.lineService.deleteLine(id);
  }

  returnHome() {
    this.router.navigate(["/homepage"]);
  }

}
