// SCROLL REVEAL DIRECTIVE
// Usage in any template:  <div appScrollReveal>...</div>
//                         <div appScrollReveal [revealDelay]="0.2">
//
// What it does:
// 1. On init, adds 'scroll-hidden' class to the host element
// 2. Sets up an IntersectionObserver watching the host element
// 3. When element enters viewport → adds 'scroll-visible' class
// 4. 'scroll-visible' triggers the CSS animation
// 5. Observer disconnects after animating (animate once only)

import {
  Directive,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';

@Directive({
  standalone: true,
  selector: '[appScrollReveal]',  // Applied as an attribute in HTML
})
export class ScrollRevealDirective implements OnInit, OnDestroy {

  // Optional delay in seconds — lets us stagger multiple elements
  // Usage: <div appScrollReveal [revealDelay]="0.15">
  @Input() revealDelay: number = 0;

  // Optional threshold — how much of the element must be visible
  @Input() revealThreshold: number = 0.1;

  // Store observer so we can disconnect it in ngOnDestroy
  private observer!: IntersectionObserver;

  // ElementRef gives us access to the actual DOM element
  // Angular injects it automatically — we don't call new ElementRef()
  constructor(private el: ElementRef) { }

  ngOnInit(): void {
    const element = this.el.nativeElement;

    // Start hidden — CSS class defined in styles.scss
    element.classList.add('scroll-hidden');

    // Apply delay if provided
    if (this.revealDelay > 0) {
      element.style.transitionDelay = `${this.revealDelay}s`;
    }

    // Create the observer
    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            // Element entered viewport — trigger animation
            element.classList.remove('scroll-hidden');
            element.classList.add('scroll-visible');

            // Stop watching — we only want to animate once
            this.observer.unobserve(element);
          }
        });
      },
      { threshold: this.revealThreshold }
    );

    // Start observing the host element
    this.observer.observe(element);
  }

  ngOnDestroy(): void {
    // Always clean up observers to prevent memory leaks
    // This runs when the component containing this directive is destroyed
    if (this.observer) {
      this.observer.disconnect();
    }
  }
}
