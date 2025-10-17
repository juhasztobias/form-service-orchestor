import { AsyncPipe, NgSwitch, NgSwitchCase } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { StepClientDataComponent } from '../steps/client-data/client-data';
import { ClientDataFormService } from '../steps/client-data/client-data.service';
import { StepPaymentMethodComponent } from '../steps/payment-method/payment-method';
import { PaymentMethodFormService } from '../steps/payment-method/payment-method.service';
import { StepShippingAddressComponent } from '../steps/shipping-address/shipping-address';
import { ShippingAddressFormService } from '../steps/shipping-address/shipping-address.service';
import { FormOrchestratorService } from './main-form.service';

@Component({
  selector: 'app-main-form',
  standalone: true,
  imports: [
    NgSwitch,
    NgSwitchCase,
    AsyncPipe,
    MatButtonModule,
    RouterLink,
    StepClientDataComponent,
    StepShippingAddressComponent,
    StepPaymentMethodComponent,
  ],
  templateUrl: './main-form.html',
  styleUrl: './main-form.scss',
  providers: [
    FormOrchestratorService, 
    ClientDataFormService,
    ShippingAddressFormService,
    PaymentMethodFormService
  ],
})
export class MainFormComponent {
  public orchestrator = inject(FormOrchestratorService);
}
