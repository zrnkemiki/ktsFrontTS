import { Component, OnInit } from '@angular/core';
import { User } from '../model/user';
import { Router } from '@angular/router'
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})

export class UserListComponent implements OnInit {

  public users: User[];

  constructor(private router: Router, private userService: UserService) { }

  ngOnInit() {
    this.users = [];
    if (this.router.url === "/users") {
      this.getUsers();
    }
  }

  getUsers() {
    this.userService.userObservable.subscribe(users => this.users = users);
    this.userService.findAll();
  }

  editUser(username) {
    this.router.navigate(["/edit-user/" + username]);
  }

  returnHome() {
    this.router.navigate(["/homepage"]);
  }

}
