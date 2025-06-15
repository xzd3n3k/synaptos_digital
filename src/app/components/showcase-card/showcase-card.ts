import {Component, input} from '@angular/core';
import {Icon} from '../icon/icon';
import {TranslatePipe} from '@ngx-translate/core';

@Component({
  selector: 'syd-showcase-card',
  imports: [
    Icon,
    TranslatePipe
  ],
  templateUrl: './showcase-card.html',
  styleUrl: './showcase-card.scss'
})
export class ShowcaseCard {
  readonly title = input('');
  readonly icon = input('');
}
