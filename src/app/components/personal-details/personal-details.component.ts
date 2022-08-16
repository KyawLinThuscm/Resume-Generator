import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-personal-details',
  templateUrl: './personal-details.component.html',
  styleUrls: ['./personal-details.component.scss']
})
export class PersonalDetailsComponent implements OnInit {

  name!: string;
  form!: FormGroup;
  genders= [
    { value: 'Male' },
    { value: 'Female' }
  ]
  pickDate: any;
  today = new Date();

  constructor(public fb: FormBuilder) {

    this.form = this.fb.group({
      name: ['']
    });
  }

  ngOnInit(): void {
  }

  OnDateChange(event: any) {
    this.pickDate = event;
  }
}
