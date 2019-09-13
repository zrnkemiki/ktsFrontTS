import { Component, OnInit } from '@angular/core';
import { User } from '../model/user';
import { ActivatedRoute } from '@angular/router'
import { UserService } from '../services/user.service';
import { LoginService } from '../services/login.service';
import { HttpEventType } from '@angular/common/http';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {

  public user: User;
  private currentUserType: string;
  private fileData: File = null;
  private previewUrl:any = null;
  private fileUploadProgress: string = null;

  constructor(private userService: UserService, private loginService: LoginService, private route: ActivatedRoute) { }

  ngOnInit() {
    const username = this.route.snapshot.paramMap.get('username');
    this.userService.getUser(username).subscribe(user => this.user = user);
    if (localStorage.getItem('currentUser') != null) {
      const currentUser: any = this.loginService.currentUserValue;
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

}
