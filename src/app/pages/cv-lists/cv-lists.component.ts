import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { CvServiceService } from 'src/app/sevices/cv-service.service';
import * as moment from 'moment';
@Component({
  selector: 'app-cv-lists',
  templateUrl: './cv-lists.component.html',
  styleUrls: ['./cv-lists.component.scss']
})
export class CvListsComponent implements OnInit {
  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>([]);
  public columnToDisplay = [
    'name',
    'created_at',
    'operation',
  ];
  actualPaginator?: MatPaginator;
  currentPage = 0;
  totalSize = 0;
  pageSize = 6;
  pageOptions = [2, 4, 6];
  name: any;
  fromDate: any;
  toDate: any;
  resumeLists: any;
  resumeArr: any = [];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    public router: Router,
    public cvService: CvServiceService
  ) { }



  ngOnInit(): void {
    this.getResumes();
  }


  public getResumes() {
    this.cvService.getResume(this.currentPage, this.pageSize).then((dist) => {
      this.resumeLists = dist.data;
      // console.log(this.currentPage, this.pageSize)
      // console.log(this.resumeLists)
      this.dataSource = new MatTableDataSource<any>(this.resumeLists);
      this.currentPage = 0;
      this.dataSource.paginator = this.paginator;
      this.totalSize = this.resumeLists.length;
    })
  }

  public deleteResume(data: any) {
    this.cvService.deleteResume(data).then((dist) => {
      this.router.navigate([""]);
    })
    // this.getResumes();
  }

  public search() {
    let payload: any = {};
    this.name ? payload['name'] = this.name : '';
    this.fromDate ? payload['fromDate'] = moment(this.fromDate).format('YYYY/MM/DD') : '';
    this.toDate ? payload['toDate'] = moment(this.toDate).format('YYYY/MM/DD') : '';

    this.cvService.searchResume(this.currentPage, this.pageSize, payload).then((dist) => {
      this.resumeLists = dist.data;
      // console.log(this.resumeLists)
      this.dataSource = this.resumeLists;
      this.currentPage = 0;
      this.totalSize = this.resumeLists.length;
      this.dataSource.paginator = this.paginator;
    })
  }
}
