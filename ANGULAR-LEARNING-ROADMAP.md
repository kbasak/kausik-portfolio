# 📚 Angular 19 — From Zero to Advanced
## Kausik's Personal Learning Roadmap (Portfolio Edition)

> **Philosophy:** You won't just learn Angular in theory. Every concept you learn
> will immediately be used to build a real part of your portfolio.
> Theory → Example → Apply. That's the loop.

---

# 🗺️ THE BIG PICTURE FIRST

Before any code, understand what Angular IS and WHY it exists.

---

## 🤔 Why Does Angular Exist?

Imagine building a website with just HTML + CSS + JS.

```html
<!-- Old way — you manually update the DOM -->
<p id="username">Loading...</p>

<script>
  let name = "Kausik";
  document.getElementById("username").innerText = name; // manual DOM update

  // Now if name changes, you have to manually find and update EVERY place it appears
  name = "Kausik Basak";
  document.getElementById("username").innerText = name; // do it again...
</script>
```

This gets messy fast. Angular solves this with **data binding** — you change the data,
the UI updates automatically. No manual DOM touching.

```typescript
// Angular way — data and UI are linked
export class AppComponent {
  name = "Kausik Basak";  // Change this...
}
```
```html
<!-- ...and this updates automatically. No getElementById. No manual update. -->
<p>{{ name }}</p>
```

**Angular is a framework** — a complete toolkit for building large, maintainable
web applications. It gives you:

| Problem | Angular Solution |
|---|---|
| UI auto-updating when data changes | Data Binding |
| Reusable pieces of UI | Components |
| Sharing logic across the app | Services |
| Navigating between pages | Router |
| Handling forms | Forms Module |
| Talking to a backend API | HttpClient |

---

## 🏗️ How an Angular App Boots Up

```
Browser loads index.html
       ↓
index.html has <app-root></app-root> tag
       ↓
Angular reads main.ts → bootstraps AppModule
       ↓
AppModule declares AppComponent
       ↓
Angular finds <app-root> in the HTML
       ↓
Renders AppComponent's template there
       ↓
AppComponent's template has <app-navbar>, <app-hero> etc.
       ↓
Angular renders those too — the whole tree loads
```

**Files involved at startup:**
```
index.html        ← One HTML file. Has <app-root>
main.ts           ← Entry point. Starts Angular.
app.module.ts     ← The root module. Declares all components.
app.component.ts  ← The root component. All others sit inside it.
```

---

# 📦 PHASE 1 — THE FOUNDATIONS
### Portfolio Work: Project setup, Models, Data file, Global SCSS

---

## 📖 LESSON 1 — TypeScript Basics (You need this before Angular)

Angular is written in TypeScript. TypeScript = JavaScript + Type Safety.

### 1.1 — Variables & Types

```typescript
// JavaScript — no types, no safety
let name = "Kausik";
name = 99;           // JS allows this — a bug waiting to happen!

// TypeScript — types are enforced
let name: string = "Kausik";
name = 99;           // ❌ ERROR: Type 'number' is not assignable to type 'string'
name = "Kausik Basak"; // ✅ Fine
```

**Common types you'll use:**
```typescript
let age: number = 25;
let isEmployed: boolean = true;
let skills: string[] = ["Java", "Angular"];  // array of strings
let anyValue: any = "can be anything";       // avoid this — defeats the purpose
```

---

### 1.2 — Interfaces (THE most important concept for Angular)

An interface defines the **shape** (structure) of an object. Think of it as a blueprint.

```typescript
// Without interface — you never know what's inside the object
function displayJob(job) {
  console.log(job.company);   // Will this exist? No idea.
}

// WITH interface — the shape is guaranteed
interface Job {
  company: string;
  role: string;
  duration: string;
  isCurrent: boolean;
}

function displayJob(job: Job) {
  console.log(job.company);   // ✅ TypeScript GUARANTEES this exists
}

// Creating an object that matches the interface
const myJob: Job = {
  company: "Infosys",
  role: "Associate Consultant",
  duration: "August 2024 – Present",
  isCurrent: true
};

displayJob(myJob); // ✅ Works perfectly
```

**Optional properties** — use `?` when a field might not always exist:
```typescript
interface Certification {
  name: string;
  issuer: string;
  year?: string;      // Optional — some certs don't have a year
}

const cert1: Certification = { name: "AWS CCP", issuer: "Amazon" };            // ✅ year omitted
const cert2: Certification = { name: "Spring Security", issuer: "Udemy", year: "2023" }; // ✅ with year
```

**Union types** — a field can be one of specific values only:
```typescript
interface Skill {
  name: string;
  category: 'primary' | 'secondary' | 'tools'; // ONLY these 3 values allowed
}

const s: Skill = { name: "Java", category: "primary" };  // ✅
const s2: Skill = { name: "Java", category: "expert" };  // ❌ Error — 'expert' not allowed
```

> 🔨 **WHERE YOU USE THIS IN YOUR PORTFOLIO:**
> `src/app/core/models/portfolio.model.ts` — Every piece of data in your portfolio
> (Experience, Project, Skill) is typed using interfaces. This prevents bugs.

---

### 1.3 — Functions & Arrow Functions

```typescript
// Regular function
function add(a: number, b: number): number {  // return type is number
  return a + b;
}

// Arrow function (modern, shorter syntax — used everywhere in Angular)
const add = (a: number, b: number): number => a + b;

// Arrow function that returns nothing
const greet = (name: string): void => {
  console.log(`Hello, ${name}`);
};
```

---

### 1.4 — Classes & Constructors

Angular Components are TypeScript classes.

```typescript
class Person {
  name: string;
  age: number;

  // Constructor runs when you create a new Person
  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }

  greet(): string {
    return `Hi, I'm ${this.name}`;
  }
}

const kausik = new Person("Kausik", 25);
console.log(kausik.greet()); // "Hi, I'm Kausik"
```

---

## 📖 LESSON 2 — Angular Components (Core Building Block)

A **Component** is a reusable piece of UI with its own:
- HTML template (what it looks like)
- TypeScript class (its data and logic)
- SCSS styles (how it's styled)

### 2.1 — Anatomy of a Component

```typescript
// hero.component.ts

import { Component } from '@angular/core';  // Import the decorator

@Component({                                 // @Component is a DECORATOR
  selector: 'app-hero',                      // HTML tag: <app-hero>
  templateUrl: './hero.component.html',      // Points to its HTML file
  styleUrls: ['./hero.component.scss']       // Points to its CSS file
})
export class HeroComponent {
  // All the data and logic for this component goes here
  name: string = 'Kausik Basak';
  title: string = 'Java Backend Developer';
}
```

```html
<!-- hero.component.html -->
<section class="hero">
  <h1>{{ name }}</h1>        <!-- {{ }} is called interpolation — displays the value -->
  <p>{{ title }}</p>
</section>
```

### 2.2 — How to Generate a Component (Use CLI, not manual creation!)

```bash
# Manual way — error prone (you could forget a file or make a typo)
# DON'T do this

# Angular CLI way — generates all 3 files AND registers in module automatically ✅
ng generate component features/hero
# Short version:
ng g c features/hero
```

This creates:
```
src/app/features/hero/
├── hero.component.ts
├── hero.component.html
└── hero.component.scss
```
AND automatically adds `HeroComponent` to `app.module.ts` declarations. Magic!

### 2.3 — The Decorator: @Component

A **decorator** (`@Something`) is a function that adds metadata to a class.
It's Angular's way of saying "this class is not just any class — it's a Component."

```typescript
@Component({
  selector: 'app-hero',       // What HTML tag triggers this component
  templateUrl: '...',         // Its HTML
  styleUrls: ['...']          // Its CSS
})
```

Think of it like a label you stick on a class to give it superpowers.

> 🔨 **WHERE YOU USE THIS:**
> Every section of your portfolio (Hero, About, Skills, etc.) is a Component.
> You'll run `ng g c features/hero`, `ng g c features/about` etc. in Step 2+.

---

## 📖 LESSON 3 — Modules

> Think of a Module like a **box** that groups related components together.
> Angular needs to know which components exist before it can use them.
> You register components in a module's `declarations` array.

### 3.1 — The Root Module (app.module.ts)

```typescript
// app.module.ts — Angular reads this first

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { HeroComponent } from './features/hero/hero.component';   // import it

@NgModule({
  declarations: [
    AppComponent,    // ← All components must be declared here
    HeroComponent,   // ← Angular CLI adds these automatically when you use ng g c
  ],
  imports: [
    BrowserModule,   // ← BrowserModule is required for any web app
  ],
  bootstrap: [AppComponent]  // ← Which component to load first
})
export class AppModule { }
```

**The 3 important arrays in @NgModule:**

| Array | Purpose | Example |
|---|---|---|
| `declarations` | Components, Directives, Pipes that belong to this module | `HeroComponent` |
| `imports` | Other modules whose features you need | `FormsModule`, `BrowserModule` |
| `exports` | Components from this module that OTHER modules can use | Used in `SharedModule` |

### 3.2 — SharedModule (You'll create this)

```typescript
// shared.module.ts — groups all reusable components

@NgModule({
  declarations: [
    NavbarComponent,
    FooterComponent,
    SkillBadgeComponent,
    SectionTitleComponent,
  ],
  exports: [
    NavbarComponent,   // By exporting, AppModule can use <app-navbar>
    FooterComponent,
    SkillBadgeComponent,
    SectionTitleComponent,
  ]
})
export class SharedModule { }
```

Then in `app.module.ts`:
```typescript
imports: [
  BrowserModule,
  SharedModule,   // ← Now ALL exported components from SharedModule are available
]
```

> 🔨 **WHERE YOU USE THIS:**
> Step 2 — You'll create `SharedModule` and put Navbar + Footer inside it.

---

# 📦 PHASE 2 — DATA & TEMPLATES
### Portfolio Work: Navbar, Hero, About sections

---

## 📖 LESSON 4 — Data Binding (The Heart of Angular)

Data binding is how Angular syncs your TypeScript data with your HTML template.
There are 4 types:

### 4.1 — Interpolation `{{ }}`  (TypeScript → HTML, text only)

```typescript
export class HeroComponent {
  name = 'Kausik Basak';
  year = 2024;
}
```
```html
<h1>{{ name }}</h1>                    <!-- Kausik Basak -->
<p>Experience since {{ year }}</p>     <!-- Experience since 2024 -->
<p>{{ 2026 - year }} years exp</p>     <!-- You can write expressions: 2 years exp -->
```

### 4.2 — Property Binding `[property]`  (TypeScript → HTML, for HTML attributes)

```typescript
export class AboutComponent {
  profilePhoto = 'assets/images/profile.jpg';
  isDisabled = false;
  altText = 'Kausik Basak profile photo';
}
```
```html
<!-- Use [] when setting an HTML attribute FROM a variable -->
<img [src]="profilePhoto" [alt]="altText">    <!-- Sets src and alt dynamically -->
<button [disabled]="isDisabled">Click</button> <!-- Disabled when isDisabled = true -->

<!-- DON'T do this — this passes the STRING "profilePhoto", not the variable -->
<img src="profilePhoto">   ❌ Wrong
<img [src]="profilePhoto"> ✅ Correct
```

### 4.3 — Event Binding `(event)`  (HTML → TypeScript, user interactions)

```typescript
export class NavbarComponent {
  isMenuOpen = false;

  toggleMenu() {          // This is called when button is clicked
    this.isMenuOpen = !this.isMenuOpen;
  }
}
```
```html
<!-- () around the event name -->
<button (click)="toggleMenu()">Menu</button>

<!-- Other events you'll use -->
<input (input)="onType($event)">       <!-- fires on every keystroke -->
<form (submit)="onSubmit()">           <!-- fires on form submit -->
<div (mouseenter)="onHover()">         <!-- fires on hover -->
```

### 4.4 — Two-Way Binding `[(ngModel)]`  (sync in BOTH directions)

```typescript
export class ContactComponent {
  message = '';   // Starts empty
}
```
```html
<!-- When user types, message updates. If message changes in TS, input updates too. -->
<input [(ngModel)]="message" placeholder="Your message">
<p>You typed: {{ message }}</p>   <!-- Updates live as user types -->
```

> ⚠️ Two-way binding needs `FormsModule` imported in your module!
> ```typescript
> import { FormsModule } from '@angular/forms';
> // add to imports array in NgModule
> ```

> 🔨 **WHERE YOU USE THIS:**
> - `{{ }}` — Everywhere. Hero name, titles, descriptions.
> - `[src]` — Profile image, project images.
> - `(click)` — Navbar hamburger, contact form submit.
> - `[(ngModel)]` — Contact form inputs.

---

## 📖 LESSON 5 — Structural Directives (Controlling the DOM)

Directives are instructions that tell Angular to do something with the DOM.
**Structural directives** change the structure (add/remove elements).
They always start with `*`.

### 5.1 — `*ngFor` — Loop through a list

```typescript
export class SkillsComponent {
  skills = ['Java', 'Spring Boot', 'Angular', 'MySQL', 'Docker'];
}
```
```html
<!-- Renders a <span> for EACH item in the skills array -->
<span *ngFor="let skill of skills">{{ skill }}</span>

<!-- Access the index too -->
<div *ngFor="let skill of skills; let i = index">
  {{ i + 1 }}. {{ skill }}
</div>

<!-- Loop through objects -->
<div *ngFor="let exp of experience">
  <h3>{{ exp.role }}</h3>
  <p>{{ exp.company }}</p>
</div>
```

### 5.2 — `*ngIf` — Show/hide based on condition

```typescript
export class ExperienceComponent {
  showDetails = false;

  toggle() { this.showDetails = !this.showDetails; }
}
```
```html
<button (click)="toggle()">Toggle</button>

<!-- This element is ADDED to DOM when true, REMOVED when false -->
<div *ngIf="showDetails">
  <p>Detailed info here...</p>
</div>

<!-- if/else syntax -->
<div *ngIf="showDetails; else hiddenBlock">Showing details</div>
<ng-template #hiddenBlock><p>Details hidden</p></ng-template>

<!-- With a property -->
<span *ngIf="exp.isCurrent" class="badge">Current</span>
```

### 5.3 — `[ngClass]` — Add/remove CSS classes dynamically

```typescript
export class NavbarComponent {
  isScrolled = false;
}
```
```html
<!-- Adds 'scrolled' class when isScrolled is true -->
<nav [ngClass]="{ 'scrolled': isScrolled }">...</nav>

<!-- Multiple conditions -->
<div [ngClass]="{
  'active': isActive,
  'disabled': isDisabled,
  'highlight': isHighlighted
}">...</div>
```

### 5.4 — `[ngStyle]` — Add inline styles dynamically

```typescript
export class SkillBadgeComponent {
  color = '#38bdf8';
}
```
```html
<span [ngStyle]="{ 'background-color': color, 'color': '#fff' }">Java</span>
```

> 🔨 **WHERE YOU USE THIS:**
> - `*ngFor` — Rendering ALL skill badges, ALL experience cards, ALL projects.
> - `*ngIf` — "Current" badge on Infosys role, mobile menu open/close.
> - `[ngClass]` — Navbar changes style when scrolled.

---

## 📖 LESSON 6 — @Input() and @Output() (Component Communication)

When you have a Parent component and a Child component, they need to talk.

```
AppComponent (Parent)
  └── SkillBadgeComponent (Child)   ← needs to receive the skill name
  └── SectionTitleComponent (Child) ← needs to receive the title text
  └── ExperienceCardComponent (Child) ← needs to receive one job object
```

### 6.1 — @Input() — Parent sends data TO Child

```typescript
// skill-badge.component.ts — the CHILD

import { Component, Input } from '@angular/core';  // Import Input

@Component({
  selector: 'app-skill-badge',
  template: `<span class="badge">{{ skillName }}</span>`  // inline template
})
export class SkillBadgeComponent {
  @Input() skillName: string = '';   // Accepts data FROM parent
  @Input() color: string = '#38bdf8'; // Another input with a default value
}
```

```typescript
// skills.component.ts — the PARENT

export class SkillsComponent {
  skills = ['Java', 'Spring Boot', 'Angular', 'Docker'];
}
```

```html
<!-- skills.component.html — the PARENT'S template -->

<!-- For each skill, render a SkillBadgeComponent and PASS the skill name into it -->
<app-skill-badge
  *ngFor="let skill of skills"
  [skillName]="skill"              <!-- [inputName]="value" — this is how you pass data -->
  [color]="'#38bdf8'"
></app-skill-badge>
```

### 6.2 — @Output() + EventEmitter — Child sends events TO Parent

```typescript
// contact-form.component.ts — CHILD wants to tell parent "form was submitted"

import { Component, Output, EventEmitter } from '@angular/core';

@Component({ selector: 'app-contact-form', templateUrl: '...' })
export class ContactFormComponent {
  @Output() formSubmitted = new EventEmitter<string>(); // Creates an event

  onSubmit() {
    this.formSubmitted.emit('Message sent!'); // Fires the event with a value
  }
}
```

```html
<!-- contact.component.html — PARENT listens for the event -->
<app-contact-form
  (formSubmitted)="handleSubmission($event)"   <!-- $event is the emitted value -->
></app-contact-form>
```

```typescript
// contact.component.ts — PARENT handles the event
export class ContactComponent {
  handleSubmission(message: string) {
    console.log(message); // "Message sent!"
  }
}
```

> 🔨 **WHERE YOU USE THIS:**
> - `@Input()` — SkillBadge receives skill name, SectionTitle receives heading text,
>   ExperienceCard receives one job object.
> - `@Output()` — ContactForm emits when submitted.

---

# 📦 PHASE 3 — SERVICES & DEPENDENCY INJECTION
### Portfolio Work: ThemeService, ScrollService

---

## 📖 LESSON 7 — Services & Dependency Injection

### The Problem Services Solve

What if TWO components need the same piece of logic?
Example: Both Navbar and HeroSection need to know "is dark mode on?"

**Bad approach:** Put the logic in both components — now you have duplicate code.
**Angular approach:** Put logic in a Service — one place, injected anywhere.

### 7.1 — Creating a Service

```bash
ng generate service core/services/theme
# Short: ng g s core/services/theme
```

```typescript
// theme.service.ts

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'   // This makes the service a SINGLETON — one instance for the whole app
})
export class ThemeService {
  isDarkMode = true;   // State that any component can access

  toggleTheme() {
    this.isDarkMode = !this.isDarkMode;
    // Apply to document
    document.documentElement.setAttribute('data-theme', this.isDarkMode ? 'dark' : 'light');
  }
}
```

### 7.2 — Dependency Injection (DI) — Using the Service

You don't create a service instance manually. Angular INJECTS it for you.

```typescript
// navbar.component.ts — wants to use ThemeService

import { Component } from '@angular/core';
import { ThemeService } from '../../core/services/theme.service'; // import it

@Component({ selector: 'app-navbar', templateUrl: '...' })
export class NavbarComponent {

  // Angular INJECTS ThemeService automatically via the constructor
  constructor(private themeService: ThemeService) {}
  //          ↑ private means it's only usable inside this class
  //                    ↑ Angular sees this type, finds the singleton, and passes it in

  toggleTheme() {
    this.themeService.toggleTheme(); // Use the service method
  }

  get isDark() {
    return this.themeService.isDarkMode; // Read the service state
  }
}
```

**The magic:** `ThemeService` is the SAME instance in every component.
If NavbarComponent calls `toggleTheme()`, HeroComponent sees the change too.
This is **Dependency Injection** — Angular manages the lifecycle, you just declare what you need.

> 🔨 **WHERE YOU USE THIS:**
> - `ThemeService` — Dark/light mode toggle shared between Navbar and entire app.
> - `ScrollService` — Tracks which section is visible, tells Navbar which link to highlight.

---

# 📦 PHASE 4 — ADVANCED PATTERNS
### Portfolio Work: Animations, Scroll effects, Contact form

---

## 📖 LESSON 8 — Lifecycle Hooks

Every component goes through a lifecycle: Created → Updated → Destroyed.
Angular gives you hooks (methods) to run code at each stage.

```typescript
import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';

@Component({ selector: 'app-hero', templateUrl: '...' })
export class HeroComponent implements OnInit, OnDestroy, AfterViewInit {

  // ① Called ONCE after the component is created
  // Best place to: fetch data, initialize state, subscribe to services
  ngOnInit() {
    console.log('Hero component created');
    this.loadData();
  }

  // ② Called ONCE after the component's view (HTML) is rendered
  // Best place to: interact with DOM elements, start animations
  ngAfterViewInit() {
    console.log('Hero HTML is in the DOM now');
    this.startTypingAnimation();
  }

  // ③ Called when the component is destroyed (navigated away from)
  // Best place to: unsubscribe, clean up timers (prevent memory leaks)
  ngOnDestroy() {
    console.log('Hero component destroyed — cleaning up');
  }

  loadData() { /* ... */ }
  startTypingAnimation() { /* ... */ }
}
```

**Most common hooks and when to use them:**

| Hook | When it runs | Common use |
|---|---|---|
| `ngOnInit` | After component creation | Load data, initialize variables |
| `ngAfterViewInit` | After HTML renders | DOM manipulation, animations |
| `ngOnChanges` | When `@Input()` values change | React to parent sending new data |
| `ngOnDestroy` | Before component removed | Clean up subscriptions, timers |

> 🔨 **WHERE YOU USE THIS:**
> - `ngOnInit` — Load portfolio data into component variables.
> - `ngAfterViewInit` — Start scroll observer for animations.
> - `ngOnDestroy` — Clean up scroll event listeners.

---

## 📖 LESSON 9 — @HostListener (Listening to Browser Events)

`@HostListener` lets a component listen to events on the browser window or its own HTML element.

```typescript
import { Component, HostListener } from '@angular/core';

@Component({ selector: 'app-navbar', templateUrl: '...' })
export class NavbarComponent {

  isScrolled = false;

  // Listens to the 'scroll' event on the browser WINDOW
  @HostListener('window:scroll', [])
  onWindowScroll() {
    // window.scrollY = how many pixels the user has scrolled down
    this.isScrolled = window.scrollY > 50;
    // When true, the navbar will get a 'scrolled' CSS class (via [ngClass])
  }

  // Listens to keyboard events
  @HostListener('document:keydown.escape', [])
  onEscapeKey() {
    this.closeMenu();
  }

  closeMenu() { /* ... */ }
}
```

> 🔨 **WHERE YOU USE THIS:**
> Navbar — changes background when user scrolls past 50px.

---

## 📖 LESSON 10 — Angular Animations

Angular has a built-in `@angular/animations` module for state-based transitions.

```typescript
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-hero',
  templateUrl: '...',
  animations: [
    trigger('fadeUp', [                   // 'fadeUp' is the animation name
      state('hidden', style({             // define 'hidden' state
        opacity: 0,
        transform: 'translateY(30px)'
      })),
      state('visible', style({            // define 'visible' state
        opacity: 1,
        transform: 'translateY(0)'
      })),
      transition('hidden => visible',     // what happens when going hidden → visible
        animate('600ms cubic-bezier(0.16, 1, 0.3, 1)')  // duration + easing
      )
    ])
  ]
})
export class HeroComponent implements OnInit {
  animState = 'hidden';   // starts hidden

  ngOnInit() {
    // After a short delay, change to visible → triggers the animation
    setTimeout(() => { this.animState = 'visible'; }, 100);
  }
}
```

```html
<!-- [@animationName]="stateVariable" — attaches animation to element -->
<div [@fadeUp]="animState">
  <h1>Kausik Basak</h1>
</div>
```

> 🔨 **WHERE YOU USE THIS:**
> Hero section text fades up on load. Section cards animate in as you scroll to them.

---

## 📖 LESSON 11 — ViewChild (Accessing DOM Elements)

Sometimes you need to directly interact with an HTML element from TypeScript.

```typescript
import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';

@Component({ selector: 'app-hero', templateUrl: '...' })
export class HeroComponent implements AfterViewInit {

  // Get a reference to the element with #nameRef in the template
  @ViewChild('nameRef') nameElement!: ElementRef;
  //                    ↑ The ! means "trust me TypeScript, this will exist"

  ngAfterViewInit() {
    // Now you can directly manipulate the DOM element
    this.nameElement.nativeElement.style.color = 'red';
  }
}
```

```html
<h1 #nameRef>Kausik Basak</h1>   <!-- #nameRef is a template reference variable -->
```

> 🔨 **WHERE YOU USE THIS:**
> Getting the height of the hero section for scroll calculations.

---

## 📖 LESSON 12 — Pipes (Transforming Display Data)

Pipes transform data in templates without changing the original value.

```html
<!-- Built-in pipes -->
{{ name | uppercase }}              <!-- KAUSIK BASAK -->
{{ name | lowercase }}              <!-- kausik basak -->
{{ 9.16 | number:'1.2-2' }}         <!-- 9.16 (formatted) -->
{{ today | date:'MMM yyyy' }}       <!-- Jan 2024 -->
{{ longText | slice:0:100 }}        <!-- First 100 characters -->

<!-- Chaining pipes -->
{{ name | uppercase | slice:0:6 }}  <!-- KAUSIK -->
```

Creating a custom pipe (Advanced):
```typescript
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'truncate' })
export class TruncatePipe implements PipeTransform {
  transform(value: string, limit: number = 50): string {
    return value.length > limit ? value.substring(0, limit) + '...' : value;
  }
}
```
```html
{{ longDescription | truncate:80 }}   <!-- Cuts to 80 chars + "..." -->
```

---

# 🗺️ COMPLETE LEARNING MAP

Here's every concept mapped to your portfolio steps:

```
STEP 1 — Setup & Foundation
├── TypeScript: interfaces, union types, optional props
├── Angular: project anatomy, module system
└── SCSS: CSS custom properties, design tokens

STEP 2 — Navbar + Footer
├── ng generate component
├── SharedModule + exports
├── @HostListener (scroll detection)
├── [ngClass] (add 'scrolled' class)
└── *ngIf (mobile menu open/close)

STEP 3 — Hero Section
├── Interpolation {{ }}
├── Property binding [src]
├── Angular Animations (fadeUp)
├── ngOnInit lifecycle hook
└── ngAfterViewInit lifecycle hook

STEP 4 — About + Skills
├── *ngFor (loop through skill groups)
├── @Input() (SkillBadgeComponent receives skill name)
├── ngAfterViewInit + IntersectionObserver (scroll reveal)
└── Component composition (parent + child)

STEP 5 — Experience + Projects
├── Complex *ngFor (nested loops)
├── *ngIf (conditional badges, "Current" label)
├── [ngStyle] (domain color per project)
└── Template reference variables (#ref)

STEP 6 — Education + Certifications
├── Pipe usage (date, uppercase)
├── Simple component structure practice
└── CSS Grid / Flexbox in SCSS

STEP 7 — Contact Form
├── Two-way binding [(ngModel)]
├── FormsModule
├── @Output() + EventEmitter
├── Template-driven form validation
└── HTTP call to Formspree (optional)

STEP 8 — Services + Theme
├── Creating a Service (ng g s)
├── Dependency Injection (constructor injection)
├── @Injectable providedIn: 'root'
└── Singleton pattern

STEP 9 — Animations + Polish
├── Angular Animations module
├── trigger, state, transition, animate
├── @ViewChild + ElementRef
└── IntersectionObserver API

STEP 10 — Build + Deploy
├── ng build --configuration production
├── angular.json: base-href
├── GitHub Pages deployment
└── Environment files (dev vs prod)
```

---

# 📋 QUICK REFERENCE CHEAT SHEET

Keep this handy while coding.

```typescript
// GENERATE COMMANDS
ng g c features/hero           // Create component
ng g s core/services/theme     // Create service
ng g m shared                  // Create module
ng g p shared/pipes/truncate   // Create pipe

// BINDING CHEAT SHEET
{{ value }}               // Interpolation — display data as text
[property]="value"        // Property binding — set HTML attribute
(event)="method()"        // Event binding — call method on event
[(ngModel)]="value"       // Two-way binding — sync input + variable

// STRUCTURAL DIRECTIVES
*ngFor="let item of list"              // Loop
*ngFor="let item of list; let i = index"  // Loop with index
*ngIf="condition"                      // Show if true
*ngIf="condition; else #ref"           // If/else
[ngClass]="{ 'className': condition }" // Conditional class
[ngStyle]="{ 'color': value }"         // Inline style

// COMPONENT COMMUNICATION
@Input() propName: type = default;     // Receive from parent
@Output() eventName = new EventEmitter<type>(); // Send to parent
this.eventName.emit(value);            // Fire the event

// LIFECYCLE HOOKS
ngOnInit()         // After creation — load data here
ngAfterViewInit()  // After HTML renders — DOM work here
ngOnDestroy()      // Before removal — cleanup here

// SERVICE INJECTION
constructor(private myService: MyService) {}
this.myService.someMethod();
```

---

> 📌 **Bookmark this file.** Refer back to it whenever you're confused about
> a concept. We'll build every single item in this map — one step at a time.
>
> **Current position: About to start STEP 2 → Navbar + Footer**
