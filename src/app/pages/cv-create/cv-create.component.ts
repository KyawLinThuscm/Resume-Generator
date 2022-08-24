import { Component, OnInit,  ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, Validators, AbstractControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { CvServiceService } from 'src/app/sevices/cv-service.service';
@Component({
  selector: 'app-cv-create',
  templateUrl: './cv-create.component.html',
  styleUrls: ['./cv-create.component.scss']
})
export class CvCreateComponent implements OnInit {

  toggleButton: Boolean = true;
  imgFile: string = "";

  constructor(
    public router: Router,
    public fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    public cvService: CvServiceService
  ) {}

  msgOnChildCompInit: any;

  ngOnInit(): void {
    let paramId =this.activatedRoute.snapshot.paramMap.get("id");
    if (this.router.url.indexOf('/edit-cv/') !== -1 && paramId !== undefined) {
      this.toggleButton = false;
    }
  }

  onSubmit() {
    const formData = new FormData();
      formData.append('profile', this.cvService.imgFile);
      formData.append('personal', JSON.stringify(this.cvService.cvForm.controls['personalDetail'].value));
      formData.append('education', JSON.stringify(this.cvService.cvForm.controls['educationForm'].value['movies']))
      formData.append('employment', JSON.stringify(this.cvService.cvForm.controls['employmentForm'].value['movies']))
      formData.append('skills', JSON.stringify(this.cvService.cvForm.controls['skillsForm'].value['movies']))
      formData.append('languages', JSON.stringify(this.cvService.cvForm.controls['languagesForm'].value['movies']))

      this.cvService.createResume(formData).then((dist) => {
        console.log(dist)
        this.router.navigate([""]);
      })
      this.cvService.cvForm.reset();
  }

  receiveAutoMsgHandler(p: any) {
    if (p.childName === 'personDetail') {
      this.cvService.cvForm.controls['personalDetail'] = p.form
    } else if (p.childName === 'educationForm') {
      this.cvService.cvForm.controls['educationForm'] = p.form
    } else if (p.childName === 'employmentForm') {
      this.cvService.cvForm.controls['employmentForm'] = p.form
    } else if (p.childName === 'skillsForm') {
      this.cvService.cvForm.controls['skillsForm'] = p.form
    } else if (p.childName === 'languagesForm') {
      this.cvService.cvForm.controls['languagesForm'] = p.form
    } else if (p.childName === 'profileForm') {
      this.cvService.cvForm.controls['profileForm'] = p.form
    }

    // console.log(this.cvService.cvForm)
  }

  receiveImage(img: any) {
    this.cvService.imgFile = img;
  }
}
