import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CvServiceService } from 'src/app/sevices/cv-service.service';
@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.scss']
})
export class SkillsComponent implements OnInit {

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


  get skills(): FormArray {
    return this.cvService.skillsForm.get("skills") as FormArray
  }

  newSkill(): FormGroup {
    return this.fb.group({
      skill:  [''],
      level:  ['']
    })
  }

  drop(event: CdkDragDrop<string[]>) {
    const formArr = this.cvService.skillsForm.get('skills') as FormArray;
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

    let paramId = this.activatedRoute.snapshot.paramMap.get("id");
    if (this.router.url.indexOf('/edit-cv/') !== -1 && paramId !== undefined) {

      this.cvService.findResume(paramId).then((dist) => {
        console.log(dist.data.skills)
        dist.data.skills.map((result: any) => {
          const mvForm = this.fb.group({
            skill: result.skill,
            level: result.level,
          })
          console.log(mvForm)
          this.skills.push(mvForm);
        })
      })
    }
  }

  add() {
    this.skills.push(this.newSkill());
  }

  remove(i: number) {
    this.skills.removeAt(i);
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
}
