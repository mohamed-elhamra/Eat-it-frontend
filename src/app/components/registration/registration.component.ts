import { Component, OnInit } from '@angular/core';
import { CountryISO } from 'ngx-intl-tel-input';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
})
export class RegistrationComponent implements OnInit {

  preferedCountries = [CountryISO.Morocco];

  constructor() { }

  ngOnInit(): void { }
}
