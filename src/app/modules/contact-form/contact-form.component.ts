import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from 'src/app/modules/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.css']
})
export class ContactFormComponent implements OnInit {
  contactForm: FormGroup;
  @Input() redirectFrom;
  contactId:any;
  emailRegx = /^(([^<>+()\[\]\\.,;:\s@"-#$%&=]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,3}))$/;
  constructor(
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    private router: Router
  ) { }

  ngOnInit() {    
    // This is a form builder for the contact form
    this.contactForm = this.formBuilder.group({
      firstName: [null, Validators.required],
      lastName: [null, Validators.required],
      email: [null, [Validators.required, Validators.pattern(this.emailRegx)]],
      phoneNumber: [null, [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
    });
    // This method checks the request is coming from edit/create
    if (this.redirectFrom === 'edit') {
      this.contactId =this.router.url.split('/')[2]; 
      const httpOptions = {
        observe: 'response',
      };
      // This method is for fetching a single contact info
      this.apiService.get(`/contact/${this.contactId}`, httpOptions)
        .subscribe(
          (response: any) => {
            // This method is for setting a contact info to input fields
            this.contactForm.patchValue({
              firstName:response.body.firstName,
              lastName: response.body.lastName,
              phoneNumber: response.body.phoneNumber,
              email: response.body.email
           })
          },
          error => {
            
          });
    }
  }
  // This method is for submitting the contact info
  submit() {
    if (!this.contactForm.valid) {
      return;
    } else {
      const httpOptions = {
        observe: 'response',
      };
      // This method is for adding a contact info
      if(this.redirectFrom==='create'){
        this.apiService.post(`/contact`, this.contactForm.value, httpOptions)
        .subscribe(
          (response: any) => {
            alert('Contact added successfully')
            this.router.navigateByUrl('/');
          },
          error => {
            
          });
      }else{
        // This method is for updating a contact info
        this.apiService.put(`/contact/${this.contactId}`, this.contactForm.value, httpOptions)
        .subscribe(
          (response: any) => {
            alert('Contact updated successfully')
            this.router.navigateByUrl('/');
          },
          error => {
            
          });
      }
    }
  }

}
