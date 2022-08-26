import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { ActivatedRoute, Router } from '@angular/router';
import { CvServiceService } from 'src/app/sevices/cv-service.service';

@Component({
  selector: 'app-education',
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.scss']
})
export class EducationComponent implements OnInit {

  pickDate: any;
  statuss = [
    { viewValue: 'New' },
    { viewValue: 'Progress' },
    { viewValue: 'Done' },
  ];

  @Output() onInitEvent: EventEmitter<any> = new EventEmitter<any>();

  constructor(
    public fb: FormBuilder,
    public router: Router,
    public cvService: CvServiceService,
    private activatedRoute: ActivatedRoute,
  ) { }

  get education(): FormArray {
    return this.cvService.educationForm.get("education") as FormArray
  }

  newEducation(): FormGroup {
    return this.fb.group({
      education: [''],
      school: [''],
      startdate: [''],
      enddate: [''],
      description: [''],
    })
  }

  drop(event: CdkDragDrop<string[]>) {
    const formArr = this.cvService.educationForm.get('education') as FormArray;
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
      childName: 'educationForm',
      form: this.cvService.educationForm
    }

    this.onInitEvent.emit(data);

    let paramId = this.activatedRoute.snapshot.paramMap.get("id");
    if (this.router.url.indexOf('/edit-cv/') !== -1 && paramId !== undefined) {

      this.cvService.findResume(paramId).then((dist) => {
        dist.data.education.map((result: any) => {
          const mvForm = this.fb.group({
            education: result.education,
            school: result.school,
            startdate: result.startdate,
            enddate: result.enddate,
            description: result.description,
          },
          );
          this.education.push(mvForm);
        })
      })
    }
  }

  add() {
    this.education.push(this.newEducation());
  }

  remove(i: number) {
    this.education.removeAt(i);
  }

  OnDateChange(event: any) {
    this.pickDate = event;
  }

  onSubmit() {

  }

}
