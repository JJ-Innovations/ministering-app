import { Component } from '@angular/core';
import { NerdService } from './nerd.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  nerds;

  constructor(private nerdService:NerdService) { }

  ngOnInit() {
    this.nerdService.getNerds().subscribe(
      data => {this.nerds = data},
      err => {console.log(err)},
      () => {console.log('finished with getNerds() call')}
    );
  }
}
