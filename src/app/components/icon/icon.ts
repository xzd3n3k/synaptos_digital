import {Component, effect, inject, input, signal, WritableSignal} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {DomSanitizer, SafeHtml} from '@angular/platform-browser';
import {take} from 'rxjs';

@Component({
  selector: 'syd-icon',
  imports: [],
  templateUrl: './icon.html',
  styleUrl: './icon.scss'
})
export class Icon {
  readonly name = input.required<string>();
  readonly size = input<number>(32);
  readonly color = input<string>('currentColor');

  private readonly http = inject(HttpClient);
  private readonly sanitizer = inject(DomSanitizer);

  protected readonly svgContent: WritableSignal<SafeHtml | null> = signal(null);

  constructor() {
    effect(() => {
      if (this.name()) {
        const url = `assets/icons/${this.name()}.svg`;

        this.http.get(url, { responseType: 'text' })
          .pipe(take(1))
          .subscribe({
            next: (svg: string) => {
              this.svgContent.set(
                this.sanitizer.bypassSecurityTrustHtml(svg)
              );
            },
            error: () => {
              console.error(`SVG not found: ${url}`);
              this.svgContent.set(null);
            }
          });
      } else {
        this.svgContent.set(null);
      }
    });
  }
}
