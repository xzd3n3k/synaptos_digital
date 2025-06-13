import {
  AfterViewInit,
  Component, DestroyRef,
  inject,
  input,
  OnDestroy, signal,
  TemplateRef,
  viewChild,
  ViewContainerRef
} from '@angular/core';
import {ConnectedPosition, Overlay, OverlayRef} from '@angular/cdk/overlay';
import {TemplatePortal} from '@angular/cdk/portal';
import {fromEvent, Subscription, take} from 'rxjs';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';

@Component({
  selector: 'syd-popup',
  imports: [],
  templateUrl: './popup.html',
  styleUrl: './popup.scss'
})
export class Popup implements AfterViewInit, OnDestroy {
  readonly triggerElement = input<HTMLElement>();
  readonly origin = input.required<HTMLElement>();

private readonly popupTemplate = viewChild.required<TemplateRef<any>>('popupTemplate');

private readonly overlay = inject(Overlay);
private readonly vcr = inject(ViewContainerRef);
private readonly destroyRef = inject(DestroyRef);

private overlayRef!: OverlayRef;
private clickSubscription: Subscription = new Subscription();
private readonly isOpen = signal(false);

  ngAfterViewInit(): void {
    const trigger = this.triggerElement() ?? this.origin();

    this.clickSubscription.add(
      fromEvent(trigger, 'click')
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe(() => this.toggle())
    );
  }

private toggle(): void {
    this.isOpen() ? this.close() : this.open();
  }

private open(): void {
    const positionStrategy = this.overlay
      .position()
      .flexibleConnectedTo(this.origin())
      .withPositions(this.getPositions())
      .withPush(false);

    this.overlayRef = this.overlay.create({
      positionStrategy,
      hasBackdrop: true,
      backdropClass: 'transparent-backdrop',
      scrollStrategy: this.overlay.scrollStrategies.reposition(),
    });

    const portal = new TemplatePortal(this.popupTemplate(), this.vcr);
    this.overlayRef.attach(portal);
    this.isOpen.set(true);

    this.overlayRef.backdropClick().pipe(take(1)).subscribe(() => this.close());
  }

private close(): void {
    if (this.overlayRef) {
    this.overlayRef.detach();
    this.isOpen.set(false);
  }
}

private getPositions(): ConnectedPosition[] {
    return [
      {
        originX: 'start',
        originY: 'bottom',
        overlayX: 'start',
        overlayY: 'top',
        offsetY: 4,
      },
      {
        originX: 'start',
        originY: 'top',
        overlayX: 'start',
        overlayY: 'bottom',
        offsetY: -4,
      }
    ];
  }

  ngOnDestroy(): void {
    this.clickSubscription.unsubscribe();
    this.overlayRef?.dispose();
  }
}
