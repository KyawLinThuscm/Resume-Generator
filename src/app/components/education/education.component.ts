import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { Router } from '@angular/router';

@Component({
  selector: 'app-education',
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.scss']
})
export class EducationComponent implements OnInit {

  name!: string;
  form!: FormGroup;
  pickDate: any;

  statuss = [
    { viewValue: 'New' },
    { viewValue: 'Progress' },
    { viewValue: 'Done' },
  ];


  constructor(
    public fb: FormBuilder,
    public router: Router
  ) {

    this.form = this.fb.group({
      movies: this.fb.array([this.newMovie()],[Validators.required]),
    });
  }

  get movies(): FormArray {
    return this.form.get("movies") as FormArray
  }

  newMovie(): FormGroup {
    return this.fb.group({
      task:  [''],
      startdate:  [''],
      enddate:  [''],
      description: [''],
    })
  }

  drop(event: CdkDragDrop<string[]>) {
    const formArr = this.form.get('movies') as FormArray;
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
  }

  add() {
    this.movies.push(this.newMovie());
  }

  remove(i: number) {
    this.movies.removeAt(i);
  }

  OnDateChange(event: any) {
    this.pickDate = event;
  }

  onSubmit() {

  }

}
