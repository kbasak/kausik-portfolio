// HERO COMPONENT
//
// Responsibilities:
// 1. Receive PersonalInfo via @Input()
// 2. Run a typewriter animation cycling through role titles
// 3. Display name, title, tagline, photo, and CTA buttons
//
// This is a mostly "presentational" component with one piece
// of self-contained logic: the typewriter effect.

import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PersonalInfo } from '../../core/models/portfolio.model';

@Component({
  standalone: true,
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.scss'],
  imports: [CommonModule]
})
export class HeroComponent implements OnInit, OnDestroy {

  // ── @Input ────────────────────────────────────────────────────
  // The ! (definite assignment assertion) tells TypeScript:
  // "I know this looks uninitialized, but it WILL be set by the
  // parent before this component does anything with it."
  // Without !, TypeScript would complain it might be undefined.
  @Input() personal!: PersonalInfo;

  // ── Typewriter State ──────────────────────────────────────────
  // These properties drive the typewriter animation in the template.

  // The roles we cycle through — add or change these as you like
  roles = [
    'Java Backend Developer',
    'Spring Boot Specialist',
    'RESTful Web Services Developer',
    'Enterprise Application Developer',
  ];

  displayedRole = '';          // The string currently shown on screen
  currentRoleIndex = 0;        // Which role we're currently typing
  currentCharIndex = 0;        // How many characters of the role are shown
  isDeleting = false;          // Are we typing forward or deleting backward?
  showCursor = true;           // Controls the blinking cursor visibility

  // We store the interval reference so we can CLEAR it when the component
  // is destroyed. This is critical — failing to clear intervals causes
  // memory leaks (the interval keeps running even after the component is gone).
  private typewriterInterval: any;
  private cursorInterval: any;

  // ── Lifecycle Hooks ───────────────────────────────────────────
  //
  // implements OnInit, OnDestroy — two lifecycle interfaces.
  // OnInit  → ngOnInit()    called once after component initializes
  // OnDestroy → ngOnDestroy() called just before component is destroyed
  //
  // Always implement OnDestroy when you create intervals/timeouts/subscriptions.
  // Angular won't clean them up for you — YOU must do it in ngOnDestroy.

  ngOnInit(): void {
    this.startTypewriter();
    this.startCursorBlink();
  }

  ngOnDestroy(): void {
    // Clean up intervals to prevent memory leaks
    // clearInterval() stops a running setInterval
    if (this.typewriterInterval) clearInterval(this.typewriterInterval);
    if (this.cursorInterval)     clearInterval(this.cursorInterval);
  }

  // ── Typewriter Logic ──────────────────────────────────────────
  startTypewriter(): void {
    // setInterval(callback, milliseconds) runs the callback repeatedly.
    // Here it runs every 80ms — fast enough to look like typing.
    this.typewriterInterval = setInterval(() => {
      const currentRole = this.roles[this.currentRoleIndex];

      if (!this.isDeleting) {
        // TYPING: add one character at a time
        this.currentCharIndex++;
        this.displayedRole = currentRole.substring(0, this.currentCharIndex);

        // If we've typed the full role, pause then start deleting
        if (this.currentCharIndex === currentRole.length) {
          // clearInterval + setTimeout pattern: pause for 2s, then restart deleting
          clearInterval(this.typewriterInterval);
          setTimeout(() => {
            this.isDeleting = true;
            this.startTypewriter();
          }, 2000);
        }

      } else {
        // DELETING: remove one character at a time (faster than typing)
        this.currentCharIndex--;
        this.displayedRole = currentRole.substring(0, this.currentCharIndex);

        // If we've deleted everything, move to the next role
        if (this.currentCharIndex === 0) {
          this.isDeleting = false;
          this.currentRoleIndex = (this.currentRoleIndex + 1) % this.roles.length;
          // % (modulo) wraps the index: 0→1→2→3→0→1→...
          // So it cycles through roles endlessly
        }
      }
    }, this.isDeleting ? 50 : 100);
    // Deleting is faster (50ms) than typing (100ms) — feels more natural
  }

  startCursorBlink(): void {
    // Blink the cursor every 500ms
    this.cursorInterval = setInterval(() => {
      this.showCursor = !this.showCursor;
    }, 500);
  }

  // Smooth scroll to a section — same as Navbar uses
  scrollToSection(sectionId: string): void {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }
}