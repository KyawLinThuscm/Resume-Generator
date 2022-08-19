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
    // console.log("Form Submitted");
    console.log('form', this.cvService.cvForm);
    this.router.navigateByUrl("")
  }

  receiveAutoMsgHandler(p: any) {
    // console.log('p', p);
    // console.log('cvForm', this.cvService.cvForm);
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
}
