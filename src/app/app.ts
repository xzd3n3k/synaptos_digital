import {Component, inject, signal} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {TranslateModule, TranslateService} from '@ngx-translate/core';
import {LanguageSelector} from './components/language-selector/language-selector';
import {Navbar} from './components/navbar/navbar';

@Component({
  selector: 'syd-root',
  imports: [
    RouterOutlet,
    TranslateModule,
    LanguageSelector,
    Navbar,
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  private readonly translateService = inject(TranslateService);

  protected readonly currentYear = signal(new Date().getFullYear());

  constructor() {
    this.translateService.addLangs(['en', 'cs', 'sk']);
    this.translateService.setDefaultLang('cs');

    const savedLang = localStorage.getItem('lang');

    if (savedLang) {
      this.switchLang(savedLang);
      return;
    }

    const browserLang = this.translateService.getBrowserLang();
    this.translateService.use(browserLang?.match(/en|cs|sk/) ? browserLang : 'cs');
  }

  switchLang(lang: string) {
    this.translateService.use(lang);
  }
}
