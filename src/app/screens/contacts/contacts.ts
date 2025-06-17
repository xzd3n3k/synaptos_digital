import { Component } from '@angular/core';
import {Heading} from "../../components/heading/heading";
import {TranslatePipe} from "@ngx-translate/core";
import {Icon} from '../../components/icon/icon';

@Component({
  selector: 'syd-contacts',
  imports: [
    Heading,
    TranslatePipe,
    Icon
  ],
  templateUrl: './contacts.html',
  styleUrl: './contacts.scss'
})
export class Contacts {

}
