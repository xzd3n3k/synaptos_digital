import { Component } from '@angular/core';
import {Button} from '../../components/button/button';
import {DesignSystemCard} from './design-system-card/design-system-card';

@Component({
  selector: 'syd-design-system',
  imports: [
    Button,
    DesignSystemCard
  ],
  templateUrl: './design-system.html',
  styleUrl: './design-system.scss'
})
export class DesignSystem {

}
