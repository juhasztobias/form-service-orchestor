import { Component, inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ShippingAddressFormService } from '../../services/shipping-address-form';

@Component({
  selector: 'app-step-shipping-address',
  standalone: true,
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule],
  templateUrl: './step-shipping-address.html',
  styleUrl: './step-shipping-address.scss'
})
export class StepShippingAddressComponent {
  public formService = inject(ShippingAddressFormService);
}
