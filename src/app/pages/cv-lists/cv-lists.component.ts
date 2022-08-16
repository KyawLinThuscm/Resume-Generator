import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';

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
  pageSizes = 2;
  currentPage = 0;
  totalSize = 0;
  employeelist: any = [
    { name: 'KLT', created_at: '8/15/2022'},
    { name: 'test06', created_at: '8/15/2022'},
    { name: 'test01', created_at: '8/15/2022'},
    { name: 'test02', created_at: '8/15/2022'},
    { name: 'test03', created_at: '8/15/2022'},
    { name: 'test04', created_at: '8/15/2022'},
    { name: 'test05', created_at: '8/15/2022'},
  ];
  data: any;
  name = "";
  fromDate: any;
  toDate: any;

  constructor(public router: Router) { }

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource<any>(this.employeelist);
    this.currentPage = 0;
    this.totalSize = this.employeelist.length;
  }

}
