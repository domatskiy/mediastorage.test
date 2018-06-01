import { NgModule } from '@angular/core';

import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';
import { SendFileComponent } from './sendFile.component';
import { GetFileComponent } from './getFile.component';

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
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }
