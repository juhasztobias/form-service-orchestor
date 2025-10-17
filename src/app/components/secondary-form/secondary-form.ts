import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { StepClientDataComponent } from '../steps/client-data/client-data';
import { ClientDataFormService } from '../steps/client-data/client-data.service';

@Component({
  selector: 'app-secondary-form',
  standalone: true,
  imports: [
    MatButtonModule,
    StepClientDataComponent
  ],
  templateUrl: './secondary-form.html',
  styleUrl: './secondary-form.scss',
  providers: [ClientDataFormService],
})
export class SecondaryFormComponent {
  private clientDataService = inject(ClientDataFormService);
  private router = inject(Router);

  get isFormValid(): boolean {
    return this.clientDataService.form.valid;
  }

  onSubmit(): void {
    if (this.clientDataService.form.valid) {
      console.log('Secondary Form Submitted:', this.clientDataService.form.value);
      alert('¡Formulario enviado exitosamente!');
      
      // Opcional: navegar de vuelta al formulario principal
      this.router.navigate(['/']);
    } else {
      this.clientDataService.form.markAllAsTouched();
    }
  }

  goToMainForm(): void {
    this.router.navigate(['/']);
  }
}
