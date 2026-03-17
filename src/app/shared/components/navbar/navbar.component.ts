// NAVBAR COMPONENT
//
// Responsibilities:
// 1. Display navigation links
// 2. Detect scroll position → change navbar visual style
// 3. Track which section is currently in the viewport
// 4. Handle mobile hamburger menu toggle

import { Component, HostListener, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  imports: [CommonModule]   // Gives us *ngFor, *ngIf, [ngClass] in the template
})
export class NavbarComponent implements OnInit {

  // ── State Properties ──────────────────────────────────────────
  //
  // These are class properties that act as the component's "memory".
  // They store values that the template reads and reacts to.
  // When a property changes, Angular's change detection automatically
  // re-renders the parts of the template that use that property.
  // This is called ONE-WAY DATA BINDING: Class → Template.

  isScrolled = false;        // true when page is scrolled more than 50px
  isMenuOpen = false;        // true when the mobile hamburger menu is open
  activeSection = 'hero';    // the id of the section currently in view

  // Array of navigation items — the template loops over this with *ngFor.
  // Storing data as arrays in the class (not hardcoded in HTML) is a key
  // Angular practice: it makes content easy to update and keeps templates clean.
  navLinks = [
    { label: 'About', id: 'about' },
    { label: 'Skills', id: 'skills' },
    { label: 'Experience', id: 'experience' },
    { label: 'Projects', id: 'projects' },
    { label: 'Education', id: 'education' },
    { label: 'Certifications', id: 'certifications' },
    { label: 'Contact', id: 'contact' },
  ];

  // ── Lifecycle Hook: ngOnInit ───────────────────────────────────
  //
  // Angular components have a LIFECYCLE — a sequence of events from
  // creation to destruction. ngOnInit() is called ONCE after Angular
  // has fully initialized the component and its inputs.
  //
  // Rule of thumb:
  // - Use the constructor() for dependency injection only
  // - Use ngOnInit() for initialization logic (API calls, setup etc.)
  //
  // implements OnInit → TypeScript forces us to define ngOnInit().
  // This is good practice — it makes the intent explicit and clear.

  ngOnInit(): void {
    // Initial setup can go here in future steps (e.g. scroll-spy setup)
  }

  // ── @HostListener Decorator ───────────────────────────────────
  //
  // @HostListener lets this component REACT to events that happen
  // on the browser window (or the component's own DOM element).
  //
  // Without @HostListener, you would write:
  //   window.addEventListener('scroll', () => { ... })
  // The problem: you'd also need to remove it when the component is
  // destroyed, or you'd have a memory leak.
  //
  // @HostListener handles all of that automatically.
  // Angular adds the listener when the component is created,
  // and removes it when the component is destroyed. Clean and safe.
  //
  // Syntax: @HostListener('target:eventName')
  // [] means the target is the window object.
  // 'window:scroll' = "listen to the scroll event on window"

  @HostListener('window:scroll', [])
  onWindowScroll(): void {
    // window.scrollY = number of pixels scrolled from the top of the page
    this.isScrolled = window.scrollY > 50;
    this.updateActiveSection();
  }

  // Determines which section the user is currently reading
  updateActiveSection(): void {
    for (const link of this.navLinks) {
      const element = document.getElementById(link.id);
      if (element) {
        // getBoundingClientRect() returns an object describing the element's
        // size and position RELATIVE TO THE VIEWPORT (the visible window).
        // rect.top = distance from top of viewport to top of element.
        // If top < 150 and bottom > 150, the section is in the "active zone".
        const rect = element.getBoundingClientRect();
        if (rect.top <= 150 && rect.bottom >= 150) {
          this.activeSection = link.id;
          break;   // Stop checking once we find the active section
        }
      }
    }
  }

  // Smooth scrolls the page to a section by its HTML id attribute
  scrollToSection(sectionId: string): void {
    const element = document.getElementById(sectionId);
    if (element) {
      // scrollIntoView is a native browser API
      // behavior: 'smooth' animates the scroll instead of jumping
      element.scrollIntoView({ behavior: 'smooth' });
    }
    this.isMenuOpen = false;   // Always close mobile menu after navigation
  }

  // Flips the mobile menu open/closed
  // The ! (NOT) operator inverts a boolean: true→false, false→true
  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }
}
