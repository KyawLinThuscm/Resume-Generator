import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { Router } from '@angular/router';
import { CvServiceService } from 'src/app/sevices/cv-service.service';
@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.scss']
})
export class SkillsComponent implements OnInit {

  gridsize: number = 1;
  message: string = "Make A Choice";

  @Output() onInitEvent: EventEmitter<any> = new EventEmitter<any>();

  constructor(
    public fb: FormBuilder,
    public router: Router,
    public cvService: CvServiceService
  ) {}


  get movies(): FormArray {
    return this.cvService.skillsForm.get("movies") as FormArray
  }

  newMovie(): FormGroup {
    return this.fb.group({
      skill:  [''],
      level:  ['']
    })
  }

  drop(event: CdkDragDrop<string[]>) {
    const formArr = this.cvService.skillsForm.get('movies') as FormArray;
    const from = event.previousIndex;
    const to = event.currentIndex;
    this.moveItemInFormArray(formArr, from, to)
  }
  moveItemInFormArray(formArray: FormArray, fromIndex: number, toIndex: number): void {
    const from = this.clamp(fromIndex, formArray.length - 1);
    const to = this.clamp(toIndex, formArray.length - 1);

    if (from === to) {
      return;
    }

    const previous = formArray.at(from);
    const current = formArray.at(to);
    formArray.setControl(to, previous);
    formArray.setControl(from, current);
  }

  clamp(value: number, max: number): number {
    return Math.max(0, Math.min(max, value));
  }

  ngOnInit(): void {
    const data = {
      childName: 'skillsForm',
      form: this.cvService.skillsForm
    }

    this.onInitEvent.emit(data);
  }

  add() {
    this.movies.push(this.newMovie());
  }

  remove(i: number) {
    this.movies.removeAt(i);
  }

  updateSetting(event: any) {
    this.gridsize = event.value;
    // if(this.gridsize === 1) {
    //   this.message= "Beginner";
    // } else if(this.gridsize === 2) {
    //   this.message= "Moderate";
    // } else if(this.gridsize === 3) {
    //   this.message= "Good";
    // } else if(this.gridsize === 4) {
    //   this.message= "Very Good";
    // } else if(this.gridsize === 5) {
    //   this.message= "Excellent";
    // } else {
    //   this.message= "Make A Choice";
    // }
  }

  onSubmit() {

  }

}
