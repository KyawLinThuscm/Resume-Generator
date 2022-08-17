import { Injectable } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class CvServiceService {
  cvForm!: FormGroup;
  personalForm!: FormGroup;
  educationForm!: FormGroup;
  employmentForm!: FormGroup;
  skillsForm!: FormGroup;
  languagesForm!: FormGroup;
  profileForm!: FormGroup;

  constructor(public fb: FormBuilder) {
    this.cvForm = this.fb.group({
      personalDetail: this.personalForm,
      educationForm: this.educationForm,
      employmentForm: this.employmentForm,
      skillsForm: this.skillsForm,
      languagesForm: this.languagesForm,
      profileForm: this.profileForm
    })

    this.personalForm = this.fb.group({
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

    this.educationForm = this.fb.group({
      movies: this.fb.array([]),
    });

    this.employmentForm = this.fb.group({
      movies: this.fb.array([]),
    });

    this.skillsForm = this.fb.group({
      movies: this.fb.array([]),
    });

    this.languagesForm = this.fb.group({
      movies: this.fb.array([]),
    });

    this.profileForm = this.fb.group({
      profile: [''],
    });
  }

}
