import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { ProductListComponent } from './product-list/product-list.component';
import { CreateUpdateProductComponent } from './create-update-product/create-update-product.component';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
    CreateUpdateProductComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    ProductListComponent,
    CreateUpdateProductComponent,
    MatButtonModule, 
    MatDialogModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
