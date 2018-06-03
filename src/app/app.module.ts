import { NgModule } from '@angular/core';

import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { LocalStorageModule } from '@ngx-pwa/local-storage';

import { AppComponent } from './app.component';
import { SendFileComponent } from './sendFile/sendFile.component';
import { GetFileComponent } from './getFile/getFile.component';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { APIHttpInterceptor } from './api/HttpInterceptor';

const routes: Routes = [
    {
        path: '',
        component: SendFileComponent // useAsDefault: true
    },
    {
        path: 'uploaded/:user_hash/:file_hash',
        component: GetFileComponent // useAsDefault: true
    }
]

@NgModule({
  declarations: [
    AppComponent, SendFileComponent, GetFileComponent
  ],
  exports: [
    RouterModule
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    LocalStorageModule,
    RouterModule.forRoot(routes)
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: APIHttpInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
