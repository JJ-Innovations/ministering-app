import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class NerdService {

  constructor(private http:HttpClient) { }

  getNerds() {
    return this.http.get('http://localhost:8080/app/nerds');
  }

}
