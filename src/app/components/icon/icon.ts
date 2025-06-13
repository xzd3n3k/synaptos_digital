import {Component, inject, input, OnChanges, signal, WritableSignal} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {DomSanitizer, SafeHtml} from '@angular/platform-browser';
import {take} from 'rxjs';

@Component({
  selector: 'syd-icon',
  imports: [],
  templateUrl: './icon.html',
  styleUrl: './icon.scss'
})
export class Icon implements OnChanges {
  readonly name = input.required<string>();
  readonly size = input<number>(32);
  readonly height = input<number | undefined>();
  readonly color = input<string>('currentColor');

  private readonly http = inject(HttpClient);
  private readonly sanitizer = inject(DomSanitizer);

  protected readonly svgContent: WritableSignal<SafeHtml | null> = signal(null);

  ngOnChanges(): void {
    if (this.name()) {
      const url = `assets/icons/${this.name()}.svg`;
      const colorValue = this.color();
      const sizeValue = this.size();

      this.http.get(url, { responseType: 'text' })
        .pipe(take(1))
        .subscribe({
          next: (svg: string) => {
            let processedSvg = svg;

            if (colorValue && colorValue !== 'rawIcon') {
              processedSvg = processedSvg
                .replace(/fill=".*?"/gi, `fill="${colorValue}"`)
                .replace(/stroke=".*?"/gi, `stroke="${colorValue}"`);

              processedSvg = processedSvg.replace(
                /<(path|circle|rect|polygon|line|ellipse)(\s|>)/gi,
                `<$1 fill="${colorValue}" stroke="${colorValue}" `
              );
            }

            // if height is not set, use classic size
            if (!this.height()) {
              processedSvg = processedSvg
                .replace(/width=".*?"/i, `width="${sizeValue}"`)
                .replace(/height=".*?"/i, `height="${sizeValue}"`);
            } else {
              // else if height is set, let css set width automatically
              processedSvg = processedSvg
                .replace(/width=".*?"/i, '')
                .replace(/height=".*?"/i, `height="${this.height()}"`);
            }

            this.svgContent.set(
              this.sanitizer.bypassSecurityTrustHtml(processedSvg)
            );
          },
          error: () => {
            console.error(`SVG not found: ${url}`);
            this.svgContent.set(null);
          }
        });
    }
  }
}
