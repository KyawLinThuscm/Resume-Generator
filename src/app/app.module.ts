import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularMaterialImportsModule } from './angular-material-imports.module';
import { HeaderComponent } from './components/header/header.component';
import { CvPreviewComponent } from './pages/cv-preview/cv-preview.component';
import { CvCreateComponent } from './pages/cv-create/cv-create.component';
import { CvEditComponent } from './pages/cv-edit/cv-edit.component';
import { CvListsComponent } from './pages/cv-lists/cv-lists.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { PersonalDetailsComponent } from './components/personal-details/personal-details.component';
import { EducationComponent } from './components/education/education.component';
import { EmploymentComponent } from './components/employment/employment.component';
import { LanguagesComponent } from './components/languages/languages.component';
import { SkillsComponent } from './components/skills/skills.component';
import { ProfileUploadComponent } from './components/profile-upload/profile-upload.component';
import { HttpClientModule } from '@angular/common/http';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    CvPreviewComponent,
    CvCreateComponent,
    CvEditComponent,
    CvListsComponent,
    PersonalDetailsComponent,
    EducationComponent,
    EmploymentComponent,
    LanguagesComponent,
    SkillsComponent,
    ProfileUploadComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularMaterialImportsModule,
    MatDatepickerModule,
    DragDropModule,
    HttpClientModule
  ],
  providers: [MatDatepickerModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
