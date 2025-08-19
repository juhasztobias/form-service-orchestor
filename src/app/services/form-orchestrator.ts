import { Injectable, inject } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { BehaviorSubject, combineLatest, of } from 'rxjs';
import { map, startWith, switchMap } from 'rxjs/operators';
import { ClientDataFormService } from './client-data-form';
import { PaymentMethodFormService } from './payment-method-form';
import { ShippingAddressFormService } from './shipping-address-form';

@Injectable()
export class FormOrchestratorService {
  private clientDataService = inject(ClientDataFormService);
  private shippingAddressService = inject(ShippingAddressFormService);
  private paymentMethodService = inject(PaymentMethodFormService);

  private stepForms = [
    this.clientDataService.form,
    this.shippingAddressService.form,
    this.paymentMethodService.form
  ];

  private step$$ = new BehaviorSubject<number>(1);
  public step$ = this.step$$.asObservable();

  public isCurrentStepValid$ = this.step$.pipe(
    switchMap(step => {
      const currentForm = this.stepForms[step - 1];
      if (!currentForm) {
        return of(false);
      }
      return currentForm.statusChanges.pipe(
        startWith(currentForm.status),
        map(status => status === 'VALID')
      );
    })
  );

  public isFormValid$ = combineLatest(
    this.stepForms.map(form => form.statusChanges.pipe(startWith(form.status)))
  ).pipe(
    map(statuses => statuses.every(status => status === 'VALID'))
  );

  private get payload() {
    return this.stepForms.reduce((acc, form) => ({ ...acc, ...form.value }), {});
  }

  public goToNextStep(): void {
    if (this.step$$.value < this.stepForms.length) {
      this.step$$.next(this.step$$.value + 1);
    }
  }

  public goToPreviousStep(): void {
    if (this.step$$.value > 1) {
      this.step$$.next(this.step$$.value - 1);
    }
  }

  public submit(): void {
    if (this.stepForms.every(form => form.valid)) {
      console.log('Form Submitted:', this.payload);
      // Aquí iría la lógica de envío a un backend
    } else {
      console.error('Form is invalid');
      this.markAllAsTouched(this.stepForms);
    }
  }

  private markAllAsTouched(controls: (AbstractControl | FormGroup)[]): void {
    controls.forEach(control => {
      if ('controls' in control) {
        this.markAllAsTouched(Object.values((control as FormGroup).controls));
      }
      control.markAsTouched();
    });
  }
}
