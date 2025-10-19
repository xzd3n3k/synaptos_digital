import { Component } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { Address, PersonData } from './FormDataType';

@Component({
  selector: 'app-form',
  imports: [
    ReactiveFormsModule,

  ],
  templateUrl: './form.html',
  styleUrl: './form.scss'
})
export class Form {

  protected formGroup: FormGroup;

  personDefault: PersonData = {
    name: '',
    surname: '',
    address: {
      street: '',
      houseNumber: null,
      city: '',
      postalCode: null,
      country: '',
    }
  }

  constructor() {

    this.formGroup = new FormGroup({
      name: new FormControl<string>(this.personDefault.name),
      surname: new FormControl<string>(this.personDefault.surname),
      address: new FormGroup({
        street: new FormControl<string>(this.personDefault.address.street),
        houseNumber: new FormControl<number | null>(this.personDefault.address.houseNumber),
        city: new FormControl<string>(this.personDefault.address.city),
        postalCode: new FormControl<number | null>(this.personDefault.address.postalCode),
        country: new FormControl<string>(this.personDefault.address.country)
      })
    })

  }


  onSubmit(): void {
    console.log(this.formGroup.value);
  }

}
