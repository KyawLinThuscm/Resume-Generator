import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CvServiceService } from 'src/app/sevices/cv-service.service';
@Component({
  selector: 'app-personal-details',
  templateUrl: './personal-details.component.html',
  styleUrls: ['./personal-details.component.scss']
})
export class PersonalDetailsComponent implements OnInit {

  genders = [
    { value: 'Male' },
    { value: 'Female' }
  ]
  pickDate: any;
  today = new Date();

  @Output() onInitEvent: EventEmitter<any> = new EventEmitter<any>();

  constructor(
    public fb: FormBuilder,
    public cvService: CvServiceService,
    public router: Router,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    const data = {
      childName: 'personDetail',
      form: this.cvService.personalForm
    }

    this.onInitEvent.emit(data);

    let paramId =this.activatedRoute.snapshot.paramMap.get("id");
    if (this.router.url.indexOf('/edit-cv/') !== -1 && paramId !== undefined) {

      this.cvService.findResume(paramId).then((dist) => {

        this.cvService.personalForm.controls['name'].setValue(dist.data.personal.name)
        this.cvService.personalForm.controls['email'].setValue(dist.data.personal.email)
        this.cvService.personalForm.controls['phone'].setValue(dist.data.personal.phone)
        this.cvService.personalForm.controls['dob'].setValue(dist.data.personal.dob)
        this.cvService.personalForm.controls['nationality'].setValue(dist.data.personal.nationality)
        this.cvService.personalForm.controls['religion'].setValue(dist.data.personal.religion)
        this.cvService.personalForm.controls['gender'].setValue(dist.data.personal.gender)
        this.cvService.personalForm.controls['address'].setValue(dist.data.personal.address)
        this.cvService.personalForm.controls['description'].setValue(dist.data.personal.description)
      })
    }
  }


  OnDateChange(event: any) {
    this.pickDate = event;
  }

}
