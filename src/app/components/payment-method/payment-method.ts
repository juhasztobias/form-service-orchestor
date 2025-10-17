import { Component, inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { PaymentMethodFormService } from './payment-method.service';

@Component({
  selector: 'app-payment-method',
  standalone: true,
  imports: [
    ReactiveFormsModule, 
    MatFormFieldModule, 
    MatInputModule, 
    MatButtonModule,
    MatSelectModule,
    MatIconModule,
    MatCardModule
  ],
  templateUrl: './payment-method.html',
  styleUrl: './payment-method.scss'
})
export class StepPaymentMethodComponent {
  public formService = inject(PaymentMethodFormService);

  addPaymentMethod(): void {
    this.formService.addPaymentMethod();
  }

  removePaymentMethod(index: number): void {
    this.formService.removePaymentMethod(index);
  }
}
