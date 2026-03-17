// FOOTER COMPONENT
//
// This is a "presentational" (or "dumb") component.
// It has NO logic — it only cares about displaying data.
// It doesn't fetch anything, doesn't react to events, doesn't
// change any state. It just renders what it's given.
//
// This is a common and intentional Angular pattern:
// Smart components (containers) → handle logic and data
// Dumb components (presentational) → only handle display
//
// Benefits: easier to test, easier to reuse, easier to understand.

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  imports: [CommonModule]
})
export class FooterComponent {

  // new Date().getFullYear() returns the current year as a number (e.g. 2025).
  // By computing this in the class, the footer always shows the correct year
  // automatically — no manual updates ever needed.
  currentYear = new Date().getFullYear();

  socialLinks = [
    {
      label: 'LinkedIn',
      url: 'https://linkedin.com/in/basak-kausik',
      svgPath: 'M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z M2 9h4v12H2z M4 6a2 2 0 1 0 0-4 2 2 0 0 0 0 4z'
    },
    {
      label: 'GitHub',
      url: 'https://github.com/kbasak',
      svgPath: 'M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22'
    },
    {
      label: 'Email',
      url: 'mailto:kausikbasak1999@gmail.com',
      svgPath: 'M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z M22 6l-10 7L2 6'
    },
  ];
}
