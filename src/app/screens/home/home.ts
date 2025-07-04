import { Component } from '@angular/core';
import {Heading} from '../../components/heading/heading';
import {TranslatePipe} from '@ngx-translate/core';

@Component({
  selector: 'syd-home-screen',
  imports: [
    Heading,
    TranslatePipe
  ],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class Home {

}
