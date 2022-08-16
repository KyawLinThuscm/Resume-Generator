import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.scss']
})
export class SkillsComponent implements OnInit {

  name!: string;
  form!: FormGroup;
  gridsize: number = 1;
  message: string = "Make A Choice";

  constructor(public fb: FormBuilder) {

    this.form = this.fb.group({
      name: ['']
    });
  }



  ngOnInit(): void {
  }

  updateSetting(event: any) {
    this.gridsize = event.value;
    if(this.gridsize === 1) {
      this.message= "Beginner";
    } else if(this.gridsize === 2) {
      this.message= "Moderate";
    } else if(this.gridsize === 3) {
      this.message= "Good";
    } else if(this.gridsize === 4) {
      this.message= "Very Good";
    } else if(this.gridsize === 5) {
      this.message= "Excellent";
    } else {
      this.message= "Make A Choice";
    }
  }

}
