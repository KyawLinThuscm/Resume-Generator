import { Component, OnInit } from '@angular/core';
import { CvServiceService } from 'src/app/sevices/cv-service.service';
import { Router, ActivatedRoute  } from '@angular/router';
@Component({
  selector: 'app-cv-preview',
  templateUrl: './cv-preview.component.html',
  styleUrls: ['./cv-preview.component.scss']
})
export class CvPreviewComponent implements OnInit {

  resumeData: any;

  public name!: string;
  public email!: string;
  public phone!: string;
  public dob!: any;
  public nationality!: string;
  public religion!: string;
  public gender!: string;
  public address!: string;
  public profileImage!: string;
  public description!: string;
  education: any = [];
  employment: any = [];
  languages: any =[];
  skills: any = [];

  constructor(
    public cvService: CvServiceService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    const id: string = this.activatedRoute.snapshot.params['id'];

    this.cvService.findResume(id).then((dist) => {
      this.resumeData = dist.data;
      if (this.resumeData) {
        this.name = this.resumeData.personal.name;
        this.email = this.resumeData.personal.email;
        this.phone = this.resumeData.personal.phone;
        this.address = this.resumeData.personal.address;
        this.gender = this.resumeData.personal.gender;
        this.dob = this.resumeData.personal.dob;
        this.nationality = this.resumeData.personal.nationality;
        this.religion = this.resumeData.personal.religion;
        this.description = this.resumeData.personal.description;
        this.profileImage = 'http://localhost:5000/' + this.resumeData.profile;
         this.resumeData.education.map((result: any) => {
          let res = {
            education: result.education,
            school: result.school,
            startdate: result.startdate,
            enddate: result.enddate,
            description: result.description
          }
          this.education.push(res);
        })
        this.resumeData.employment.map((result: any) => {
          let res = {
            position: result.position,
            company: result.company,
            startdate: result.startdate,
            enddate: result.enddate,
            description: result.description
          }
          this.employment.push(res);
        })
        this.resumeData.skills.map((result: any) => {
          let res = {
            skill: result.skill,
            level: result.level
          }
          if(res.level === "Beginner") {
            res.level = 25
          }else if(res.level === "Normal") {
            res.level = 100
          }else if(res.level === "Good") {
            res.level = 75
          }else if(res.level === "Excellent") {
            res.level = 100
          }
          this.skills.push(res);
        })
        this.resumeData.languages.map((result: any) => {
          let res = {
            language: result.language,
            level: result.level
          }
          if(res.level === "Beginner") {
            res.level = 25
          }else if(res.level === "Normal") {
            res.level = 100
          }else if(res.level === "Good") {
            res.level = 75
          }else if(res.level === "Excellent") {
            res.level = 100
          }
          this.languages.push(res);
        })
      }
    })
  }

  download() {
    window.print();
  }
}
