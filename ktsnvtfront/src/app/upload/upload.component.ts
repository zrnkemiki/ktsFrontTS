import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {

  fileToUpload: File = null;
  fileName: string;


  ngOnInit() {

  }

  constructor(private http: HttpClient) {

  }
  handleFileInput(files: FileList) {
    var formData = new FormData();
    this.fileToUpload = files.item(0)
    this.fileName = this.fileToUpload.name;
    formData.append('documentName', this.fileName);
    formData.append('file', this.fileToUpload);
    debugger;
    this.uploadFile(formData);  
    debugger; 
  }

  uploadFile(formData: FormData){
    console.log(formData.append);
    return this.http.post<void>("http://localhost:8080/api/file/addImage" , formData)
    .subscribe(
      response => {
        alert("Successfully added vehicle. New  vehicle added.");
      }
    )
  }



}