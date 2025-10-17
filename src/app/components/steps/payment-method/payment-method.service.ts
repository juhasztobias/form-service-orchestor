import { Injectable } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Injectable()
export class PaymentMethodFormService {
  public readonly form: FormGroup;
  private nextId = 1;
  
  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      paymentMethods: this.fb.array([])
    });
    
    // Agregar un método de pago inicial
    this.addPaymentMethod();
  }

  get paymentMethodsArray(): FormArray {
    return this.form.get('paymentMethods') as FormArray;
  }

  createPaymentMethodGroup(): FormGroup {
    const group = this.fb.group({
      id: [this.nextId++], // ID único para tracking
      cardNumber: ['', [Validators.required, Validators.pattern('^[0-9]{16}$')]],
      expirationDate: ['', [Validators.required, Validators.pattern('^(0[1-9]|1[0-2])\/?([0-9]{2})$')]],
      cardType: ['credit', Validators.required]
    });
    return group;
  }

  addPaymentMethod(): void {
    this.paymentMethodsArray.push(this.createPaymentMethodGroup());
  }

  removePaymentMethod(index: number): void {
    if (this.paymentMethodsArray.length > 1) {
      this.paymentMethodsArray.removeAt(index);
    }
  }

  getPaymentMethodAt(index: number): FormGroup {
    return this.paymentMethodsArray.at(index) as FormGroup;
  }
}
