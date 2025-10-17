import { Component, inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ShippingAddressFormService } from './shipping-address.service';

@Component({
  selector: 'app-shipping-address',
  standalone: true,
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule],
  templateUrl: './shipping-address.html',
  styleUrl: './shipping-address.scss'
})
export class StepShippingAddressComponent {
  public formService = inject(ShippingAddressFormService);
}
