import {Component, ElementRef, inject, input} from '@angular/core';
import {ButtonVariant} from '../../shared/models/button-variant.type';
import {ButtonSize} from '../../shared/models/button-size.type';
import {ButtonShape} from '../../shared/models/button-shape.type';

@Component({
  selector: 'syd-button',
  imports: [],
  templateUrl: './button.html',
  styleUrl: './button.scss'
})
export class Button {
  readonly variant = input<ButtonVariant>('primary');
  readonly size = input<ButtonSize>('normal');
  readonly disabled = input<boolean>(false);
  readonly shape = input<ButtonShape>('rounded');
  readonly outline = input(false);

  readonly element: HTMLElement;

  private readonly hostElementRef = inject(ElementRef);

  constructor() {
    this.element = this.hostElementRef.nativeElement;
  }
}
