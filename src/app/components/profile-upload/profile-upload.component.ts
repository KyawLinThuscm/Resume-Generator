import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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
  @Output() outputImage: EventEmitter<any> = new EventEmitter();

  constructor(
    public fb: FormBuilder,
    public cvService: CvServiceService,
    private activatedRoute: ActivatedRoute,
    public router: Router,
  ) {}

  ngOnInit(): void {
    const data = {
      childName: 'profileForm',
      form: this.cvService.profileForm,
    }

    this.onInitEvent.emit(data);

    let paramId =this.activatedRoute.snapshot.paramMap.get("id");
    if (this.router.url.indexOf('/edit-cv/') !== -1 && paramId !== undefined) {

      this.cvService.findResume(paramId).then((dist) => {
        this.profileImage = 'http://localhost:5000/' + dist.data.profile;
      })
    }
  }

  imageUpload(event: any) {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      this.imgFile = file;
      this.outputImage.emit(this.imgFile);
      const reader = new FileReader();
      reader.onload = e => this.profileImage = reader.result;
      reader.readAsDataURL(file);
    }
  }

}
