import { Injectable } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { lastValueFrom } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
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
    public http: HttpClient,
    public router: Router,
    private activatedRoute: ActivatedRoute,
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
      education: this.fb.array([]),
    });

    this.employmentForm = this.fb.group({
      employment: this.fb.array([]),
    });

    this.skillsForm = this.fb.group({
      skills: this.fb.array([]),
    });

    this.languagesForm = this.fb.group({
      languages: this.fb.array([]),
    });

    this.profileForm = this.fb.group({
      profile: [''],
    });
  }

  ngOnInit(): void {
  }
  public createResume(payload: any): Promise<any> {
    return lastValueFrom(this.http.post(`${environment.apiUrl}/resume/`, payload));
  }

  public getResume(pageIndex: number, pageSize: number): Promise<any> {
    return lastValueFrom(this.http.get(`${environment.apiUrl}/resume?page=${pageIndex}&rpp=${pageSize}`));
  }

  public findResume(resumeId: any): Promise<any> {
    return lastValueFrom(this.http.get(`${environment.apiUrl}/resume/` + resumeId));
  }

  public updateResume(payload: any, resumeId: any): Promise<any> {
    return lastValueFrom(this.http.put(`${environment.apiUrl}/resume/` + resumeId, payload));
  }

  public deleteResume(resumeId: any): Promise<any> {
    return lastValueFrom(this.http.delete(`${environment.apiUrl}/resume/` + resumeId));
  }

  public searchResume(pageIndex: number, pageSize: number, payload: any): Promise<any> {
    return lastValueFrom(this.http.post(`${environment.apiUrl}/resume/search?page=${pageIndex}&rpp=${pageSize}`, payload));
  }
}
