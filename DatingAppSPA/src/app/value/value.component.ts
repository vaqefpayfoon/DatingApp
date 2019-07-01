import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/Rx';

@Component({
  selector: 'app-value',
  templateUrl: './value.component.html',
  styleUrls: ['./value.component.css']
})
export class ValueComponent implements OnInit {

  constructor(private http: HttpClient) { }
  values: Value[] = [];
  ngOnInit() {
    this.getValues();
  }
  getValues() {
    this.http.get<Value[]>('https://localhost:5001/api/values', {
      observe: 'body',
      responseType: 'json'
    }).subscribe(
      (response) => {
        console.log(response);
        this.values = response;
      }
    );
  }
}
interface Value {
  id: number;
  name: string;
}
