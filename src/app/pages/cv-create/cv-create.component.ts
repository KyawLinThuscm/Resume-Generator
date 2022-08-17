import { Component, OnInit,  ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, Validators, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';

import { PersonalDetailsComponent } from 'src/app/components/personal-details/personal-details.component';
import { EducationComponent } from 'src/app/components/education/education.component';
import { EmploymentComponent } from 'src/app/components/employment/employment.component';
import { SkillsComponent } from 'src/app/components/skills/skills.component';
import { LanguagesComponent } from 'src/app/components/languages/languages.component';
import { ProfileUploadComponent } from 'src/app/components/profile-upload/profile-upload.component';

@Component({
  selector: 'app-cv-create',
  templateUrl: './cv-create.component.html',
  styleUrls: ['./cv-create.component.scss']
})
export class CvCreateComponent implements OnInit {

  cvForm!: FormGroup;

  @ViewChild(PersonalDetailsComponent) personalDetail!: PersonalDetailsComponent;
  @ViewChild(EducationComponent) educationComponent!: EducationComponent;
  @ViewChild(EmploymentComponent) employmentComponent!: EmploymentComponent;
  @ViewChild(SkillsComponent) skillsComponent!:  SkillsComponent;
  @ViewChild(LanguagesComponent) languagesComponent!: LanguagesComponent;
  @ViewChild(ProfileUploadComponent) profileUpload!: ProfileUploadComponent;

  constructor(
    public router: Router,
    public fb: FormBuilder
  ) {
    this.cvForm = this.fb.group({
      personalDetail: this.personalDetail,
      educationComponent: this.educationComponent,
      employmentComponent: this.employmentComponent,
      skillsComponent: this.skillsComponent,
      languagesComponent: this.languagesComponent,
      profileUpload: this.profileUpload
    });
  }

  msgOnChildCompInit: any;
  msgOnButtonClick!: string;

  get step1(): AbstractControl | null {
    return this.personalDetail ? this.personalDetail.form : null;
  }

  get step2(): AbstractControl | null {
    return this.educationComponent ? this.educationComponent.form : null;
  }

  get step3(): AbstractControl | null {
    return this.employmentComponent ? this.employmentComponent.form : null;
  }

  get step4(): AbstractControl | null {
    return this.skillsComponent ? this.skillsComponent.form : null;
  }

  get step5(): AbstractControl | null {
    return this.languagesComponent ? this.languagesComponent.form : null;
  }

  get step6(): AbstractControl | null {
    return this.profileUpload ? this.profileUpload.form : null;
  }

  ngOnInit(): void {
  }

  onSubmit() {
    console.log("Form Submitted");
    console.log('form', this.cvForm);
    // this.router.navigateByUrl("")
  }

  receiveAutoMsgHandler(p: any) {
    console.log('p', p);
    console.log('cvForm', this.cvForm);
    if (p.childName === 'personDetail') {
      this.cvForm.controls['personalDetail'] = p.form
    }
    // this.msgOnChildCompInit = p;
    // const pd = this.msgOnChildCompInit
    // JSON.stringify(this.msgOnChildCompInit)
    console.log(this.cvForm)
  }
}
