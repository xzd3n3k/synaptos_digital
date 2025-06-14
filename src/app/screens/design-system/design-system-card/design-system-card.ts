import {Component, input} from '@angular/core';

@Component({
  selector: 'syd-design-system-card',
  imports: [],
  templateUrl: './design-system-card.html',
  styleUrl: './design-system-card.scss'
})
export class DesignSystemCard {
  readonly name = input('');
  readonly description = input('');
}
