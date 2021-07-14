import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from 'src/app/modules/core/core.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ContactListComponent } from './modules/contact-list/contact-list.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule,MatButtonModule,MatFormFieldModule, MatInputModule, MatGridListModule, MatCardModule, MatRadioModule, MatPaginatorModule } from '@angular/material';
import { HttpClientModule } from '@angular/common/http';
import { CreateContactComponent } from './modules/create-contact/create-contact.component';
import { EditContactComponent } from './modules/edit-contact/edit-contact.component';
import { ContactFormComponent } from './modules/contact-form/contact-form.component';


@NgModule({
  declarations: [
    AppComponent,
    ContactListComponent,
    CreateContactComponent,
    EditContactComponent,
    ContactFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatButtonModule,
    HttpClientModule,
    MatFormFieldModule,
    MatInputModule,
    MatGridListModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatRadioModule,
    MatPaginatorModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
