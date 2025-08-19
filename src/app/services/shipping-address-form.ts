import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Injectable()
export class ShippingAddressFormService {
  public readonly form: FormGroup;
  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      address: ['', Validators.required],
      city: ['', Validators.required],
      zipCode: ['', [Validators.required, Validators.pattern('^[0-9]{5}$')]],
    });
  }
}
