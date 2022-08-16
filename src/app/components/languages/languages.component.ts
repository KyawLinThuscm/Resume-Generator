import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-languages',
  templateUrl: './languages.component.html',
  styleUrls: ['./languages.component.scss']
})
export class LanguagesComponent implements OnInit {

  name!: string;
  form!: FormGroup;

  constructor(public fb: FormBuilder) {

    this.form = this.fb.group({
      name: ['']
    });
  }

  ngOnInit(): void {
  }

}
