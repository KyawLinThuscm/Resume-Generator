import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-personal-details',
  templateUrl: './personal-details.component.html',
  styleUrls: ['./personal-details.component.scss']
})
export class PersonalDetailsComponent implements OnInit {

  form!: FormGroup;
  genders = [
    { value: 'Male' },
    { value: 'Female' }
  ]
  pickDate: any;
  today = new Date();

  @Output() onInitEvent: EventEmitter<any> = new EventEmitter<any>();

  constructor(public fb: FormBuilder) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      name: [''],
      email: [''],
      phone: [''],
      dob: [''],
      nationality: [''],
      religion: [''],
      gender: [''],
      address: [''],
      description: ['']
    });

    const data = {
      childName: 'personDetail',
      form: this.form
    }

    this.onInitEvent.emit(data);
  }


  OnDateChange(event: any) {
    this.pickDate = event;
  }

}
