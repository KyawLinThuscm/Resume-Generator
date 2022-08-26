import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CvServiceService } from 'src/app/sevices/cv-service.service';
@Component({
  selector: 'app-languages',
  templateUrl: './languages.component.html',
  styleUrls: ['./languages.component.scss']
})
export class LanguagesComponent implements OnInit {
  gridsize: number = 1;
  message: string = "Make A Choice";
  levels = [
    { value: 'Beginner' },
    { value: 'Normal' },
    { value: 'Good' },
    { value: 'Excellent' }
  ]

  @Output() onInitEvent: EventEmitter<any> = new EventEmitter<any>();

  constructor(
    public fb: FormBuilder,
    public router: Router,
    public cvService: CvServiceService,
    private activatedRoute: ActivatedRoute,
  ) {}


  get languages(): FormArray {
    return this.cvService.languagesForm.get("languages") as FormArray
  }

  newLanguages(): FormGroup {
    return this.fb.group({
      language:  [''],
      level:  ['']
    })
  }

  drop(event: CdkDragDrop<string[]>) {
    const formArr = this.cvService.languagesForm.get('languages') as FormArray;
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
      childName: 'languagesForm',
      form: this.cvService.languagesForm
    }

    this.onInitEvent.emit(data);

    let paramId = this.activatedRoute.snapshot.paramMap.get("id");
    if (this.router.url.indexOf('/edit-cv/') !== -1 && paramId !== undefined) {

      this.cvService.findResume(paramId).then((dist) => {
        dist.data.languages.map((result: any) => {
          const mvForm = this.fb.group({
            language: result.language,
            level: result.level,
          },
          );
          this.languages.push(mvForm);
        })
      })
    }

  }

  add() {
    this.languages.push(this.newLanguages());
  }

  remove(i: number) {
    this.languages.removeAt(i);
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
