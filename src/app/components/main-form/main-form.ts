import { AsyncPipe, NgSwitch, NgSwitchCase } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { ClientDataFormService } from '../../services/client-data-form';
import { FormOrchestratorService } from '../../services/form-orchestrator';
import { PaymentMethodFormService } from '../../services/payment-method-form';
import { ShippingAddressFormService } from '../../services/shipping-address-form';
import { StepClientDataComponent } from '../step-client-data/step-client-data';
import { StepPaymentMethodComponent } from '../step-payment-method/step-payment-method';
import { StepShippingAddressComponent } from '../step-shipping-address/step-shipping-address';

@Component({
  selector: 'app-main-form',
  standalone: true,
  imports: [
    NgSwitch,
    NgSwitchCase,
    AsyncPipe,
    MatButtonModule,
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
