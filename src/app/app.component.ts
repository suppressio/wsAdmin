import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {

  constructor(private http: HttpClient) { }

  execScript(){
    let url = 'http://localhost:8080/test';
    return this.http.get(url).subscribe({
      next: data => {
          data;
      },
      error: error => {
          error.message;
          console.error('Error!', error);
      }
    });

  }

}