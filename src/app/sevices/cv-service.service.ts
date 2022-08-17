import { Injectable } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class CvServiceService {
  form!: FormGroup;

  constructor(public fb: FormBuilder) {
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
  }
}
