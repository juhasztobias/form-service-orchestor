import { Component, inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ClientDataFormService } from '../../services/client-data-form';

@Component({
  selector: 'app-step-client-data',
  standalone: true,
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule],
  templateUrl: './step-client-data.html',
  styleUrl: './step-client-data.scss'
})
export class StepClientDataComponent {
  public formService = inject(ClientDataFormService);
}
