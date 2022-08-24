import { Injectable } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { lastValueFrom } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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
  imgFile: any;
  constructor(
    public fb: FormBuilder,
    public http: HttpClient
  ) {
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
      gender: ['Male'],
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

  public createResume(payload: any): Promise<any> {
    const headerOptions = new HttpHeaders()
      .set("Access-Control-Allow-Origin", "*")
      .set("Access-Control-Allow-Methods", "PUT,GET,POST,DELETE")
      .set("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
    const options = { headers: headerOptions };
    return lastValueFrom(this.http.post(`${environment.apiUrl}/resume/`, payload));
  }

}
