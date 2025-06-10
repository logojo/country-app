import { Component, effect, input, linkedSignal, output, signal } from '@angular/core';

@Component({
  selector: 'country-input-search',
  imports: [],
  templateUrl: './input-search.component.html',
  styles: ``
})
export class InputSearchComponent {
  placeholder =  input<string>('Buscar...');
  debounceTime = input(500)
  initialValue = input<string>('');

  value =  output<string>();

  //* el linkedSignal me permite  inicializar una señal con algun tipo de proceso
  //* cuando se tiene una señal que debe ser inicializada con un proceso se usa el link signal
  inputValue = linkedSignal<string>(() => this.initialValue());

  debounceEffect = effect(( onCleanup ) => {
      const value = this.inputValue();

      const timeout = setTimeout(() => {      
        this.value.emit(value);
      }, this.debounceTime());

      //*Esto permite limpiar todas los cambios de la señal y dejar el ultimo valor
      //* si no se hace esto el timeout solo esperaria 500 milisegundos y se realizaria todas las peticiones por letra tecleada
      onCleanup(() => {
        clearTimeout( timeout );
      })
  });

}
