import { Component, OnInit } from '@angular/core';
import { User } from '../model/user';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router'
import { UserService } from '../services/user.service';
import { LoginService } from '../services/login.service';
import {Location} from '@angular/common';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { UploadComponent } from '../upload/upload.component';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})

export class UserProfileComponent implements OnInit {

  public user: User;
  private currentUserType: string;
  private fileData: File = null;
  private previewUrl:any = null;
  private fileUploadProgress: string = null;

  constructor(private userService: UserService, private loginService: LoginService, private location: Location, private toastr: ToastrService,
    private route: ActivatedRoute, private http: HttpClient) {
    this.user = new User();
  }

  ngOnInit() {
    const username = this.route.snapshot.paramMap.get('username');
    if (localStorage.getItem('currentUser') != null) {
      let currentUser: any = this.loginService.currentUserValue;
      if (currentUser.username !== username && currentUser.userType !== "EMPLOYEE") {
        this.return();
      }
      this.userService.getUser(username).subscribe(user => this.user = user);
      currentUser = this.loginService.currentUserValue;
      this.currentUserType = currentUser.userType;
    }
  }

  fileProgress(fileInput: any) {
    this.fileData = <File>fileInput.target.files[0];
    this.preview();
  }

  preview() { 
    var mimeType = this.fileData.type;
    if (mimeType.match(/image\/*/) == null) {
      return;
    }
    var reader = new FileReader();      
    reader.readAsDataURL(this.fileData); 
    reader.onload = (_event) => { 
      this.previewUrl = reader.result; 
    }
  }

  onSubmit() {
    const formData = new FormData();
    formData.append('files', this.fileData);
    this.fileUploadProgress = '0%';
 
    this.userService.uploadDocument(formData, this.user.username)
      .subscribe(
        events => {
          if (events.type === HttpEventType.UploadProgress) {
            this.fileUploadProgress = Math.round(events.loaded / events.total * 100) + '%';
            console.log(this.fileUploadProgress);
          } else if (events.type === HttpEventType.Response) {
            this.fileUploadProgress = '';
            console.log(events.body);          
            alert("Dokument sačuvan");
          }  
        }
      ) 
  }

  editUser() {
    if (this.user.firstName !== '' && this.user.lastName !== '' && this.user.username !== '' && this.user.email !== '' && this.user.phoneNumber !== ''
      && this.user.userType !== '' ) {
      this.userService.editUser(this.user);
      this.return();
    }
    else {
      this.toastr.error('Morate popuniti sva polja!');
    }
  }

  return() {
    this.location.back();
  }

}
