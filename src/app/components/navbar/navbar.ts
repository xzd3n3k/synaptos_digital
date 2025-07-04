import {Component, ElementRef, inject, signal, viewChild, WritableSignal} from '@angular/core';
import { isMobile, isSmallDevice } from '../../shared/utils/device.util';
import {NavBarLink} from '../../shared/models/nav-bar-link.model';
import {Router, RouterLink} from '@angular/router';
import {TranslatePipe} from '@ngx-translate/core';
import {Button} from '../button/button';
import {Icon} from '../icon/icon';

@Component({
  selector: 'syd-navbar',
  imports: [
    RouterLink,
    TranslatePipe,
    Button,
    Icon
  ],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss'
})
export class Navbar {
  protected readonly router = inject(Router);

  private readonly navRef = viewChild.required<ElementRef>('navRef');

  protected readonly isSmallDevice = isSmallDevice;
  protected readonly isMobile = isMobile;

  protected readonly navLinks: WritableSignal<NavBarLink[]> = signal([
    { label: 'i18n.navbar.home', route: '/home', clickFunction: () => this.toggleNavbar() },
    { label: 'FAQ', route: '/faq', clickFunction: () => this.toggleNavbar(), disabled: true },
    { label: 'i18n.navbar.about', route: '/about', clickFunction: () => this.toggleNavbar() },
    { label: 'i18n.navbar.services', route: '/our-services', clickFunction: () => this.toggleNavbar() },
    { label: 'i18n.navbar.contacts', route: '/contacts', clickFunction: () => this.toggleNavbar() },
  ]);

  protected toggleNavbar() {
    if (this.isSmallDevice()) {
      this.navRef().nativeElement.classList.toggle('responsive_nav');
    }
  }
}
