import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { CvServiceService } from 'src/app/sevices/cv-service.service';
@Component({
  selector: 'app-profile-upload',
  templateUrl: './profile-upload.component.html',
  styleUrls: ['./profile-upload.component.scss']
})
export class ProfileUploadComponent implements OnInit {

  profileImage: any;
  imgFile: any;

  @Output() onInitEvent: EventEmitter<any> = new EventEmitter<any>();

  constructor(
    public fb: FormBuilder,
    public cvService: CvServiceService
  ) {}

  ngOnInit(): void {
    const data = {
      childName: 'profileForm',
      form: this.cvService.profileForm
    }

    this.onInitEvent.emit(data);
  }

  imageUpload(event: any) {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];

      this.imgFile = file;
      const reader = new FileReader();
      reader.onload = e => this.profileImage = reader.result;
      reader.readAsDataURL(file);
    }
  }

}
