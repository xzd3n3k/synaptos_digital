import { Component } from '@angular/core';
import {ShowcaseCard} from '../../components/showcase-card/showcase-card';
import {TranslatePipe} from '@ngx-translate/core';

@Component({
  selector: 'syd-our-services',
  imports: [
    ShowcaseCard,
    TranslatePipe
  ],
  templateUrl: './our-services.html',
  styleUrl: './our-services.scss'
})
export class OurServices {

}
