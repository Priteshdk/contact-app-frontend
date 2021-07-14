import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatSort } from '@angular/material';
import { ApiService } from 'src/app/modules/core';

export interface Element {
  firstName: number,
  lastName: string,
  email: string,
  phoneNumber: string
}

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit {
  dataSource;
  totalRecords:any = 0;
  pageIndex:any = 0;
  displayedColumns = [];

  /**
   * Pre-defined columns list for contact table
   */
  columnNames = [{
    id: 'firstName',
    value: 'First Name.',
  }, {
    id: 'lastName',
    value: 'Last Name',
  },
  {
    id: 'email',
    value: 'Email',
  },
  {
    id: 'phoneNumber',
    value: 'Phone Number',
  },
  {
    id: 'action',
    value: 'Action',
  }];

  constructor(
    private apiService: ApiService
  ){

  }

  /* This function is for initialized the intial data*/
  ngOnInit() {
    this.displayedColumns = this.columnNames.map(x => x.id);
    this.createTable();
  }

  /* This function is for calling the list information service and fetch the data and set it to table*/
  createTable() {
    const httpOptions = {
      observe: 'response',
      // params
    };
    this.apiService.get(`/contact?page=${this.pageIndex}`, httpOptions)
      .subscribe(
        (response: any) => {
          this.dataSource = new MatTableDataSource(response.body.contacts);
          this.totalRecords = response.body.totalRecords;
        },
        error => {
          
        });
  }

  /* This function is for capturing the pagination current page*/
  getServerData(event){
    this.pageIndex = event.pageIndex;
    this.createTable();
  }

  /* This function is for deleting the record*/
  delete(id){
    if(confirm("Are you sure to delete this contact?")) {
      this.apiService.delete(`/contact/${id}`)
        .subscribe(
          (response: any) => {
            this.pageIndex = 0;
            this.createTable();
          },
          error => {
            
          });
    }
  }
}
