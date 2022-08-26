import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { ActivatedRoute, Router } from '@angular/router';
import { CvServiceService } from 'src/app/sevices/cv-service.service';

@Component({
  selector: 'app-employment',
  templateUrl: './employment.component.html',
  styleUrls: ['./employment.component.scss']
})
export class EmploymentComponent implements OnInit {

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
  ) {}

  get employment(): FormArray {
    return this.cvService.employmentForm.get("employment") as FormArray
  }

  newEmployment(): FormGroup {
    return this.fb.group({
      position:  [''],
      company: [''],
      startdate:  [''],
      enddate:  [''],
      description: [''],
    })
  }

  drop(event: CdkDragDrop<string[]>) {
    const formArr = this.cvService.employmentForm.get('employment') as FormArray;
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
      childName: 'employmentForm',
      form: this.cvService.employmentForm
    }

    this.onInitEvent.emit(data);

    let paramId = this.activatedRoute.snapshot.paramMap.get("id");
    if (this.router.url.indexOf('/edit-cv/') !== -1 && paramId !== undefined) {

      this.cvService.findResume(paramId).then((dist) => {
        dist.data.employment.map((result: any) => {
          const mvForm = this.fb.group({
            position: result.position,
            company: result.company,
            startdate: result.startdate,
            enddate: result.enddate,
            description: result.description,
          },
          );
          this.employment.push(mvForm);
        })
      })
    }
  }

  add() {
    this.employment.push(this.newEmployment());
  }

  remove(i: number) {
    this.employment.removeAt(i);
  }

  OnDateChange(event: any) {
    this.pickDate = event;
  }

  onSubmit() {

  }

}
