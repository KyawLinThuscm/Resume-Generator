import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CvListsComponent } from './pages/cv-lists/cv-lists.component';
import { CvCreateComponent } from './pages/cv-create/cv-create.component';
import { CvEditComponent } from './pages/cv-edit/cv-edit.component';
import { CvPreviewComponent } from './pages/cv-preview/cv-preview.component';

const routes: Routes = [
  {
    path: '',
    component: CvListsComponent
  },
  {
    path: 'create-cv',
    component: CvCreateComponent
  },
  {
    path: 'edit-cv/:id',
    component: CvCreateComponent
  },
  {
    path: 'preview/:id',
    component: CvPreviewComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
