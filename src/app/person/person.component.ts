import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.css']
})
export class PersonComponent implements OnInit {
  countries: string[];
  message: string;

  constructor() { }

  ngOnInit(): void {
    this.countries = ['Nigeria', 'USA', 'Hungary', 'Ghana', 'Canada', 'India'];
  }

  onSubmit(f: NgForm) {
   if (f.valid) {
     this.message = 'The form is VALID';
   }
   if (f.invalid){
     this.message = 'The form is INVALID';
   }
  }
}
