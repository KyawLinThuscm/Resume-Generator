import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-profile-upload',
  templateUrl: './profile-upload.component.html',
  styleUrls: ['./profile-upload.component.scss']
})
export class ProfileUploadComponent implements OnInit {

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
