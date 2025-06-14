import {Component, input} from '@angular/core';

@Component({
  selector: 'syd-heading',
  imports: [],
  templateUrl: './heading.html',
  styleUrl: './heading.scss'
})
export class Heading {
  readonly textColor = input('currentColor');

  resolveColor(value: string): string {
    if (value?.startsWith('--')) {
      return `var(${value})`;
    }
    return value || 'currentColor';
  }
}
