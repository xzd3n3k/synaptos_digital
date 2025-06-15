import {Component, inject, signal} from '@angular/core';
import {TranslatePipe, TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'syd-about',
  imports: [
    TranslatePipe
  ],
  templateUrl: './about.html',
  styleUrl: './about.scss'
})
export class About {
  private readonly translateService = inject(TranslateService);

  protected readonly textParagraphs = signal<string[]>([]);

  constructor() {
    this.translateService.get('i18n.about.story').subscribe(text => {
      this.textParagraphs.set(text.split('\n\n'));
    })
  }
}
