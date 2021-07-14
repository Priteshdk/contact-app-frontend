import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContactListComponent } from './modules/contact-list/contact-list.component';
import { EditContactComponent } from './modules/edit-contact/edit-contact.component';
import { CreateContactComponent } from './modules/create-contact/create-contact.component';

const routes: Routes = [
  { path: '', redirectTo: 'contact', pathMatch: 'full' },
  { path: 'contact', component: ContactListComponent },
  { path: 'create', component: CreateContactComponent },
  { path: 'edit/:id', component: EditContactComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
