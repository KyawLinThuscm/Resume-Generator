import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
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
    public cvService: CvServiceService
  ) { }

  ngOnInit(): void {
    const data = {
      childName: 'personDetail',
      form: this.cvService.personalForm
    }

    this.onInitEvent.emit(data);
  }


  OnDateChange(event: any) {
    this.pickDate = event;
  }

}
