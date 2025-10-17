import { Component, inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ClientDataFormService } from './client-data.service';

@Component({
  selector: 'app-client-data',
  standalone: true,
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule],
  templateUrl: './client-data.html',
  styleUrl: './client-data.scss'
})
export class StepClientDataComponent {
  public formService = inject(ClientDataFormService);
}
