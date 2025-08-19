import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MainFormComponent } from './components/main-form/main-form';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MainFormComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('form-service');
}
