import {Component, computed, inject, OnInit, signal, WritableSignal} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {Language} from '../../shared/models/language.model';
import { isMobile } from '../../shared/utils/device.util';
import {Button} from '../button/button';
import {Icon} from '../icon/icon';
import {Popup} from '../popup/popup';
import {MenuItem} from '../menu-item/menu-item';

@Component({
  selector: 'syd-language-selector',
  imports: [
    Button,
    Icon,
    Popup,
    MenuItem
  ],
  templateUrl: './language-selector.html',
  styleUrl: './language-selector.scss'
})
export class LanguageSelector implements OnInit {
  private readonly translateService = inject(TranslateService);
  protected readonly isMobile = isMobile;

  protected readonly languages: WritableSignal<Language[]> = signal([
    { code: 'en', label: 'English', flag: 'united_kingdom_icon', active: false },
    { code: 'cs', label: 'Čeština', flag: 'czechia_icon', active: false },
    { code: 'sk', label: 'Slovenčina', flag: 'slovakia_icon', active: false },
  ]);

  protected readonly currentLanguage = computed(() => {
    return this.languages().find(language => language.active)
  });

  ngOnInit() {
    this.updateLanguages(this.translateService.currentLang);
  }

  protected switchLanguage(languageCode: string) {
    this.updateLanguages(languageCode);
    localStorage.setItem('lang', languageCode);
    this.translateService.use(languageCode);
  }

  private updateLanguages(languageCode: string) {
    const updated = this.languages().map(lang => ({
      ...lang,
      active: lang.code === languageCode,
    }));
    this.languages.set(updated);
  }
}
