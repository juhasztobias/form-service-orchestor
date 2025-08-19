# Arquitectura de Orquestación de Dos Capas para Formularios Multi-Paso en Angular

Este documento describe una arquitectura robusta y escalable para la implementación de formularios complejos de múltiples pasos en Angular. El objetivo es que una IA o un desarrollador sin contexto previo pueda comprender los principios y seguir una guía paso a paso para construir un nuevo formulario desde cero utilizando este patrón.

## 📜 Filosofía Principal

El principal desafío de los formularios multi-paso es la gestión del estado, la validación y el flujo de datos. Un enfoque monolítico (un solo componente gigante) es frágil y difícil de mantener.

Esta arquitectura resuelve el problema separando las responsabilidades en dos capas lógicas, como un **director de orquesta y sus músicos**:

  * **El Orquestador (El Director 🧠)**: Un servicio de alto nivel que no conoce los detalles de cada paso, pero dirige el flujo general: sabe qué paso está activo, cuándo pasar al siguiente y cuándo la "sinfonía" (el formulario completo) está lista para ser presentada (enviada).
  * **Los Servicios de Paso (Los Músicos 🧑‍🔧)**: Múltiples servicios, cada uno un experto en su propio dominio (un paso del formulario). Cada uno gestiona su propio `FormGroup`, sus validaciones y su lógica de negocio de forma aislada.

-----

## 🧱 Los Componentes de la Arquitectura

### 1\. La Capa de Orquestación (`FormOrchestratorService`)

Es el cerebro del formulario. Se trata de un servicio de Angular cuya misión es **coordinar**.

**Responsabilidades Clave:**

  * **Gestión del Estado del Paso**: Mantiene el paso actual (ej: `step$`, un `BehaviorSubject`).
  * **Coordinación de la Validación**: Expone observables (`isCurrentStepValid$`, `isFormValid$`) que se derivan del estado de los `Servicios de Paso`.
  * **Consolidación de Datos**: Utiliza `combineLatest` de RxJS para fusionar los valores de todos los `Servicios de Paso` en un único objeto de datos (`payload`) listo para el envío.
  * **Lógica de Navegación y Envío**: Contiene los métodos públicos (`goToNextStep()`, `goToPreviousStep()`, `submit()`) que los componentes de la vista invocan.

> **Importante**: El Orquestador **NO** define ningún `FormControl`. Solo consume información de los servicios de la capa inferior.

-----

### 2\. La Capa de Lógica (`StepFormService`)

Por cada paso del formulario, existe un `StepFormService` dedicado (ej: `PersonalInfoFormService`).

**Responsabilidades Clave:**

  * **Definir el `FormGroup`**: Cada servicio define y gestiona el `FormGroup` para su paso específico, incluyendo todos los `FormControl` y sus validadores.
  * **Encapsular la Lógica de Negocio**: Cualquier validación cruzada (ej: "confirmar contraseña") o lógica compleja vive aquí, completamente aislada de otros pasos.
  * **Manejar `FormArray`**: Si un paso necesita campos dinámicos (ej: "añadir múltiples contactos"), toda la lógica para manipular ese `FormArray` (`add()`, `remove()`) reside dentro de este servicio.

> **¡CRÍTICO\! Aislamiento del Estado**: Estos servicios **NO** se proveen en `root`. Se proveen en el `providers` array del **componente padre/contenedor** del formulario. Esto crea una nueva instancia de los servicios para cada instancia del formulario, evitando colisiones de estado.

-----

### 3\. La Capa de la Vista (Componentes "Tontos")

La UI se divide en un componente padre y múltiples componentes hijos.

  * **Componente Padre/Contenedor**:

      * Es el único componente que inyecta el `FormOrquestatorService`.
      * **Provee todos los servicios** (`FormOrquestatorService` y todos los `StepFormService`) en su decorador `@Component`.
      * Usa `*ngSwitch` o `*ngIf` para mostrar el componente hijo correcto basándose en el `step$` del orquestador.
      * Renderiza los botones de navegación ("Siguiente", "Anterior", "Enviar") y los conecta a los métodos del orquestador.

  * **Componentes Hijos/De Paso**:

      * Son "tontos". Su única responsabilidad es presentar la UI de un paso.
      * Inyectan **únicamente su `StepFormService` correspondiente** (ej: `StepPersonalInfoComponent` inyecta `PersonalInfoFormService`).
      * Enlazan la plantilla al `FormGroup` del servicio con la directiva `[formGroup]`.

-----

## 🚀 Guía de Implementación para una IA (Desde Cero)

Para construir un nuevo formulario multi-paso, sigue estos pasos:

**Paso 1: Definir los Pasos del Formulario**
Primero, identifica las secciones lógicas del formulario. Ejemplo:

1.  Datos del Cliente.
2.  Dirección de Envío.
3.  Items del Pedido (`FormArray`).

**Paso 2: Crear un `StepFormService` para cada Paso**
Para cada paso definido, crea un servicio. No olvides que es un `@Injectable()` sin `providedIn: 'root'`.

```typescript
// services/client-data-form.service.ts
import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Injectable()
export class ClientDataFormService {
  public readonly form: FormGroup;
  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
    });
  }
}
```

**Paso 3: Crear el `FormOrchestratorService`**
Crea el servicio orquestador. Inyecta todos los `StepFormService` que creaste.

```typescript
// services/form-orchestrator.service.ts
import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, combineLatest } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
// Importa todos tus StepFormServices aquí...
import { ClientDataFormService } from './client-data-form.service';

@Injectable()
export class FormOrchestratorService {
  // 1. Inyecta los servicios de paso
  private clientDataService = inject(ClientDataFormService);
  // ... inyecta los demás

  // 2. Agrúpalos en un array
  private stepForms = [this.clientDataService.form, /*... los demás .form */];
  
  // 3. Define la lógica de estado y navegación
  private step$$ = new BehaviorSubject<number>(1);
  public step$ = this.step$$.asObservable();

  // 4. Define los observables de validación y el método submit()
  // ... (puedes usar el código de los ejemplos anteriores como base)
}
```

**Paso 4: Crear los Componentes Hijos**
Para cada paso, crea un componente "tonto".

```typescript
// components/step-client-data/step-client-data.component.ts
import { Component, inject } from '@angular/core';
import { ClientDataFormService } from '../../services/client-data-form.service';
// ... otras importaciones como ReactiveFormsModule

@Component({ /* ... */ })
export class StepClientDataComponent {
  public formService = inject(ClientDataFormService);
}
```

Y su HTML:

```html
<form [formGroup]="formService.form">
  </form>
```

**Paso 5: Crear el Componente Padre**
Este es el componente principal que el usuario verá.

```typescript
// components/main-form/main-form.component.ts
import { Component, inject } from '@angular/core';
// ... Importa todos los servicios y componentes
import { FormOrchestratorService } from '../services/form-orchestrator.service';
import { ClientDataFormService } from '../services/client-data-form.service';

@Component({
  selector: 'app-main-form',
  // ...
  // ¡¡LO MÁS IMPORTANTE!!
  providers: [
    FormOrchestratorService,
    ClientDataFormService,
    // ... todos los demás servicios
  ],
})
export class MainFormComponent {
  public orchestrator = inject(FormOrchestratorService);
}
```

Y su HTML:

```html
<div [ngSwitch]="orchestrator.step$ | async">
  <app-step-client-data *ngSwitchCase="1"></app-step-client-data>
  </div>

<div class="navigation-buttons">
  <button (click)="orchestrator.goToPreviousStep()">Anterior</button>
  <button (click)="orchestrator.goToNextStep()">Siguiente</button>
  <button (click)="orchestrator.submit()">Enviar</button>
</div>
```

Siguiendo estos pasos, se puede construir cualquier formulario multi-paso de manera consistente, mantenible y escalable.