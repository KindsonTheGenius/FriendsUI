import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
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
