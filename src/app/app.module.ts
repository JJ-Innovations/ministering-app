import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NerdService } from './nerd.service';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: AppComponent
  }
];


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(routes)
  ],
  providers: [NerdService],
  bootstrap: [AppComponent]
})
export class AppModule { }
